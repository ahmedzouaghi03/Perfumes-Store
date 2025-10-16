// packages/utils/zod.ts
import * as z from "zod";

export const RoleEnum = z.enum(["SUPER_ADMIN", "ADMIN"]);

// Define a schema for input validation
export const registerSchema = z.object({
  name: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
  role: RoleEnum,
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
  image: z.string().optional(),
});

import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters"),
});

// Product validation schemas
export const productCreateSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  price: z.number().positive("Price must be a positive number"),
  comparePrice: z.number().positive().optional(),
  sku: z.string().min(1, "SKU is required").max(100),
  stock: z.number().int().nonnegative("Stock cannot be negative").default(0),
  lowStockThreshold: z.number().int().positive().default(3),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  tags: z.array(z.string()).default([]),
  categoryId: z.string().min(1, "Category is required"),
});

export const productUpdateSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required").max(255).optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  price: z.number().positive("Price must be a positive number").optional(),
  comparePrice: z.number().positive().optional(),
  sku: z.string().min(1, "SKU is required").max(100).optional(),
  stock: z.number().int().nonnegative("Stock cannot be negative").optional(),
  lowStockThreshold: z.number().int().positive().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  tags: z.array(z.string()).optional(),
  categoryId: z.string().min(1, "Category is required").optional(),
});

// Common validation schemas
export const idSchema = z.string().min(1, "ID is required");
export const slugSchema = z.string().min(1, "Slug is required");
export const stockSchema = z
  .number()
  .int()
  .nonnegative("Stock cannot be negative");
export const searchQuerySchema = z
  .string()
  .min(2, "Search query must be at least 2 characters long");
export const priceSchema = z.number().positive("Price must be positive");
export const emailSchema = z.string().email("Invalid email format");

// Product filters schema
export const productFiltersSchema = z.object({
  categoryId: z.string().optional(),
  search: z.string().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  tags: z.array(z.string()).optional(),
  inStock: z.boolean().optional(),
});

// Pagination schema
export const paginationSchema = z.object({
  take: z.number().int().positive().max(100).default(10),
  skip: z.number().int().nonnegative().default(0),
});

// Bulk operations schema
export const bulkProductUpdateSchema = z.object({
  productIds: z
    .array(z.string().min(1))
    .min(1, "At least one product must be selected"),
  updates: productCreateSchema.partial().omit({ categoryId: true }),
});
