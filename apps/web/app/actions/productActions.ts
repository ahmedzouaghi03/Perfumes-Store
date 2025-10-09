"use server";

import { db } from "@monkeyprint/db";

// Types based on your schema
type ProductResponse = {
  success: boolean;
  products: any[];
  error?: string;
};

type PaginationProps = {
  take: number;
  skip: number;
};

// Get best seller products for homepage
export async function getBestSellerProducts(): Promise<ProductResponse> {
  try {
    // In a real app, you would sort by sales count or another metric
    // This is a simplified version
    const products = await db.product.findMany({
      where: {
        isActive: true,
      },
      include: {
        images: true,
        category: true,
      },
      orderBy: {
        // You'd probably want to order by sales count in a real app
        createdAt: "desc",
      },
      take: 8,
    });

    return {
      success: true,
      products,
    };
  } catch (error) {
    console.error("Error fetching best seller products:", error);
    return {
      success: false,
      products: [],
      error: "Failed to fetch best seller products",
    };
  }
}

// Get featured products for homepage
export async function getFeaturedProducts(): Promise<ProductResponse> {
  try {
    const products = await db.product.findMany({
      where: {
        isActive: true,
        isFeatured: true,
      },
      include: {
        images: true,
        category: true,
      },
      take: 4,
    });

    return {
      success: true,
      products,
    };
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return {
      success: false,
      products: [],
      error: "Failed to fetch featured products",
    };
  }
}

// Get products by category
export async function getProductsByCategory(
  categoryId: string
): Promise<ProductResponse> {
  try {
    if (!categoryId) {
      return {
        success: false,
        products: [],
        error: "Category ID is required",
      };
    }

    const products = await db.product.findMany({
      where: {
        isActive: true,
        categoryId: categoryId,
      },
      include: {
        images: true,
        category: true,
      },
      take: 8,
    });

    return {
      success: true,
      products,
    };
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return {
      success: false,
      products: [],
      error: "Failed to fetch products by category",
    };
  }
}

// Get products by category slug
export async function getProductsByCategorySlug(
  slug: string
): Promise<ProductResponse> {
  try {
    if (!slug) {
      return {
        success: false,
        products: [],
        error: "Category slug is required",
      };
    }

    const category = await db.category.findUnique({
      where: {
        slug: slug,
        isActive: true,
      },
      include: {
        subcategories: {
          where: {
            isActive: true,
          },
          select: {
            id: true,
          },
        },
      },
    });

    if (!category) {
      return {
        success: false,
        products: [],
        error: "Category not found",
      };
    }

    // Get IDs of the category and all its subcategories
    const categoryIds = [
      category.id,
      ...category.subcategories.map((sub) => sub.id),
    ];

    const products = await db.product.findMany({
      where: {
        isActive: true,
        categoryId: {
          in: categoryIds,
        },
      },
      include: {
        images: true,
        category: true,
      },
      take: 8,
    });

    return {
      success: true,
      products,
    };
  } catch (error) {
    console.error("Error fetching products by category slug:", error);
    return {
      success: false,
      products: [],
      error: "Failed to fetch products by category slug",
    };
  }
}

// Get new arrivals
export async function getNewProducts({
  take = 4,
  skip = 0,
}: PaginationProps): Promise<ProductResponse> {
  try {
    const products = await db.product.findMany({
      where: {
        isActive: true,
      },
      include: {
        images: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take,
      skip,
    });

    return {
      success: true,
      products,
    };
  } catch (error) {
    console.error("Error fetching new products:", error);
    return {
      success: false,
      products: [],
      error: "Failed to fetch new products",
    };
  }
}

// Get product by ID
export async function getProductById(id: string): Promise<ProductResponse> {
  try {
    if (!id) {
      return {
        success: false,
        products: [],
        error: "Product ID is required",
      };
    }

    const product = await db.product.findUnique({
      where: {
        id,
        isActive: true,
      },
      include: {
        images: true,
        category: true,
        variants: true,
      },
    });

    if (!product) {
      return {
        success: false,
        products: [],
        error: "Product not found",
      };
    }

    return {
      success: true,
      products: [product],
    };
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return {
      success: false,
      products: [],
      error: "Failed to fetch product",
    };
  }
}
