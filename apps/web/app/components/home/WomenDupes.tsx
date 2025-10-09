
import { Suspense } from "react";
import ProductCard from "@/components/home/ProductCard";
import { getProductsByCategorySlug } from "@/actions/productActions";

async function WomenDupesList() {
  // Assuming you have a category ID for women's dupes
  const womenDupesCategoryId = "your-women-dupes-category-id"; // replace with actual ID

  // This would need to be implemented in your productActions.ts
  const response = await getProductsByCategorySlug("women-dupes");

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

const WomenDupes = () => {
  return (
    <section className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <span className="text-pink-600 text-sm uppercase tracking-wider font-medium">
              Collection Femme
            </span>
            <h2 className="text-3xl font-serif text-gray-900">
              Meilleurs Dupes pour Femme
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Inspiré par les grandes marques
            </span>
            <a
              href="/collections/women-dupes"
              className="text-pink-600 hover:text-pink-700 font-medium transition-colors"
            >
              Voir Tout
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-pink-100 rounded-lg p-8 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-serif mb-4">
                  Parfums de Luxe, Prix Accessibles
                </h3>
                <p className="text-gray-700 mb-6">
                  Découvrez notre collection exclusive de parfums inspirés par
                  les plus grandes marques de luxe, mais à des prix qui vous
                  feront sourire.
                </p>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-pink-500 mr-2"></span>
                    <span>Longue tenue garantie</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-pink-500 mr-2"></span>
                    <span>Ingrédients de qualité</span>
                  </li>
                  <li className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-pink-500 mr-2"></span>
                    <span>Fragrances identiques</span>
                  </li>
                </ul>
              </div>

              <a
                href="/collections/women-dupes"
                className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 text-center"
              >
                Découvrir la Collection
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Suspense fallback={<ProductSkeleton />}>
              <WomenDupesList />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WomenDupes;
