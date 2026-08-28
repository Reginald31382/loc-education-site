import { ArrowRight, CircleAlert, CircleCheck } from "lucide-react";
import Link from "next/link";

import FadeIn from "@/components/motion/FadeIn";
import Reveal from "@/components/motion/Reveal";
import Stagger, { StaggerItem } from "@/components/motion/Stagger";

const myths = [
  {
    myth: "You should never wash locs.",
    reality:
      "Scalp hygiene matters. Cleansing should be adapted to scalp needs, activity, product use, environment, and loc maturity.",
    href: "/learn/how-to-wash-locs",
  },
  {
    myth: "A tighter retwist means healthier locs.",
    reality:
      "Neatness and health are not the same thing. Excessive tension can stress the roots and contribute to hair loss.",
    href: "/learn/retwist-vs-health",
  },
  {
    myth: "More oil automatically means more moisture.",
    reality:
      "Oil and moisture are not interchangeable. Heavy or excessive products can also contribute to buildup.",
    href: "/learn/product-buildup",
  },
  {
    myth: "Pain means the style is working.",
    reality:
      "Pain, tenderness, bumps, broken hairs, or thinning can be warning signs of excessive tension.",
    href: "/learn/traction-alopecia",
  },
];

export default function MythsPage() {
  return (
    <main>
      {/* HERO */}
      <section className="border-b border-black/10 py-16 sm:py-24 lg:py-28">
        <div className="container-site">
          <FadeIn>
            <span className="pill">MYTHS & REALITY</span>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1
              className="
                mt-6
                max-w-4xl
                font-display
                text-5xl
                font-bold
                leading-[0.98]
                tracking-[-0.04em]
                text-balance
                sm:text-6xl
                lg:text-7xl
              "
            >
              Better information.
              <span className="block text-terracotta">
                Fewer loc-care myths.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/55 sm:text-xl">
              Loc care advice is everywhere. The goal here is to separate simple
              rules from the context that actually matters.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* MYTHS */}
      <section className="container-site py-16 sm:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          {myths.map((item, index) => (
            <Reveal key={item.myth} delay={index * 0.06}>
              <Link
                href={item.href}
                className="
                  group
                  block
                  h-full
                  rounded-[2rem]
                  border
                  border-black/10
                  bg-white/60
                  p-7
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:bg-white
                  hover:shadow-elevated
                  sm:p-8
                "
              >
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-black/35">
                  <CircleAlert
                    size={17}
                    strokeWidth={1.7}
                    className="text-terracotta"
                  />
                  Common claim
                </div>

                <h2 className="mt-5 font-display text-2xl font-bold leading-tight tracking-tight text-balance sm:text-3xl">
                  “{item.myth}”
                </h2>

                <div className="my-7 h-px bg-black/10" />

                <div className="flex gap-3">
                  <CircleCheck
                    size={19}
                    strokeWidth={1.7}
                    className="mt-1 shrink-0 text-moss"
                  />

                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-black/35">
                      Reality
                    </div>

                    <p className="mt-2 text-base leading-7 text-black/60">
                      {item.reality}
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex items-center gap-2 text-sm font-bold text-terracotta">
                  Read the lesson
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRINCIPLE */}
      <section className="bg-sand/45 py-16 sm:py-24">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <span className="pill">THE LOCED STANDARD</span>

              <h2 className="mt-5 max-w-xl font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                Not every tip needs to become a rule.
              </h2>
            </FadeIn>

            <Reveal delay={0.1}>
              <div className="rounded-[2rem] border border-black/10 bg-white/70 p-7 sm:p-9">
                <p className="text-lg leading-8 text-black/65">
                  Good loc education should explain what we know, where
                  individual variation matters, and when a concern deserves
                  professional attention.
                </p>

                <Link
                  href="/learn"
                  className="
                    group
                    mt-7
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-bold
                    text-terracotta
                  "
                >
                  Explore the evidence-based library
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-16 text-white sm:py-20">
        <div className="container-site">
          <Stagger className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
            <StaggerItem>
              <div>
                <span className="pill border-white/10 bg-white/10 text-white">
                  KEEP LEARNING
                </span>

                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  Go deeper than the myth.
                </h2>
              </div>
            </StaggerItem>

            <StaggerItem>
              <Link
                href="/learn"
                className="
                  group
                  inline-flex
                  w-fit
                  items-center
                  gap-3
                  rounded-full
                  bg-white
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-ink
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                Browse lessons
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </StaggerItem>
          </Stagger>
        </div>
      </section>
    </main>
  );
}
