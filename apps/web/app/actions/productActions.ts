"use server";

import { db } from "@monkeyprint/db";
import { Prisma } from "@monkeyprint/db";
import { revalidatePath } from "next/cache";
import {
  ProductResponse,
  ProductFormData,
  ProductUpdateData,
  ProductFilters,
} from "@/types";
import {
  generateSlug,
  handleError,
  successResponse,
  errorResponse,
  validateId,
  validateSlug,
  validateStock,
  validateQuery,
  validateProductCreate,
  validateProductUpdate,
  validateProductFilters,
  validatePagination,
  validateBulkUpdate,
  handleValidationError,
} from "@/lib/utils";

// For price range validation, we'll create the schema inline since we're not importing zod directly
const validatePriceRange = (minPrice: number, maxPrice: number) => {
  if (typeof minPrice !== "number" || minPrice < 0) {
    return { success: false, error: "Minimum price must be a positive number" };
  }
  if (typeof maxPrice !== "number" || maxPrice < 0) {
    return { success: false, error: "Maximum price must be a positive number" };
  }
  if (minPrice > maxPrice) {
    return {
      success: false,
      error: "Minimum price must be less than or equal to maximum price",
    };
  }
  return { success: true, data: { minPrice, maxPrice } };
};

// Standard includes for product queries
const PRODUCT_INCLUDE = {
  images: {
    where: { isDeleted: false },
    orderBy: { sortOrder: "asc" },
  },
  category: true,
  variants: {
    where: { isActive: true },
  },
} as const;

const DETAILED_PRODUCT_INCLUDE = {
  images: {
    where: { isDeleted: false },
    orderBy: { sortOrder: "asc" },
  },
  category: true,
  variants: {
    where: { isActive: true },
    orderBy: { price: "asc" },
  },
  reviews: {
    where: { isApproved: true },
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  },
  _count: {
    select: {
      reviews: { where: { isApproved: true } },
      orderItems: true,
    },
  },
} as const;

// Core CRUD operations
export async function createProduct(
  data: ProductFormData
): Promise<ProductResponse> {
  try {
    // Validate input data
    const validation = validateProductCreate(data);
    const validationError = handleValidationError(validation, errorResponse);
    if (validationError) return validationError;

    const validatedData = validation.data!;
    const slug = generateSlug(validatedData.name);

    const [existingSku, existingSlug] = await Promise.all([
      db.product.findUnique({ where: { sku: validatedData.sku } }),
      db.product.findUnique({ where: { slug } }),
    ]);

    if (existingSku)
      return errorResponse("Product with this SKU already exists");
    if (existingSlug)
      return errorResponse("Product with similar name already exists");

    const product = await db.product.create({
      data: {
        ...validatedData,
        slug,
        comparePrice: validatedData.comparePrice || null,
        tags: validatedData.tags || [],
      },
      include: PRODUCT_INCLUDE,
    });

    revalidatePath("/admin/products");
    return successResponse([product]);
  } catch (error) {
    return handleError(error, "Failed to create product");
  }
}

export async function updateProduct(
  data: ProductUpdateData
): Promise<ProductResponse> {
  try {
    // Validate input data
    const validation = validateProductUpdate(data);
    const validationError = handleValidationError(validation, errorResponse);
    if (validationError) return validationError;

    const { id, ...updateData } = validation.data!;

    const existingProduct = await db.product.findUnique({ where: { id } });
    if (!existingProduct) return errorResponse("Product not found");

    let slug = existingProduct.slug;
    const checks = [];

    // Handle slug update
    if (updateData.name && updateData.name !== existingProduct.name) {
      slug = generateSlug(updateData.name);
      checks.push(
        db.product
          .findFirst({ where: { slug, id: { not: id } } })
          .then((result) =>
            result ? "Product with similar name already exists" : null
          )
      );
    }

    // Handle SKU update
    if (updateData.sku && updateData.sku !== existingProduct.sku) {
      checks.push(
        db.product
          .findFirst({ where: { sku: updateData.sku, id: { not: id } } })
          .then((result) =>
            result ? "Product with this SKU already exists" : null
          )
      );
    }

    const errors = await Promise.all(checks);
    const error = errors.find((e) => e);
    if (error) return errorResponse(error);

    const product = await db.product.update({
      where: { id },
      data: { ...updateData, slug },
      include: PRODUCT_INCLUDE,
    });

    revalidatePath("/admin/products");
    revalidatePath(`/products/${product.slug}`);
    return successResponse([product]);
  } catch (error) {
    return handleError(error, "Failed to update product");
  }
}

