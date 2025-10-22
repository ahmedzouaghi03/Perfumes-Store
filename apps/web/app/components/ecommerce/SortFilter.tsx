"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { SortFilterProps } from "@/types";

export default function SortFilter({
  options = [
    { value: "newest", label: "Plus récents" },
    { value: "price-asc", label: "Prix croissant" },
    { value: "price-desc", label: "Prix décroissant" },
    { value: "popular", label: "Popularité" },
  ],
  defaultValue = "newest",
  className = "",
}: SortFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Get current sort value from URL or use default
  const currentSort = searchParams.get("sort") || defaultValue;

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    startTransition(() => {
      // Create new URLSearchParams with all existing parameters
      const params = new URLSearchParams(searchParams);

      // Update or add sort parameter
      if (value === defaultValue) {
        params.delete("sort"); // Remove parameter if it's the default
      } else {
        params.set("sort", value);
      }

      // Update URL while preserving existing parameters
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className={className}>
      <select
        className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
        value={currentSort}
        onChange={handleSortChange}
        disabled={isPending}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
