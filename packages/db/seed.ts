import { db } from "./index";

async function main() {
  console.log("Starting database seed...");

  console.log("Cleaning up existing data...");
  await db.orderStatusHistory.deleteMany({});
  await db.orderCoupon.deleteMany({});
  await db.orderItem.deleteMany({});
  await db.order.deleteMany({});
  await db.review.deleteMany({});
  await db.cartItem.deleteMany({});
  await db.wishlistItem.deleteMany({});
  await db.productVariant.deleteMany({});
  await db.productImage.deleteMany({});
  await db.product.deleteMany({});
  await db.category.deleteMany({}); // Delete all categories last
  console.log("Database cleaned");

  // Create parent categories
  const fragranceCategory = await db.category.create({
    data: {
      name: "Fragrances",
      slug: "fragrances",
      description: "Luxury perfumes and colognes",
      isActive: true,
    },
  });

  // Create subcategories
  const menCategory = await db.category.create({
    data: {
      name: "Men's Fragrances",
      slug: "mens-fragrances",
      description: "Fragrances for men",
      parentId: fragranceCategory.id,
      isActive: true,
    },
  });

  const womenCategory = await db.category.create({
    data: {
      name: "Women's Fragrances",
      slug: "womens-fragrances",
      description: "Fragrances for women",
      parentId: fragranceCategory.id,
      isActive: true,
    },
  });

  const brumesCategory = await db.category.create({
    data: {
      name: "Brumes",
      slug: "brumes",
      description: "Light body mists and sprays",
      parentId: fragranceCategory.id,
      isActive: true,
    },
  });

  const makeupCategory = await db.category.create({
    data: {
      name: "Makeup",
      slug: "makeup",
      description: "Beauty and cosmetic products",
      isActive: true,
    },
  });

  const dupeCategory = await db.category.create({
    data: {
      name: "Dupes",
      slug: "dupes",
      description: "Inspired by designer fragrances",
      parentId: fragranceCategory.id,
      isActive: true,
    },
  });

  const menDupesCategory = await db.category.create({
    data: {
      name: "Men's Dupes",
      slug: "mens-dupes",
      description: "Men's fragrances inspired by designer brands",
      parentId: dupeCategory.id,
      isActive: true,
    },
  });

  const womenDupesCategory = await db.category.create({
    data: {
      name: "Women's Dupes",
      slug: "womens-dupes",
      description: "Women's fragrances inspired by designer brands",
      parentId: dupeCategory.id,
      isActive: true,
    },
  });

  const firstCopiesCategory = await db.category.create({
    data: {
      name: "First Copies",
      slug: "first-copies",
      description: "Premium quality replicas of designer fragrances",
      parentId: fragranceCategory.id,
      isActive: true,
    },
  });

  console.log("Categories created successfully");

  // ----- BESTSELLERS (5 products) -----
  const bestSellers = [
    {
      name: "Ocean Breeze",
      slug: "ocean-breeze",
      description: "A fresh aquatic scent with notes of sea salt and citrus",
      shortDescription: "Fresh aquatic scent",
      price: 89.99,
      comparePrice: 119.99,
      sku: "BS-001",
      stock: 25,
      isActive: true,
      isFeatured: true,
      categoryId: menCategory.id,
      tags: ["bestseller", "popular", "summer"],
      images: [
        {
          url: "https://utfs.io/f/3ca6eb31-c2e2-43a5-b1a1-98b8537dc38a-1u9nrd.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "50ml",
          value: "50",
          price: 89.99,
          stock: 15,
          sku: "BS-001-50",
        },
        {
          name: "100ml",
          value: "100",
          price: 149.99,
          stock: 10,
          sku: "BS-001-100",
        },
      ],
    },
    {
      name: "Midnight Rose",
      slug: "midnight-rose",
      description:
        "An elegant floral scent with notes of rose, jasmine and amber",
      shortDescription: "Elegant floral scent",
      price: 119.99,
      comparePrice: 159.99,
      sku: "BS-002",
      stock: 18,
      isActive: true,
      isFeatured: true,
      categoryId: womenCategory.id,
      tags: ["bestseller", "premium", "romantic"],
      images: [
        {
          url: "https://utfs.io/f/3e76c030-d8e0-4ead-a80c-1c3c63d56eaa-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "30ml",
          value: "30",
          price: 79.99,
          stock: 20,
          sku: "BS-002-30",
        },
        {
          name: "50ml",
          value: "50",
          price: 119.99,
          stock: 15,
          sku: "BS-002-50",
        },
      ],
    },
    {
      name: "Cedar & Spice",
      slug: "cedar-spice",
      description: "A warm woody fragrance with spicy undertones",
      shortDescription: "Warm woody fragrance",
      price: 94.99,
      comparePrice: 124.99,
      sku: "BS-003",
      stock: 22,
      isActive: true,
      isFeatured: true,
      categoryId: menCategory.id,
      tags: ["bestseller", "winter", "woody"],
      images: [
        {
          url: "https://utfs.io/f/7e9c3252-a35a-46ec-a0c9-2ed0362f7da9-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "50ml",
          value: "50",
          price: 94.99,
          stock: 12,
          sku: "BS-003-50",
        },
        {
          name: "100ml",
          value: "100",
          price: 164.99,
          stock: 10,
          sku: "BS-003-100",
        },
      ],
    },
    {
      name: "Vanilla Dreams",
      slug: "vanilla-dreams",
      description: "A sweet vanilla fragrance with hints of caramel and musk",
      shortDescription: "Sweet vanilla fragrance",
      price: 84.99,
      comparePrice: 109.99,
      sku: "BS-004",
      stock: 30,
      isActive: true,
      isFeatured: true,
      categoryId: womenCategory.id,
      tags: ["bestseller", "sweet", "casual"],
      images: [
        {
          url: "https://utfs.io/f/8d9a6a2e-09d5-4517-b9cb-08f51af1feaa-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "30ml",
          value: "30",
          price: 64.99,
          stock: 15,
          sku: "BS-004-30",
        },
        {
          name: "50ml",
          value: "50",
          price: 84.99,
          stock: 15,
          sku: "BS-004-50",
        },
      ],
    },
    {
      name: "Citrus Burst",
      slug: "citrus-burst",
      description: "An energizing blend of lemon, lime, and bergamot",
      shortDescription: "Energizing citrus blend",
      price: 79.99,
      comparePrice: 99.99,
      sku: "BS-005",
      stock: 40,
      isActive: true,
      isFeatured: true,
      categoryId: menCategory.id,
      tags: ["bestseller", "summer", "fresh"],
      images: [
        {
          url: "https://utfs.io/f/9c1a6b3d-0ae5-4528-c0da-19f62be1fbbb-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "50ml",
          value: "50",
          price: 79.99,
          stock: 20,
          sku: "BS-005-50",
        },
        {
          name: "100ml",
          value: "100",
          price: 129.99,
          stock: 20,
          sku: "BS-005-100",
        },
      ],
    },
  ];

  for (const productData of bestSellers) {
    await createProduct(productData);
  }
  console.log("Best seller products created successfully");

  // ----- BRUMES (5 products) -----
  const brumes = [
    {
      name: "Ocean Mist",
      slug: "ocean-mist",
      description: "A light refreshing body mist with ocean notes",
      shortDescription: "Refreshing ocean mist",
      price: 39.99,
      comparePrice: 49.99,
      sku: "BM-001",
      stock: 35,
      isActive: true,
      categoryId: brumesCategory.id,
      tags: ["brume", "body mist", "summer"],
      images: [
        {
          url: "https://utfs.io/f/a1b2c3d4-1a2b-3c4d-5e6f-7g8h9i0j1k2l-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "100ml",
          value: "100",
          price: 39.99,
          stock: 20,
          sku: "BM-001-100",
        },
        {
          name: "200ml",
          value: "200",
          price: 59.99,
          stock: 15,
          sku: "BM-001-200",
        },
      ],
    },
    {
      name: "Rose Petals",
      slug: "rose-petals",
      description: "Delicate rose water body mist for all-day freshness",
      shortDescription: "Rose water body mist",
      price: 42.99,
      comparePrice: 52.99,
      sku: "BM-002",
      stock: 30,
      isActive: true,
      categoryId: brumesCategory.id,
      tags: ["brume", "floral", "feminine"],
      images: [
        {
          url: "https://utfs.io/f/b2c3d4e5-2b3c-4d5e-6f7g-8h9i0j1k2l3-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "100ml",
          value: "100",
          price: 42.99,
          stock: 15,
          sku: "BM-002-100",
        },
        {
          name: "200ml",
          value: "200",
          price: 62.99,
          stock: 15,
          sku: "BM-002-200",
        },
      ],
    },
    {
      name: "Lavender Fields",
      slug: "lavender-fields",
      description: "Calming lavender body mist perfect for evening use",
      shortDescription: "Calming lavender mist",
      price: 38.99,
      comparePrice: 48.99,
      sku: "BM-003",
      stock: 40,
      isActive: true,
      categoryId: brumesCategory.id,
      tags: ["brume", "relaxing", "night"],
      images: [
        {
          url: "https://utfs.io/f/c3d4e5f6-3c4d-5e6f-7g8h-9i0j1k2l3m4-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "100ml",
          value: "100",
          price: 38.99,
          stock: 20,
          sku: "BM-003-100",
        },
        {
          name: "200ml",
          value: "200",
          price: 58.99,
          stock: 20,
          sku: "BM-003-200",
        },
      ],
    },
    {
      name: "Coconut Paradise",
      slug: "coconut-paradise",
      description: "Tropical coconut body mist with hints of vanilla",
      shortDescription: "Tropical coconut mist",
      price: 40.99,
      comparePrice: 50.99,
      sku: "BM-004",
      stock: 25,
      isActive: true,
      categoryId: brumesCategory.id,
      tags: ["brume", "tropical", "sweet"],
      images: [
        {
          url: "https://utfs.io/f/d4e5f6g7-4d5e-6f7g-8h9i-0j1k2l3m4n5-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "100ml",
          value: "100",
          price: 40.99,
          stock: 15,
          sku: "BM-004-100",
        },
        {
          name: "200ml",
          value: "200",
          price: 60.99,
          stock: 10,
          sku: "BM-004-200",
        },
      ],
    },
    {
      name: "Cucumber Fresh",
      slug: "cucumber-fresh",
      description: "Refreshing cucumber and melon body mist",
      shortDescription: "Cool cucumber mist",
      price: 36.99,
      comparePrice: 46.99,
      sku: "BM-005",
      stock: 35,
      isActive: true,
      categoryId: brumesCategory.id,
      tags: ["brume", "fresh", "summer"],
      images: [
        {
          url: "https://utfs.io/f/e5f6g7h8-5e6f-7g8h-9i0j-1k2l3m4n5o6-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "100ml",
          value: "100",
          price: 36.99,
          stock: 20,
          sku: "BM-005-100",
        },
        {
          name: "200ml",
          value: "200",
          price: 56.99,
          stock: 15,
          sku: "BM-005-200",
        },
      ],
    },
  ];

  for (const productData of brumes) {
    await createProduct(productData);
  }
  console.log("Brumes products created successfully");

  // ----- MAKEUP (5 products) -----
  const makeup = [
    {
      name: "Rose Gold Lipstick",
      slug: "rose-gold-lipstick",
      description: "Creamy matte lipstick in a versatile rose gold shade",
      shortDescription: "Matte rose gold lipstick",
      price: 24.99,
      comparePrice: 29.99,
      sku: "MU-001",
      stock: 50,
      isActive: true,
      categoryId: makeupCategory.id,
      tags: ["makeup", "lipstick", "matte"],
      images: [
        {
          url: "https://utfs.io/f/f6g7h8i9-6f7g-8h9i-0j1k-2l3m4n5o6p7-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "Rose Gold",
          value: "Rose Gold",
          price: 24.99,
          stock: 25,
          sku: "MU-001-RG",
        },
        {
          name: "Mauve Pink",
          value: "Mauve Pink",
          price: 24.99,
          stock: 25,
          sku: "MU-001-MP",
        },
      ],
    },
    {
      name: "Velvet Foundation",
      slug: "velvet-foundation",
      description: "Full coverage foundation with a velvet finish",
      shortDescription: "Full coverage foundation",
      price: 39.99,
      comparePrice: 49.99,
      sku: "MU-002",
      stock: 40,
      isActive: true,
      categoryId: makeupCategory.id,
      tags: ["makeup", "foundation", "face"],
      images: [
        {
          url: "https://utfs.io/f/g7h8i9j0-7g8h-9i0j-1k2l-3m4n5o6p7q8-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "Light",
          value: "Light",
          price: 39.99,
          stock: 10,
          sku: "MU-002-L",
        },
        {
          name: "Medium",
          value: "Medium",
          price: 39.99,
          stock: 20,
          sku: "MU-002-M",
        },
        {
          name: "Dark",
          value: "Dark",
          price: 39.99,
          stock: 10,
          sku: "MU-002-D",
        },
      ],
    },
    {
      name: "Smokey Eye Palette",
      slug: "smokey-eye-palette",
      description:
        "10-shade eyeshadow palette for creating perfect smokey eyes",
      shortDescription: "Smokey eyeshadow palette",
      price: 49.99,
      comparePrice: 59.99,
      sku: "MU-003",
      stock: 30,
      isActive: true,
      categoryId: makeupCategory.id,
      tags: ["makeup", "eyeshadow", "palette"],
      images: [
        {
          url: "https://utfs.io/f/h8i9j0k1-8h9i-0j1k-2l3m-4n5o6p7q8r9-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "Original",
          value: "Original",
          price: 49.99,
          stock: 30,
          sku: "MU-003-O",
        },
      ],
    },
    {
      name: "Volume Mascara",
      slug: "volume-mascara",
      description: "Volumizing mascara for dramatic lashes",
      shortDescription: "Volumizing mascara",
      price: 19.99,
      comparePrice: 24.99,
      sku: "MU-004",
      stock: 60,
      isActive: true,
      categoryId: makeupCategory.id,
      tags: ["makeup", "mascara", "eyes"],
      images: [
        {
          url: "https://utfs.io/f/i9j0k1l2-9i0j-1k2l-3m4n-5o6p7q8r9s0-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "Black",
          value: "Black",
          price: 19.99,
          stock: 30,
          sku: "MU-004-B",
        },
        {
          name: "Brown",
          value: "Brown",
          price: 19.99,
          stock: 30,
          sku: "MU-004-BR",
        },
      ],
    },
    {
      name: "Glow Highlighter",
      slug: "glow-highlighter",
      description: "Shimmering powder highlighter for a radiant glow",
      shortDescription: "Shimmering highlighter",
      price: 29.99,
      comparePrice: 34.99,
      sku: "MU-005",
      stock: 45,
      isActive: true,
      categoryId: makeupCategory.id,
      tags: ["makeup", "highlighter", "face"],
      images: [
        {
          url: "https://utfs.io/f/j0k1l2m3-0j1k-2l3m-4n5o-6p7q8r9s0t1-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "Golden",
          value: "Golden",
          price: 29.99,
          stock: 20,
          sku: "MU-005-G",
        },
        {
          name: "Rose Gold",
          value: "Rose Gold",
          price: 29.99,
          stock: 25,
          sku: "MU-005-RG",
        },
      ],
    },
  ];

  for (const productData of makeup) {
    await createProduct(productData);
  }
  console.log("Makeup products created successfully");

  // ----- MEN DUPES (5 products) -----
  const menDupes = [
    {
      name: "Blue Allure",
      slug: "blue-allure",
      description: "Inspired by Bleu de Chanel, a woody aromatic fragrance",
      shortDescription: "Woody aromatic fragrance",
      price: 49.99,
      comparePrice: 69.99,
      sku: "MD-001",
      stock: 40,
      isActive: true,
      categoryId: menDupesCategory.id,
      tags: ["dupe", "men", "woody"],
      images: [
        {
          url: "https://utfs.io/f/k1l2m3n4-1k2l-3m4n-5o6p-7q8r9s0t1u2-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "50ml",
          value: "50",
          price: 49.99,
          stock: 20,
          sku: "MD-001-50",
        },
        {
          name: "100ml",
          value: "100",
          price: 79.99,
          stock: 20,
          sku: "MD-001-100",
        },
      ],
    },
    {
      name: "Invincible",
      slug: "invincible",
      description: "Inspired by Invictus, a fresh sporty fragrance",
      shortDescription: "Fresh sporty fragrance",
      price: 44.99,
      comparePrice: 64.99,
      sku: "MD-002",
      stock: 35,
      isActive: true,
      categoryId: menDupesCategory.id,
      tags: ["dupe", "men", "sport"],
      images: [
        {
          url: "https://utfs.io/f/l2m3n4o5-2l3m-4n5o-6p7q-8r9s0t1u2v3-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "50ml",
          value: "50",
          price: 44.99,
          stock: 15,
          sku: "MD-002-50",
        },
        {
          name: "100ml",
          value: "100",
          price: 74.99,
          stock: 20,
          sku: "MD-002-100",
        },
      ],
    },
    {
      name: "Savage King",
      slug: "savage-king",
      description: "Inspired by Sauvage, a spicy aromatic fragrance",
      shortDescription: "Spicy aromatic fragrance",
      price: 54.99,
      comparePrice: 74.99,
      sku: "MD-003",
      stock: 30,
      isActive: true,
      categoryId: menDupesCategory.id,
      tags: ["dupe", "men", "spicy"],
      images: [
        {
          url: "https://utfs.io/f/m3n4o5p6-3m4n-5o6p-7q8r-9s0t1u2v3w4-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "50ml",
          value: "50",
          price: 54.99,
          stock: 15,
          sku: "MD-003-50",
        },
        {
          name: "100ml",
          value: "100",
          price: 84.99,
          stock: 15,
          sku: "MD-003-100",
        },
      ],
    },
    {
      name: "Million Dollar",
      slug: "million-dollar",
      description: "Inspired by 1 Million, a spicy leather fragrance",
      shortDescription: "Spicy leather fragrance",
      price: 47.99,
      comparePrice: 67.99,
      sku: "MD-004",
      stock: 35,
      isActive: true,
      categoryId: menDupesCategory.id,
      tags: ["dupe", "men", "leather"],
      images: [
        {
          url: "https://utfs.io/f/n4o5p6q7-4n5o-6p7q-8r9s-0t1u2v3w4x5-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "50ml",
          value: "50",
          price: 47.99,
          stock: 20,
          sku: "MD-004-50",
        },
        {
          name: "100ml",
          value: "100",
          price: 77.99,
          stock: 15,
          sku: "MD-004-100",
        },
      ],
    },
    {
      name: "Black Code",
      slug: "black-code",
      description: "Inspired by Armani Code, a spicy oriental fragrance",
      shortDescription: "Spicy oriental fragrance",
      price: 52.99,
      comparePrice: 72.99,
      sku: "MD-005",
      stock: 25,
      isActive: true,
      categoryId: menDupesCategory.id,
      tags: ["dupe", "men", "oriental"],
      images: [
        {
          url: "https://utfs.io/f/o5p6q7r8-5o6p-7q8r-9s0t-1u2v3w4x5y6-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "50ml",
          value: "50",
          price: 52.99,
          stock: 10,
          sku: "MD-005-50",
        },
        {
          name: "100ml",
          value: "100",
          price: 82.99,
          stock: 15,
          sku: "MD-005-100",
        },
      ],
    },
  ];

  for (const productData of menDupes) {
    await createProduct(productData);
  }
  console.log("Men's dupes products created successfully");

  // ----- WOMEN DUPES (5 products) -----
  const womenDupes = [
    {
      name: "Coco Dream",
      slug: "coco-dream",
      description:
        "Inspired by Coco Mademoiselle, an oriental floral fragrance",
      shortDescription: "Oriental floral fragrance",
      price: 53.99,
      comparePrice: 73.99,
      sku: "WD-001",
      stock: 40,
      isActive: true,
      categoryId: womenDupesCategory.id,
      tags: ["dupe", "women", "floral"],
      images: [
        {
          url: "https://utfs.io/f/p6q7r8s9-6p7q-8r9s-0t1u-2v3w4x5y6z7-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "30ml",
          value: "30",
          price: 39.99,
          stock: 15,
          sku: "WD-001-30",
        },
        {
          name: "50ml",
          value: "50",
          price: 53.99,
          stock: 15,
          sku: "WD-001-50",
        },
        {
          name: "100ml",
          value: "100",
          price: 83.99,
          stock: 10,
          sku: "WD-001-100",
        },
      ],
    },
    {
      name: "Olympia",
      slug: "olympia",
      description: "Inspired by Olympéa, a sensual oriental fragrance",
      shortDescription: "Sensual oriental fragrance",
      price: 49.99,
      comparePrice: 69.99,
      sku: "WD-002",
      stock: 35,
      isActive: true,
      categoryId: womenDupesCategory.id,
      tags: ["dupe", "women", "oriental"],
      images: [
        {
          url: "https://utfs.io/f/q7r8s9t0-7q8r-9s0t-1u2v-3w4x5y6z7a8-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "30ml",
          value: "30",
          price: 37.99,
          stock: 10,
          sku: "WD-002-30",
        },
        {
          name: "50ml",
          value: "50",
          price: 49.99,
          stock: 15,
          sku: "WD-002-50",
        },
        {
          name: "100ml",
          value: "100",
          price: 79.99,
          stock: 10,
          sku: "WD-002-100",
        },
      ],
    },
    {
      name: "Black Opium Plus",
      slug: "black-opium-plus",
      description: "Inspired by Black Opium, a coffee vanilla fragrance",
      shortDescription: "Coffee vanilla fragrance",
      price: 54.99,
      comparePrice: 74.99,
      sku: "WD-003",
      stock: 30,
      isActive: true,
      categoryId: womenDupesCategory.id,
      tags: ["dupe", "women", "sweet"],
      images: [
        {
          url: "https://utfs.io/f/r8s9t0u1-8r9s-0t1u-2v3w-4x5y6z7a8b9-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "30ml",
          value: "30",
          price: 40.99,
          stock: 10,
          sku: "WD-003-30",
        },
        {
          name: "50ml",
          value: "50",
          price: 54.99,
          stock: 10,
          sku: "WD-003-50",
        },
        {
          name: "100ml",
          value: "100",
          price: 84.99,
          stock: 10,
          sku: "WD-003-100",
        },
      ],
    },
    {
      name: "La Belle",
      slug: "la-belle",
      description: "Inspired by La Vie Est Belle, a sweet iris fragrance",
      shortDescription: "Sweet iris fragrance",
      price: 51.99,
      comparePrice: 71.99,
      sku: "WD-004",
      stock: 35,
      isActive: true,
      categoryId: womenDupesCategory.id,
      tags: ["dupe", "women", "sweet"],
      images: [
        {
          url: "https://utfs.io/f/s9t0u1v2-9s0t-1u2v-3w4x-5y6z7a8b9c0-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "30ml",
          value: "30",
          price: 38.99,
          stock: 15,
          sku: "WD-004-30",
        },
        {
          name: "50ml",
          value: "50",
          price: 51.99,
          stock: 10,
          sku: "WD-004-50",
        },
        {
          name: "100ml",
          value: "100",
          price: 81.99,
          stock: 10,
          sku: "WD-004-100",
        },
      ],
    },
    {
      name: "Alien Star",
      slug: "alien-star",
      description: "Inspired by Alien, a woody amber fragrance",
      shortDescription: "Woody amber fragrance",
      price: 56.99,
      comparePrice: 76.99,
      sku: "WD-005",
      stock: 25,
      isActive: true,
      categoryId: womenDupesCategory.id,
      tags: ["dupe", "women", "amber"],
      images: [
        {
          url: "https://utfs.io/f/t0u1v2w3-0t1u-2v3w-4x5y-6z7a8b9c0d1-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        { name: "30ml", value: "30", price: 42.99, stock: 8, sku: "WD-005-30" },
        {
          name: "50ml",
          value: "50",
          price: 56.99,
          stock: 10,
          sku: "WD-005-50",
        },
        {
          name: "100ml",
          value: "100",
          price: 86.99,
          stock: 7,
          sku: "WD-005-100",
        },
      ],
    },
  ];

  for (const productData of womenDupes) {
    await createProduct(productData);
  }
  console.log("Women's dupes products created successfully");

  // ----- FIRST COPIES (5 products) -----
  const firstCopies = [
    {
      name: "Aventus Premium",
      slug: "aventus-premium",
      description:
        "Premium copy of Creed Aventus with pineapple and birch notes",
      shortDescription: "Premium Aventus copy",
      price: 89.99,
      comparePrice: 129.99,
      sku: "FC-001",
      stock: 20,
      isActive: true,
      categoryId: firstCopiesCategory.id,
      tags: ["first copy", "premium", "men"],
      images: [
        {
          url: "https://utfs.io/f/u1v2w3x4-1u2v-3w4x-5y6z-7a8b9c0d1e2-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "50ml",
          value: "50",
          price: 89.99,
          stock: 10,
          sku: "FC-001-50",
        },
        {
          name: "100ml",
          value: "100",
          price: 149.99,
          stock: 10,
          sku: "FC-001-100",
        },
      ],
    },
    {
      name: "Santal Royal First",
      slug: "santal-royal-first",
      description: "Premium copy of Santal Royal with sandalwood and oud notes",
      shortDescription: "Premium Santal Royal copy",
      price: 94.99,
      comparePrice: 134.99,
      sku: "FC-002",
      stock: 15,
      isActive: true,
      categoryId: firstCopiesCategory.id,
      tags: ["first copy", "premium", "unisex"],
      images: [
        {
          url: "https://utfs.io/f/v2w3x4y5-2v3w-4x5y-6z7a-8b9c0d1e2f3-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        { name: "50ml", value: "50", price: 94.99, stock: 8, sku: "FC-002-50" },
        {
          name: "100ml",
          value: "100",
          price: 154.99,
          stock: 7,
          sku: "FC-002-100",
        },
      ],
    },
    {
      name: "Delina Exclusive",
      slug: "delina-exclusive",
      description:
        "Premium copy of Parfums de Marly Delina with rose and lychee notes",
      shortDescription: "Premium Delina copy",
      price: 99.99,
      comparePrice: 139.99,
      sku: "FC-003",
      stock: 12,
      isActive: true,
      categoryId: firstCopiesCategory.id,
      tags: ["first copy", "premium", "women"],
      images: [
        {
          url: "https://utfs.io/f/w3x4y5z6-3w4x-5y6z-7a8b-9c0d1e2f3g4-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        { name: "50ml", value: "50", price: 99.99, stock: 7, sku: "FC-003-50" },
        {
          name: "100ml",
          value: "100",
          price: 159.99,
          stock: 5,
          sku: "FC-003-100",
        },
      ],
    },
    {
      name: "Baccarat Elite",
      slug: "baccarat-elite",
      description:
        "Premium copy of Baccarat Rouge 540 with amber and saffron notes",
      shortDescription: "Premium Baccarat Rouge copy",
      price: 109.99,
      comparePrice: 149.99,
      sku: "FC-004",
      stock: 10,
      isActive: true,
      categoryId: firstCopiesCategory.id,
      tags: ["first copy", "premium", "unisex"],
      images: [
        {
          url: "https://utfs.io/f/x4y5z6a7-4x5y-6z7a-8b9c-0d1e2f3g4h5-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "50ml",
          value: "50",
          price: 109.99,
          stock: 5,
          sku: "FC-004-50",
        },
        {
          name: "100ml",
          value: "100",
          price: 169.99,
          stock: 5,
          sku: "FC-004-100",
        },
      ],
    },
    {
      name: "Tobacco Luxury",
      slug: "tobacco-luxury",
      description:
        "Premium copy of Tobacco Vanille with tobacco and vanilla notes",
      shortDescription: "Premium Tobacco Vanille copy",
      price: 104.99,
      comparePrice: 144.99,
      sku: "FC-005",
      stock: 15,
      isActive: true,
      categoryId: firstCopiesCategory.id,
      tags: ["first copy", "premium", "unisex"],
      images: [
        {
          url: "https://utfs.io/f/y5z6a7b8-5y6z-7a8b-9c0d-1e2f3g4h5i6-qpuzu3.jpg",
          sortOrder: 0,
        },
      ],
      variants: [
        {
          name: "50ml",
          value: "50",
          price: 104.99,
          stock: 8,
          sku: "FC-005-50",
        },
        {
          name: "100ml",
          value: "100",
          price: 164.99,
          stock: 7,
          sku: "FC-005-100",
        },
      ],
    },
  ];

  for (const productData of firstCopies) {
    await createProduct(productData);
  }
  console.log("First copies products created successfully");

  console.log("Database seeded successfully!");
}

// Helper function to create a product with its images and variants
async function createProduct(productData: any) {
  const { images = [], variants = [], ...data } = productData;

  return await db.product.create({
    data: {
      ...data,
      images: {
        create: images,
      },
      variants: {
        create: variants,
      },
    },
  });
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
