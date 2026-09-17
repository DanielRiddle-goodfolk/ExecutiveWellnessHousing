import { useSeo, INQUIRY_EMAIL } from "@/lib/seo";
import { applyAttribution } from "@/lib/attribution";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* Inputs are bordered boxes, not underlines. The previous underline styling
   put a horizontal rule under every field, and combined with the decorative
   rules in the section headers the page read as a stack of lines with no
   obvious place to type. Fields are filled ivory so they sit visibly inset
   against the lighter section cards. */
const fieldClass =
  "w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-ivory)] text-[var(--color-charcoal)] focus:border-[var(--color-brass)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brass)]/30 transition-colors text-base placeholder:text-[var(--color-muted-foreground)]/60";

const labelClass =
  "block text-[11px] tracking-[0.15em] uppercase text-[var(--color-muted-foreground)] mb-2";

const sectionClass =
  "p-8 lg:p-10 border border-[var(--color-border)] bg-[oklch(0.98_0.005_80)]";

/* Broad categories rather than individual modalities. Someone arranging
   housing for a team is choosing which parts of the estate they want in the
   agreement, not picking a spa treatment — the specific modalities get
   discussed on the call. The field NAME stays "Services of Interest" because
   Netlify and the Notion property are keyed to it. */
const SERVICES = [
  "Wellness & Recovery Services",
  "Counseling & Coaching",
  "Food & Beverage Packages",
  "Private Dining & Gatherings",
  "Meeting & Strategy Space",
  "Executive Lounge Access",
];

