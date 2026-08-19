import { useSeo, LODGING_JSONLD, SITE_URL } from "@/lib/seo";
import { Link } from "wouter";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};


const FAQS = [
  {
    q: "Do you offer corporate housing near the Microsoft data center in La Porte, Indiana?",
    a: "Yes. The Old Ruth is a private residential estate in the La Porte historic district, minutes from the campus. We house corporate teams under a single Master Lease rather than renting rooms to individuals.",
  },
  {
    q: "What is the minimum length of stay?",
    a: "Thirty days. This is a season, not a stopover — the restorative effect of the environment depends on time, so we do not offer nightly or weekly stays.",
  },
  {
    q: "How many people can you house?",
    a: "Twenty rooms — fifteen suites and five bedrooms — across 30,000 square feet and 3.3 acres. The dining room seats forty for private corporate events.",
  },
  {
    q: "What does one corporate contract cover?",
    a: "Furnished private suites, a nightly chef-prepared organic dinner, daily wellness and recovery modalities, weekly housekeeping with organic linens, on-site laundry, and private strategy and meeting space. Your team arrives with luggage and nothing else to arrange.",
  },
  {
    q: "How far is La Porte from Chicago and South Bend?",
    a: "Fifty-one miles from Chicago, thirty-five minutes from Notre Dame and South Bend, and fifteen minutes from Lake Michigan.",
  },
  {
    q: "Is this an extended-stay hotel or a corporate apartment?",
    a: "Neither. It is a covenant-protected private residence. There is no front desk, no through-traffic, and no outside guests — the estate is occupied only by the residents your agreement covers.",
  },
];

