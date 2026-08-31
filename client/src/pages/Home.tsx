import { useSeo, LODGING_JSONLD, yearsSince } from "@/lib/seo";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Shield, Leaf, Brain, Clock, ChefHat, Dumbbell } from "lucide-react";

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

export default function Home() {
  useSeo({
    title: "Executive Wellness Housing | Corporate Housing in La Porte, IN | The Old Ruth",
    description: "Private executive housing in La Porte, Indiana — 16 furnished suites in a 30,000 sq ft historic estate with integrated wellness, organic dining, and strategy spaces. One corporate contract. Everything handled.",
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
            alt="The Old Ruth Estate — a 30,000 sq. ft. historic mansion in La Porte, Indiana, seen across its lawn through mature trees"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.005_285/0.92)] via-[oklch(0.08_0.005_285/0.4)] to-[oklch(0.08_0.005_285/0.2)]" />
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
                <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
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
                A 30,000 square-foot executive residence with integrated wellness, a nightly
                chef-prepared table, and private strategy spaces — designed to keep your best
                people performing at their best for the full duration of your project.
                51 miles from Chicago. 35 minutes from Notre Dame. 15 minutes from Lake Michigan.
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
                Love echoes off every wall.
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
                moved in at age sixty — and in the sanctity and beauty of this giant hug of a house,
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
                  alt="The Old Ruth grand staircase and chandelier"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-[1px] bg-[var(--color-brass)] mt-3 shrink-0" />
                <div>
                  <h3 className="text-2xl text-[var(--color-ivory)] mb-3">The Residence</h3>
                  <p className="text-xl text-[var(--color-ivory)] mb-4 italic">
                    16 private suites. 30,000 square feet. A National Historic Registry mansion and estate.
                  </p>
                  <p className="text-[oklch(0.68_0.01_80)] leading-relaxed mb-4">
                    Slip away into an oasis of tranquility. Heaven on earth. Libraries that line the halls
                    and enliven the soul. Antique treasures in every room. The exclusivity of a "Residents Only"
                    estate with the peaceful escape that only 10-inch thick historic walls could afford.
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
                    Thinking games · Easels, paint, and canvas · A setting designed to down-regulate your
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
                  alt="The Old Ruth private suite with antique art and period furnishings"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-[1px] bg-[var(--color-brass)] mt-3 shrink-0" />
                <div>
                  <h3 className="text-2xl text-[var(--color-ivory)] mb-3">The Restoration Philosophy</h3>
                  <p className="text-[oklch(0.68_0.01_80)] leading-relaxed mb-4">
                    The Old Ruth is not a place that offers wellness. It is a place that <em>is</em> wellness.
                    The halls are filled with healing Hertz frequencies that stimulate the vagus nerve.
                    The environment itself is designed to down-regulate your nervous system — to signal
                    to your body that you are home and safe.
                  </p>
                  <p className="text-xs tracking-[0.15em] uppercase text-[var(--color-brass)] mb-3 mt-6">
                    Complimentary — For Daily Use
                  </p>
                  <div className="space-y-3">
                    <p className="text-sm text-[oklch(0.68_0.01_80)] leading-relaxed">
                      <span className="text-[var(--color-ivory)] font-medium">Morning PE, Breath & Bodywork</span> —
                      With an OG fitness expert experienced in all levels of endurance and capability.
                    </p>
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
                      out of chaos and back into peace. Come sit, breathe, and be restored.
                    </p>
                    <p className="text-sm text-[oklch(0.68_0.01_80)] leading-relaxed">
                      <span className="text-[var(--color-ivory)] font-medium">Rebounding</span> —
                      Low-impact cardiovascular exercise that stimulates lymphatic flow, improves balance
                      and coordination, strengthens the musculoskeletal system, and boosts cellular
                      oxygenation — all without joint strain.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Organic by Design — Philosophy */}
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
                { label: "Organic in the Kitchen", detail: "Whole foods, certified organic. No seed oils, no soy, no gluten, no dairy." },
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
                  Our dining room comfortably seats 40, and meals are all served family style.
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
                  alt="The formal dining room — two long tables set beneath portraits and fireplace"
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
                    alt="Charcuterie and harvest table spread with candles and greenery"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
          loading="lazy"
          decoding="async"
                    src="/photos/IMG_7277_111d51c0.webp"
                    alt="Abundant charcuterie board with meats, cheeses, fruits, and flowers"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
          loading="lazy"
          decoding="async"
                    src="/photos/IMG_5504_11886f06.webp"
                    alt="Prosciutto-wrapped stuffed chicken on zucchini noodles with pesto"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
          loading="lazy"
          decoding="async"
                    src="/photos/6C6A0B0E-kombucha_4b0f394a.webp"
                    alt="Homemade kombucha in swing-top bottles — cucumber mint, dreamsicle, strawberry lemon, ginger lime"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
          loading="lazy"
          decoding="async"
                    src="/photos/IMG_7001_befe1d93.webp"
                    alt="Family-style dinner spread — bread board, copper pitcher, asparagus, roasted meat"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
          loading="lazy"
          decoding="async"
                    src="/photos/IMG_5487_353528ce.webp"
                    alt="Nut-crusted protein on asparagus with herb cream sauce"
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
                Downtown — A Whole World of Good
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
                  alt="A Whole World of Good — 10,000 sq. ft. downtown executive lounge with tin ceilings, reclaimed wood, and vintage furniture"
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
                      10,000 square feet of community, discovery, and daily delight in historic downtown
                      La Porte. It has earned its name well — because it is.
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
                      might be needed. Projector wall. Flexible configuration. The quiet of a private floor
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
              { src: "/photos/TheOldRuthMarketingPhotos87_202c46d6.webp", alt: "Bedroom framed through doorway with warm lamp glow", span: "col-span-2 row-span-2" },
              { src: "/photos/TOR-Summer-2025-29_2e2b4ff2.webp", alt: "Overhead atrium view with leather seating" },
              { src: "/photos/TheOldRuthMarketingPhotos75_2635d02c.webp", alt: "Library with leather chair and bookshelves" },
              { src: "/photos/TOR-Summer-2025-25_81c00b0c.webp", alt: "Chess nook with leather wingback" },
              { src: "/photos/TheOldRuthMarketingPhotos50_fc88cdb1.webp", alt: "Leather Chesterfield in bright sunroom" },
              { src: "/photos/IMG_0022_0a4db764.webp", alt: "Red brick mansion through mature trees", span: "col-span-2" },
              { src: "/photos/TOR-Summer-2025-40_4a31db1a.webp", alt: "Red velvet sofa with equestrian art" },
              { src: "/photos/TheOldRuthMarketingPhotos103_f4b6ee05.webp", alt: "Modern bed framed by drapery" },
              { src: "/photos/TheOldRuth08.07.2023-84_fedfed38.webp", alt: "Ornate ironwork veranda", span: "col-span-2" },
              { src: "/photos/TheOldRuthMarketingPhotos96_f7867015.webp", alt: "Bed scene with glowing lamps" },
              { src: "/photos/09.13.2023-Theoldruth-6_94509e11.webp", alt: "Layered interior view through rooms" },
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
                title: "Three Grand Pianos",
                description: "Placed throughout the estate for whoever feels moved to play. No audience required. No performance expected. Just the instrument and the peace around it.",
              },
              {
                number: "02",
                title: "A Vintage Working Elevator",
                description: "Spanning all four floors of the mansion. Original cage. Brass fixtures. Runs as well as the original Edison light bulb — a prized staple of the house and one of the estate's most unexpected treasures.",
              },
              {
                number: "03",
                title: "Libraries That Line the Halls",
                description: "Not a shelf. Collections. Wholesome literature and excellent food for thought — richly bound, having stood the test of time in minds and hearts. One hour feels like a grand passing of time, great adventure, and decades of wisdom.",
              },
              {
                number: "04",
                title: "Thinking Games & Quiet Strategy",
                description: "Settlers of Catan. Scrabble. Cribbage. Chess. Backgammon. Card tables. Puzzles. The analog entertainments of people who use their minds all day and want to use them differently in the evening.",
              },
              {
                number: "05",
                title: "Easels, Paint & Canvas",
                description: "Available for anyone who wants to try their hand. No skill required. No judgment. Just color, texture, and the permission to make something that didn't exist an hour ago.",
              },
              {
                number: "06",
                title: "No Televisions",
                description: "Screens available upon request only. Elimination of distraction by design. Forced cognitive recovery every evening.",
              },
              {
                number: "07",
                title: "3.3 Acres of Maples, Walnuts, and Ferns",
                description: "Daily grounding. Dawn to dusk stillness. Establish your early morning breath and bodywork routines before the rest of the world even wakes up.",
              },
              {
                number: "08",
                title: "The Innkeeper's Prized Kombucha, Maple Syrup & Walnut Wine",
                description: "Made on-site by hand. Shared from time to time over good stories, laughter, and a healthy game of chess. Enjoyed by chance.",
              },
              {
                number: "09",
                title: "Healing Hertz Frequencies",
                description: "Wafting through the halls — you feel it before your brain even notices its pleasant effect.",
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
                alt="The Old Ruth estate grounds in summer — mature trees, manicured lawn, and walking paths"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-16 pt-12 border-t border-[var(--color-border)]"
          >
            <p className="whisper text-lg max-w-2xl italic">
              "Love echoes off every wall — because of the rich history of laughter they've held."
            </p>
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
                Every residency includes access to the full ecosystem — wellness, community,
                and the daily rhythms that make this place what it is.
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="lg:col-span-7">
              <div className="mb-10">
                <p className="text-xs tracking-[0.15em] uppercase text-[var(--color-brass)] mb-4">
                  Complimentary
                </p>
                <div className="space-y-3">
                  {[
                    "Wellness and Spa Services (Far Infrared Sauna, Red Light, Leg Compression, The Chair, Rebounding, Morning PE)",
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
                  A beautiful and low-impact walk from your front door.
                </p>

                {/* Complimentary for residents */}
                <p className="text-xs tracking-[0.15em] uppercase text-[var(--color-brass)] mb-3">
                  Unlimited &amp; Complimentary for Residents
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="p-4 border border-[var(--color-brass)] bg-[oklch(0.98_0.008_80)]">
                    <h5 className="text-sm font-medium text-[var(--color-charcoal)] mb-1">Far Infrared Sauna</h5>
                    <p className="text-xs text-[var(--color-muted-foreground)]">Two additional saunas for daily use or back-to-back sessions.</p>
                  </div>
                  <div className="p-4 border border-[var(--color-brass)] bg-[oklch(0.98_0.008_80)]">
                    <h5 className="text-sm font-medium text-[var(--color-charcoal)] mb-1">Red Light Therapy</h5>
                    <p className="text-xs text-[var(--color-muted-foreground)]">Targeted wavelengths to support cellular recovery and skin health.</p>
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
                    <p className="text-xs text-[var(--color-muted-foreground)]">Organic herbs, teas, and nutraceuticals — specifically curated for those battling chronic autoimmune dysregulation.</p>
                  </div>
                  <div className="p-4 border border-[var(--color-border)] bg-[oklch(0.98_0.005_80)]">
                    <h5 className="text-sm font-medium text-[var(--color-charcoal)] mb-1">Halotherapy</h5>
                    <p className="text-xs text-[var(--color-muted-foreground)]">Private salt-air environment for respiratory and skin support.</p>
                  </div>
                  <div className="p-4 border border-[var(--color-border)] bg-[oklch(0.98_0.005_80)]">
                    <h5 className="text-sm font-medium text-[var(--color-charcoal)] mb-1">PEMF Therapy</h5>
                    <p className="text-xs text-[var(--color-muted-foreground)]">PEMF works at the cellular level by restoring proper electrical charge so cells can repair, absorb nutrients, and release waste efficiently. It calms nerve irritation, reduces pain, improves micro-circulation, and lowers inflammation without physical strain. With a certified MagnaWave therapist.</p>
                  </div>
                  <div className="p-4 border border-[var(--color-border)] bg-[oklch(0.98_0.005_80)]">
                    <h5 className="text-sm font-medium text-[var(--color-charcoal)] mb-1">Cryotherapy</h5>
                    <p className="text-xs text-[var(--color-muted-foreground)]">Cold therapy for inflammation reduction and nervous system activation.</p>
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
                    <p className="text-xs text-[var(--color-muted-foreground)]">Personalized guidance for residents seeking targeted nutritional support.</p>
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
                  desc: "No outside guests, family members, or business associates on the grounds. Zero-stranger environment beyond the constraints of the negotiated agreement.",
                },
                {
                  icon: Brain,
                  title: "Low-Decibel Living",
                  desc: "The mansion is a quiet zone. Business calls and meetings happen at the downtown lounge unless otherwise negotiated ahead of time for the needs of all.",
                },
                {
                  title: "Kind, Wise & Tasteful",
                  icon: Leaf,
                  desc: "Profanity, aggression, or disrespect is a material breach. Immediate termination of residency.",
                },
                {
                  title: "Stewardship",
                  icon: Clock,
                  desc: `Residents are temporary custodians of a ${yearsSince()}-year-old historic treasure. Pet-free. Smoke-free.`,
                },
                {
                  title: "Nutritional Sovereignty",
                  icon: ChefHat,
                  desc: "No outside food violating the organic/seed-oil-free, soy-free, dairy-free, gluten-free standard in shared spaces.",
                },
                {
                  title: "30-Day Minimum",
                  icon: Shield,
                  desc: "This is a season, not a stopover. Transformation requires time.",
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
                src="/photos/IMG_0020_851d9369.webp"
                alt="Tree-lined sidewalk on The Old Ruth grounds — dappled spring light"
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
                src="/photos/IMG_0017_596b0ad9.webp"
                alt="Lake Michigan shoreline — 15 minutes from The Old Ruth"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="text-sm text-white/90 font-medium">Lake Michigan</p>
                <p className="text-xs text-white/70">15 minutes away</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Destination Ring */}
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
              The Destination Ring
            </motion.h3>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { img: "/photos/ItfzMiAKkwTf_e8b0a22d.webp", label: "New Buffalo Lighthouse", distance: "30 min" },
                { img: "/photos/E1iaw5ZJSugz_f1f64410.webp", label: "Michigan City Pier", distance: "15 min" },
                { img: "/photos/MEWdzmnUr7Vf_eacdfefe.webp", label: "Amish Country", distance: "35 min" },
                { img: "/photos/U4BoTDrBCHVP_041c6f25.webp", label: "Notre Dame", distance: "35 min" },
                { img: "/photos/prPapM7weGsM_8cfa364b.webp", label: "Chicago Skyline", distance: "51 miles" },
              ].map((dest, i) => (
                <motion.div key={i} variants={fadeUp} className="group">
                  <div className="aspect-square overflow-hidden mb-3">
                    <img
                      src={dest.img}
                      alt={dest.label}
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
              { img: "/photos/C4aB7WQrS8j5_cdf17919.webp", label: "La Porte County Courthouse" },
              { img: "/photos/gggj1huQwDu1_b6e08859.webp", label: "Historic Downtown" },
              { img: "/photos/eUXeb0jFjsqE_5c644d9c.webp", label: "Parks & Trails" },
              { img: "/photos/A4fBjGS78xg7_0e007447.webp", label: "Farmers Market" },
              { img: "/photos/vZrg5vP0ZiBT_958c3aac.webp", label: "Pine Lake Sunset" },
              { img: "/photos/IMG_4954_35ac147d.webp", label: "A Whole World of Good" },
              { img: "/photos/bPFS6sJMhPMj_ddba9fb4.webp", label: "Studio 7:14" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="group">
                <div className="aspect-[4/3] overflow-hidden mb-3">
                  <img
                    src={item.img}
                    alt={item.label}
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
                30,000 sq. ft.<br />
                16 Suites<br />
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
                src="/photos/ewh-logo-192.webp"
                alt="EWH"
                className="h-14 w-14 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-[var(--font-display)] text-sm tracking-[0.08em] text-[var(--color-charcoal)]">
                  Executive Wellness Housing
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-brass)]">
                  The Old Ruth — Circa 1888
                </span>
              </div>
            </div>
            <div className="lg:col-span-4 text-center">
              <p className="text-sm text-[var(--color-muted-foreground)]">
                La Porte, Indiana — 51 miles from Chicago · 35 min from Notre Dame · 15 min from Lake Michigan
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
