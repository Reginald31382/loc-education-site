import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";

import { getArticleBySlug, getArticles } from "@/lib/articles";
import Reveal from "@/components/motion/Reveal";
import FadeIn from "@/components/motion/FadeIn";
import CommentSection from "@/components/CommentSection";
import ApprovedComments from "@/components/ApprovedComments";

type LessonPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articles = await getArticles();

  const currentIndex = articles.findIndex((item) => item.slug === article.slug);

  const nextArticle = currentIndex !== -1 ? articles[currentIndex + 1] : null;

  return (
    <main>
      {/* HERO */}
      <section className="border-b border-black/10">
        <div className="container-site py-14 sm:py-20">
          <FadeIn>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 text-sm font-semibold text-black/55 transition-colors hover:text-ink"
            >
              <ArrowLeft size={16} />
              Back to lessons
            </Link>
          </FadeIn>

          <div className="mt-10 max-w-4xl">
            <Reveal delay={0.05}>
              <span className="pill">{article.category}</span>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-[-0.04em] sm:text-7xl">
                {article.title}
              </h1>
            </Reveal>

            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-black/60">
                {article.excerpt}
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="mt-7 flex items-center gap-2 text-sm text-black/45">
                <Clock size={16} />
                {article.readTime}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ARTICLE */}
      <section className="container-site py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <article>
            <div className="space-y-8">
              {(article.body ?? []).map((paragraph, index) => (
                <Reveal key={`${article.slug}-${index}`} delay={index * 0.04}>
                  <p className="text-lg leading-9 text-black/70 text-center">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </article>

          {/* COMMENTS */}
          <ApprovedComments articleSlug={article.slug} />

          <CommentSection articleSlug={article.slug} />

          {/* NEXT LESSON */}
          {nextArticle && (
            <section className="mt-20 border-t border-black/10 pt-12">
              <span className="section-label">Continue learning</span>

              <Link
                href={`/learn/${nextArticle.slug}`}
                className="group mt-4 flex items-center justify-between rounded-3xl border border-black/10 bg-white/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
              >
                <div>
                  <span className="text-sm text-black/45">
                    {nextArticle.category}
                  </span>

                  <h2 className="mt-2 font-display text-2xl font-bold">
                    {nextArticle.title}
                  </h2>

                  <p className="mt-2 text-sm text-black/55">
                    {nextArticle.readTime}
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={18} />
                </div>
              </Link>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
