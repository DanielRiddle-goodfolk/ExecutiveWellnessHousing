import { useSeo, yearsSince } from "@/lib/seo";
/**
 * The Table — Dedicated Food Gallery Page
 * Design: Archival Portra aesthetic, editorial food photography
 * Purpose: Showcase the chef-prepared food add-on for corporate buyers
 */
import { Link } from "wouter";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

// All food images — graded with Archival Portra v6
const foodImages = [
  {
    src: "/photos/IMG_7317_1cf15c1f.webp",
    alt: "Charcuterie and harvest table spread with candles, greenery, and crystal",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/photos/IMG_7277_111d51c0.webp",
    alt: "Abundant charcuterie board with meats, cheeses, fruits, and flowers",
    span: "col-span-1",
  },
  {
    src: "/photos/6C6A0B0E-kombucha_4b0f394a.webp",
    alt: "Homemade kombucha in swing-top bottles — cucumber mint, dreamsicle, strawberry lemon, ginger lime",
    span: "col-span-1",
  },
  {
    src: "/photos/IMG_5504_11886f06.webp",
    alt: "Prosciutto-wrapped stuffed chicken on zucchini noodles with pesto",
    span: "col-span-1",
  },
  {
    src: "/photos/IMG_7001_befe1d93.webp",
    alt: "Family-style dinner spread — bread board, copper pitcher, asparagus, roasted meat",
    span: "col-span-1",
  },
  {
    src: "/photos/IMG_5487_353528ce.webp",
    alt: "Nut-crusted protein on asparagus with herb cream sauce",
    span: "col-span-1",
  },
  {
    src: "/photos/CommunionPreviews-85_f449a6ac.webp",
    alt: "Formal dining event — long table set with candles, florals, and fine linens",
    span: "col-span-2",
  },
  {
    src: "/photos/IMG_4059_f4880020.webp",
    alt: "Rustic kitchen shelving with stoneware, vintage bottles, and copper accents",
    span: "col-span-1",
  },
];

