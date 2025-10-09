"use client";

import React from "react";
import Link from "next/link";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Accueil</Link>
        </li>
        <li>
          <Link href="/best-sellers">Meilleures Ventes</Link>
        </li>
        <li>
          <Link href="/featured-products">Produits Vedettes</Link>
        </li>
        <li>
          <Link href="/women-dupes">Dupes pour Femmes</Link>
        </li>
        <li>
          <Link href="/men-dupes">Dupes pour Hommes</Link>
        </li>
        <li>
          <Link href="/first-copies">Premières Copies</Link>
        </li>
        <li>
          <Link href="/makeup">Maquillage</Link>
        </li>
        <li>
          <Link href="/brumes">Brumes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
