import { useSeo, yearsSince } from "@/lib/seo";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

// --- Gallery Data ---
interface GalleryImage {
  src: string;
  alt: string;
  aspect?: "portrait" | "landscape" | "square";
}

interface GallerySection {
  id: string;
  title: string;
  subtitle?: string;
  images: GalleryImage[];
}

const sections: GallerySection[] = [
  {
    id: "estate",
    title: "The Estate",
    subtitle: "Four acres of century-old trees, brick, and quiet.",
    images: [
      { src: "/photos/theoldruthmarketingphotos184_d017cadf.webp", alt: "The Old Ruth in winter — full facade with American flag and snow-covered grounds", aspect: "landscape" },
      { src: "/photos/IMG_0022_0a4db764.webp", alt: "Red brick mansion through mature trees with rhododendrons in bloom", aspect: "landscape" },
      { src: "/photos/IMG_0948_d203ed6f.webp", alt: "Autumn exterior with golden lawn and low sun", aspect: "landscape" },
      { src: "/photos/TheOldRuth08.07.2023-84_fedfed38.webp", alt: "Ornate ironwork veranda beneath mature trees", aspect: "landscape" },
      { src: "/photos/TOR-Summer-2025-56_5baec9be.webp", alt: "Side angle of the estate showing lush green grounds", aspect: "portrait" },
      { src: "/photos/TheOldRuth-10.21.2023-9_026aaebb.webp", alt: "White porch columns framing autumn trees", aspect: "landscape" },
      { src: "/photos/IMG_0007_424b1f78.webp", alt: "Winter porch with sun flare through bare branches", aspect: "landscape" },
      { src: "/photos/TheOldRuth08.07.2023-81_31fd3b90.webp", alt: "Screened porch with wicker chairs and colorful textiles", aspect: "landscape" },
    ],
  },
  {
    id: "interior",
    title: "The Grand Interior",
    subtitle: `Room after room of curated beauty, layered over ${yearsSince()} years.`,
    images: [
      { src: "/photos/09.13.2023-Theoldruth-12_eaff6bd2.webp", alt: "Grand staircase with patterned carpet runner and chandelier", aspect: "portrait" },
      { src: "/photos/TOR-Summer-2025-29_2e2b4ff2.webp", alt: "Overhead atrium view with leather seating and balcony railing", aspect: "landscape" },
      { src: "/photos/TheOldRuthMarketingPhotos60_06822fbb.webp", alt: "Lamps glowing across layered lounge with long sightlines", aspect: "landscape" },
      { src: "/photos/09.13.2023-Theoldruth-6_94509e11.webp", alt: "Layered interior view through rooms with lamp and architectural depth", aspect: "landscape" },
      { src: "/photos/TheOldRuthMarketingPhotos75_2635d02c.webp", alt: "Library sitting area with leather chair and bookshelves", aspect: "landscape" },
      { src: "/photos/TOR-Summer-2025-25_81c00b0c.webp", alt: "Chess nook with leather wingback and hanging lantern", aspect: "landscape" },
      { src: "/photos/TOR-Summer-2025-38_c454ae2c.webp", alt: "Long hallway with antique armoire and sitting area", aspect: "landscape" },
      { src: "/photos/TheOldRuthMarketingPhotos50_fc88cdb1.webp", alt: "Leather Chesterfield in bright sunroom with plants", aspect: "landscape" },
      { src: "/photos/TheOldRuthMarketingPhotos38_00b743a2.webp", alt: "Piano corner with cozy chair, throw, and layered textures", aspect: "landscape" },
      { src: "/photos/TheOldRuthMarketingPhotos46_62af9e97.webp", alt: "Mustard sofa with layered pillows and bright windows", aspect: "landscape" },
      { src: "/photos/TOR-Summer-2025-40_4a31db1a.webp", alt: "Red velvet sofa with equestrian art and stained glass", aspect: "landscape" },
      { src: "/photos/PlayingGrandPianoColorEditNOCROP_14b4e390.webp", alt: "Grand piano in the writing studio", aspect: "landscape" },
      { src: "/photos/TheOldRuthMarketingPhotos54_bd5364ab.webp", alt: "Plush armchair with amber pillow and soft lamp", aspect: "landscape" },
    ],
  },
  {
    id: "suites",
    title: "The Suites",
    subtitle: "Each room has its own story. None are alike.",
    images: [
      { src: "/photos/TOR-Summer-2025-53_78d4fe65.webp", alt: "Gold-framed paintings, white daybed, warm lamp, and macrame", aspect: "landscape" },
      { src: "/photos/TheOldRuthMarketingPhotos87_202c46d6.webp", alt: "Bedroom framed through doorway with warm lamp glow", aspect: "landscape" },
      { src: "/photos/TheOldRuthMarketingPhotos103_f4b6ee05.webp", alt: "Modern bed framed by drapery with tall walls", aspect: "portrait" },
      { src: "/photos/TheOldRuthMarketingPhotos96_f7867015.webp", alt: "Bed scene with glowing lamps and textile detail", aspect: "landscape" },
      { src: "/photos/TheOldRuthMarketingPhotos118_ee45be15.webp", alt: "Bright bed beside stained-glass panel window", aspect: "landscape" },
      { src: "/photos/TOR-Summer-2025-5_5bb854e9.webp", alt: "Iron bed with vintage chair, radiator, and warm lamp", aspect: "landscape" },
      { src: "/photos/TheOldRuthMarketingPhotos10_c62eb55b.webp", alt: "Bedroom through doorway with trunk and folded towels", aspect: "landscape" },
      { src: "/photos/TOR-Summer-2025-14_6f0b7c2a.webp", alt: "Compact room with black-and-white palette through doorway", aspect: "landscape" },
      { src: "/photos/TOR-Summer-2025-41_8f96368b.webp", alt: "Iron bed with Don Quixote art and curtain framing", aspect: "landscape" },
      { src: "/photos/TOR-Summer-2025-18_c9f66902.webp", alt: "Dark wall with artwork and dresser vignette", aspect: "landscape" },
    ],
  },
  {
    id: "details",
    title: "The Details",
    subtitle: "The things you notice on the second look.",
    images: [
      { src: "/photos/theoldruth08.07.2023-36_b2e50d1d.webp", alt: "Green and gold tile kitchenette", aspect: "landscape" },
      { src: "/photos/TheOldRuthMarketingPhotos117_2e5aac24.webp", alt: "Game table with golden rug and patterned drapery", aspect: "landscape" },
      { src: "/photos/theoldruth08.07.2023-43_039032e8.webp", alt: "Architectural detail and period furnishings", aspect: "landscape" },
    ],
  },
  {
    id: "wellness",
    title: "The Wellness Ecosystem",
    subtitle: "Studio 7:14 — adjacent to the estate.",
    images: [
      { src: "/photos/10.21.2025-4_c0e84efa.webp", alt: "Spa treatment room with massage table and robe", aspect: "landscape" },
      { src: "/photos/10.21.2025-7_8b328fff.webp", alt: "Organic oils, herbs, and wellness ingredients", aspect: "landscape" },
    ],
  },
  {
    id: "setting",
    title: "The Setting",
    subtitle: "La Porte, Indiana — 60 miles from Chicago, a world apart.",
    images: [
      { src: "/photos/IMG_0952_542bd31f.webp", alt: "Autumn sidewalk under golden canopy", aspect: "landscape" },
      { src: "/photos/IMG_0951_e3ce5103.webp", alt: "Golden fall sidewalk with sunbeam", aspect: "landscape" },
      { src: "/photos/IMG_0020_9e390603.webp", alt: "Tree-lined neighborhood sidewalk in summer", aspect: "landscape" },
      { src: "/photos/IMG_0017_f0a0a623.webp", alt: "Lake Michigan water and sky", aspect: "landscape" },
    ],
  },
];

