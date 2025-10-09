
import { Suspense } from "react";
import ProductCard from "@/components/home/ProductCard";
import { getProductsByCategorySlug } from "@/actions/productActions";

async function FirstCopiesList() {
  // Assuming you have a category ID for first copies
  const firstCopiesCategoryId = "your-first-copies-category-id"; // replace with actual ID

  // This would need to be implemented in your productActions.ts
  const response = await getProductsByCategorySlug("first-copies");

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
      {products.slice(0, 4).map((product) => (
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
          category="Première Copie"
          slug={product.slug}
        />
      ))}
    </div>
  );
}

// Product skeleton similar to previous components
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

const FirstCopies = () => {
  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-700 text-sm uppercase tracking-wider font-medium">
            Collection de Luxe
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            Premières Copies
          </h2>
          <p className="text-gray-600">
            Nos premières copies sont méticuleusement élaborées pour reproduire
            fidèlement l'essence et la qualité des parfums de luxe les plus
            prestigieux du marché, à une fraction du prix.
          </p>
        </div>

        <Suspense fallback={<ProductSkeleton />}>
          <FirstCopiesList />
        </Suspense>

        <div className="mt-10 text-center">
          <a
            href="/collections/first-copies"
            className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-md font-medium transition-colors duration-300"
          >
            Voir Toute la Collection
          </a>
        </div>
      </div>
    </section>
  );
};

export default FirstCopies;
