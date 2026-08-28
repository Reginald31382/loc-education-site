import Link from "next/link";
import { ArrowRight, BookOpen, Clock3 } from "lucide-react";

import FadeIn from "@/components/motion/FadeIn";
import Reveal from "@/components/motion/Reveal";
import ArticleCard from "@/components/ArticleCard";

import { getArticles } from "@/lib/articles";

export default async function LearnPage() {
  const articles = await getArticles();

  return (
    <main>
      <section className="border-b border-black/10 py-16 sm:py-24">
        <div className="container-site">
          <FadeIn>
            <span className="pill">THE LOCED LIBRARY</span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Learn how to understand and care for your locs.
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/55 sm:text-xl">
              Practical lessons covering starting locs, cleansing, maintenance,
              product buildup, scalp health, and more.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="container-site py-16 sm:py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="section-label">{articles.length} lessons</span>

            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Explore the library.
            </h2>
          </div>

          <Link
            href="/guides"
            className="hidden items-center gap-2 text-sm font-bold sm:flex"
          >
            Guides
            <ArrowRight size={16} />
          </Link>
        </div>

        {articles.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <Reveal key={article.slug} delay={index * 0.06}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[2rem] border border-black/10 bg-white/60 p-10 text-center">
            <BookOpen className="mx-auto" size={28} />

            <h3 className="mt-4 font-display text-2xl font-bold">
              No lessons yet.
            </h3>

            <p className="mt-2 text-sm text-black/50">
              Check back soon for new LOCED lessons.
            </p>
          </div>
        )}
      </section>

      <section className="bg-sand py-16 sm:py-20">
        <div className="container-site">
          <FadeIn>
            <span className="pill">LEARN AT YOUR PACE</span>

            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Good loc care starts with understanding why.
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-8 text-black/60">
              Work through the lessons that match where you are in your loc
              journey. There is no single routine that works for everyone.
            </p>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