// --- Lightbox Component ---
function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[oklch(0.08_0.005_285/0.97)] backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-[var(--color-ivory)]/70 hover:text-[var(--color-ivory)] transition-colors z-10"
      >
        <X size={28} strokeWidth={1} />
      </button>

      {/* Navigation */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 text-[var(--color-ivory)]/50 hover:text-[var(--color-ivory)] transition-colors z-10"
      >
        <ChevronLeft size={36} strokeWidth={1} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 text-[var(--color-ivory)]/50 hover:text-[var(--color-ivory)] transition-colors z-10"
      >
        <ChevronRight size={36} strokeWidth={1} />
      </button>

      {/* Image */}
      <motion.img
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className="max-w-[90vw] max-h-[85vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[var(--color-ivory)]/50 text-xs tracking-[0.2em]">
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  );
}

// --- Gallery Page ---
export default function Gallery() {
  useSeo({
    title: "Photo Gallery | The Old Ruth Executive Wellness Suites | La Porte, IN",
    description: "Inside the estate: suites, common rooms, grounds, and the original 1888 farm tables of a 30,000 sq ft National Historic Registry mansion in La Porte, Indiana.",
    path: "/gallery",
  });

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((sectionImages: GalleryImage[], index: number) => {
    setLightboxImages(sectionImages);
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % lightboxImages.length);
  }, [lightboxImages.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length);
  }, [lightboxImages.length]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!lightboxOpen) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  // Attach keyboard listener
  useState(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="min-h-screen bg-[var(--color-ivory)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-ivory)]/95 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="container flex items-center justify-between py-5">
          <Link href="/">
            <span className="flex items-center gap-4">
              <img
                src="/photos/ewh-logo-192.webp"
                alt="Executive Wellness Housing"
                className="h-12 w-12 object-contain"
              />
              <div className="hidden sm:flex flex-col">
                <span className="font-[var(--font-display)] text-[var(--color-charcoal)] text-base tracking-[0.08em]">
                  Executive Wellness Housing
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-brass)]">
                  A Private Tour
                </span>
              </div>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/">
              <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-brass)] hover:text-[var(--color-charcoal)] transition-colors duration-300">
                Return Home
              </span>
            </Link>
            <Link href="/apply">
              <span className="hidden sm:inline-block px-5 py-2 border border-[var(--color-brass)] text-[var(--color-brass)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-brass)] hover:text-[var(--color-ivory)] transition-all duration-300">
                Inquire
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero / Page Header */}
      <section className="pt-36 pb-20 md:pt-44 md:pb-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="container max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
            <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
              Gallery
            </span>
            <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl text-[var(--color-charcoal)] leading-[1.1] mb-6"
          >
            A Private Tour
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="whisper text-lg sm:text-xl"
          >
            Fifteen suites. Four acres. {yearsSince()} years of story.
          </motion.p>
        </motion.div>
      </section>

      {/* Gallery Sections */}
      {sections.map((section, sectionIdx) => (
        <section key={section.id} className="pb-24 md:pb-32">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="container max-w-5xl mx-auto mb-12"
          >
            <motion.div variants={fadeUp} className="brass-rule mb-10" />
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-brass)] block mb-2">
                  {String(sectionIdx + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl sm:text-3xl text-[var(--color-charcoal)]">
                  {section.title}
                </h2>
              </div>
              {section.subtitle && (
                <p className="whisper text-sm md:text-base max-w-sm text-right">
                  {section.subtitle}
                </p>
              )}
            </motion.div>
          </motion.div>

          {/* Image Grid — varies by section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="container max-w-6xl mx-auto"
          >
            {/* First section (Estate) — hero image + grid */}
            {section.id === "estate" && (
              <div className="space-y-3">
                {/* Lead hero image */}
                <motion.div
                  variants={fadeIn}
                  className="w-full aspect-[16/7] overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(section.images, 0)}
                >
                  <img
                    src={section.images[0].src}
                    alt={section.images[0].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    loading="eager"
                  />
                </motion.div>
                {/* Grid of remaining */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {section.images.slice(1).map((img, i) => (
                    <motion.div
                      key={i}
                      variants={fadeIn}
                      className="aspect-[4/3] overflow-hidden cursor-pointer group"
                      onClick={() => openLightbox(section.images, i + 1)}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Interior — masonry-style 2-column with varied heights */}
            {section.id === "interior" && (
              <div className="columns-1 md:columns-2 gap-3 space-y-3">
                {section.images.map((img, i) => (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    className="break-inside-avoid overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(section.images, i)}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Suites — hero + 2-col grid */}
            {section.id === "suites" && (
              <div className="space-y-3">
                {/* Lead image */}
                <motion.div
                  variants={fadeIn}
                  className="w-full aspect-[16/8] overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(section.images, 0)}
                >
                  <img
                    src={section.images[0].src}
                    alt={section.images[0].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </motion.div>
                {/* 2-col grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {section.images.slice(1).map((img, i) => (
                    <motion.div
                      key={i}
                      variants={fadeIn}
                      className={`overflow-hidden cursor-pointer group ${img.aspect === "portrait" ? "row-span-2" : ""}`}
                      onClick={() => openLightbox(section.images, i + 1)}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] ${img.aspect === "portrait" ? "h-full" : "aspect-[3/2]"}`}
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Details — 3-column row */}
            {section.id === "details" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {section.images.map((img, i) => (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    className="aspect-square overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(section.images, i)}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Wellness — single feature with caption */}
            {section.id === "wellness" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {section.images.map((img, i) => (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    className="aspect-[4/3] overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(section.images, i)}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Setting — horizontal strip */}
            {section.id === "setting" && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {section.images.map((img, i) => (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    className="aspect-[3/4] overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(section.images, i)}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </section>
      ))}

      {/* Closing CTA */}
      <section className="py-20 md:py-28 bg-[oklch(0.14_0.005_285)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="container max-w-3xl mx-auto text-center"
        >
          <motion.p variants={fadeUp} className="whisper text-lg mb-8 text-[var(--color-brass-light)] text-balance">
            There is more to find here than photographs can hold.
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl text-[var(--color-ivory)] mb-10">
            Come see for yourself.
          </motion.h2>
          <motion.div variants={fadeUp}>
            <Link href="/apply">
              <span className="inline-block px-8 py-3 border border-[var(--color-brass)] text-[var(--color-brass-light)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-brass)] hover:text-[var(--color-ivory)] transition-all duration-300">
                Request Residency
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[oklch(1_0_0/0.06)] bg-[oklch(0.14_0.005_285)]">
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
          <p className="text-xs text-[var(--color-ivory)]/40">
            A property of The Good Folk Family of Brands
          </p>
        </div>
      </footer>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  );
}