export async function deleteProduct(id: string): Promise<ProductResponse> {
  try {
    const validation = validateId(id);
    const validationError = handleValidationError(validation, errorResponse);
    if (validationError) return validationError;

    const orderCount = await db.orderItem.count({ where: { productId: id } });
    if (orderCount > 0) {
      return errorResponse(
        "Cannot delete product that has been ordered. Consider deactivating instead."
      );
    }

    await db.product.delete({ where: { id } });
    revalidatePath("/admin/products");
    return successResponse([]);
  } catch (error) {
    return handleError(error, "Failed to delete product");
  }
}

// Status management
const updateProductStatus = async (
  id: string,
  updates: Partial<Pick<ProductFormData, "isActive" | "isFeatured" | "stock">>,
  action: string
): Promise<ProductResponse> => {
  try {
    const validation = validateId(id);
    const validationError = handleValidationError(validation, errorResponse);
    if (validationError) return validationError;

    const product = await db.product.update({
      where: { id },
      data: updates,
      include: PRODUCT_INCLUDE,
    });

    revalidatePath("/admin/products");
    return successResponse([product]);
  } catch (error) {
    return handleError(error, `Failed to ${action} product`);
  }
};

export const deactivateProduct = async (id: string) =>
  updateProductStatus(id, { isActive: false }, "deactivate");

export const activateProduct = async (id: string) =>
  updateProductStatus(id, { isActive: true }, "activate");

export async function toggleProductFeatured(
  id: string
): Promise<ProductResponse> {
  try {
    const validation = validateId(id);
    const validationError = handleValidationError(validation, errorResponse);
    if (validationError) return validationError;

    const currentProduct = await db.product.findUnique({
      where: { id },
      select: { isFeatured: true },
    });

    if (!currentProduct) return errorResponse("Product not found");

    return updateProductStatus(
      id,
      { isFeatured: !currentProduct.isFeatured },
      "toggle featured status"
    );
  } catch (error) {
    return handleError(error, "Failed to toggle featured status");
  }
}

export async function updateProductStock(
  id: string,
  stock: number
): Promise<ProductResponse> {
  const idValidation = validateId(id);
  const stockValidation = validateStock(stock);

  const idError = handleValidationError(idValidation, errorResponse);
  if (idError) return idError;

  const stockError = handleValidationError(stockValidation, errorResponse);
  if (stockError) return stockError;

  return updateProductStatus(id, { stock }, "update stock");
}

// Query builders
const buildProductFilters = (
  filters: ProductFilters
): Prisma.ProductWhereInput => {
  const validation = validateProductFilters(filters);
  const validatedFilters = validation.success ? validation.data! : {};

  const where: Prisma.ProductWhereInput = {};

  if (validatedFilters.categoryId)
    where.categoryId = validatedFilters.categoryId;
  if (validatedFilters.isActive !== undefined)
    where.isActive = validatedFilters.isActive;
  if (validatedFilters.isFeatured !== undefined)
    where.isFeatured = validatedFilters.isFeatured;
  if (validatedFilters.inStock) where.stock = { gt: 0 };

  if (validatedFilters.search) {
    where.OR = [
      {
        name: {
          contains: validatedFilters.search,
          mode: "insensitive" as const,
        },
      },
      {
        description: {
          contains: validatedFilters.search,
          mode: "insensitive" as const,
        },
      },
      {
        sku: {
          contains: validatedFilters.search,
          mode: "insensitive" as const,
        },
      },
    ];
  }

  if (
    validatedFilters.minPrice !== undefined ||
    validatedFilters.maxPrice !== undefined
  ) {
    where.price = {};
    if (validatedFilters.minPrice !== undefined)
      where.price.gte = validatedFilters.minPrice;
    if (validatedFilters.maxPrice !== undefined)
      where.price.lte = validatedFilters.maxPrice;
  }

  if (validatedFilters.tags?.length)
    where.tags = { hasSome: validatedFilters.tags };

  return where;
};

// Query functions
export async function getProducts({
  take = 10,
  skip = 0,
  filters = {},
}: {
  take?: number;
  skip?: number;
  filters?: ProductFilters;
}): Promise<ProductResponse> {
  try {
    const paginationValidation = validatePagination({ take, skip });
    const validatedPagination = paginationValidation.success
      ? paginationValidation.data!
      : { take: 10, skip: 0 };

    const where = buildProductFilters(filters);

    const [products, totalCount] = await Promise.all([
      db.product.findMany({
        where,
        include: {
          ...PRODUCT_INCLUDE,
          _count: { select: { reviews: true, orderItems: true } },
        },
        orderBy: { createdAt: "desc" },
        take: validatedPagination.take,
        skip: validatedPagination.skip,
      }),
      db.product.count({ where }),
    ]);

    return successResponse(products, totalCount);
  } catch (error) {
    return handleError(error, "Failed to fetch products");
  }
}

