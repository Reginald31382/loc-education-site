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
    heroImage:
      "https://res.cloudinary.com/jnpz4s1s/image/upload/v1788378248/starter_locs.png",
    heroImageAlt: "Person with starter locs viewed from behind",
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
    heroImage:
      "https://res.cloudinary.com/jnpz4s1s/image/upload/v1788408749/Loc_Wash_in_a_Salon_Basin.png",
    heroImageAlt: "Person washing locs in a wash bowl",
    body: [
      "There is no blanket rule that locs should never be washed. Scalp hygiene matters, and washing frequency should reflect oil, sweat, activity, product use, environment, and scalp condition.",

      "Before washing, gently separate the locs and inspect the scalp. Look for areas of buildup, tenderness, irritation, or excessive dryness. This is also a good time to notice whether certain products or maintenance habits may be contributing to scalp discomfort.",

      "Starter locs may unravel more easily, so technique and timing may need to be adapted. Established locs can generally tolerate a routine built around the wearer's scalp needs. If your locs are newly installed, ask your loctician when washing is appropriate for your installation method.",

      "Begin by thoroughly wetting the scalp and locs with lukewarm water. Allow the water to reach the roots instead of only wetting the outside of the locs. This helps loosen sweat, oil, and surface residue before shampoo is applied.",

      "Use a cleanser that can be rinsed thoroughly and apply it primarily to the scalp. Gently massage with the pads of your fingers rather than scratching with your nails. The goal is to clean the scalp without creating unnecessary friction or pulling at the roots.",

      "Let the shampoo move through the locs as you rinse. Depending on your scalp needs and the amount of buildup present, a second gentle cleanse may be useful. Avoid assuming that more shampoo or more scrubbing always produces a better result.",

      "Rinse thoroughly and dry thoroughly. The objective is a clean scalp and locs without excessive manipulation or prolonged dampness. Squeeze out excess water gently with a clean towel, then allow the locs to dry completely before covering or styling them.",

      "Heavy products, frequent oiling, and styling products can make cleansing more difficult. If your locs repeatedly feel coated, stiff, sticky, or difficult to rinse, review the amount and type of product being used rather than simply washing more aggressively.",

      "If washing causes persistent pain, burning, swelling, significant irritation, or worsening scalp symptoms, pause the routine and seek advice from a qualified healthcare professional. A clean scalp should not require painful treatment.",

      "A useful wash routine is one that keeps the scalp comfortable, removes buildup, and works with the maturity and condition of your locs. Pay attention to how your scalp responds and adjust the routine when your needs change.",
    ],
  },

  {
    slug: "retwist-vs-health",
    title: "Retwist vs. Hair Health",
    category: "Maintenance",
    excerpt:
      "A neat retwist is not the same thing as healthy roots. Learn how tension, frequency, and loc weight interact.",
    readTime: "7 min read",
    featured: true,
    published: true,
    heroImage:
      "https://res.cloudinary.com/jnpz4s1s/image/upload/v1788409850/retwist.png",
    heroImageAlt: "Person receiving a loc retwist",
    body: [
      "Retwisting organizes new growth and changes appearance; it does not biologically increase the rate of hair growth. A retwist can make locs look cleaner and more defined, but the appearance of neatness should not be confused with the health of the hair or scalp.",

      "Healthy maintenance should support the hair rather than constantly pull it into place. The goal is to manage new growth while preserving the strength of the roots, the comfort of the scalp, and the long-term integrity of the locs.",

      "A maintenance routine should not routinely cause pain, tenderness, bumps, headaches, or excessive pulling. These are reasons to reassess the technique, the amount of tension, the frequency of retwisting, or the type of style being created.",

      "Some people experience mild sensitivity after maintenance, especially if the scalp has not been manipulated recently. However, significant pain is not a requirement for a good retwist. If the scalp feels sore, tight, or painful, the style may be too tight or the hair may need more time between maintenance sessions.",

      "Retwisting too frequently can place repeated stress on the same areas of new growth. When the roots are constantly separated, twisted, pulled, or styled, the hair may not have enough time to recover between sessions.",

      "There is no universal retwist schedule that works for everyone. Hair texture, loc size, installation method, rate of new growth, lifestyle, scalp condition, and styling preferences all affect how often maintenance may be appropriate.",

      "Some people may prefer a more defined appearance every few weeks, while others may benefit from waiting longer between retwists. A little visible new growth does not automatically mean the locs are unhealthy or that maintenance is overdue.",

      "Longer and heavier locs can place more stress on roots, so loc length, size, styling, and maintenance should be considered together. As locs become longer, the weight of the hair can increase the strain placed on the scalp, especially when the hair is gathered into tight ponytails, buns, or updos.",

      "The size of the loc can also affect how weight is distributed. Very small locs may have less hair supporting the weight of each individual section, while larger locs may place more weight on fewer root areas. Neither size is automatically healthier; the important factor is whether the roots can comfortably support the loc.",

      "Tight styling between retwists can create additional stress. Ponytails, buns, barrel styles, cornrows, and other styles that pull the locs in one direction may increase tension, especially around the hairline, temples, and nape.",

      "If a style causes discomfort, looseness at the roots, bumps, broken hairs, or visible thinning, it should be removed or adjusted. Keeping a style in place simply because it looks neat can allow unnecessary tension to continue for too long.",

      "The hairline often needs special attention because the edges may be more delicate and more vulnerable to repeated pulling. Avoid consistently directing heavy locs backward or using tight styles that place concentrated pressure on the same areas.",

      "A healthy maintenance session should include communication. Tell your loctician if the previous retwist caused soreness, if your scalp has been irritated, or if you have noticed thinning or breakage. Maintenance should be adjusted based on what your hair and scalp are showing you.",

      "The amount of product used during a retwist also matters. Heavy gels, waxes, creams, and repeated layers of styling products can contribute to buildup. Product buildup may make locs feel stiff, coated, or difficult to cleanse, and it can make the scalp harder to evaluate.",

      "More product does not necessarily create a better retwist. A clean, controlled technique with minimal appropriate product may be easier to maintain than a style that depends on heavy layers of gel or wax.",

      "Between maintenance sessions, focus on keeping the scalp clean, limiting unnecessary manipulation, and protecting the locs during sleep and physical activity. A satin or silk covering may help reduce friction, but it should not be tied so tightly that it creates pressure around the hairline.",

      "If you are experiencing persistent tenderness, scalp inflammation, broken hairs, thinning edges, recession, or areas where the locs feel unusually loose, do not wait for the next scheduled retwist to address it. Consider taking a break from tension-based styling and seek evaluation from a qualified healthcare professional when symptoms persist or worsen.",

      "Traction-related hair loss can become more difficult to reverse when tension continues over time. Early attention gives you a better opportunity to identify the source of the stress and change the routine before the problem progresses.",

      "A good retwist should leave the hair organized without making the scalp feel strained. Neatness is one part of maintenance, but comfort, root strength, scalp condition, and long-term hair health should carry equal or greater importance.",

      "The best maintenance routine is one that works with your hair instead of constantly forcing it into a particular appearance. Give your locs enough time between sessions, avoid painful tension, and adjust your routine as your locs become longer, heavier, and more mature.",
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
    heroImage:
      "https://res.cloudinary.com/jnpz4s1s/image/upload/v1788410128/heavy_waxes.png",
    heroImageAlt: "Heavy waxes used in loc maintenance",
    body: [
      "Locs can retain product because their structure is dense. Heavy waxes, butters, creams, gels, pomades, edge products, and excessive oils can accumulate over time, especially when products are applied repeatedly without being fully removed.",

      "Buildup usually develops when product residue combines with shed skin, lint, sweat, and environmental debris. Instead of remaining only on the surface, these materials can become trapped inside the loc where they are harder to see and remove.",

      "Common signs of product buildup include locs that feel unusually heavy, stiff, sticky, greasy, or coated. You may also notice a dull appearance, visible residue when the locs are squeezed, an unpleasant smell, or flakes that return shortly after washing.",

      "More oil is not automatically more moisture. Oils can help reduce friction and support softness, but they do not replace water-based hydration. Applying too much oil can leave the hair coated and may make it more difficult for water and cleanser to reach the loc properly.",

      "Waxes and heavy butters can be especially difficult to remove because they are designed to cling to the hair. Frequent use may create layers of residue that require several careful washes rather than one aggressive cleansing session.",

      "Gels, edge products, and retwisting products can also contribute to buildup when they are applied in large amounts or used too often. Product that is placed around the roots may spread into the loc as the hair is manipulated, while excess product near the hairline can transfer onto surrounding locs.",

      "Natural does not automatically mean buildup-free or irritation-free. Ingredients such as oils, butters, clays, botanical extracts, and essential oils can still leave residue or irritate the scalp depending on the formula, concentration, and amount used.",

      "Product choice should consider whether the material can be thoroughly removed. Lightweight, water-based products are often easier to cleanse from locs than thick waxes, petroleum-based pomades, or heavy creams.",

      "The amount of product matters just as much as the ingredient list. Start with a small amount, apply it only where needed, and avoid repeatedly layering new product over residue that is already present.",

      "A consistent cleansing routine can help prevent buildup. Wash the scalp and locs thoroughly, allow cleanser to reach through the length of the hair, and rinse until the water runs clear and the locs no longer feel coated.",

      "If buildup is already present, avoid scraping, cutting, or aggressively pulling at the locs. Excessive manipulation can weaken the hair and create unnecessary breakage. A clarifying wash or professional loc-cleaning service may be more appropriate for stubborn residue.",

      "Deep cleansing should be balanced with the condition of the hair and scalp. Over-cleansing can leave locs dry or make the scalp uncomfortable, so the goal is to remove residue without repeatedly stripping the hair.",

      "Lint and environmental debris can become attached to product-coated locs more easily. Keeping products controlled and avoiding excessive layering can help reduce the amount of material that becomes trapped over time.",

      "Healthy loc maintenance is not about using the most product. It is about using the right amount, choosing formulas that suit your hair, cleansing consistently, and paying attention to how your locs and scalp respond.",

      "If your locs remain greasy, heavy, coated, or difficult to cleanse after several washes, consider consulting an experienced loctician. Persistent residue may require a more targeted cleansing approach and an adjustment to your maintenance routine.",
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
    heroImage:
      "https://res.cloudinary.com/jnpz4s1s/image/upload/v1788410361/alopecia_locs.png",
    heroImageAlt: "Locs and traction alopecia",
    body: [
      "Traction alopecia is a type of hair loss caused by repeated or prolonged pulling on the hair and scalp. In locs, it can develop when styles are consistently too tight, locs are excessively heavy, or the same areas are placed under tension during maintenance.",

      "Tension can come from tight retwists, tightly styled updos, ponytails, buns, braids, extensions, or frequent manipulation around the hairline. The edges, temples, and nape are often more vulnerable because the hair in these areas may be finer and less able to tolerate repeated stress.",

      "Repeated pulling can contribute to traction alopecia. Warning signs can include pain during styling, tenderness, bumps, broken hairs, thinning edges, recession, or thinning in heavily maintained areas.",

      "Pain is a warning sign, not proof that the style is extra fresh. A healthy maintenance session should not leave the scalp feeling sore, burning, throbbing, or unusually sensitive. If a style causes discomfort, the tension should be reduced immediately.",

      "Other early signs may include redness, small pimples, crusting, itching, or a tight sensation around the roots. Some people may notice short broken hairs around the hairline before they notice visible thinning.",

      "Traction alopecia can develop gradually. Repeated stress may first cause temporary shedding or breakage, but continued tension can damage the hair follicles. When follicle damage becomes advanced, hair loss may become permanent.",

      "Locs can place additional weight on the scalp as they grow longer and thicker. This does not mean long or mature locs automatically cause hair loss, but it does mean styling choices should account for the weight being placed on the roots.",

      "Avoid pulling all of the locs into styles that place concentrated pressure on one area. Rotating styles, leaving the hair loose between maintenance sessions, and avoiding consistently tight ponytails or buns can help reduce repeated stress.",

      "Retwisting should not require excessive force. If the roots are being pulled tightly, the scalp is visibly raised, or the hairline looks strained, the maintenance technique should be adjusted. A clean appearance should never come at the expense of scalp comfort.",

      "Frequent retwisting can also increase stress on the same areas. Allowing enough time between maintenance sessions gives the scalp and roots a chance to recover and reduces the need for repeated manipulation.",

      "Be especially careful around thinning edges, weak areas, or previously damaged sections. These areas may need less tension, less frequent styling, and sometimes a temporary break from retwisting or protective styles.",

      "Do not ignore pain because it disappears after a few hours. Temporary relief does not necessarily mean the tension was harmless. Repeated episodes of soreness can indicate that the hair and scalp are being placed under too much stress.",

      "If a style is too tight, loosen or remove it as soon as possible. Avoid trying to preserve a style that is causing pain, bumps, scalp irritation, or visible pulling around the roots.",

      "If you notice persistent or worsening hair loss, scalp inflammation, or pain, seek evaluation from a qualified healthcare professional. A dermatologist or other appropriate healthcare provider can help determine whether the hair loss is related to traction or another scalp condition.",

      "Early attention matters because reducing tension may help prevent further damage. Waiting until an area becomes completely bare can make recovery more difficult, particularly if the follicles have been repeatedly injured.",

      "Treatment depends on the cause and severity of the hair loss. A healthcare professional may recommend removing the source of tension, changing styling habits, treating inflammation, or using other therapies when appropriate.",

      "Avoid applying harsh chemicals, strong essential oils, or irritating home remedies to a painful or inflamed scalp. These products may worsen irritation and can make it harder to identify the original cause of the problem.",

      "Healthy loc maintenance should include regular checks of the hairline, temples, and scalp. Pay attention to changes in density, broken hairs, tenderness, bumps, and whether certain styles consistently create discomfort.",

      "Locs can be maintained without constant tension. Gentle styling, reasonable retwist intervals, lighter styling choices, and attention to scalp comfort can support long-term hair health.",

      "The goal is not simply to keep a style in place. The goal is to maintain locs while protecting the follicles, respecting the scalp, and responding early when something feels or looks abnormal.",
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
