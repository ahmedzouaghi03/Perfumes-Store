
import { Suspense } from "react";
import ProductCard from "@/components/home/ProductCard";
import { getProductsByCategorySlug } from "@/actions/productActions";

async function BrumesList() {
  // Assuming you have a category ID for brumes (fragrance mists)
  const brumesCategoryId = "your-brumes-category-id"; // replace with actual ID

  // This would need to be implemented in your productActions.ts
  const response = await getProductsByCategorySlug("brumes");

  const products = response.success ? response.products : [];

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Aucun produit disponible pour le moment</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.slice(0, 3).map((product) => (
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
          category="Brume"
          slug={product.slug}
        />
      ))}
    </div>
  );
}

// Product skeleton similar to previous components
function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(3)
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

const Brumes = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-blue-600 text-sm uppercase tracking-wider font-medium">
            Fraîcheur quotidienne
          </span>
          <h2 className="text-3xl font-serif text-gray-900 mb-4">
            Brumes Parfumées
          </h2>
          <p className="text-gray-600">
            Légères et rafraîchissantes, nos brumes parfumées sont parfaites
            pour une utilisation quotidienne, offrant une touche délicate de
            parfum qui vous accompagnera tout au long de la journée.
          </p>
        </div>

        <Suspense fallback={<ProductSkeleton />}>
          <BrumesList />
        </Suspense>

        <div className="mt-10 text-center">
          <a
            href="/collections/brumes"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors duration-300"
          >
            Découvrir Toutes les Brumes
          </a>
        </div>
      </div>
    </section>
  );
};

export default Brumes;