export async function getProductBySlug(slug: string): Promise<ProductResponse> {
  try {
    const validation = validateSlug(slug);
    const validationError = handleValidationError(validation, errorResponse);
    if (validationError) return validationError;

    const product = await db.product.findUnique({
      where: { slug, isActive: true },
      include: DETAILED_PRODUCT_INCLUDE,
    });

    if (!product) return errorResponse("Product not found");
    return successResponse([product]);
  } catch (error) {
    return handleError(error, "Failed to fetch product");
  }
}

export async function searchProducts(
  query: string,
  take = 10,
  skip = 0
): Promise<ProductResponse> {
  try {
    const queryValidation = validateQuery(query);
    const paginationValidation = validatePagination({ take, skip });

    const queryError = handleValidationError(queryValidation, errorResponse);
    if (queryError) return queryError;

    const validatedPagination = paginationValidation.success
      ? paginationValidation.data!
      : { take: 10, skip: 0 };

    const searchQuery = query.trim();
    const where: Prisma.ProductWhereInput = {
      isActive: true,
      OR: [
        { name: { contains: searchQuery, mode: "insensitive" as const } },
        {
          description: { contains: searchQuery, mode: "insensitive" as const },
        },
        {
          shortDescription: {
            contains: searchQuery,
            mode: "insensitive" as const,
          },
        },
        { tags: { hasSome: [searchQuery] } },
        { sku: { contains: searchQuery, mode: "insensitive" as const } },
      ],
    };

    const [products, totalCount] = await Promise.all([
      db.product.findMany({
        where,
        include: PRODUCT_INCLUDE,
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
        take: validatedPagination.take,
        skip: validatedPagination.skip,
      }),
      db.product.count({ where }),
    ]);

    return successResponse(products, totalCount);
  } catch (error) {
    return handleError(error, "Failed to search products");
  }
}

// Specialized queries with proper typing
const getProductsByCondition = async (
  where: Prisma.ProductWhereInput,
  include = PRODUCT_INCLUDE,
  orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" },
  take?: number
): Promise<ProductResponse> => {
  try {
    const products = await db.product.findMany({
      where: { isActive: true, ...where },
      include,
      orderBy,
      ...(take && { take }),
    });
    return successResponse(products);
  } catch (error) {
    return handleError(error, "Failed to fetch products");
  }
};

export const getFeaturedProducts = async () =>
  getProductsByCondition({ isFeatured: true }, undefined, undefined, 4);

export const getBestSellerProducts = async (): Promise<ProductResponse> => {
  try {
    const products = await db.product.findMany({
      where: { isActive: true },
      include: {
        ...PRODUCT_INCLUDE,
        _count: { select: { orderItems: true } },
      },
      orderBy: {
        orderItems: { _count: "desc" },
      },
      take: 8,
    });
    return successResponse(products);
  } catch (error) {
    return handleError(error, "Failed to fetch best seller products");
  }
};

export const getNewProducts = async (take = 4) =>
  getProductsByCondition({}, undefined, { createdAt: "desc" }, take);

export const getProductsByCategory = async (categoryId: string) => {
  const validation = validateId(categoryId);
  return validation.success
    ? getProductsByCondition({ categoryId })
    : errorResponse(validation.error || "Invalid category ID");
};

export const getRelatedProducts = async (
  productId: string,
  categoryId: string,
  take = 4
) => {
  const productIdValidation = validateId(productId);
  const categoryIdValidation = validateId(categoryId);

  if (!productIdValidation.success) {
    return errorResponse(productIdValidation.error || "Invalid product ID");
  }
  if (!categoryIdValidation.success) {
    return errorResponse(categoryIdValidation.error || "Invalid category ID");
  }

  return getProductsByCondition(
    { categoryId, id: { not: productId } },
    undefined,
    undefined,
    take
  );
};

export async function getLowStockProducts(): Promise<ProductResponse> {
  try {
    const products = await db.product.findMany({
      where: {
        isActive: true,
      },
      include: PRODUCT_INCLUDE,
      orderBy: { stock: "asc" },
    });

    // Filter products where stock is below their individual threshold
    const lowStockProducts = products.filter(
      (product) => product.stock <= product.lowStockThreshold
    );

    return successResponse(lowStockProducts);
  } catch (error) {
    return handleError(error, "Failed to fetch low stock products");
  }
}