export default function Application() {
  useSeo({
    title: "Request a Residency | Executive Housing in La Porte, IN | The Old Ruth",
    description: "Inquire about a Master Lease for corporate teams deployed to La Porte, Indiana. Private suites and wellness infrastructure under one agreement, with chef-prepared organic meals by arrangement.",
    path: "/apply",
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("form-name", "residency-inquiry");

    // Attached here rather than rendered as inputs on purpose: the prerender
    // pass would otherwise bake this visitor-specific data into the static HTML
    // shipped to everyone. Field names are defined in lib/attribution.ts and
    // must match the hidden Netlify declaration in client/index.html.
    applyAttribution(data);

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(`Submission failed (${res.status})`);
      setSubmitted(true);
      toast.success("Your inquiry has been received. We will be in touch.");
    } catch {
      toast.error(
        `We could not send your inquiry. Please email ${INQUIRY_EMAIL} and we will respond within 48 hours.`,
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-ivory)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-ivory)]/95 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="container flex items-center justify-between py-5">
          <Link href="/">
            <span className="flex items-center gap-4">
              <img
                src="/photos/ews-monogram.svg"
                alt="Executive Wellness Suites"
                className="h-12 w-12 object-contain"
              />
              <div className="hidden sm:flex flex-col">
                <span className="font-[var(--font-display)] text-[var(--color-charcoal)] text-base tracking-[0.08em]">
                  Executive Wellness Suites
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-brass)]">
                  Residency Inquiry
                </span>
              </div>
            </span>
          </Link>
          <Link href="/">
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-brass)] hover:text-[var(--color-charcoal)] transition-colors duration-300">
              Return Home
            </span>
          </Link>
        </div>
      </nav>

      {/* Application Content */}
      <section className="pt-36 pb-28">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left Column — Context */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                  Private Inquiry
                </span>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-3xl lg:text-[2.25rem] leading-[1.2] mb-6 text-[var(--color-charcoal)]"
              >
                Tell us who is coming, and when.
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-base text-[var(--color-muted-foreground)] leading-relaxed mb-8"
              >
                A few details are enough to check availability and put a proposal
                together. If you are arranging housing for a team, the headcount and
                the start date are the two that matter most.
              </motion.p>
              <motion.div variants={fadeUp} className="hidden lg:block">
                <div className="w-[1px] h-20 bg-[var(--color-brass)] mb-6" />
                <p className="whisper text-base">
                  There is no obligation<br />in submitting this form.
                </p>
              </motion.div>
            </motion.div>

            {/* Right Column — The Form */}
            <div className="lg:col-span-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-14 border border-[var(--color-brass)] bg-[oklch(0.98_0.005_80)]"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-[1px] bg-[var(--color-brass)]" />
                    <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">
                      Received
                    </span>
                  </div>
                  <p className="whisper text-2xl mb-6">Thank you.</p>
                  <p className="text-[var(--color-muted-foreground)] leading-relaxed text-base">
                    Your inquiry has been received. A member of our team will reach out
                    within 48 hours with availability and next steps.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  name="residency-inquiry"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="company-website"
                >
                  <input type="hidden" name="form-name" value="residency-inquiry" />
                  {/* Declared so Netlify registers them when it parses this page.
                      Deliberately valueless: the prerender pass would otherwise bake
                      one visitor's data into the static HTML served to everyone.
                      Real values are set on the FormData by applyAttribution(). */}
                  <input type="hidden" name="Landing Page" />
                  <input type="hidden" name="Traffic Source" />
                  <input type="hidden" name="Campaign" />
                  <p className="hidden">
                    <label>
                      Leave this field empty
                      <input name="company-website" tabIndex={-1} autoComplete="off" />
                    </label>
                  </p>

                  {/* Section 1: Contact */}
                  <motion.div variants={fadeUp} className={sectionClass}>
                    <div className="flex items-baseline gap-4 mb-8">
                      <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">01</span>
                      <span className="font-[var(--font-display)] text-lg text-[var(--color-charcoal)]">
                        Contact
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>First Name</label>
                        <input
                          type="text"
                          required
                          name="First Name"
                          autoComplete="given-name"
                          className={fieldClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Last Name</label>
                        <input
                          type="text"
                          required
                          name="Last Name"
                          autoComplete="family-name"
                          className={fieldClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Company</label>
                        <input
                          type="text"
                          name="Company"
                          autoComplete="organization"
                          className={fieldClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Job Title</label>
                        <input
                          type="text"
                          name="Job Title"
                          autoComplete="organization-title"
                          className={fieldClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Email Address</label>
                        <input
                          type="email"
                          required
                          name="email"
                          autoComplete="email"
                          className={fieldClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Phone Number</label>
                        <input
                          type="tel"
                          name="Phone"
                          autoComplete="tel"
                          className={fieldClass}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Section 2: The Stay */}
                  <motion.div variants={fadeUp} className={sectionClass}>
                    <div className="flex items-baseline gap-4 mb-8">
                      <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">02</span>
                      <span className="font-[var(--font-display)] text-lg text-[var(--color-charcoal)]">
                        The Stay
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>Number of People</label>
                        <input
                          type="number"
                          required
                          min={1}
                          name="Number of People"
                          placeholder="1"
                          className={fieldClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Target Move-In</label>
                        <input
                          type="date"
                          required
                          name="Target Move-In"
                          className={fieldClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Length of Stay</label>
                        <select required name="Length of Stay" className={fieldClass}>
                          <option value="">Select duration</option>
                          <option value="30 Days">30 Days</option>
                          <option value="60 Days">60 Days</option>
                          <option value="90 Days (One Season)">90 Days</option>
                          <option value="6 Months">6 Months</option>
                          <option value="1 Year">1 Year or longer</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Lease Type</label>
                        <select required name="Lease Type" className={fieldClass}>
                          <option value="">Select type</option>
                          <option value="Corporate Master Lease">Corporate Master Lease</option>
                          <option value="Individual Executive">Individual Executive</option>
                          <option value="Not Sure Yet">Not sure yet</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelClass}>Decision Timeline</label>
                        <select name="Decision Timeline" className={fieldClass}>
                          <option value="">Select timeline</option>
                          <option value="Immediate">Immediate</option>
                          <option value="Within 30 Days">Within 30 days</option>
                          <option value="60-90 Days">60–90 days</option>
                          <option value="Exploring Options">Exploring options</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>

                  {/* Section 3: Anything Else */}
                  <motion.div variants={fadeUp} className={sectionClass}>
                    <div className="flex items-baseline gap-4 mb-8">
                      <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">03</span>
                      <span className="font-[var(--font-display)] text-lg text-[var(--color-charcoal)]">
                        Anything Else
                      </span>
                    </div>
                    <label className={labelClass}>Services &amp; Add-Ons of Interest (optional)</label>
                    <div className="grid sm:grid-cols-2 gap-3 mb-8">
                      {SERVICES.map((item) => (
                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                          <span className="relative flex">
                            <input
                              type="checkbox"
                              name="Services of Interest"
                              value={item}
                              className="peer sr-only"
                            />
                            <span className="w-5 h-5 shrink-0 border border-[var(--color-border)] bg-[var(--color-ivory)] peer-checked:border-[var(--color-brass)] peer-checked:bg-[var(--color-brass)] transition-all duration-200 flex items-center justify-center">
                              <svg className="w-3 h-3 text-[var(--color-ivory)] opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          </span>
                          <span className="text-sm text-[var(--color-charcoal)] group-hover:text-[var(--color-brass)] transition-colors duration-200">
                            {item}
                          </span>
                        </label>
                      ))}
                    </div>
                    <label className={labelClass}>Notes (optional)</label>
                    <textarea
                      rows={4}
                      name="Notes"
                      placeholder="Anything we should know — accessibility needs, arrival logistics, parking, meeting space, food and beverage arrangements."
                      className={`${fieldClass} resize-none`}
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={fadeUp} className="pt-2">
                    <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed mb-6">
                      Residencies are 30 days minimum. The estate is residents only,
                      pet-free and smoke-free.
                    </p>
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-4 px-8 py-5 bg-[var(--color-charcoal)] text-[var(--color-ivory)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--color-brass)] transition-all duration-300 group"
                    >
                      <span>{sending ? "Sending…" : "Submit Residency Inquiry"}</span>
                      <span className="w-8 h-[1px] bg-[var(--color-brass)] group-hover:bg-[var(--color-ivory)] group-hover:w-12 transition-all duration-300" />
                    </button>
                  </motion.div>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--color-border)]">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/photos/ews-monogram.svg"
              alt="Executive Wellness Suites"
              className="h-10 w-10 object-contain"
            />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-brass)]">
              Circa 1888
            </span>
          </div>
          <p className="text-xs text-[var(--color-muted-foreground)]">
            A property of The Good Folk Family of Brands
          </p>
        </div>
      </footer>
    </div>
  );
}
