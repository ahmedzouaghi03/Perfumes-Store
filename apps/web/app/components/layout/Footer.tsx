"use client";

import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <h2 className="text-2xl font-serif text-white mb-6">L'ESSENCE</h2>
            <p className="text-sm leading-relaxed mb-6">
              Découvrez notre collection exquise de parfums de luxe. Chaque
              flacon raconte une histoire unique, créée avec les ingrédients les
              plus raffinés du monde entier.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-amber-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium text-white mb-6">
              Liens Rapides
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-amber-400 transition-colors"
                >
                  À Propos de Nous
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-amber-400 transition-colors"
                >
                  Contactez-Nous
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-amber-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-amber-400 transition-colors"
                >
                  Conditions d'Utilisation
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-amber-400 transition-colors"
                >
                  Politique de Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-medium text-white mb-6">Collections</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/collections/homme"
                  className="hover:text-amber-400 transition-colors"
                >
                  Parfums Homme
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/femme"
                  className="hover:text-amber-400 transition-colors"
                >
                  Parfums Femme
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/first-copies"
                  className="hover:text-amber-400 transition-colors"
                >
                  Premières Copies
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/makeup"
                  className="hover:text-amber-400 transition-colors"
                >
                  Maquillage
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/brumes"
                  className="hover:text-amber-400 transition-colors"
                >
                  Brumes Parfumées
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium text-white mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail size={18} className="mr-3 mt-1 flex-shrink-0" />
                <span>contact@lessence.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="mr-3 mt-1 flex-shrink-0" />
                <span>+33 (0)1 23 45 67 89</span>
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="text-white text-sm font-medium mb-3">
                Inscrivez-vous à notre newsletter
              </h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none flex-grow"
                />
                <button
                  type="submit"
                  className="bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-r-md transition-colors"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} L'ESSENCE. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
