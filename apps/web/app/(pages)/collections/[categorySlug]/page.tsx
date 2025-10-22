import { Suspense } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/home/ProductCard";
import { getProductsByCategorySlug } from "@/actions/productActions";
import { db } from "@monkeyprint/db";
import SortFilter from "@/components/ecommerce/SortFilter";

// Loading component for products
function ProductsLoading() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(8)
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

// Server component to fetch and display products
async function CategoryProducts({
  slug,
  sortOption,
}: {
  slug: string;
  sortOption?: string;
}) {
  const response = await getProductsByCategorySlug(slug, sortOption);

  if (!response.success || response.products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">
          Aucun produit trouvé dans cette catégorie.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {response.products.map((product) => (
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
          category={product.category.name}
          slug={product.slug}
        />
      ))}
    </div>
  );
}

// Get category information for heading
async function getCategoryInfo(slug: string) {
  const category = await db.category.findUnique({
    where: {
      slug,
      isActive: true,
    },
  });

  return category;
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { categorySlug: string };
  searchParams: { sort?: string };
}) {
  const { categorySlug } = params;
  const { sort } = searchParams;
  const categoryInfo = await getCategoryInfo(categorySlug);

  // If category doesn't exist, show 404
  if (!categoryInfo) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
              {categoryInfo.name}
            </h1>
            {categoryInfo.description && (
              <p className="text-gray-600 max-w-3xl mx-auto">
                {categoryInfo.description}
              </p>
            )}
          </div>

          <div className="mb-8 flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-500">
                Affichage des produits
              </span>
            </div>
            <SortFilter />
          </div>

          <Suspense fallback={<ProductsLoading />}>
            <CategoryProducts slug={categorySlug} sortOption={sort} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
