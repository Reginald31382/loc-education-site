import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  HeartPulse,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

import FadeIn from "@/components/motion/FadeIn";
import Reveal from "@/components/motion/Reveal";
import Stagger, { StaggerItem } from "@/components/motion/Stagger";

const principles = [
  {
    icon: BookOpen,
    title: "Teach the why",
    text: "Good education should explain the reasoning behind a practice instead of turning every tip into a universal rule.",
  },
  {
    icon: HeartPulse,
    title: "Health comes first",
    text: "A polished appearance should never come at the expense of scalp comfort, root health, or long-term hair integrity.",
  },
  {
    icon: Lightbulb,
    title: "Context matters",
    text: "Loc maturity, hair characteristics, lifestyle, maintenance technique, and scalp needs can all change what makes sense.",
  },
  {
    icon: ShieldCheck,
    title: "Know the limits",
    text: "Education can help people recognize concerns, but persistent pain, inflammation, or hair loss may require professional evaluation.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* HERO */}
      <section className="border-b border-black/10 py-16 sm:py-24 lg:py-28">
        <div className="container-site">
          <FadeIn>
            <span className="pill">ABOUT LOCED</span>
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
              Loc education without the guesswork.
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/55 sm:text-xl">
              LOCED is being built as a practical educational resource for
              people who want to understand their locs instead of simply
              following a list of rules.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* MISSION */}
      <section className="container-site py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
          <FadeIn>
            <span className="section-label">THE MISSION</span>

            <h2 className="mt-4 max-w-md font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Understand first. Maintain with intention.
            </h2>
          </FadeIn>

          <Reveal delay={0.1}>
            <div className="space-y-6 text-lg leading-8 text-black/65">
              <p>
                Loc care advice can be contradictory. One person says wash
                often. Another says never wash. One person prioritizes a tight
                retwist. Another avoids retwisting altogether.
              </p>

              <p>
                LOCED is designed to sit between those extremes by focusing on
                the factors that actually influence a decision: scalp needs,
                hair characteristics, loc maturity, lifestyle, maintenance
                technique, tension, and product use.
              </p>

              <p>
                The goal is not to tell everyone to care for their locs the same
                way. The goal is to help people make better-informed choices for
                their own situation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="bg-sand/45 py-16 sm:py-24">
        <div className="container-site">
          <FadeIn>
            <span className="pill">OUR PRINCIPLES</span>

            <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Four ideas guide the library.
            </h2>
          </FadeIn>

          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <StaggerItem key={principle.title}>
                  <div
                    className="
                      group
                      h-full
                      rounded-[2rem]
                      border
                      border-black/10
                      bg-white/70
                      p-6
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-white
                      hover:shadow-sm
                    "
                  >
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        bg-sand
                        transition-transform
                        duration-300
                        group-hover:scale-105
                      "
                    >
                      <Icon size={19} strokeWidth={1.8} />
                    </div>

                    <h3 className="mt-6 font-display text-xl font-bold">
                      {principle.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-black/55">
                      {principle.text}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* WHAT LOCED IS / ISN'T */}
      <section className="container-site py-16 sm:py-24">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[2rem] border border-black/10 bg-white/60 p-7 sm:p-9">
              <span className="section-label">WHAT LOCED IS</span>

              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight">
                A learning resource.
              </h2>

              <p className="mt-5 text-base leading-8 text-black/60">
                A place to learn the fundamentals of starting, washing,
                maintaining, troubleshooting, and understanding locs.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-[2rem] border border-black/10 bg-ink p-7 text-white sm:p-9">
              <span className="section-label text-white/40">
                WHAT LOCED ISN&apos;T
              </span>

              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight">
                A substitute for professional care.
              </h2>

              <p className="mt-5 text-base leading-8 text-white/60">
                Educational information can help you understand your options and
                recognize warning signs. Persistent pain, inflammation,
                significant hair loss, or other concerning symptoms should be
                evaluated by an appropriate healthcare professional.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-black/10 py-16 sm:py-20">
        <div className="container-site">
          <FadeIn>
            <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="pill">KEEP EXPLORING</span>

                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  Start building your loc knowledge.
                </h2>
              </div>

              <Link
                href="/learn"
                className="
                  group
                  inline-flex
                  w-fit
                  items-center
                  gap-3
                  rounded-full
                  bg-ink
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                Explore the library
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