export default function TheTable() {
  useSeo({
    title: "The Table | Organic Chef-Prepared Dining | The Old Ruth, La Porte, IN",
    description: "Nightly chef-prepared dinner at the original 1888 farm tables. Certified organic, seed-oil free, soy free, dairy free, gluten free — served family style in a dining room that seats 40.",
    preloadImage: "/photos/theoldruth08.07.2023-43(1)_f8d90acd.webp",
    path: "/the-table",
  });

  return (
    <div className="min-h-screen bg-[oklch(0.12_0.005_285)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[oklch(0.14_0.005_285/0.95)] backdrop-blur-md border-b border-[oklch(1_0_0/0.06)]">
        <div className="container flex items-center justify-between py-5">
          <div className="flex items-center gap-4">
            <Link href="/">
              <img
                src="/photos/ewh-logo-192.webp"
                alt="Executive Wellness Housing"
                className="h-12 w-12 object-contain cursor-pointer"
              />
            </Link>
            <div className="hidden sm:flex flex-col">
              <span className="font-[var(--font-display)] text-[var(--color-ivory)] text-base tracking-[0.08em]">
                Executive Wellness Housing
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-brass)]">
                The Old Ruth — Circa 1888
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/">
              <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-brass-light)] hover:text-[var(--color-ivory)] transition-colors duration-300">
                Home
              </span>
            </Link>
            <Link href="/gallery">
              <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-brass-light)] hover:text-[var(--color-ivory)] transition-colors duration-300">
                Gallery
              </span>
            </Link>
            <Link href="/apply">
              <span className="px-6 py-2.5 border border-[var(--color-brass)] text-[var(--color-brass-light)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-brass)] hover:text-[var(--color-ivory)] transition-all duration-300">
                Request a Residency
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-[1px] bg-[var(--color-brass)]" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--color-brass)]">
                The Executive Chef Package
              </span>
              <div className="w-16 h-[1px] bg-[var(--color-brass)]" />
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl text-[var(--color-ivory)] mb-8 leading-[1.15]"
          >
            The Table
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-[oklch(0.72_0.01_80)] leading-relaxed max-w-2xl mx-auto mb-6"
          >
            Our kitchen operates on a simple premise: the human body was not designed for what
            the modern food system produces. So we don't use it.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-sm text-[oklch(0.55_0.01_80)] tracking-wide"
          >
            No seed oils · No refined sugar · No soy · No gluten · No dairy · Nothing your great-grandmother wouldn't recognize
          </motion.p>
        </motion.div>
      </section>

      {/* Dining Room Hero */}
      <section className="px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="aspect-[16/9] overflow-hidden">
            <img
          fetchPriority="high"
              src="/photos/theoldruth08.07.2023-43(1)_f8d90acd.webp"
              alt="The formal dining room — two long tables set beneath portraits and fireplace, seating 40"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[oklch(0.55_0.01_80)]">
              The Dining Room — Seats 40
            </p>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[oklch(0.55_0.01_80)]">
              Available for private corporate events
            </p>
          </div>
        </motion.div>
      </section>

      {/* The Farm Tables Story */}
      <section className="px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-[oklch(0.72_0.01_80)] leading-relaxed text-lg italic">
            These tables have carried the heart and stories of every love-filled meal served in this house
            since its inception in 1888. They are the original farm tables — built for this room, in this house,
            {yearsSince()} years ago. There is love in every bite.
          </p>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="px-6 pb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} className="space-y-6 text-[oklch(0.72_0.01_80)] leading-relaxed text-lg">
            <p>
              This is not a trend. It is a return — to whole foods, prepared with intention,
              sourced from the earth rather than a laboratory. The science is catching up to what
              common sense has always known: you are what you eat, and what most people eat is
              making them sick, slow, and tired.
            </p>
            <p className="text-[var(--color-ivory)] font-medium text-xl">
              We chose a different standard. Our residents feel the difference within days.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 pt-8 border-t border-[oklch(1_0_0/0.08)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-[var(--color-brass)] text-sm tracking-[0.15em] uppercase mb-2">Format</p>
                <p className="text-[var(--color-ivory)]">Family-style dinner</p>
                <p className="text-[oklch(0.55_0.01_80)] text-sm mt-1">One menu. One long table. One conversation.</p>
              </div>
              <div>
                <p className="text-[var(--color-brass)] text-sm tracking-[0.15em] uppercase mb-2">Standard</p>
                <p className="text-[var(--color-ivory)]">Organic · AIP · Keto-aligned</p>
                <p className="text-[oklch(0.55_0.01_80)] text-sm mt-1">Certified organic. Zero compromise.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Food Gallery Grid */}
      <section className="px-6 pb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeUp} className="mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                From Our Kitchen
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {foodImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`overflow-hidden ${img.span}`}
              >
                <div className="aspect-square overflow-hidden group">
                  <img
          loading="lazy"
          decoding="async"
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Corporate Events Section */}
      <section className="px-6 pb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={fadeUp}
            className="p-10 lg:p-14 border border-[oklch(1_0_0/0.08)]"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                Private Dining Events
              </span>
            </div>
            <h3 className="text-2xl lg:text-3xl text-[var(--color-ivory)] mb-6 leading-[1.3]">
              A 40-seat dining room for occasions that matter.
            </h3>
            <div className="space-y-4 text-[oklch(0.72_0.01_80)] leading-relaxed">
              <p>
                Board dinners. Investor meetings. Team celebrations. Strategy retreats that end
                with a meal worth remembering. Our formal dining room seats 40 beneath original
                portraits and a working fireplace — catered in-house by our executive chef with
                the same uncompromising standard applied to every plate.
              </p>
              <p>
                Available as an add-on for estate residents or as a standalone private event booking.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/apply">
                <span className="inline-block px-8 py-3 border border-[var(--color-brass)] text-[var(--color-brass-light)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-brass)] hover:text-[var(--color-ivory)] transition-all duration-300 cursor-pointer">
                  Request a Residency
                </span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="w-16 h-[1px] bg-[var(--color-brass)] mx-auto mb-10" />
          <p className="text-xl md:text-2xl text-[var(--color-ivory)] leading-relaxed mb-4 font-[var(--font-display)]">
            The menu for the day is the menu for the day.
          </p>
          <p className="text-[oklch(0.55_0.01_80)] text-sm tracking-wide">
            That's not a limitation. It's a statement.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[oklch(1_0_0/0.06)] py-12 px-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[oklch(0.45_0.01_80)]">
            Executive Wellness Housing — The Old Ruth Sanctuary
          </p>
          <div className="flex items-center gap-6">
            <Link href="/">
              <span className="text-[11px] tracking-[0.15em] uppercase text-[oklch(0.55_0.01_80)] hover:text-[var(--color-brass)] transition-colors cursor-pointer">
                Home
              </span>
            </Link>
            <Link href="/gallery">
              <span className="text-[11px] tracking-[0.15em] uppercase text-[oklch(0.55_0.01_80)] hover:text-[var(--color-brass)] transition-colors cursor-pointer">
                Gallery
              </span>
            </Link>
            <Link href="/apply">
              <span className="text-[11px] tracking-[0.15em] uppercase text-[oklch(0.55_0.01_80)] hover:text-[var(--color-brass)] transition-colors cursor-pointer">
                Apply
              </span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
