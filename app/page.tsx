import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Droplets,
  HeartPulse,
  Scissors,
} from "lucide-react";

import FadeIn from "@/components/motion/FadeIn";
import Reveal from "@/components/motion/Reveal";
import Stagger, { StaggerItem } from "@/components/motion/Stagger";
import ArticleCard from "@/components/ArticleCard";

import { getFeaturedArticles } from "@/lib/articles";

const topics = [
  {
    icon: BookOpen,
    title: "Starting",
    text: "Choose a method and understand the early stages.",
  },
  {
    icon: Droplets,
    title: "Care",
    text: "Washing, moisture, drying, and buildup.",
  },
  {
    icon: Scissors,
    title: "Maintenance",
    text: "Retwists, interlocking, roots, and repairs.",
  },
  {
    icon: HeartPulse,
    title: "Health",
    text: "Tension, scalp concerns, breakage, and warning signs.",
  },
];

export default async function Home() {
  const articles = await getFeaturedArticles();

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <FadeIn>
              <span className="pill">LOC EDUCATION • BUILT FOR REAL LIFE</span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.02] sm:text-7xl">
                Understand your locs.
                <span className="block text-terracotta">
                  Care for them with confidence.
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-xl text-lg leading-8 text-black/65">
                A growing library for people starting, maintaining,
                troubleshooting, and learning the science behind healthy locs.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/learn"
                  className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition-transform duration-300 hover:-translate-y-1"
                >
                  Explore the library
                </Link>

                <Link
                  href="/guides"
                  className="rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-bold transition-transform duration-300 hover:-translate-y-1"
                >
                  Start here →
                </Link>
              </div>
            </FadeIn>
          </div>

          <Reveal delay={0.2}>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand shadow-xl">
                <img
                  src="https://res.cloudinary.com/jnpz4s1s/image/upload/v1787902378/locedI.png"
                  alt="Natural textured hair"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>

              <FadeIn delay={0.6}>
                <div className="absolute -bottom-5 -left-5 max-w-xs rounded-2xl bg-white p-5 shadow-xl">
                  <div className="font-display text-lg font-bold">
                    Healthy locs ≠ just neat locs.
                  </div>

                  <div className="mt-1 text-sm text-black/55">
                    Scalp health, tension, cleansing, moisture, and product
                    buildup all matter.
                  </div>
                </div>
              </FadeIn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TOPICS */}
      <section className="border-y border-black/10 py-10">
        <div className="container-site">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((topic) => {
              const Icon = topic.icon;

              return (
                <StaggerItem key={topic.title}>
                  <div className="h-full rounded-2xl bg-white/60 p-5">
                    <Icon size={22} />

                    <div className="mt-3 font-semibold">{topic.title}</div>

                    <div className="mt-1 text-sm leading-6 text-black/55">
                      {topic.text}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* FEATURED LESSONS */}
      <section className="container-site py-20">
        <div className="flex items-end justify-between">
          <div>
            <span className="pill">FEATURED LESSONS</span>

            <h2 className="mt-4 font-display text-4xl font-bold">
              Build your knowledge.
            </h2>
          </div>

          <Link
            href="/learn"
            className="hidden items-center gap-2 text-sm font-bold sm:flex"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        {articles.length > 0 ? (
          <Stagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((article) => (
              <StaggerItem key={article.slug}>
                <ArticleCard article={article} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <div className="mt-10 rounded-[2rem] border border-black/10 bg-white/60 p-8 text-center">
            <p className="text-sm text-black/50">
              Featured lessons are coming soon.
            </p>
          </div>
        )}
      </section>

      {/* PRINCIPLE */}
      <section className="bg-ink py-20 text-white">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div>
            <span className="pill border-white/20 bg-white/10 text-white">
              THE LOCED PRINCIPLE
            </span>

            <h2 className="mt-5 font-display text-4xl font-bold">
              Why does this work?
            </h2>
          </div>

          <p className="text-lg leading-8 text-white/70">
            We are building education around the “why,” not just a list of
            rules. Loc care varies with hair characteristics, scalp needs,
            lifestyle, loc maturity, and technique. The site will separate
            evidence, professional practice, and personal preference instead of
            presenting every tip as a universal truth.
          </p>
        </div>
      </section>
    </main>
  );
}
