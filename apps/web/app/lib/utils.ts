import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  idSchema,
  slugSchema,
  stockSchema,
  searchQuerySchema,
  productCreateSchema,
  productUpdateSchema,
  productFiltersSchema,
  paginationSchema,
  bulkProductUpdateSchema,
} from "@monkeyprint/utils/zod";
import {
  ProductResponse,
  ProductFormData,
  ProductUpdateData,
  ProductFilters,
} from "@/types";

// Validation result type
type ValidationResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generic validator function using Zod from packages/utils
export const validateData = <T>(
  schema: any, // Using any since we're importing from external package
  data: unknown
): ValidationResult<T> => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error: any) {
    if (error?.errors && error.errors.length > 0) {
      const firstError = error.errors[0];
      return {
        success: false,
        error: firstError?.message || "Validation failed",
      };
    }
    return { success: false, error: "Validation failed" };
  }
};

// Helper function to check if validation failed and return error response
export const handleValidationError = <T>(
  validation: ValidationResult<T>,
  errorResponseFn: (error: string) => any
) => {
  if (!validation.success) {
    return errorResponseFn(validation.error || "Validation failed");
  }
  return null;
};

// Utility functions
export const generateSlug = (name: string): string => {
  // Validate input first using the name validation from productCreateSchema
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return "";
  }

  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const handleError = (error: any, message: string): ProductResponse => {
  console.error(message, error);
  return { success: false, products: [], error: message };
};

export const successResponse = (
  products: any[],
  totalCount?: number
): ProductResponse => ({
  success: true,
  products,
  ...(totalCount !== undefined && { totalCount }),
});

export const errorResponse = (error: string): ProductResponse => ({
  success: false,
  products: [],
  error,
});

// Zod-based validation helpers using schemas from packages/utils
export const validateId = (id: string): ValidationResult<string> =>
  validateData(idSchema, id);

export const validateSlug = (slug: string): ValidationResult<string> =>
  validateData(slugSchema, slug);

export const validateStock = (stock: number): ValidationResult<number> =>
  validateData(stockSchema, stock);

export const validateQuery = (query: string): ValidationResult<string> =>
  validateData(searchQuerySchema, query);

export const validateProductCreate = (
  data: unknown
): ValidationResult<ProductFormData> => validateData(productCreateSchema, data);

export const validateProductUpdate = (
  data: unknown
): ValidationResult<ProductUpdateData> =>
  validateData(productUpdateSchema, data);

export const validateProductFilters = (
  filters: unknown
): ValidationResult<ProductFilters> =>
  validateData(productFiltersSchema, filters);

export const validatePagination = (
  pagination: unknown
): ValidationResult<any> => validateData(paginationSchema, pagination);

export const validateBulkUpdate = (data: unknown): ValidationResult<any> =>
  validateData(bulkProductUpdateSchema, data);
