import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";

import FadeIn from "@/components/motion/FadeIn";
import Reveal from "@/components/motion/Reveal";

import { getArticleBySlug, getArticles } from "@/lib/articles";

type LessonPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const articles = await getArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <section className="border-b border-black/10 py-16 sm:py-24">
        <div className="container-site">
          <FadeIn>
            <Link
              href="/learn"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-black/50 transition-colors hover:text-terracotta"
            >
              <ArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Back to library
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-10">
              <span className="pill">{article.category}</span>

              <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                {article.title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-black/55 sm:text-xl">
                {article.excerpt}
              </p>

              <div className="mt-7 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-black/35">
                <Clock3 size={14} />
                {article.readTime}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="container-site py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,720px)_280px] lg:justify-between">
          <article>
            <div className="space-y-10">
              {article.body.map((paragraph, index) => (
                <Reveal key={`${article.slug}-${index}`} delay={index * 0.08}>
                  <p className="text-lg leading-9 text-black/70 sm:text-xl">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-[2rem] border border-black/10 bg-white/60 p-6">
              <span className="section-label">THIS LESSON</span>

              <h2 className="mt-4 font-display text-xl font-bold">
                {article.title}
              </h2>

              <div className="my-5 h-px bg-black/10" />

              <div className="flex items-center gap-2 text-sm text-black/45">
                <Clock3 size={15} />
                {article.readTime}
              </div>

              <Link
                href="/learn"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-terracotta"
              >
                <ArrowLeft size={15} />
                All lessons
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-ink py-16 text-white sm:py-20">
        <div className="container-site">
          <FadeIn>
            <span className="pill border-white/10 bg-white/10 text-white">
              KEEP LEARNING
            </span>

            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              There&apos;s more to learn.
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-white/60">
              Continue exploring the LOCED library to build a better
              understanding of your locs and your maintenance routine.
            </p>

            <Link
              href="/learn"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Browse all lessons
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
