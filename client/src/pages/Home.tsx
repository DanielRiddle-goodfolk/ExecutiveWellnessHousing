import { useSeo, LODGING_JSONLD, yearsSince } from "@/lib/seo";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Shield, Leaf, Brain, Clock, Dumbbell } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

// Organic by Design section is hidden but preserved below. Set true to restore.
const SHOW_ORGANIC_BY_DESIGN = false;

export default function Home() {
  useSeo({
    title: "Executive Wellness Suites | Corporate Housing in La Porte, IN | The Old Ruth",
    description: "Private executive housing in La Porte, Indiana — 14 furnished suites in a sprawling historic estate with integrated wellness and strategy spaces. Chef-prepared organic meals available by arrangement. One corporate contract.",
    preloadImage: "/photos/hero-the-old-ruth-summer.webp",
    path: "/",
    jsonLd: LODGING_JSONLD,
  });

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[oklch(0.14_0.005_285/0.95)] backdrop-blur-md border-b border-[oklch(1_0_0/0.06)]">
        <div className="container flex items-center justify-between py-5">
          <div className="flex items-center gap-4">
            <img
              src="/photos/ews-monogram-ivory.svg"
              alt="Executive Wellness Suites"
              className="h-12 w-12 object-contain"
            />
            <div className="hidden sm:flex flex-col">
              <span className="font-[var(--font-display)] text-[var(--color-ivory)] text-base tracking-[0.08em]">
                Executive Wellness Suites
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-brass)]">
                The Old Ruth — Circa 1888
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6">
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

      {/* Hero Section — Asymmetric */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
          fetchPriority="high"
            src="/photos/hero-the-old-ruth-summer.webp"
            alt="The Old Ruth Estate — a sprawling historic mansion in La Porte, Indiana, seen across its lawn through mature trees"
            className="w-full h-full object-cover"
          />
          {/* Bottom-up scrim: carries the headline and the paragraph. */}
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.005_285/0.92)] via-[oklch(0.08_0.005_285/0.4)] to-[oklch(0.08_0.005_285/0.2)]" />
          {/* Top-down scrim: this photo has bright sky and dark foliage in the
              same band, so the eyebrow and the nav edge sat on wildly different
              backgrounds. Darkening the top evens it out. Note that darkening
              alone cannot rescue brass text — brass is a mid-luminance colour
              and only clears 4.5:1 against a near-white background, which is why
              the eyebrow below is ivory rather than brass. */}
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0.005_285/0.85)] via-[oklch(0.08_0.005_285/0.35)] to-transparent" />
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 container pb-20 lg:pb-28 pt-40"
        >
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-ivory)]">
                  La Porte, Indiana
                </span>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] text-[var(--color-ivory)] leading-[1.1] mb-8"
              >
                Your exclusive residential VIP hub for your team, clients, and guests
              </motion.h1>
              <motion.div variants={fadeUp}>
                <Link href="/apply">
                  <span className="inline-flex items-center gap-4 group">
                    <span className="px-8 py-4 border border-[var(--color-brass)] bg-[oklch(0.20_0.005_285/0.85)] text-[var(--color-brass-light)] text-xs tracking-[0.2em] uppercase group-hover:bg-[var(--color-brass)] group-hover:text-[var(--color-ivory)] transition-all duration-300">
                      Request a Residency
                    </span>
                    <span className="w-12 h-[1px] bg-[var(--color-brass)] group-hover:w-20 transition-all duration-300" />
                  </span>
                </Link>
              </motion.div>
            </div>
            <motion.div variants={fadeLeft} className="lg:col-span-5 lg:text-right">
              <p className="text-base text-[oklch(0.78_0.01_80)] leading-relaxed max-w-md lg:ml-auto">
                A sprawling executive residence with integrated wellness, chef-prepared
                dining by arrangement, and private strategy spaces — designed to keep your best
                people performing at their best for the full duration of your project.
                51 miles from Chicago. 35 minutes from Notre Dame and South Bend International Airport. 15 minutes from Lake Michigan.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* The Blue Zone statement — Asymmetric left-aligned */}
      <section className="pt-16 pb-28 lg:py-40">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid lg:grid-cols-12 gap-12 items-start"
          >
            <div className="lg:col-span-2 flex flex-col items-start">
              <motion.div variants={fadeUp} className="w-[1px] h-20 bg-[var(--color-brass)] mb-6" />
              <motion.p variants={fadeUp} className="whisper text-base [writing-mode:vertical-lr] rotate-180">
                {yearsSince()} Years
              </motion.p>
            </div>
            <div className="lg:col-span-7">
              <motion.p variants={fadeUp} className="whisper text-2xl lg:text-3xl mb-8">
                History echoes off every wall.
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl lg:text-[2.5rem] leading-[1.2] mb-8 text-[var(--color-charcoal)]"
              >
                For {yearsSince()} years, this sprawling estate has been a coveted veritable blue zone; a home away
                from home, a place where people live longer and think clearer.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-lg text-[var(--color-muted-foreground)] leading-relaxed"
              >
                In 1888, this mansion was built, the first of its kind, as a home for widows. They
                moved in at age sixty — and in the sanctity and beauty within these walls,
                they lived well into their hundreds, becoming a healthy tribe of centenarians.
                Something about this place added life to years and years to life. This is why we call
                it a hidden blue zone.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-lg text-[var(--color-muted-foreground)] leading-relaxed mt-6"
              >
                And now it is yours.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-lg text-[var(--color-muted-foreground)] leading-relaxed mt-6"
              >
                Today, The Old Ruth estate flings wide its doors to a different demographic; a breed
                of hearty executives and leaders, whose work demands an environment as intentional
                and excellent as their output.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Ecosystem — Dark Section */}
      <section className="py-28 lg:py-40 bg-[var(--color-charcoal)]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="mb-20"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                The Ecosystem
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl lg:text-[2.5rem] text-[var(--color-ivory)] leading-[1.2] max-w-3xl"
            >
              A turnkey executive headquarters designed for optimal performance.
            </motion.h2>
          </motion.div>

          {/* Residence + Restoration — Staggered Grid */}
          <div className="grid lg:grid-cols-12 gap-8 mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              className="lg:col-span-7 group"
            >
              <div className="aspect-[16/10] overflow-hidden mb-6">
                <img
          loading="lazy"
          decoding="async"
                  src="/photos/09.13.2023-Theoldruth-12_eaff6bd2.webp"
                  alt="The Old Ruth grand staircase and chandelier — historic executive housing in La Porte, Indiana"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-[1px] bg-[var(--color-brass)] mt-3 shrink-0" />
                <div>
                  <h3 className="text-2xl text-[var(--color-ivory)] mb-3">The Residence</h3>
                  <p className="text-xl text-[var(--color-ivory)] mb-4 italic">
                    14 private suites. A sprawling National Historic Registry mansion and estate.
                  </p>
                  <p className="text-[oklch(0.68_0.01_80)] leading-relaxed mb-4">
                    Slip away into an oasis of tranquility. Heaven on earth. The exclusivity of a
                    "Residents Only" estate, a peaceful escape.
                  </p>
                  <p className="text-[oklch(0.68_0.01_80)] leading-relaxed mb-4">
                    Designed by the same architect who designed the iconic La Porte Courthouse.
                  </p>
                  <p className="text-[oklch(0.68_0.01_80)] leading-relaxed mb-4">
                    No strangers. No noise. No pets. No televisions. Just the rest, beauty, and the
                    unmistakable feeling of home.
                  </p>
                  <p className="text-xs text-[oklch(0.55_0.01_80)] leading-relaxed mt-4">
                    3.3 acres of mature maples and walnuts · Three grand pianos · Vintage elevator · Reading library ·
                    Thinking games · A setting designed to down-regulate your
                    nervous system and signal to your body that all is well.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              className="lg:col-span-5 lg:mt-24 group"
            >
              <div className="aspect-[4/5] overflow-hidden mb-6">
                <img
          loading="lazy"
          decoding="async"
                  src="/photos/TOR-Summer-2025-53_78d4fe65.webp"
                  alt="Private furnished suite at The Old Ruth with antique art and period furnishings"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-[1px] bg-[var(--color-brass)] mt-3 shrink-0" />
                <div>
                  <h3 className="text-2xl text-[var(--color-ivory)] mb-3">The Restoration Philosophy</h3>
                  <p className="text-xs tracking-[0.15em] uppercase text-[var(--color-brass)] mb-3">
                    Complimentary — For Daily Use
                  </p>
                  <div className="space-y-3">
                    <p className="text-sm text-[oklch(0.68_0.01_80)] leading-relaxed">
                      <span className="text-[var(--color-ivory)] font-medium">Far Infrared Sauna + Red Light Therapy</span> —
                      Private sessions at The Old Ruth or Studio 7:14.
                    </p>
                    <p className="text-sm text-[oklch(0.68_0.01_80)] leading-relaxed">
                      <span className="text-[var(--color-ivory)] font-medium">Leg Compression</span> —
                      Sequential pneumatic compression therapy that improves circulation, reduces swelling,
                      accelerates recovery, and supports lymphatic drainage.
                    </p>
                    <p className="text-sm text-[oklch(0.68_0.01_80)] leading-relaxed">
                      <span className="text-[var(--color-ivory)] font-medium">The Chair (Nervous System Trainer)</span> —
                      This is where your body finally exhales. The Chair gently guides your nervous system
                      out of chaos and back into peace. Come relax, breathe, and be restored.
                    </p>
                    <p className="text-sm text-[oklch(0.68_0.01_80)] leading-relaxed">
                      <span className="text-[var(--color-ivory)] font-medium">Rebounding</span> —
                      Low-impact cardiovascular exercise that stimulates lymphatic flow, improves balance
                      and coordination, strengthens the musculoskeletal system, and boosts cellular
                      oxygenation — all without joint strain.
                    </p>
                    <p className="text-sm text-[oklch(0.68_0.01_80)] leading-relaxed">
                      <span className="text-[var(--color-ivory)] font-medium">Kloud PEMA</span> —
                      Whole-body pulsating electromagnetic activation. Twenty minutes a day to support
                      circulation, nervous-system regulation, muscular recovery, and sleep — without
                      physical exertion.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Organic by Design — Philosophy. Hidden Sept 2026; kept for later reuse.
              Flip SHOW_ORGANIC_BY_DESIGN to true to restore. */}
          {SHOW_ORGANIC_BY_DESIGN && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="mt-16 p-10 lg:p-14 border border-[oklch(1_0_0/0.08)]"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-[var(--color-brass)]" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                Organic by Design
              </span>
            </motion.div>
            <motion.h3 variants={fadeUp} className="text-2xl text-[var(--color-ivory)] mb-4 leading-[1.3]">
              Chosen to add life to your years. And years to your life.
            </motion.h3>
            <motion.p variants={fadeUp} className="text-[oklch(0.68_0.01_80)] leading-relaxed mb-8 max-w-3xl">
              Everything here is intentional. Organic in the kitchen. Organic in the laundry. Organic in the
              cleaning supplies. Organic in the fragrances. Even organic in the carpet — imported wool carpets
              from England, a historical treasure. Organic materials on the lawn. True, timeless stewardship
              doing its best to help you live life to the full.
            </motion.p>
            <motion.div variants={fadeUp} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: "Organic in the Kitchen", detail: "Every arranged meal is whole-food and certified organic. No seed oils, no soy, no gluten, no dairy." },
                { label: "Organic in the Laundry", detail: "Chemical-free detergent for every sheet, every towel, every load." },
                { label: "Organic in the Cleaning", detail: "Natural products throughout. No synthetic fragrances. No harsh chemicals." },
                { label: "Organic in the Fragrance", detail: "Essential oils only. Nothing artificial enters the air you breathe." },
                { label: "Organic Underfoot", detail: "Imported wool carpets from England — a historical treasure. No synthetics." },
                { label: "Organic on the Lawn", detail: "3.3 acres of organically treated lawn — mature maple and walnut trees, antique bulbs, and ferns. No pesticides. No herbicides." },
              ].map((item, i) => (
                <div key={i} className="border-l border-[var(--color-brass)] pl-4">
                  <p className="text-sm text-[var(--color-ivory)] font-medium mb-1">{item.label}</p>
                  <p className="text-xs text-[oklch(0.55_0.01_80)] leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} className="mt-8 text-sm text-[oklch(0.55_0.01_80)] italic">
              Weekly sheet changes and room cleans included. Complimentary on-site laundromat.
              Additional housekeeping and offsite laundry service available through the Concierge.
            </motion.p>
          </motion.div>
          )}

          {/* The Table — Full Section */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              className="lg:col-span-6"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                  The Table
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl text-[var(--color-ivory)] mb-6 leading-[1.3]">
                Real food that optimizes high capacity people.
              </h3>
              <div className="space-y-5 text-[oklch(0.72_0.01_80)] leading-relaxed">
                <p className="text-[var(--color-ivory)]">
                  Should your gathering of guests call for meals, custom food and beverage packages can be thoughtfully designed and arranged in advance for an additional fee.
                </p>
                <p className="italic">
                  These tables have carried the heart and stories of every love-filled meal served
                  in this house since its inception in 1888. They are the original farm tables —
                  built for this room, in this house, {yearsSince()} years ago.
                </p>
                <p>
                  One menu. Thousands of memories made. Food prepared the way your great-grandmother
                  would have made it — whole, organic, and honest. We focus on options that are free
                  of seed-oil, gluten, dairy, and soy.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-[oklch(1_0_0/0.08)]">
                <p className="text-sm text-[oklch(0.55_0.01_80)] tracking-wide mb-4">
                  Our dining room comfortably seats 40, and arranged meals are served family style.
                </p>
                <p className="text-sm text-[oklch(0.55_0.01_80)] tracking-wide mb-6">
                  The space is available for your additional private corporate event.
                </p>
                <Link href="/the-table">
                  <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-brass)] hover:text-[var(--color-ivory)] transition-colors duration-300 cursor-pointer">
                    View the full kitchen story →
                  </span>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              className="lg:col-span-6"
            >
              {/* Dining Room Hero */}
              <div className="aspect-[4/3] overflow-hidden mb-3">
                <img
          loading="lazy"
          decoding="async"
                  src="/photos/theoldruth08.07.2023-43(1)_f8d90acd.webp"
                  alt="The Table — formal dining room at The Old Ruth with two long tables set beneath original portraits"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Food Gallery Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square overflow-hidden">
                  <img
          loading="lazy"
          decoding="async"
                    src="/photos/IMG_7317_1cf15c1f.webp"
                    alt="Charcuterie and harvest table spread with candles and greenery at The Table, The Old Ruth"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
          loading="lazy"
          decoding="async"
                    src="/photos/IMG_7277_111d51c0.webp"
                    alt="Charcuterie board with meats, cheeses, fruits, and flowers — chef-prepared dining at The Old Ruth"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
          loading="lazy"
          decoding="async"
                    src="/photos/IMG_5504_11886f06.webp"
                    alt="Prosciutto-wrapped stuffed chicken on zucchini noodles with pesto — chef-prepared meal at The Old Ruth"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
          loading="lazy"
          decoding="async"
                    src="/photos/6C6A0B0E-kombucha_4b0f394a.webp"
                    alt="Homemade kombucha in swing-top bottles at The Old Ruth — cucumber mint, dreamsicle, strawberry lemon, ginger lime"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
          loading="lazy"
          decoding="async"
                    src="/photos/IMG_7001_befe1d93.webp"
                    alt="Family-style dinner spread at The Old Ruth — bread board, copper pitcher, asparagus, roasted meat"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
          loading="lazy"
          decoding="async"
                    src="/photos/IMG_5487_353528ce.webp"
                    alt="Nut-crusted protein on asparagus with herb cream sauce — organic dining at The Old Ruth"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Strategy Hub — A Whole World of Good */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mt-20 pt-16 border-t border-[oklch(1_0_0/0.08)]"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                Downtown — A Whole World of Good — The Upper Room
              </span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              className="lg:col-span-5"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
          loading="lazy"
          decoding="async"
                  src="/photos/IMG_4954_35ac147d.webp"
                  alt="A Whole World of Good — 10,000 sq. ft. downtown La Porte executive lounge with tin ceilings, reclaimed wood, and vintage furniture"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              className="lg:col-span-7"
            >
              <div className="p-10 lg:p-14 border border-[oklch(1_0_0/0.08)]">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-8 h-[1px] bg-[var(--color-brass)] mt-3 shrink-0" />
                  <div>
                    <h3 className="text-2xl text-[var(--color-ivory)] mb-3">A Whole World of Good</h3>
                    <p className="text-sm text-[oklch(0.55_0.01_80)] mb-4 italic">
                      Walkable from The Old Ruth · Directly across the street from Studio 7:14
                    </p>
                    <p className="text-[oklch(0.68_0.01_80)] leading-relaxed mb-4">
                      Is it an excellently sourced craft coffeehouse with single-origin, first-wave, organic
                      daily supplies of caffeine? Is it a mercantile with AIP-friendly grab-and-go snacks and
                      imported European delicacies? Is it a fashion-forward clothing boutique that in itself is
                      a delightful discovery and surprising gem? Is it a unique, one-of-a-kind artisan gift store
                      and vintage trove of curiosities? Is it the place everyone wants to be and gather?
                    </p>
                    <p className="text-[var(--color-ivory)] font-medium mb-4">
                      Why, yes! Yes it is.
                    </p>
                    <p className="text-[oklch(0.68_0.01_80)] leading-relaxed mb-6">
                      It truly is A Whole World of Good.
                    </p>
                    <p className="text-xs tracking-[0.15em] uppercase text-[var(--color-brass)] mb-2">
                      For Old Ruth Residents
                    </p>
                    <p className="text-sm text-[oklch(0.68_0.01_80)] leading-relaxed mb-4">
                      • One complimentary craft coffee or specialty drink daily per resident.<br />
                      • 15% off all products and services for the entirety of your stay.
                    </p>
                    <p className="text-xs tracking-[0.15em] uppercase text-[var(--color-brass)] mb-2 mt-6">
                      The Executive Lounge (Upgrade — Exclusively for Old Ruth Residents)
                    </p>
                    <p className="text-sm text-[oklch(0.68_0.01_80)] leading-relaxed">
                      Above A Whole World of Good sits a 3,000 square-foot lounge — available exclusively
                      to Old Ruth residents for executive meetings, strategy sessions, and whatever else
                      might be needed. Flexible configuration. The quiet of a private floor
                      above the life of downtown. Reserved at an additional day or monthly rate.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visual Tour — Photo Grid */}
      <section className="py-20 lg:py-28 bg-[oklch(0.97_0.008_80)]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="mb-12"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                Inside the Estate
              </span>
            </motion.div>
            <motion.p variants={fadeUp} className="whisper text-lg">
              Every room tells a different story.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3"
          >
            {[
              { src: "/photos/TheOldRuthMarketingPhotos87_202c46d6.webp", alt: "Private bedroom suite at The Old Ruth with warm lamp glow — furnished executive housing in La Porte", span: "col-span-2 row-span-2" },
              { src: "/photos/TOR-Summer-2025-29_2e2b4ff2.webp", alt: "Overhead view of The Old Ruth atrium with leather seating" },
              { src: "/photos/TheOldRuthMarketingPhotos75_2635d02c.webp", alt: "Library at The Old Ruth with leather chair and bookshelves" },
              { src: "/photos/TOR-Summer-2025-25_81c00b0c.webp", alt: "Chess nook with leather wingback at The Old Ruth" },
              { src: "/photos/TheOldRuthMarketingPhotos50_fc88cdb1.webp", alt: "Leather Chesterfield in the sunroom at The Old Ruth" },
              { src: "/photos/IMG_0022_0a4db764.webp", alt: "The Old Ruth — red brick historic mansion through mature trees, La Porte, Indiana", span: "col-span-2" },
              { src: "/photos/TOR-Summer-2025-40_4a31db1a.webp", alt: "Red velvet sofa with equestrian art in a common room at The Old Ruth" },
              { src: "/photos/TheOldRuthMarketingPhotos103_f4b6ee05.webp", alt: "Modern bed framed by drapery in a furnished suite at The Old Ruth" },
              { src: "/photos/TheOldRuth08.07.2023-84_fedfed38.webp", alt: "Ornate ironwork veranda of The Old Ruth, circa 1888", span: "col-span-2" },
              { src: "/photos/TheOldRuthMarketingPhotos96_f7867015.webp", alt: "Furnished bedroom with glowing lamps at The Old Ruth corporate housing" },
              { src: "/photos/09.13.2023-Theoldruth-6_94509e11.webp", alt: "Layered view through the historic rooms of The Old Ruth" },
            ].map((img, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`overflow-hidden group ${img.span || ""}`}
              >
                <div className={`w-full h-full ${img.span?.includes("row-span-2") ? "aspect-square" : "aspect-[4/3]"} overflow-hidden`}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-10 text-center"
          >
            <Link href="/gallery">
              <span className="inline-flex items-center gap-4 group">
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-brass)] group-hover:text-[var(--color-charcoal)] transition-colors duration-300">
                  View the Full Gallery
                </span>
                <span className="w-12 h-[1px] bg-[var(--color-brass)] group-hover:w-20 transition-all duration-300" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* The Quiet Marvels */}
      <section className="py-28 lg:py-40">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                The Quiet Marvels
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl lg:text-[2.5rem] leading-[1.2] mb-6 text-[var(--color-charcoal)]"
            >
              Peace so concrete you could walk on it.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-[var(--color-muted-foreground)] leading-relaxed mb-16"
            >
              The Old Ruth does not announce itself. It reveals. The longer you stay, the more you find.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-x-16 gap-y-14"
          >
            {[
              {
                number: "01",
                title: "A Vintage Working Elevator",
                description: "Spanning all four floors of the mansion. Original cage. Runs as well as the original Edison light bulb — a prized staple of the house and one of the estate's most unexpected treasures.",
              },
              {
                number: "02",
                title: "Libraries That Line the Halls",
                description: "Not a shelf. Collections. Wholesome literature and excellent food for thought — having stood the test of time in minds and hearts.",
              },
              {
                number: "03",
                title: "Thinking Games & Quiet Strategy",
                description: "Chess. Settlers of Catan. Scrabble. Cribbage. Backgammon. Dominoes. Puzzles. The analog entertainments of people who use their minds all day and want to use them differently in the evening.",
              },
              {
                number: "04",
                title: "Easels, Paint & Canvas",
                description: "Available for anyone who wants to try their hand. No skill required. No judgment. Just color, texture, and the permission to make something that didn't exist an hour ago.",
              },
              {
                number: "05",
                title: "No Televisions",
                description: "Screens available upon request only. Elimination of distraction by design. Forced cognitive recovery every evening.",
              },
              {
                number: "06",
                title: "3.3 Acres of Maples, Walnuts, and Ferns",
                description: "Daily grounding. Dawn to dusk stillness. Establish your early morning breath and bodywork routines before the rest of the world even wakes up.",
              },
              {
                number: "07",
                title: "The Innkeeper's Prized Kombucha, Maple Syrup & Walnut Wine",
                description: "Made on-site by hand. Shared from time to time over good stories, laughter, and a healthy game of chess. Enjoyed by chance.",
              },
              {
                number: "08",
                title: "Music That Down-Regulates Your Nervous System",
                description: "Wafting through the halls — you feel it before you even realize it.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start gap-6"
              >
                <span className="text-[11px] tracking-[0.25em] text-[var(--color-brass)] mt-1.5 shrink-0">
                  {item.number}
                </span>
                <div>
                  <h3 className="text-xl mb-3 text-[var(--color-charcoal)]">{item.title}</h3>
                  <p className="text-[var(--color-muted-foreground)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Grounds imagery — grounding & morning routine */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="mt-20 max-w-2xl mx-auto"
          >
            <motion.div variants={fadeUp} className="aspect-[4/3] overflow-hidden">
              <img
                src="/photos/TOR-Summer-2025-56_63950bc3.webp"
                alt="The Old Ruth estate grounds in summer — mature trees, manicured lawn, and walking paths on 3.3 acres in La Porte, Indiana"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Included with Every Residency */}
      <section className="py-28 lg:py-40 bg-[oklch(0.97_0.008_80)]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid lg:grid-cols-12 gap-12 lg:gap-20"
          >
            <div className="lg:col-span-5">
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                  Included with Every Residency
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl lg:text-[2.25rem] leading-[1.2] mb-6 text-[var(--color-charcoal)]"
              >
                What comes with your stay.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-base text-[var(--color-muted-foreground)] leading-relaxed"
              >
                Every residency includes access to the full ecosystem of wellness, community,
                and welcome.
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="lg:col-span-7">
              <div className="mb-10">
                <p className="text-xs tracking-[0.15em] uppercase text-[var(--color-brass)] mb-4">
                  Complimentary
                </p>
                <div className="space-y-3">
                  {[
                    "Wellness and Spa Services (Far Infrared Sauna, Red Light, Kloud PEMA, Leg Compression, The Chair, Rebounding, Morning PE upon request)",
                    "Organic cleaning supplies throughout",
                    "On-site laundromat with chemical-free organic detergent",
                    "Iron & ironing board",
                    "Weekly maid service (sheet changes + room clean)",
                    "One daily craft coffee or specialty drink at A Whole World of Good",
                    "15% off all products and services at AWWOG and Studio 7:14",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 py-3 border-b border-[var(--color-border)] last:border-b-0">
                      <span className="text-[var(--color-brass)] mt-0.5">✓</span>
                      <p className="text-sm text-[var(--color-muted-foreground)]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-[var(--color-brass)] mb-4">
                  Upgrades (15% Resident Discount)
                </p>
                <div className="space-y-3">
                  {[
                    "Offsite laundry service (concierge drop-off and pick-up)",
                    "Concierge maid service (additional cleans beyond weekly)",
                    "Hyperbaric Chamber (appointment required)",
                    "On-site massage (appointment required)",
                    "Executive Lounge at A Whole World of Good (day or monthly rate)",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 py-3 border-b border-[var(--color-border)] last:border-b-0">
                      <span className="text-[var(--color-brass)] mt-0.5">+</span>
                      <p className="text-sm text-[var(--color-muted-foreground)]">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-[var(--color-muted-foreground)] italic">
                  Food service is not included. Custom food and beverage packages can be designed
                  and arranged in advance as an add-on.
                </p>
              </div>

              {/* Studio 7:14 Partner Section */}
              <div className="mt-12 pt-10 border-t border-[var(--color-border)]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-[1px] bg-[var(--color-brass)]" />
                  <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                    Studio 7:14 — Included With Your Stay
                  </span>
                </div>
                <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed mb-6">
                  10,000 square feet of deliberate wellness modalities for body, soul, mind and spirit —
                  directly across the street from A Whole World of Good in historic downtown La Porte.
                  A beautiful, perfect mile — a low-impact walk from your front door.
                </p>

                {/* Complimentary for residents */}
                <p className="text-xs tracking-[0.15em] uppercase text-[var(--color-brass)] mb-3">
                  Unlimited &amp; Complimentary for Residents
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="p-4 border border-[var(--color-brass)] bg-[oklch(0.98_0.008_80)]">
                    <h5 className="text-sm font-medium text-[var(--color-charcoal)] mb-1">Far Infrared Sauna</h5>
                    <p className="text-xs text-[var(--color-muted-foreground)]">Deep, penetrating heat that raises core temperature, supports detoxification through sweat, eases muscle tension, and improves circulation. Two saunas for daily use or back-to-back sessions.</p>
                  </div>
                  <div className="p-4 border border-[var(--color-brass)] bg-[oklch(0.98_0.008_80)]">
                    <h5 className="text-sm font-medium text-[var(--color-charcoal)] mb-1">Red Light Therapy</h5>
                    <p className="text-xs text-[var(--color-muted-foreground)]">Targeted wavelengths to support cellular recovery and skin health.</p>
                  </div>
                  <div className="p-4 border border-[var(--color-brass)] bg-[oklch(0.98_0.008_80)]">
                    <h5 className="text-sm font-medium text-[var(--color-charcoal)] mb-1">Kloud PEMA</h5>
                    <p className="text-xs text-[var(--color-muted-foreground)]">Whole-body pulsating electromagnetic activation. Patented layered signals support circulation, nervous-system regulation, recovery, and sleep. 20-minute daily sessions.</p>
                  </div>
                  <div className="p-4 border border-[var(--color-brass)] bg-[oklch(0.98_0.008_80)]">
                    <h5 className="text-sm font-medium text-[var(--color-charcoal)] mb-1">Leg Compression</h5>
                    <p className="text-xs text-[var(--color-muted-foreground)]">Sequential compression therapy for circulation and recovery.</p>
                  </div>
                  <div className="p-4 border border-[var(--color-brass)] bg-[oklch(0.98_0.008_80)]">
                    <h5 className="text-sm font-medium text-[var(--color-charcoal)] mb-1">The Chair — Nervous System Trainer</h5>
                    <p className="text-xs text-[var(--color-muted-foreground)]">A zero-gravity lounger with vibroacoustic therapy. 20–30 minute sessions that shift the body from fight-or-flight to rest-and-restore.</p>
                  </div>
                </div>

                {/* Additional modalities */}
                <p className="text-xs tracking-[0.15em] uppercase text-[var(--color-brass)] mb-1">
                  Additional Modalities Available
                </p>
                <p className="text-xs text-[var(--color-muted-foreground)] mb-3">
                  15% resident discount on all additional services
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border border-[var(--color-border)] bg-[oklch(0.98_0.005_80)]">
                    <h5 className="text-sm font-medium text-[var(--color-charcoal)] mb-1">Full-Scale Apothecary</h5>
                    <p className="text-xs text-[var(--color-muted-foreground)]">Organic herbs, teas, nutraceuticals, and supplements — specifically curated for those battling chronic autoimmune dysregulation and cellular dysfunction.</p>
                  </div>
                  <div className="p-4 border border-[var(--color-border)] bg-[oklch(0.98_0.005_80)]">
                    <h5 className="text-sm font-medium text-[var(--color-charcoal)] mb-1">Wellness Chamber</h5>
                    <p className="text-xs text-[var(--color-muted-foreground)]">Full-spectrum infrared sauna paired with complementary technologies in one private session — circulation, lymphatic flow, recovery, muscle and joint comfort, cellular function, and nervous-system regulation together.</p>
                  </div>
                  <div className="p-4 border border-[var(--color-border)] bg-[oklch(0.98_0.005_80)]">
                    <h5 className="text-sm font-medium text-[var(--color-charcoal)] mb-1">PEMF Therapy</h5>
                    <p className="text-xs text-[var(--color-muted-foreground)]">PEMF works at the cellular level by restoring proper electrical charge so cells can repair, absorb nutrients, and release waste efficiently. It calms nerve irritation, reduces pain, improves micro-circulation, and lowers inflammation without physical strain. With a certified MagnaWave therapist.</p>
                  </div>
                  <div className="p-4 border border-[var(--color-border)] bg-[oklch(0.98_0.005_80)]">
                    <h5 className="text-sm font-medium text-[var(--color-charcoal)] mb-1">Cryotherapy</h5>
                    <p className="text-xs text-[var(--color-muted-foreground)]">Cold therapy spot treatment for inflammation and pain reduction.</p>
                  </div>
                  <div className="p-4 border border-[var(--color-border)] bg-[oklch(0.98_0.005_80)]">
                    <h5 className="text-sm font-medium text-[var(--color-charcoal)] mb-1">Full-Scale Massage Studio</h5>
                    <p className="text-xs text-[var(--color-muted-foreground)]">An array of massages to aid all recovery and mobility needs of all systems: circulatory, muscular, skeletal, breath, lymphatic, and cellular.</p>
                  </div>
                  <div className="p-4 border border-[var(--color-border)] bg-[oklch(0.98_0.005_80)]">
                    <h5 className="text-sm font-medium text-[var(--color-charcoal)] mb-1">Counseling & Coaching</h5>
                    <p className="text-xs text-[var(--color-muted-foreground)]">Marriage, family, wellness, and executive-level life coaching. Individual and couples sessions available.</p>
                  </div>
                  <div className="p-4 border border-[var(--color-border)] bg-[oklch(0.98_0.005_80)]">
                    <h5 className="text-sm font-medium text-[var(--color-charcoal)] mb-1">Breath & Body Classes</h5>
                    <p className="text-xs text-[var(--color-muted-foreground)]">Controlled breathwork, slow precise movement, rebounding, and group sessions — all levels welcome.</p>
                  </div>
                  <div className="p-4 border border-[var(--color-border)] bg-[oklch(0.98_0.005_80)]">
                    <h5 className="text-sm font-medium text-[var(--color-charcoal)] mb-1">Nutrition Services</h5>
                    <p className="text-xs text-[var(--color-muted-foreground)]">Personalized guidance for residents seeking targeted nutritional support. Private apothecary consultations available.</p>
                  </div>
                </div>
                <p className="mt-6 text-xs text-[var(--color-muted-foreground)]">
                  <a href="https://www.714.studio" target="_blank" rel="noopener noreferrer" className="text-[var(--color-brass)] hover:text-[var(--color-brass-light)] transition-colors">www.714.studio</a> · 714 Lincolnway, La Porte, IN · (219) 809-2028
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Sanctuary Standards — Asymmetric */}
      <section className="pt-16 pb-28 lg:py-40">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="lg:col-span-5"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                  The Sanctuary Covenant
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl lg:text-[2.25rem] leading-[1.2] mb-6 text-[var(--color-charcoal)]"
              >
                Kindness and respect are the only languages spoken on this property.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-base text-[var(--color-muted-foreground)] leading-relaxed"
              >
                The Old Ruth operates under a Sanctuary Covenant — a governing agreement that protects
                the peace and quiet, history, and charm of this beautiful place for every resident.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={stagger}
              className="lg:col-span-7 grid sm:grid-cols-2 gap-6"
            >
              {[
                {
                  icon: Shield,
                  title: "Residents Only",
                  desc: "No outside guests. This home is set aside for your employees, special guests, managers, contractors, and business associates, who will enjoy privacy and safety in a wellness community. Meeting spaces are available as you need them, for all the moments that require team bonding or exclusivity. Our staff is on site 24/7 to serve the needs of guests and home. A zero-stranger environment beyond the constraints of the negotiated agreement.",
                },
                {
                  icon: Brain,
                  title: "Low-Decibel Living",
                  desc: "The mansion is a quiet zone for peaceful living, personal and business calls, and scheduled meetings. The downtown Upper Room lounge is available for more lively events, negotiated ahead of time for the needs of all.",
                },
                {
                  title: "Kind, Wise & Tasteful",
                  icon: Leaf,
                  desc: "Our culture exists for the protection of yours. Profanity, aggression, or disrespect are unwelcome. Continued intrusive behavior can be considered a material breach warranting immediate expulsion.",
                },
                {
                  title: "Stewardship",
                  icon: Clock,
                  desc: "It is expected that all guests will respect the rich heritage and culture of this home. Pet-free. Smoke-free.",
                },
                {
                  title: "30-Day Minimum",
                  icon: Shield,
                  desc: "This is a season, not a stopover.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="p-6 border-l-2 border-[var(--color-brass)] bg-[oklch(0.97_0.008_80)]"
                >
                  <item.icon className="w-5 h-5 text-[var(--color-brass)] mb-3" />
                  <h3 className="text-lg mb-2 text-[var(--color-charcoal)]">{item.title}</h3>
                  <p className="text-[var(--color-muted-foreground)] leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Setting — The Old Ruth Grounds */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="mb-12"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                The Setting
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl lg:text-3xl leading-[1.2] text-[var(--color-charcoal)] max-w-3xl"
            >
              3.3 acres of mature maples, walnuts, and antique bulbs. A walkable historic downtown. Lakes in every direction.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-base text-[var(--color-muted-foreground)] max-w-2xl leading-relaxed"
            >
              The Old Ruth sits in the heart of La Porte, Indiana — a town experiencing a once-in-a-generation economic transformation. A $1 Billion Microsoft data center campus and a $125 Million Northwest Health hospital are bringing world-class leadership to a town that still feels like home.
            </motion.p>
          </motion.div>

          {/* Grounds + Lake Michigan */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            <motion.div variants={fadeUp} className="aspect-[4/3] overflow-hidden relative group">
              <img
                src="/photos/estate-front-summer-2026-09.webp"
                alt="Front lawn and screened porch of The Old Ruth, a circa-1888 brick mansion in La Porte, Indiana"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="text-sm text-white/90 font-medium">The Front Lawn</p>
                <p className="text-xs text-white/70">Mature trees and a wraparound screened porch</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="aspect-[4/3] overflow-hidden relative group">
              <img
                src="/photos/IMG_0020_851d9369.webp"
                alt="Tree-lined sidewalk on The Old Ruth grounds in dappled spring light — La Porte, Indiana"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="text-sm text-white/90 font-medium">The Old Ruth Grounds</p>
                <p className="text-xs text-white/70">Walkable to historic downtown</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="aspect-[4/3] overflow-hidden relative group">
              <img
                src="/photos/garden-walk-bench-2026-09.webp"
                alt="Garden path with a white cast-iron bench and birdbath beside The Old Ruth in La Porte, Indiana"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="text-sm text-white/90 font-medium">The Garden Walk</p>
                <p className="text-xs text-white/70">A quiet bench for morning coffee</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="aspect-[4/3] overflow-hidden relative group">
              <img
                src="/photos/IMG_0017_596b0ad9.webp"
                alt="Lake Michigan shoreline — 15 minutes from The Old Ruth corporate housing in La Porte"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="text-sm text-white/90 font-medium">Lake Michigan</p>
                <p className="text-xs text-white/70">15 minutes away</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Within Reach */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            <motion.h3
              variants={fadeUp}
              className="text-lg text-[var(--color-charcoal)] mb-8 tracking-wide"
            >
              Within Reach
            </motion.h3>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { img: "/photos/ItfzMiAKkwTf_e8b0a22d.webp", label: "New Buffalo Lighthouse", distance: "30 min", alt: "New Buffalo Lighthouse on Lake Michigan — 30 minutes from The Old Ruth in La Porte, Indiana" },
                { img: "/photos/E1iaw5ZJSugz_f1f64410.webp", label: "Michigan City Pier", distance: "15 min", alt: "Michigan City Pier on Lake Michigan — 15 minutes from The Old Ruth executive housing" },
                { img: "/photos/MEWdzmnUr7Vf_eacdfefe.webp", label: "Amish Country", distance: "35 min", alt: "Amish Country in northern Indiana — 35 minutes from The Old Ruth" },
                { img: "/photos/U4BoTDrBCHVP_041c6f25.webp", label: "Notre Dame", distance: "35 min", alt: "University of Notre Dame — 35 minutes from The Old Ruth in La Porte, Indiana" },
                { img: "/photos/prPapM7weGsM_8cfa364b.webp", label: "Chicago Skyline", distance: "51 miles", alt: "Chicago skyline — 51 miles from The Old Ruth corporate housing in La Porte, Indiana" },
              ].map((dest, i) => (
                <motion.div key={i} variants={fadeUp} className="group">
                  <div className="aspect-square overflow-hidden mb-3">
                    <img
                      src={dest.img}
                      alt={dest.alt}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm text-[var(--color-charcoal)] font-medium">{dest.label}</p>
                  <p className="text-xs text-[var(--color-brass)]">{dest.distance}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Joie de Vivre — The Little Local Joys */}
      <section className="py-20 lg:py-28 bg-[oklch(0.97_0.005_80)]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="mb-12"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                Joie de Vivre
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl lg:text-3xl leading-[1.2] text-[var(--color-charcoal)] max-w-3xl"
            >
              The little local joys
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-base text-[var(--color-muted-foreground)] max-w-2xl leading-relaxed"
            >
              La Porte is a town of lakes, parks, farmers markets, and live music nights. Your executives will discover a rhythm here — one that makes them want to stay.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              { img: "/photos/C4aB7WQrS8j5_cdf17919.webp", label: "La Porte County Courthouse", alt: "La Porte County Courthouse — designed by the same architect as The Old Ruth, downtown La Porte, Indiana" },
              { img: "/photos/gggj1huQwDu1_b6e08859.webp", label: "Historic Downtown", alt: "Historic downtown La Porte, Indiana — minutes from The Old Ruth executive housing" },
              { img: "/photos/eUXeb0jFjsqE_5c644d9c.webp", label: "Parks & Trails", alt: "Parks and trails in La Porte, Indiana, near The Old Ruth" },
              { img: "/photos/A4fBjGS78xg7_0e007447.webp", label: "Farmers Market", alt: "La Porte farmers market — local produce near The Old Ruth corporate housing" },
              { img: "/photos/vZrg5vP0ZiBT_958c3aac.webp", label: "Pine Lake Sunset", alt: "Sunset over Pine Lake in La Porte, Indiana" },
              { img: "/photos/IMG_4954_35ac147d.webp", label: "A Whole World of Good", alt: "A Whole World of Good — downtown La Porte coffeehouse and mercantile, a Good Folk brand" },
              { img: "/photos/bPFS6sJMhPMj_ddba9fb4.webp", label: "Studio 7:14", alt: "Studio 7:14 — 10,000 sq. ft. wellness studio at 714 Lincolnway, La Porte, Indiana" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="group">
                <div className="aspect-[4/3] overflow-hidden mb-3">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm text-[var(--color-charcoal)]">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Investment — Asymmetric CTA */}
      <section className="py-28 lg:py-40 bg-[var(--color-charcoal)]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid lg:grid-cols-12 gap-12 items-center"
          >
            <div className="lg:col-span-7">
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                  The Investment
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl lg:text-[2.5rem] text-[var(--color-ivory)] leading-[1.2] mb-8"
              >
                The environment your executives live in determines what they're capable of building.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-base text-[oklch(0.68_0.01_80)] leading-relaxed mb-10"
              >
                We offer Master Lease agreements for corporate partners who value executive retention
                and cognitive performance. One contract. Total exclusivity. Guaranteed peace.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link href="/apply">
                  <span className="inline-flex items-center gap-4 group">
                    <span className="px-8 py-4 bg-[var(--color-brass)] text-[var(--color-ivory)] text-xs tracking-[0.2em] uppercase group-hover:bg-[var(--color-brass-light)] transition-all duration-300">
                      Request a Residency
                    </span>
                    <span className="w-12 h-[1px] bg-[var(--color-brass)] group-hover:w-20 transition-all duration-300" />
                  </span>
                </Link>
              </motion.div>
            </div>
            <motion.div variants={fadeLeft} className="lg:col-span-5 hidden lg:flex flex-col items-end">
              <div className="w-[1px] h-32 bg-[var(--color-brass)] mb-6" />
              <p className="whisper text-lg text-right">
                A Sprawling Estate<br />
                14 Suites<br />
                {yearsSince()} Years<br />
                One Covenant
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer — Architectural Stamp */}
      <footer className="py-16 border-t border-[var(--color-border)]">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex items-center gap-4">
              <img
                src="/photos/ews-monogram.svg"
                alt="Executive Wellness Suites logo"
                className="h-14 w-14 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-[var(--font-display)] text-sm tracking-[0.08em] text-[var(--color-charcoal)]">
                  Executive Wellness Suites
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-brass)]">
                  The Old Ruth — Circa 1888
                </span>
              </div>
            </div>
            <div className="lg:col-span-4 text-center">
              <p className="text-sm text-[var(--color-muted-foreground)]">
                La Porte, Indiana — 51 miles from Chicago · 35 min from Notre Dame &amp; South Bend International Airport · 15 min from Lake Michigan
              </p>
              <div className="brass-rule w-16 mx-auto mt-3" />
            </div>
            <div className="lg:col-span-4 text-right">
              <p className="text-xs text-[var(--color-muted-foreground)]">
                A property of The Good Folk Family of Brands
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
