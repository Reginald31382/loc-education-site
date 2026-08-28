import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

import mongoose from "mongoose";
import Article from "../models/Article";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

const articles = [
  {
    slug: "starter-locs",
    title: "Starter Locs: What to Expect",
    category: "Starting",
    excerpt:
      "Learn what happens during the early stage, why unraveling and frizz can be normal, and how to protect the foundation.",
    readTime: "6 min read",
    featured: true,
    published: true,
    body: [
      "Starter locs are the beginning of a process, not the finished product. Early hair may unravel, frizz, shrink, swell, and change shape as sections begin to intertwine.",
      "The best routine depends on the installation method, hair characteristics, scalp needs, lifestyle, and desired result. Avoid treating one maintenance schedule as universal.",
      "The goal during this stage is to protect the scalp and allow the hair to develop without unnecessary manipulation or tension.",
    ],
  },

  {
    slug: "how-to-wash-locs",
    title: "How to Wash Locs",
    category: "Care",
    excerpt:
      "A practical framework for cleansing locs while considering scalp needs, sweat, product buildup, and loc maturity.",
    readTime: "7 min read",
    featured: true,
    published: true,
    body: [
      "There is no blanket rule that locs should never be washed. Scalp hygiene matters, and washing frequency should reflect oil, sweat, activity, product use, environment, and scalp condition.",
      "Starter locs may unravel more easily, so technique and timing may need to be adapted. Established locs can generally tolerate a routine built around the wearer's scalp needs.",
      "Rinse thoroughly and dry thoroughly. The objective is a clean scalp and locs without excessive manipulation or prolonged dampness.",
    ],
  },

  {
    slug: "retwist-vs-health",
    title: "Retwist vs. Hair Health",
    category: "Maintenance",
    excerpt:
      "A neat retwist is not the same thing as healthy roots. Learn how tension, frequency, and loc weight interact.",
    readTime: "6 min read",
    featured: true,
    published: true,
    body: [
      "Retwisting organizes new growth and changes appearance; it does not biologically increase the rate of hair growth.",
      "A maintenance routine should not routinely cause pain, tenderness, bumps, headaches, or excessive pulling. Those are reasons to reassess the technique.",
      "Longer and heavier locs can place more stress on roots, so loc length, size, styling, and maintenance should be considered together.",
    ],
  },

  {
    slug: "product-buildup",
    title: "Product Buildup in Locs",
    category: "Care",
    excerpt:
      "Understand why waxes, heavy creams, gels, oils, and other residues can become trapped inside locs.",
    readTime: "5 min read",
    featured: false,
    published: true,
    body: [
      "Locs can retain product because their structure is dense. Heavy waxes, butters, creams, gels, pomades, edge products, and excessive oils can accumulate over time.",
      "More oil is not automatically more moisture. Product selection should consider whether the material can be thoroughly removed and whether repeated use leaves residue.",
      "Natural does not automatically mean buildup-free or irritation-free. Ingredient choice and amount both matter.",
    ],
  },

  {
    slug: "traction-alopecia",
    title: "Locs, Tension & Traction Alopecia",
    category: "Health",
    excerpt:
      "Know the warning signs of excessive tension and why early attention matters for long-term hair health.",
    readTime: "8 min read",
    featured: false,
    published: true,
    body: [
      "Repeated pulling can contribute to traction alopecia. Warning signs can include pain during styling, tenderness, bumps, broken hairs, thinning edges, recession, or thinning in heavily maintained areas.",
      "Pain is a warning sign, not proof that the style is extra fresh. Prolonged traction can result in permanent hair loss.",
      "If you notice persistent or worsening hair loss, scalp inflammation, or pain, seek evaluation from a qualified healthcare professional.",
    ],
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI!);

    console.log("Connected to MongoDB.");

    await Article.deleteMany({});

    await Article.insertMany(articles);

    console.log(`Seeded ${articles.length} articles.`);

    await mongoose.disconnect();

    console.log("Disconnected from MongoDB.");
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();
