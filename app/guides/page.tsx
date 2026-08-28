import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import FadeIn from "@/components/motion/FadeIn";
import Reveal from "@/components/motion/Reveal";
import Stagger, { StaggerItem } from "@/components/motion/Stagger";

const guides = [
  {
    number: "01",
    title: "Starting your loc journey",
    description:
      "Understand the foundation, starter methods, early changes, and what to expect before worrying about perfection.",
    href: "/learn/starter-locs",
    points: [
      "Starter loc expectations",
      "Early-stage changes",
      "Protecting the foundation",
    ],
  },
  {
    number: "02",
    title: "Building a care routine",
    description:
      "Learn how cleansing, drying, moisture, activity, and product choices fit into a sustainable routine.",
    href: "/learn/how-to-wash-locs",
    points: [
      "Cleansing fundamentals",
      "Drying and moisture",
      "Product awareness",
    ],
  },
  {
    number: "03",
    title: "Maintaining healthy roots",
    description:
      "Understand maintenance frequency, tension, retwisting, loc weight, and the difference between neatness and health.",
    href: "/learn/retwist-vs-health",
    points: ["Retwist considerations", "Tension awareness", "Root health"],
  },
];

export default function GuidesPage() {
  return (
    <main>
      {/* HERO */}
      <section className="border-b border-black/10 py-16 sm:py-24 lg:py-28">
        <div className="container-site">
          <FadeIn>
            <span className="pill">START HERE</span>
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
              A better way to learn your locs.
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/55 sm:text-xl">
              Start with the fundamentals, then build your routine around what
              your hair, scalp, lifestyle, and loc maturity actually need.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* GUIDES */}
      <section className="container-site py-16 sm:py-24">
        <div className="grid gap-5 lg:grid-cols-3">
          {guides.map((guide, index) => (
            <Reveal key={guide.number} delay={index * 0.08}>
              <Link
                href={guide.href}
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
                "
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-4xl font-bold text-black/10">
                    {guide.number}
                  </span>

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-black/10
                      transition-all
                      duration-300
                      group-hover:border-terracotta
                      group-hover:bg-terracotta
                      group-hover:text-white
                    "
                  >
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>

                <h2 className="mt-10 font-display text-2xl font-bold tracking-tight">
                  {guide.title}
                </h2>

                <p className="mt-4 text-sm leading-7 text-black/55">
                  {guide.description}
                </p>

                <div className="mt-7 space-y-3 border-t border-black/10 pt-6">
                  {guide.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3 text-sm text-black/60"
                    >
                      <CheckCircle2
                        size={16}
                        strokeWidth={1.7}
                        className="shrink-0 text-moss"
                      />

                      <span>{point}</span>
                    </div>
                  ))}
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
              <span className="pill">THE LOCED APPROACH</span>

              <h2 className="mt-5 max-w-xl font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                Learn the why, not just the rules.
              </h2>
            </FadeIn>

            <Reveal delay={0.1}>
              <div className="rounded-[2rem] border border-black/10 bg-white/70 p-7 sm:p-9">
                <p className="text-lg leading-8 text-black/65">
                  Loc care is not one-size-fits-all. A good routine considers
                  scalp needs, hair characteristics, loc maturity, lifestyle,
                  maintenance technique, and the amount of tension or product
                  involved.
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
                  Explore the full library
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
                  READY TO LEARN?
                </span>

                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  Browse every lesson.
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
                View library
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
