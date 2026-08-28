"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Learn", href: "/learn" },
  { label: "Guides", href: "/guides" },
  { label: "Myths", href: "/myths" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-cream/85 backdrop-blur-xl">
      <div className="container-site">
        <div className="flex h-[72px] items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group relative"
          >
            <span className="font-display text-2xl font-bold tracking-[-0.04em]">
              LOC
              <span className="text-terracotta">ED</span>
            </span>

            <span className="absolute -bottom-1 left-0 h-px w-0 bg-terracotta transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative rounded-full px-4 py-2 text-sm font-semibold"
                >
                  {active && (
                    <motion.span
                      layoutId="active-nav"
                      className="absolute inset-0 rounded-full bg-black/5"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      active ? "text-ink" : "text-black/50 hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-2">
            <Link
              href="/learn"
              aria-label="Search the loc library"
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full
                border border-black/10
                bg-white/60
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-white
                hover:shadow-md
              "
            >
              <Search size={17} strokeWidth={1.8} />
            </Link>

            {/* MOBILE MENU */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full
                border border-black/10
                bg-white/60
                md:hidden
              "
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                  >
                    <X size={19} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                  >
                    <Menu size={19} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                height: {
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                },
                opacity: {
                  duration: 0.2,
                },
              }}
              className="overflow-hidden md:hidden"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.06,
                    },
                  },
                }}
                className="border-t border-black/5 py-4"
              >
                {navItems.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={{
                      hidden: {
                        opacity: 0,
                        x: -12,
                      },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.3,
                        },
                      },
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="
                        block rounded-xl px-4 py-3
                        text-base font-semibold
                        text-black/65
                        transition-colors
                        hover:bg-white/70
                        hover:text-ink
                      "
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
