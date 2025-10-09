"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, User, Search, Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-3xl font-serif tracking-wider text-gray-800"
          >
            L'ESSENCE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/collections/homme"
              className="text-gray-700 hover:text-amber-700 transition-colors"
            >
              Parfums Homme
            </Link>
            <Link
              href="/collections/femme"
              className="text-gray-700 hover:text-amber-700 transition-colors"
            >
              Parfums Femme
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-amber-700 transition-colors flex items-center">
                Collections
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all origin-top">
                <Link
                  href="/collections/first-copies"
                  className="block px-4 py-2 text-sm hover:bg-gray-50 text-gray-700"
                >
                  Premières Copies
                </Link>
                <Link
                  href="/collections/makeup"
                  className="block px-4 py-2 text-sm hover:bg-gray-50 text-gray-700"
                >
                  Maquillage
                </Link>
              </div>
            </div>
            <Link
              href="/about-us"
              className="text-gray-700 hover:text-amber-700 transition-colors"
            >
              À Propos
            </Link>
            <Link
              href="/contact-us"
              className="text-gray-700 hover:text-amber-700 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Header Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-amber-700 transition-colors">
              <Search size={20} />
            </button>
            <Link
              href="/account"
              className="p-2 text-gray-700 hover:text-amber-700 transition-colors"
            >
              <User size={20} />
            </Link>
            <Link
              href="/cart"
              className="p-2 text-gray-700 hover:text-amber-700 transition-colors relative"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/collections/homme"
                className="text-gray-700 hover:text-amber-700 transition-colors"
              >
                Parfums Homme
              </Link>
              <Link
                href="/collections/femme"
                className="text-gray-700 hover:text-amber-700 transition-colors"
              >
                Parfums Femme
              </Link>
              <Link
                href="/collections/first-copies"
                className="text-gray-700 hover:text-amber-700 transition-colors"
              >
                Premières Copies
              </Link>
              <Link
                href="/collections/makeup"
                className="text-gray-700 hover:text-amber-700 transition-colors"
              >
                Maquillage
              </Link>
              <Link
                href="/about-us"
                className="text-gray-700 hover:text-amber-700 transition-colors"
              >
                À Propos
              </Link>
              <Link
                href="/contact-us"
                className="text-gray-700 hover:text-amber-700 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