export default function CorporateHousing() {
  useSeo({
    title: "Corporate Housing Near Microsoft Data Center | La Porte, IN | The Old Ruth",
    description:
      "Executive housing for teams deployed to the La Porte, Indiana Microsoft data center campus. Private suites, chef-prepared organic meals, wellness infrastructure, and meeting spaces — all under one corporate agreement.",
    path: "/corporate-housing",
    ogImage: `${SITE_URL}/photos/TOR-Summer-2025-56_63950bc3.webp`,
    preloadImage: "/photos/TOR-Summer-2025-56_63950bc3.webp",
    jsonLd: [
      LODGING_JSONLD,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  });

  return (
    <div className="min-h-screen overflow-x-hidden">
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
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/photos/TOR-Summer-2025-56_63950bc3.webp"
            alt="The Old Ruth estate — executive corporate housing in La Porte, Indiana"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.005_285/0.92)] via-[oklch(0.08_0.005_285/0.5)] to-[oklch(0.08_0.005_285/0.2)]" />
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 container pb-16 lg:pb-24 pt-40"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
            <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
              Corporate Housing · La Porte, Indiana
            </span>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl text-[var(--color-ivory)] leading-[1.15] mb-6 max-w-4xl"
          >
            Executive housing for teams deployed to the La Porte, Indiana data center campus.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-lg text-[oklch(0.78_0.01_80)] leading-relaxed max-w-2xl"
          >
            Private furnished suites in a 30,000 sq ft historic estate — with integrated wellness,
            chef-prepared organic meals, and dedicated strategy spaces. One corporate agreement.
            Everything handled.
          </motion.p>
        </motion.div>
      </section>

      {/* The Context — Why La Porte, Why Now */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid lg:grid-cols-12 gap-12"
          >
            <div className="lg:col-span-5">
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                  The Opportunity
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-2xl lg:text-3xl leading-[1.2] text-[var(--color-charcoal)] mb-6"
              >
                La Porte is experiencing a once-in-a-generation economic transformation.
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} className="lg:col-span-7">
              <p className="text-base text-[var(--color-muted-foreground)] leading-relaxed mb-6">
                A $1 Billion Microsoft data center campus and a $125 Million Northwest Health hospital
                are bringing world-class leadership to La Porte, Indiana. These multi-year builds require
                senior executives to relocate — often for 18 to 36 months — to a town that has limited
                infrastructure for the caliber of professional being deployed.
              </p>
              <p className="text-base text-[var(--color-muted-foreground)] leading-relaxed mb-6">
                The standard options — extended-stay hotels, Airbnb rentals, and corporate apartments —
                provide shelter. They do not provide an environment designed to sustain cognitive performance,
                physical health, and emotional stability over the duration of a multi-year project.
              </p>
              <p className="text-base text-[var(--color-charcoal)] font-medium leading-relaxed">
                The Old Ruth provides that environment.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 lg:py-28 bg-[var(--color-charcoal)]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                What's Included
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl lg:text-3xl text-[var(--color-ivory)] leading-[1.2] mb-16 max-w-3xl"
            >
              A turnkey executive residence — not a room in a building.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Private Furnished Suites",
                desc: "15 private suites across 30,000 sq ft. National Historic Registry mansion with 10-inch walls, antique furnishings, and 3.3 acres of organic grounds. No strangers. No noise. No pets.",
              },
              {
                title: "Chef-Prepared Organic Meals",
                desc: "Nightly family-style dinner at 6:30pm plus daily breakfast provisions. 100% organic, seed-oil free, soy free, dairy free, gluten free. AIP and Keto compliant. Original 1888 farm tables.",
              },
              {
                title: "Integrated Wellness & Recovery",
                desc: "Complimentary daily access: Far Infrared Sauna, Red Light Therapy, Leg Compression, Nervous System Trainer, Morning PE & Breathwork. 10,000 sq ft Studio 7:14 wellness center walkable from the estate.",
              },
              {
                title: "Executive Meeting Space",
                desc: "3,000 sq ft private lounge above A Whole World of Good — 5 minutes on foot. Projector wall, flexible configuration, the quiet of a private floor above downtown. Reserved for residents.",
              },
              {
                title: "Organic Environment",
                desc: "Organic in the kitchen, laundry, cleaning, fragrances, and lawn. No synthetic chemicals enter the air your people breathe. 132 Hz healing frequencies throughout the halls.",
              },
              {
                title: "One Corporate Agreement",
                desc: "Master Lease structure. One contract covers everything — housing, meals, wellness, meeting space. No individual leases. No per-diem paperwork. Your people simply arrive.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="border-l border-[var(--color-brass)] pl-6"
              >
                <h3 className="text-lg text-[var(--color-ivory)] mb-3">{item.title}</h3>
                <p className="text-sm text-[oklch(0.65_0.01_80)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Location Context */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                Location
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl lg:text-3xl leading-[1.2] text-[var(--color-charcoal)] mb-12 max-w-3xl"
            >
              In the heart of La Porte — walkable to downtown, minutes from everything.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { distance: "15 min", label: "Lake Michigan shoreline" },
              { distance: "35 min", label: "University of Notre Dame" },
              { distance: "30 min", label: "New Buffalo, MI" },
              { distance: "51 miles", label: "Downtown Chicago" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 border border-[var(--color-border)]"
              >
                <p className="text-2xl text-[var(--color-brass)] font-[var(--font-display)] mb-2">{item.distance}</p>
                <p className="text-sm text-[var(--color-muted-foreground)]">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-12 grid md:grid-cols-2 gap-6"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/photos/IMG_0020_851d9369.webp"
                alt="Tree-lined sidewalk near The Old Ruth — walkable La Porte neighborhood"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/photos/IMG_0017_596b0ad9.webp"
                alt="Lake Michigan — 15 minutes from The Old Ruth corporate housing"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Difference */}
      <section className="py-20 lg:py-28 bg-[oklch(0.97_0.008_80)]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                The Difference
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl lg:text-3xl leading-[1.2] text-[var(--color-charcoal)] mb-12 max-w-3xl"
            >
              Why this is not a hotel, an Airbnb, or a corporate apartment.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-12"
          >
            <motion.div variants={fadeUp}>
              <h3 className="text-xl text-[var(--color-charcoal)] mb-4">The Standard Option</h3>
              <div className="space-y-4 text-[var(--color-muted-foreground)] leading-relaxed">
                <p>
                  A hotel room. A $75/day food stipend that buys inflammatory, gut-distressing meals,
                  gas station coffee, and carb-laden snacks. No community. No recovery infrastructure.
                  No protection from the cumulative damage of chronic work stress.
                </p>
                <p>
                  Over 18–36 months, this environment produces executive burnout, key-person departure,
                  and project delays. The cost of replacing a single senior leader mid-project:
                  $500K–$1.5M in search, onboarding, lost momentum, and repeat.
                </p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h3 className="text-xl text-[var(--color-charcoal)] mb-4">The Old Ruth</h3>
              <div className="space-y-4 text-[var(--color-muted-foreground)] leading-relaxed">
                <p>
                  A private estate where the environment itself is engineered for sustained performance.
                  Clean food every night. Recovery modalities every morning. Peace and quiet enforced by
                  covenant. A community of like-minded professionals who understand the weight of the work.
                </p>
                <p>
                  Your people don't need to "try harder" to stay healthy. They simply live in an
                  environment where thriving is the default — not the exception. The right environment
                  requires no discipline.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Photo Strip */}
      <section className="py-4">
        <div className="grid grid-cols-4 gap-1">
          {[
            { src: "/photos/09.13.2023-Theoldruth-12_eaff6bd2.webp", alt: "Grand staircase at The Old Ruth" },
            { src: "/photos/TOR-Summer-2025-53_78d4fe65.webp", alt: "Private suite at The Old Ruth corporate housing" },
            { src: "/photos/theoldruth08.07.2023-43(1)_f8d90acd.webp", alt: "Dining room — nightly chef-prepared meals" },
            { src: "/photos/TOR-Summer-2025-29_2e2b4ff2.webp", alt: "Lounge area for executive residents" },
          ].map((img, i) => (
            <div key={i} className="aspect-[4/3] overflow-hidden">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy"
                decoding="async" />
            </div>
          ))}
        </div>
      </section>

      {/* Common Questions */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid lg:grid-cols-12 gap-12"
          >
            <motion.div variants={fadeUp} className="lg:col-span-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                  Common Questions
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl leading-[1.2] text-[var(--color-charcoal)]">
                What corporate partners ask first.
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-0">
                {FAQS.map((f) => (
                  <div key={f.q} className="py-7 border-b border-[var(--color-border)]">
                    <h3 className="text-lg text-[var(--color-charcoal)] mb-3 leading-snug">{f.q}</h3>
                    <p className="text-[var(--color-muted-foreground)] leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-[var(--color-charcoal)]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                Next Step
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl lg:text-3xl text-[var(--color-ivory)] leading-[1.2] mb-6"
            >
              Inquire about a Master Lease for your team.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base text-[oklch(0.68_0.01_80)] leading-relaxed mb-10"
            >
              We offer exclusive corporate agreements for organizations deploying leadership to
              La Porte, Indiana. One contract. Total exclusivity. Guaranteed peace. Inquire for
              pricing and terms tailored to your team size and project duration.
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
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--color-border)]">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex items-center gap-4">
              <img
                src="/photos/ewh-logo-192.webp"
                alt="EWH"
                className="h-12 w-12 object-contain"
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
                La Porte, Indiana — Corporate Housing for Executive Teams
              </p>
              <div className="brass-rule w-16 mx-auto mt-3" />
              <div className="flex items-center justify-center gap-5 mt-4">
                <Link href="/">
                  <span className="text-xs tracking-[0.15em] uppercase text-[var(--color-brass)] hover:text-[var(--color-charcoal)] transition-colors">Home</span>
                </Link>
                <Link href="/the-table">
                  <span className="text-xs tracking-[0.15em] uppercase text-[var(--color-brass)] hover:text-[var(--color-charcoal)] transition-colors">The Table</span>
                </Link>
                <Link href="/gallery">
                  <span className="text-xs tracking-[0.15em] uppercase text-[var(--color-brass)] hover:text-[var(--color-charcoal)] transition-colors">Gallery</span>
                </Link>
              </div>
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
