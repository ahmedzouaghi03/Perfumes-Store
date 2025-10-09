
import { Suspense } from "react";
import ProductCard from "@/components/home/ProductCard";
import { getProductsByCategorySlug } from "@/actions/productActions";

async function MenDupesList() {
  // Assuming you have a category ID for men's dupes
  const menDupesCategoryId = "your-men-dupes-category-id"; // replace with actual ID

  // This would need to be implemented in your productActions.ts
  const response = await getProductsByCategorySlug("mens-dupes");

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
          category="Dupe"
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

const MenDupes = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <Suspense fallback={<ProductSkeleton />}>
              <MenDupesList />
            </Suspense>
          </div>

          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-gray-100 rounded-lg p-8 h-full flex flex-col justify-between">
              <div>
                <span className="text-blue-700 text-sm uppercase tracking-wider font-medium">
                  Collection Homme
                </span>
                <h3 className="text-3xl font-serif mb-4">
                  Meilleurs Dupes pour Homme
                </h3>
                <p className="text-gray-700 mb-6">
                  Des parfums masculins puissants inspirés par les plus grandes
                  marques, conçus pour l'homme moderne qui ne fait aucun
                  compromis sur la qualité.
                </p>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-blue-700 mr-2"></span>
                    <span>Notes boisées exclusives</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-blue-700 mr-2"></span>
                    <span>Projection exceptionnelle</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-blue-700 mr-2"></span>
                    <span>Fragrances durables</span>
                  </li>
                </ul>
              </div>

              <a
                href="/collections/men-dupes"
                className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 text-center"
              >
                Découvrir la Collection
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenDupes;
