"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Eye } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  comparePrice?: number | null;
  imageSrc: string;
  category: string;
  slug: string;
}

const ProductCard = ({
  id,
  name,
  price,
  comparePrice,
  imageSrc,
  category,
  slug,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const discount = comparePrice
    ? Math.round((1 - price / comparePrice) * 100)
    : null;

  return (
    <div
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-64 w-full overflow-hidden">
        {/* Placeholder for actual image */}
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          {/* Replace with actual Image component when you have images */}
          {/* <Image 
            src={imageSrc}
            alt={name}
            fill
            className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          /> */}
          <div className="text-gray-400">Image Produit</div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-gray-900/80 text-white text-xs px-2 py-1 rounded">
            {category}
          </span>
        </div>

        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
              -{discount}%
            </span>
          </div>
        )}

        {/* Quick Action Buttons */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm py-3 px-4 flex justify-between items-center transform transition-transform duration-300 ${isHovered ? "translate-y-0" : "translate-y-full"}`}
        >
          <button className="text-gray-700 hover:text-amber-700 transition-colors">
            <Heart size={20} />
          </button>
          <button className="text-gray-700 hover:text-amber-700 transition-colors">
            <ShoppingCart size={20} />
          </button>
          <button className="text-gray-700 hover:text-amber-700 transition-colors">
            <Eye size={20} />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <Link href={`/products/${slug}`} className="block">
          <h3 className="text-gray-800 font-medium text-lg mb-1 hover:text-amber-700 transition-colors">
            {name}
          </h3>
        </Link>

        <div className="flex items-center mt-1">
          <span className="text-amber-700 font-medium">
            {price.toFixed(2)} €
          </span>
          {comparePrice && (
            <span className="ml-2 text-gray-500 text-sm line-through">
              {comparePrice.toFixed(2)} €
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