export async function bulkUpdateProducts(
  productIds: string[],
  updates: Partial<ProductFormData>
): Promise<ProductResponse> {
  try {
    const validation = validateBulkUpdate({ productIds, updates });
    const validationError = handleValidationError(validation, errorResponse);
    if (validationError) return validationError;

    const { productIds: validatedIds, updates: validatedUpdates } =
      validation.data!;

    await db.product.updateMany({
      where: { id: { in: validatedIds } },
      data: validatedUpdates,
    });

    const updatedProducts = await db.product.findMany({
      where: { id: { in: validatedIds } },
      include: PRODUCT_INCLUDE,
    });

    revalidatePath("/admin/products");
    return successResponse(updatedProducts);
  } catch (error) {
    return handleError(error, "Failed to bulk update products");
  }
}

export async function getProductById(id: string): Promise<ProductResponse> {
  try {
    const validation = validateId(id);
    const validationError = handleValidationError(validation, errorResponse);
    if (validationError) return validationError;

    const product = await db.product.findUnique({
      where: { id },
      include: DETAILED_PRODUCT_INCLUDE,
    });

    if (!product) return errorResponse("Product not found");
    return successResponse([product]);
  } catch (error) {
    return handleError(error, "Failed to fetch product");
  }
}

export async function getProductsByCategorySlug(
  slug: string,
  sortOption?: string
): Promise<ProductResponse> {
  try {
    const validation = validateSlug(slug);
    const validationError = handleValidationError(validation, errorResponse);
    if (validationError) return validationError;

    const category = await db.category.findUnique({
      where: { slug, isActive: true },
      include: {
        subcategories: { where: { isActive: true }, select: { id: true } },
      },
    });

    if (!category) return errorResponse("Category not found");

    const categoryIds = [
      category.id,
      ...category.subcategories.map((sub) => sub.id),
    ];

    // Special case for popularity sorting
    if (sortOption === "popular") {
      const products = await db.product.findMany({
        where: {
          isActive: true,
          categoryId: { in: categoryIds },
        },
        include: {
          ...PRODUCT_INCLUDE,
          _count: { select: { orderItems: true } },
        },
        orderBy: {
          orderItems: { _count: "desc" },
        },
      });
      return successResponse(products);
    }

    // Define ordering based on sort option
    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };

    switch (sortOption) {
      case "price-asc":
        orderBy = { price: "asc" };
        break;
      case "price-desc":
        orderBy = { price: "desc" };
        break;
      // popular case is handled separately above
      default:
        // Keep default (newest)
        break;
    }

    return getProductsByCondition(
      { categoryId: { in: categoryIds } },
      undefined,
      orderBy
    );
  } catch (error) {
    return handleError(error, "Failed to fetch products by category slug");
  }
}

export async function getProductsWithLowStock(
  threshold?: number
): Promise<ProductResponse> {
  try {
    const validatedThreshold = threshold && threshold > 0 ? threshold : 5;

    const products = await db.product.findMany({
      where: {
        isActive: true,
        stock: { lte: validatedThreshold },
      },
      include: PRODUCT_INCLUDE,
      orderBy: { stock: "asc" },
    });

    return successResponse(products);
  } catch (error) {
    return handleError(error, "Failed to fetch products with low stock");
  }
}

export async function getOutOfStockProducts(): Promise<ProductResponse> {
  try {
    const products = await db.product.findMany({
      where: {
        isActive: true,
        stock: 0,
      },
      include: PRODUCT_INCLUDE,
      orderBy: { updatedAt: "desc" },
    });

    return successResponse(products);
  } catch (error) {
    return handleError(error, "Failed to fetch out of stock products");
  }
}

export async function getProductsByPriceRange(
  minPrice: number,
  maxPrice: number,
  take = 10,
  skip = 0
): Promise<ProductResponse> {
  try {
    const priceValidation = validatePriceRange(minPrice, maxPrice);
    const priceError = handleValidationError(priceValidation, errorResponse);
    if (priceError) return priceError;

    const paginationValidation = validatePagination({ take, skip });
    const validatedPagination = paginationValidation.success
      ? paginationValidation.data!
      : { take: 10, skip: 0 };

    const where: Prisma.ProductWhereInput = {
      isActive: true,
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
    };

    const [products, totalCount] = await Promise.all([
      db.product.findMany({
        where,
        include: PRODUCT_INCLUDE,
        orderBy: { price: "asc" },
        take: validatedPagination.take,
        skip: validatedPagination.skip,
      }),
      db.product.count({ where }),
    ]);

    return successResponse(products, totalCount);
  } catch (error) {
    return handleError(error, "Failed to fetch products by price range");
  }
}
