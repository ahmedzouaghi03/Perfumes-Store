// Product related interfaces
export interface ProductImage {
  id: string;
  url: string;
  sortOrder: number;
  createdAt: Date;
  isDeleted: boolean;
  productId: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price: number; // Will need conversion from Decimal
  stock: number;
  sku: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null; // Changed to match Prisma
  image: string | null; // Changed to match Prisma
  parentId: string | null; // Changed to match Prisma
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  rating: number;
  title: string | null; // Changed to match Prisma
  comment: string | null; // Changed to match Prisma
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  productId: string;
  user: {
    name: string | null;
  };
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null; // Changed to match Prisma
  shortDescription: string | null; // Changed to match Prisma
  price: number; // Will need conversion from Decimal
  comparePrice: number | null; // Changed to match Prisma
  sku: string;
  stock: number;
  lowStockThreshold: number;
  isActive: boolean;
  isFeatured: boolean;
  metaTitle: string | null; // Changed to match Prisma
  metaDescription: string | null; // Changed to match Prisma
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;

  // Relations
  category: Category;
  images: ProductImage[];
  variants: ProductVariant[];
  reviews?: Review[];

  // Counts (for detailed queries)
  _count?: {
    reviews: number;
    orderItems: number;
  };
}

// Response interface with proper typing
export interface ProductResponse {
  success: boolean;
  products: Product[];
  error?: string;
  totalCount?: number;
}

// Keep form interfaces with optional for easier form handling
export interface ProductFormData {
  name: string;
  description?: string;
  shortDescription?: string;
  price: number;
  comparePrice?: number;
  sku: string;
  stock: number;
  lowStockThreshold?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  categoryId: string;
}

export interface ProductUpdateData extends Partial<ProductFormData> {
  id: string;
}

export interface ProductFilters {
  categoryId?: string;
  search?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  inStock?: boolean;
}
