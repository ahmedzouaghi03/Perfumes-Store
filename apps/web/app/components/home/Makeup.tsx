
import { Suspense } from "react";
import ProductCard from "@/components/home/ProductCard";
import { getProductsByCategorySlug } from "@/actions/productActions";

async function MakeupList() {
  // Assuming you have a category ID for makeup
  const makeupCategoryId = "your-makeup-category-id"; // replace with actual ID

  // This would need to be implemented in your productActions.ts
  const response = await getProductsByCategorySlug("makeup");

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
          category="Maquillage"
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

const Makeup = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-rose-600 text-sm uppercase tracking-wider font-medium">
              Beauté
            </span>
            <h2 className="text-3xl font-serif text-gray-900">
              Collection Maquillage
            </h2>
          </div>
          <a
            href="/collections/makeup"
            className="text-rose-600 hover:text-rose-700 font-medium transition-colors"
          >
            Voir Tout
          </a>
        </div>

        <Suspense fallback={<ProductSkeleton />}>
          <MakeupList />
        </Suspense>

        <div className="mt-12 bg-gradient-to-r from-rose-100 to-purple-100 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-serif mb-4">Complétez Votre Look</h3>
              <p className="text-gray-700 mb-6">
                Notre collection de maquillage est parfaitement assortie à nos
                parfums, vous permettant de créer un look et une signature
                olfactive cohérents.
              </p>
              <a
                href="/collections/makeup"
                className="inline-block bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
              >
                Explorer la Collection
              </a>
            </div>

            <div className="relative h-64 rounded-lg overflow-hidden">
              {/* Placeholder for actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-300 to-purple-300 flex items-center justify-center">
                <span className="text-white text-xl">Image Maquillage</span>
              </div>
              {/* <Image 
                src="/images/makeup-collection.jpg"
                alt="Collection de maquillage"
                fill
                className="object-cover"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Makeup;
