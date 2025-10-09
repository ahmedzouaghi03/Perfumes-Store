"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const bannerImages = [
  {
    src: "/images/banner1.jpg",
    alt: "Collection de luxe",
    title: "L'Art du Parfum",
    subtitle: "Découvrez notre collection exclusive",
    cta: "Explorer",
  },
  {
    src: "/images/banner2.jpg",
    alt: "Nouvelles fragrances",
    title: "Nouvelles Arrivées",
    subtitle: "Des fragrances qui transcendent le temps",
    cta: "Découvrir",
  },
  {
    src: "/images/banner3.jpg",
    alt: "Collection été",
    title: "Collection Été",
    subtitle: "Des parfums légers pour les journées ensoleillées",
    cta: "Voir la collection",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 7000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      {/* Sliding Banner Images */}
      <div className="h-full w-full">
        {bannerImages.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out
              ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <div className="relative h-full w-full">
              {/* Placeholder until you add actual images */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />

              {/* Use this when you have actual images */}
              {/* <Image
                src={banner.src}
                alt={banner.alt}
                fill
                className="object-cover"
                priority={index === 0}
              /> */}

              {/* Placeholder gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${
                  index === 0
                    ? "from-amber-900 to-amber-700"
                    : index === 1
                      ? "from-gray-900 to-gray-700"
                      : "from-blue-900 to-purple-700"
                }`}
              ></div>

              {/* Banner Content */}
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="container mx-auto px-6 md:px-12">
                  <div className="max-w-lg transform transition-all duration-1000 ease-in-out">
                    <h1
                      className="text-4xl md:text-6xl font-serif text-white mb-4 opacity-0 animate-fadeSlideUp"
                      style={{
                        animationDelay: "0.3s",
                        animationFillMode: "forwards",
                      }}
                    >
                      {banner.title}
                    </h1>
                    <p
                      className="text-xl md:text-2xl text-white/90 mb-8 opacity-0 animate-fadeSlideUp"
                      style={{
                        animationDelay: "0.6s",
                        animationFillMode: "forwards",
                      }}
                    >
                      {banner.subtitle}
                    </p>
                    <Link
                      href="/collections"
                      className="inline-block bg-white text-gray-900 hover:bg-amber-100 px-8 py-3 rounded-md font-medium transition-colors duration-300 opacity-0 animate-fadeSlideUp"
                      style={{
                        animationDelay: "0.9s",
                        animationFillMode: "forwards",
                      }}
                    >
                      {banner.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="container mx-auto px-6 flex justify-center">
          <div className="flex space-x-2">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
