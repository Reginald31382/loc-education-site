"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";

const categories = [
  "All",
  "Cleansers",
  "Moisture",
  "Oils",
  "Scalp Care",
  "Retwisting",
  "Tools",
];

const products = [
  {
    name: "Pure-Castile Liquid Soap",
    brand: "Dr. Bronner's",
    category: "Cleansers",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
    description:
      "A concentrated liquid soap commonly discussed in natural hair care and cleansing routines.",
    usedFor:
      "General cleansing when properly diluted and used according to individual hair and scalp needs.",
    note: "Because it is concentrated, dilution and frequency of use should be considered carefully.",
    link: "https://www.drbronner.com/",
  },
  {
    name: "Clarifying Shampoo",
    brand: "Suave",
    category: "Cleansers",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80",
    description:
      "A cleansing product commonly used to help remove excess oils, residue, and product buildup.",
    usedFor: "Occasional deeper cleansing when buildup becomes a concern.",
    note: "Clarifying shampoos are generally not used with the same frequency as everyday cleansers.",
    link: "https://www.suave.com/",
  },
  {
    name: "Rosewater",
    brand: "Various brands",
    category: "Moisture",
    image:
      "https://images.unsplash.com/photo-1611073615830-3b1e8c12b48c?auto=format&fit=crop&w=900&q=80",
    description:
      "A lightweight water-based product commonly used in moisturizing and refreshing routines.",
    usedFor: "Refreshing the hair and scalp between wash days.",
    note: "Look for simple formulas without heavy oils or ingredients that may leave unwanted residue.",
    link: "https://en.wikipedia.org/wiki/Rose_water",
  },
  {
    name: "Aloe Vera Juice",
    brand: "Various brands",
    category: "Moisture",
    image:
      "https://images.unsplash.com/photo-1629198726164-4c43f9d417a3?auto=format&fit=crop&w=900&q=80",
    description:
      "A lightweight liquid sometimes incorporated into water-based moisturizing routines.",
    usedFor: "Adding moisture to spray mixtures and refreshing routines.",
    note: "Formulas vary significantly, so always check ingredients before applying products to the scalp.",
    link: "https://en.wikipedia.org/wiki/Aloe_vera",
  },
  {
    name: "Jojoba Oil",
    brand: "Various brands",
    category: "Oils",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80",
    description:
      "A lightweight oil commonly used in scalp and hair care routines.",
    usedFor: "Supporting scalp comfort and reducing the feeling of dryness.",
    note: "Use sparingly. Applying large amounts of oil can contribute to buildup over time.",
    link: "https://en.wikipedia.org/wiki/Jojoba_oil",
  },
  {
    name: "Grapeseed Oil",
    brand: "Various brands",
    category: "Oils",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80",
    description: "A lightweight oil frequently used in hair and scalp care.",
    usedFor: "Light scalp application and moisturizing routines.",
    note: "Oil should complement hydration rather than replace water-based moisture.",
    link: "https://en.wikipedia.org/wiki/Grape_seed_oil",
  },
  {
    name: "Jamaican Black Castor Oil",
    brand: "Various brands",
    category: "Scalp Care",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80",
    description:
      "A heavier oil commonly included in scalp and hair care routines.",
    usedFor: "Scalp conditioning and targeted use in dry areas.",
    note: "Its heavier consistency means that using too much may leave noticeable residue.",
    link: "https://en.wikipedia.org/wiki/Castor_oil",
  },
  {
    name: "Lock & Twist Gel",
    brand: "Murray's",
    category: "Retwisting",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    description:
      "A styling product commonly used to provide temporary hold during loc maintenance.",
    usedFor:
      "Retwisting and helping maintain the appearance of newly styled roots.",
    note: "Product choice and amount matter because some styling products can leave residue.",
    link: "https://murrayspomade.com/",
  },
  {
    name: "Tight Hold",
    brand: "Taliah Waajid",
    category: "Retwisting",
    image:
      "https://images.unsplash.com/photo-1523268755815-fe7c372a0349?auto=format&fit=crop&w=900&q=80",
    description:
      "A styling product commonly used during natural hair and loc maintenance.",
    usedFor:
      "Providing temporary hold while styling and maintaining loc roots.",
    note: "Always evaluate the ingredient list and how the product behaves in your individual routine.",
    link: "https://naturalhair.org/",
  },
  {
    name: "Duckbill Clips",
    brand: "Various brands",
    category: "Tools",
    image:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=900&q=80",
    description:
      "Sectioning clips commonly used during retwisting and professional maintenance.",
    usedFor: "Holding sections of hair in place while working.",
    note: "Choose clips that hold securely without creating unnecessary tension.",
    link: "https://www.google.com/search?q=duckbill+clips",
  },
  {
    name: "Continuous Mist Spray Bottle",
    brand: "Various brands",
    category: "Tools",
    image:
      "https://images.unsplash.com/photo-1608571423539-e951a5d3f3a6?auto=format&fit=crop&w=900&q=80",
    description:
      "A spray bottle designed to distribute water or lightweight liquids evenly.",
    usedFor: "Refreshing locs and applying water-based moisturizing products.",
    note: "Even distribution can help avoid soaking certain sections while leaving others dry.",
    link: "https://www.google.com/search?q=continuous+mist+spray+bottle",
  },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") {
      return products;
    }

    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  return (
    <main>
      {/* HERO */}
      <section className="border-b border-black/10">
        <div className="container-site py-16 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <span className="section-label">LOCED library</span>

            <h1 className="mt-4 font-display text-5xl font-bold tracking-[-0.04em] sm:text-7xl">
              Products Everyone Uses
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-black/60">
              A practical collection of products, ingredients, and tools
              commonly used throughout loc care and maintenance.
            </p>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-black/45">
              These products are presented for educational purposes. What works
              best depends on your hair, scalp, lifestyle, and individual needs.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      {/* <section className="container-site py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label">How to use this page</span>

          <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.04em] sm:text-5xl">
            Understand the product before using it.
          </h2>

          <p className="mt-6 text-lg leading-8 text-black/60">
            LOCED focuses on explaining why certain products are commonly used,
            what they are intended to do, and what to consider before adding
            them to your routine.
          </p>
        </div>
      </section> */}

      {/* FILTERS */}
      <section className="border-y border-black/10 bg-white/40">
        <div className="container-site py-10">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`
                    rounded-full border px-4 py-2 text-sm font-semibold
                    transition-all duration-200
                    ${
                      active
                        ? "border-ink bg-ink text-white shadow-sm"
                        : "border-black/10 bg-white/70 text-black/60 hover:border-black/20 hover:bg-white hover:text-ink"
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="container-site py-16 sm:py-20">
        <div className="text-center">
          <span className="section-label">Commonly used</span>

          <h2 className="mt-4 font-display text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
            {activeCategory === "All" ? "Products and tools" : activeCategory}
          </h2>

          <p className="mt-4 text-sm text-black/45">
            Showing {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={`${product.brand}-${product.name}`}
              className="
                group overflow-hidden rounded-3xl
                border border-black/10 bg-white/60
                text-center
                transition-all duration-300
                hover:-translate-y-1 hover:bg-white hover:shadow-lg
              "
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-sand/30">
                <Image
                  src={product.image}
                  alt={`${product.brand} ${product.name}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-7">
                <div className="flex justify-center">
                  <span className="pill">{product.category}</span>
                </div>

                <p className="mt-5 text-sm font-semibold text-terracotta">
                  {product.brand}
                </p>

                <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.03em]">
                  {product.name}
                </h3>

                <p className="mx-auto mt-4 leading-7 text-black/60">
                  {product.description}
                </p>

                <div className="mt-6 border-t border-black/10 pt-5">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-black/35">
                    Commonly used for
                  </span>

                  <p className="mt-2 text-sm leading-6 text-black/55">
                    {product.usedFor}
                  </p>
                </div>

                <p className="mt-5 text-sm leading-6 text-black/40">
                  {product.note}
                </p>

                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group/link mt-6 inline-flex items-center gap-2
                    text-sm font-bold text-ink
                    transition-colors hover:text-terracotta
                  "
                >
                  Learn more
                  <ExternalLink
                    size={15}
                    className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="border-t border-black/10">
        <div className="container-site py-16 sm:py-20">
          <div className="mx-auto max-w-3xl rounded-3xl border border-black/10 bg-sand/40 p-8 text-center sm:p-12">
            <span className="section-label">A note from LOCED</span>

            <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
              Products are tools, not universal solutions.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-black/60">
              A product that works well for one person may not work the same way
              for another. Consider your scalp condition, hair characteristics,
              environment, and maintenance habits when choosing products.
            </p>

            <Link
              href="/learn"
              className="
                group mt-8 inline-flex items-center gap-2
                rounded-full bg-ink px-6 py-3
                text-sm font-bold text-white
                transition-all duration-300
                hover:-translate-y-0.5 hover:shadow-lg
              "
            >
              Continue learning
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
