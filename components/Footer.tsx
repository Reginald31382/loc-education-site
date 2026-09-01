import VisitCounter from "@/components/VisitCounter";
import Link from "next/link";

const links = [
  { label: "Learn", href: "/learn" },
  { label: "Products", href: "/products" },
  { label: "Guides", href: "/guides" },
  { label: "Myths", href: "/myths" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-cream py-14 sm:py-20">
      <div className="container-site">
        <div className="grid gap-12 md:grid-cols-[1.4fr_.6fr_.8fr]">
          {/* BRAND */}
          <div>
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-[-0.04em]"
            >
              LOC<span className="text-terracotta">ED</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-black/50">
              Practical loc education built around hair care, scalp health,
              professional practice, and evidence.
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <div className="section-label">Explore</div>

            <nav className="mt-4 flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="
                    w-fit text-sm font-semibold
                    text-black/55
                    transition-colors duration-200
                    hover:text-terracotta
                  "
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* APPROACH */}
          <div>
            <div className="section-label">Our approach</div>

            <p className="mt-4 text-sm leading-7 text-black/50">
              We explain the why behind loc care and distinguish evidence,
              professional practice, and personal preference.
            </p>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="mt-14 flex flex-col gap-4 border-t border-black/10 pt-6 text-xs text-black/35 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <span>© {new Date().getFullYear()} LOCED</span>

            <VisitCounter />
          </div>

          <span>Educational content. Not medical diagnosis or treatment.</span>
        </div>
      </div>
    </footer>
  );
}
