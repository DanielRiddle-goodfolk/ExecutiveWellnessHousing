import { useSeo } from "@/lib/seo";
import { Link } from "wouter";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function NotFound() {
  useSeo({
    title: "Page Not Found | The Old Ruth, La Porte, IN",
    description:
      "This page could not be found. Return to Executive Wellness Housing at The Old Ruth in La Porte, Indiana.",
    path: "/404",
    // Netlify's SPA fallback serves this with a 200, so without this a crawler
    // would treat every mistyped URL as a real, indexable page.
    noindex: true,
  });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-charcoal)]">
      {/* Navigation — pared back to a way home */}
      <nav className="border-b border-[oklch(1_0_0/0.06)]">
        <div className="container flex items-center justify-between py-5">
          <Link href="/">
            <span className="flex items-center gap-4">
              <img
                src="/photos/ewh-logo-192.webp"
                alt="Executive Wellness Housing"
                className="h-12 w-12 object-contain"
              />
              <div className="hidden sm:flex flex-col">
                <span className="font-[var(--font-display)] text-[var(--color-ivory)] text-base tracking-[0.08em]">
                  Executive Wellness Housing
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-brass)]">
                  The Old Ruth — Circa 1888
                </span>
              </div>
            </span>
          </Link>
          <Link href="/">
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-brass)] hover:text-[var(--color-ivory)] transition-colors duration-300">
              Return Home
            </span>
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex items-center">
        <div className="container py-24 lg:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid lg:grid-cols-12 gap-12 items-start"
          >
            <div className="lg:col-span-2 flex flex-col items-start">
              <motion.div
                variants={fadeUp}
                className="w-[1px] h-20 bg-[var(--color-brass)] mb-6"
              />
              <motion.p
                variants={fadeUp}
                className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]"
              >
                404
              </motion.p>
            </div>

            <div className="lg:col-span-7">
              <motion.p variants={fadeUp} className="whisper text-2xl lg:text-3xl mb-8">
                You have found a quiet corner.
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="text-3xl lg:text-[2.5rem] leading-[1.2] mb-8 text-[var(--color-ivory)] text-balance"
              >
                There is nothing on this page.
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg text-[oklch(0.78_0.01_80)] leading-relaxed max-w-xl"
              >
                The address you followed has either moved or never existed. Nothing is lost —
                the rest of the estate is exactly where you left it.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-12 flex flex-col sm:flex-row gap-4">
                <Link href="/">
                  <span className="inline-flex items-center justify-center px-8 py-4 border border-[var(--color-brass)] bg-[oklch(0.20_0.005_285/0.85)] text-[var(--color-brass-light)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-brass)] hover:text-[var(--color-ivory)] transition-all duration-300">
                    Return Home
                  </span>
                </Link>
                <Link href="/gallery">
                  <span className="inline-flex items-center justify-center px-8 py-4 text-xs tracking-[0.2em] uppercase text-[var(--color-brass)] hover:text-[var(--color-ivory)] transition-colors duration-300">
                    See the Estate
                  </span>
                </Link>
                <Link href="/apply">
                  <span className="inline-flex items-center justify-center px-8 py-4 text-xs tracking-[0.2em] uppercase text-[var(--color-brass)] hover:text-[var(--color-ivory)] transition-colors duration-300">
                    Request a Residency
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer — Architectural Stamp */}
      <footer className="py-12 border-t border-[oklch(1_0_0/0.06)]">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/photos/ewh-logo-192.webp"
              alt="EWH"
              className="h-10 w-10 object-contain"
            />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-brass)]">
              Circa 1888
            </span>
          </div>
          <p className="text-xs text-[oklch(0.65_0.01_80)]">
            A property of The Good Folk Family of Brands
          </p>
        </div>
      </footer>
    </div>
  );
}
