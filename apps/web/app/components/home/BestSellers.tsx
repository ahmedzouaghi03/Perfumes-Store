
import { Suspense } from "react";
import ProductCard from "@/components/home/ProductCard";
import { getBestSellerProducts } from "@/actions/productActions";

// Server Component to fetch best sellers
async function BestSellersList() {
  // This would need to be implemented in your productActions.ts
  const response = await getBestSellerProducts();

  const products = response.success ? response.products : [];

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Aucun produit disponible pour le moment</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={parseFloat(product.price.toString())}
          comparePrice={
            product.comparePrice
              ? parseFloat(product.comparePrice.toString())
              : null
          }
          imageSrc={product.images[0]?.url || "/images/placeholder.jpg"}
          category="Parfum" // You may want to get the actual category name
          slug={product.slug}
        />
      ))}
    </div>
  );
}

// Placeholder Skeleton for loading state
function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse"
          >
            <div className="h-64 w-full bg-gray-200"></div>
            <div className="p-4">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
    </div>
  );
}

const BestSellers = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-amber-700 text-sm uppercase tracking-wider font-medium">
              Les plus populaires
            </span>
            <h2 className="text-3xl font-serif text-gray-900">
              Meilleures Ventes
            </h2>
          </div>
          <a
            href="/collections/best-sellers"
            className="text-amber-700 hover:text-amber-800 font-medium transition-colors"
          >
            Voir Tout
          </a>
        </div>

        <Suspense fallback={<ProductSkeleton />}>
          <BestSellersList />
        </Suspense>
      </div>
    </section>
  );
};

export default BestSellers;
