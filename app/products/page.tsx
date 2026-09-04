"use client";

import Image from "next/image";
import Link from "next/link";
import CommentSection from "@/components/CommentSection";
import ApprovedComments from "@/components/ApprovedComments";
import { ArrowUpRight, ExternalLink, Search, X } from "lucide-react";
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
    name: "Yasin Shampoo",
    brand: "Dr. Locs",
    category: "Cleansers",
    image:
      "https://res.cloudinary.com/jnpz4s1s/image/upload/v1788412472/yasin-shampoo-8oz.jpg",
    description:
      "Dr. Locs’ Yasin Shampoo gently cleans your locs and scalp restoring it to a balanced pH. The refreshing mint and lavender scent will leave locs feeling clean and refreshed.",
    usedFor:
      "The formula has been tested to assure no build-up will sustain in locs after use.",
    note: "Apply to wet locs and massage into a rich lather. Rinse thoroughly. Repeat as often as necessary. Normally it is recommended to wash locs at least 3 times.",
    link: "https://drlocs.com/collections/returning-customer-favorites/products/yasin-shampoo?variant=41423176171566",
  },
  {
    name: "Locsanity Dreadlock Detox Powder",
    brand: "Locsanity",
    category: "Cleansers",
    image:
      "https://res.cloudinary.com/jnpz4s1s/image/upload/v1788282036/Locsanity_Dreadlock_Detox_Powder.png",
    description:
      "The Locsanity Dreadlock Detox Powder is the deep cleansing treatment every loc wearer needs in their hair care routine — and the upgrade every Apple Cider Vinegar detox devotee has been waiting for.",
    usedFor: "Occasional deeper cleansing when buildup becomes a concern.",
    note: "Goes beyond the surface to dissolve and extract impurities, deep-seated contaminants, excess oils, product residue, and hard water buildup that regular shampoo can't reach. Locs feel noticeably cleaner, lighter, and more refreshed after just one use.",
    link: "https://locsanity.com/products/dreadlock-natural-hair-deep-clean-detox-and-rejuvenate-dreadlock-powder-acv-al?_pos=2&_sid=3a9deac44&_ss=r",
  },
  {
    name: "Rosewater and Peppermint Daily Moisturizing/Refreshing Spray",
    brand: "Locsanity",
    category: "Moisture",
    image:
      "https://res.cloudinary.com/jnpz4s1s/image/upload/v1788280757/USA_8OZ_Rosewater-Peppermint.png",
    description:
      "A gentle, hydrating botanical water known for helping to refresh and soften hair while supporting the appearance of a healthy-looking scalp and more manageable strands.",
    usedFor: "Refreshing the hair and scalp between wash days.",
    note: "Look for simple formulas without heavy oils or ingredients that may leave unwanted residue.",
    link: "https://locsanity.com/collections/locs-moisturize/products/rosewater-and-peppermint-daily-moisturizing-refreshing-spray",
  },
  {
    name: "Locs Black Charcoal Conditioner",
    brand: "Made For Locs",
    category: "Moisture",
    image:
      "https://res.cloudinary.com/jnpz4s1s/image/upload/v1788413299/black-charcoal-locs-conditioner.jpg",
    description:
      "Unlock the Beauty of Your Locs with Our Specialized Black Charcoal Conditioner! Crafted for Locs, this formula delivers unmatched nourishment, brilliant shine, and efficient cleansing, all while providing deep hydration to your scalp and strands. Infused with potent ingredients like black charcoal and sweet almond oil, it ensures supreme moisturization, frizz reduction, and a captivating luster for your locs Elevate your loc care routine with this transformative blend!",
    usedFor: "Adding moisture to spray mixtures and refreshing routines.",
    note: "Proud to be: Silicone free, Paraben free, Sulfate free, and Vegan friendly.",
    link: "https://www.madeforlocs.com/collections/mfl-conditioner/products/locs-black-charcoal-conditioner-8-oz",
  },
  {
    name: "Loc Oil",
    brand: "Lion Locs",
    category: "Oils",
    image:
      "https://res.cloudinary.com/jnpz4s1s/image/upload/v1788411296/lion-locs-loc-growth-oil.jpg",
    description:
      "Unlock the power of nature with Lion Locs Growth Oil, a premium hair-enhancing oil blend crafted to support stronger, healthier, and more vibrant hair. Formulated to promote shine, hydration, and resilience, this lightweight oil is ideal for locs, braids, textured hair, and all hair types — from tight coils to loose waves.",
    usedFor: "Lightweight Nourishing Dreadlock Growth Oil for Locs & Scalp",
    note: "Comb palms and fingertips with oil through dreads to revitalize and shine. Apply in small amounts until hands glide through dreads easily. Do not overapply.",
    link: "https://lionlocs.com/products/loc-oil",
  },
  // {
  //   name: "Grapeseed Oil",
  //   brand: "Various brands",
  //   category: "Oils",
  //   image:
  //     "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80",
  //   description: "A lightweight oil frequently used in hair and scalp care.",
  //   usedFor: "Light scalp application and moisturizing routines.",
  //   note: "Oil should complement hydration rather than replace water-based moisture.",
  //   link: "https://en.wikipedia.org/wiki/Grape_seed_oil",
  // },
  // {
  //   name: "Jamaican Black Castor Oil",
  //   brand: "Jamaican Mango & Lime",
  //   category: "Scalp Care",
  //   image:
  //     "https://res.cloudinary.com/jnpz4s1s/image/upload/v1788414773/jamaican-black-castor-oil.jpg",
  //   description:
  //     "A heavier oil commonly included in scalp and hair care routines.",
  //   usedFor:
  //     "Promotes thicker, fuller, healthier hair growth, strengthens and helps repair breakage and split ends, hydrates scalp, hair, and skin with lasting moisture.",
  //   note: "Massage into scalp and edges 3–4 times weekly. Use daily on the ends of the hair. Or use monthly as a hot oil treatment. Smooth onto dry, parched skin for moisture.",
  //   link: "https://jamaicanmangolime.com/products/jamaican-black-castor-oil-original",
  // },
  {
    name: "Jamaica Rasta Roots Gel (Tropical Flava)",
    brand: "Made For Locs",
    category: "Retwisting",
    image:
      "https://res.cloudinary.com/jnpz4s1s/image/upload/v1788413951/mfl-jamaica-reggae-roots-gel.jpg",
    description:
      "Vegan Locs Retwisting Firm Hold Gel is a scientifically-formulated hair gel that offers a great hold while leaving hair residue and buildup free. Its non-flaking formulation ensures that even in humid conditions your style will stay in place all day. This firm hold pomade is essential for those that want to define and maintain their locs! ",
    usedFor:
      "Retwisting and helping maintain the appearance of newly styled roots.",
    note: "For external use only. Avoid contact with eyes. Keep out of reach of children. Ingredients may vary in color and consistency. If irritation occurs discontinue use. Consult a physician if irritation persists.",
    link: "https://www.madeforlocs.com/products/locs-retwisting-firm-hold-gel-tropical?_pos=1&_sid=4fa393a23&_ss=r",
  },
  //   {
  //     name: "Tight Hold",
  //     brand: "Taliah Waajid",
  //     category: "Retwisting",
  //     image:
  //       "https://images.unsplash.com/photo-1523268755815-fe7c372a0349?auto=format&fit=crop&w=900&q=80",
  //     description:
  //       "A styling product commonly used during natural hair and loc maintenance.",
  //     usedFor:
  //       "Providing temporary hold while styling and maintaining loc roots.",
  //     note: "Always evaluate the ingredient list and how the product behaves in your individual routine.",
  //     link: "https://naturalhair.org/",
  //   },
  {
    name: "Loclicious Interlocking Loc Tool",
    brand: "Loclicious",
    category: "Tools",
    image:
      "https://res.cloudinary.com/jnpz4s1s/image/upload/v1788493777/LocTool2_2000x.jpg",
    description:
      "Crafted from high-quality stainless steel, this dreadlock tool is designed for both tightening existing locs and initiating new ones.",
    usedFor:
      "Instant interlocking tool simplifies your loc maintenance routine, making it a game-changer for your haircare journey.",
    note: "Say goodbye to the hassle of gels, waxes, creams, clips, dryers, paperclips, or latch hooks.",
    link: "https://loclicious.com/products/loclicious-interlocking-tool-2-3-day-shipping-us-only?variant=35217672568994",
  },
  //   {
  //     name: "Continuous Mist Spray Bottle",
  //     brand: "Various brands",
  //     category: "Tools",
  //     image:
  //       "https://images.unsplash.com/photo-1608571423539-e951a5d3f3a6?auto=format&fit=crop&w=900&q=80",
  //     description:
  //       "A spray bottle designed to distribute water or lightweight liquids evenly.",
  //     usedFor: "Refreshing locs and applying water-based moisturizing products.",
  //     note: "Even distribution can help avoid soaking certain sections while leaving others dry.",
  //     link: "https://www.google.com/search?q=continuous+mist+spray+bottle",
  //   },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      const searchableText = [
        product.name,
        product.brand,
        product.category,
        product.description,
        product.usedFor,
        product.note,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        query.length === 0 || searchableText.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

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

      {/* FILTERS */}
      <section className="border-y border-black/10 bg-white/40">
        <div className="container-site py-10">
          <div className="mx-auto mb-6 max-w-xl">
            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/35"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products, brands, or ingredients..."
                className="
        w-full rounded-full
        border border-black/10
        bg-white px-11 py-3.5
        text-sm text-ink
        outline-none
        transition-all duration-200
        placeholder:text-black/35
        focus:border-terracotta/50
        focus:ring-4 focus:ring-terracotta/10
      "
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="
          absolute right-3 top-1/2
          flex h-8 w-8 -translate-y-1/2
          items-center justify-center
          rounded-full
          text-black/40
          transition-colors
          hover:bg-black/5
          hover:text-ink
        "
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
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
          <h2 className="mt-4 font-display text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
            {activeCategory === "All" ? "" : activeCategory}
          </h2>

          {/* IMAGE DISCLOSURE */}
          <section className="border-t border-b border-black/10 mb-8">
            <div className="container-site py-10 sm:py-14">
              <div className="mx-auto max-w-3xl text-center">
                <span className="section-label">Image disclosure</span>

                <p className="mt-4 text-sm leading-7 text-black/50">
                  Product images displayed on this page are used for promotional
                  and educational purposes. Images are sourced from the
                  respective businesses’ websites and are intended to help
                  visitors identify the products discussed. LOCED does not claim
                  ownership of these images. Product names, trademarks, and
                  images belong to their respective owners.
                </p>
              </div>
            </div>
          </section>
          <span className="section-label">
            Commonly used products we found on the net
          </span>
          <p className="mt-4 text-sm text-black/45">
            {searchQuery ? (
              <>
                Showing {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "result" : "results"} for{" "}
                <span className="font-semibold text-black/60">
                  “{searchQuery}”
                </span>
              </>
            ) : (
              <>
                Showing {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </>
            )}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-black/10 bg-white/60 p-10 text-center">
            <Search size={28} className="mx-auto text-black/30" />

            <h3 className="mt-4 font-display text-2xl font-bold">
              No products found
            </h3>

            <p className="mt-3 leading-7 text-black/50">
              Try searching for something else or choose a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="
          mt-6 rounded-full
          border border-black/10
          bg-white px-5 py-2.5
          text-sm font-bold
          transition-all
          hover:bg-black/5
        "
            >
              Clear filters
            </button>
          </div>
        ) : (
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
                    sizes="(max-width: 768px) 100vw, 50vw"
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
        )}
      </section>

      {/* COMMUNITY DISCUSSION */}
      <section className="border-t border-black/10">
        <div className="container-site py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-label">Community discussion</span>

            <h2 className="mt-4 font-display text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
              What products do you use?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-black/55">
              Share your experiences with products, routines, and tools used in
              your loc care journey. Help the LOCED community learn from real
              experiences.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <ApprovedComments
              articleSlug="products-everyone-uses"
              contentType="product"
            />

            <CommentSection
              articleSlug="products-everyone-uses"
              contentType="product"
            />
          </div>
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
