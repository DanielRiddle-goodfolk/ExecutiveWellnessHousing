import { useSeo, INQUIRY_EMAIL } from "@/lib/seo";
import { getAttribution } from "@/lib/attribution";
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

export default function Application() {
  useSeo({
    title: "Request a Residency | Executive Housing in La Porte, IN | The Old Ruth",
    description: "Inquire about a Master Lease for corporate teams deployed to La Porte, Indiana. Private suites, chef-prepared organic meals, and wellness infrastructure under one agreement.",
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
    // shipped to everyone. These three names must stay in step with the hidden
    // Netlify declaration in client/index.html or they are silently dropped.
    const attribution = getAttribution();
    data.set("Landing Page", attribution.landingPage);
    data.set("Referrer", attribution.referrer);
    data.set("Campaign", attribution.campaign);

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
                src="/photos/ewh-logo-192.webp"
                alt="Executive Wellness Housing"
                className="h-12 w-12 object-contain"
              />
              <div className="hidden sm:flex flex-col">
                <span className="font-[var(--font-display)] text-[var(--color-charcoal)] text-base tracking-[0.08em]">
                  Executive Wellness Housing
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
            {/* Left Column — The Dossier Context */}
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
                For those who have earned the right to rest.
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-base text-[var(--color-muted-foreground)] leading-relaxed mb-8"
              >
                The Old Ruth is a sanctuary of kindness, peace and quiet, and restoration.
                This inquiry helps us ensure that every resident contributes to the peace
                of the environment.
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
                    within 48 hours to discuss your season of restoration.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  onSubmit={handleSubmit}
                  className="space-y-0"
                  name="residency-inquiry"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="company-website"
                >
                  <input type="hidden" name="form-name" value="residency-inquiry" />
                  <p className="hidden">
                    <label>
                      Leave this field empty
                      <input name="company-website" tabIndex={-1} autoComplete="off" />
                    </label>
                  </p>
                  {/* Section 1: Contact */}
                  <motion.div variants={fadeUp} className="p-8 lg:p-10 border border-[var(--color-border)] bg-[oklch(0.98_0.005_80)]">
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">01</span>
                      <div className="flex-1 h-[1px] bg-[var(--color-brass)]/30" />
                      <span className="font-[var(--font-display)] text-lg text-[var(--color-charcoal)]">
                        Contact Information
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[11px] tracking-[0.15em] uppercase text-[var(--color-muted-foreground)] mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          required
                          name="First Name"
                          autoComplete="given-name"
                          className="w-full px-0 py-3 border-0 border-b border-[var(--color-border)] bg-transparent text-[var(--color-charcoal)] focus:border-[var(--color-brass)] focus:outline-none transition-colors text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] tracking-[0.15em] uppercase text-[var(--color-muted-foreground)] mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          required
                          name="Last Name"
                          autoComplete="family-name"
                          className="w-full px-0 py-3 border-0 border-b border-[var(--color-border)] bg-transparent text-[var(--color-charcoal)] focus:border-[var(--color-brass)] focus:outline-none transition-colors text-base"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <label className="block text-[11px] tracking-[0.15em] uppercase text-[var(--color-muted-foreground)] mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        name="email"
                        autoComplete="email"
                        className="w-full px-0 py-3 border-0 border-b border-[var(--color-border)] bg-transparent text-[var(--color-charcoal)] focus:border-[var(--color-brass)] focus:outline-none transition-colors text-base"
                      />
                    </div>
                    <div className="mt-6">
                      <label className="block text-[11px] tracking-[0.15em] uppercase text-[var(--color-muted-foreground)] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="Phone"
                        autoComplete="tel"
                        className="w-full px-0 py-3 border-0 border-b border-[var(--color-border)] bg-transparent text-[var(--color-charcoal)] focus:border-[var(--color-brass)] focus:outline-none transition-colors text-base"
                      />
                    </div>
                  </motion.div>

                  {/* Section 2: Your Season */}
                  <motion.div variants={fadeUp} className="p-8 lg:p-10 border border-t-0 border-[var(--color-border)] bg-[oklch(0.98_0.005_80)]">
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">02</span>
                      <div className="flex-1 h-[1px] bg-[var(--color-brass)]/30" />
                      <span className="font-[var(--font-display)] text-lg text-[var(--color-charcoal)]">
                        Your Season
                      </span>
                    </div>
                    <div>
                      <label className="block text-[11px] tracking-[0.15em] uppercase text-[var(--color-muted-foreground)] mb-2">
                        What brings you to a season of rest?
                      </label>
                      <textarea
                        rows={3}
                        required
                        name="Reason for Inquiry"
                        placeholder="Sabbatical, transition, relocation, or simply the opportunity to exhale..."
                        className="w-full px-0 py-3 border-0 border-b border-[var(--color-border)] bg-transparent text-[var(--color-charcoal)] focus:border-[var(--color-brass)] focus:outline-none transition-colors resize-none text-base placeholder:text-[var(--color-muted-foreground)]/60"
                      />
                    </div>
                    <div className="mt-6">
                      <label className="block text-[11px] tracking-[0.15em] uppercase text-[var(--color-muted-foreground)] mb-2">
                        Desired Length of Stay
                      </label>
                      <select
                        required
                        name="Length of Stay"
                        className="w-full px-0 py-3 border-0 border-b border-[var(--color-border)] bg-transparent text-[var(--color-charcoal)] focus:border-[var(--color-brass)] focus:outline-none transition-colors text-base"
                      >
                        <option value="">Select duration</option>
                        <option value="30 Days">30 Days</option>
                        <option value="60 Days">60 Days</option>
                        <option value="90 Days (One Season)">90 Days (One Season)</option>
                        <option value="6 Months">6 Months</option>
                        <option value="1 Year">1 Year</option>
                        <option value="Corporate Master Lease">Corporate Master Lease</option>
                      </select>
                    </div>
                  </motion.div>

                  {/* Section 3: The Atmosphere */}
                  <motion.div variants={fadeUp} className="p-8 lg:p-10 border border-t-0 border-[var(--color-border)] bg-[oklch(0.98_0.005_80)]">
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">03</span>
                      <div className="flex-1 h-[1px] bg-[var(--color-brass)]/30" />
                      <span className="font-[var(--font-display)] text-lg text-[var(--color-charcoal)]">
                        The Atmosphere
                      </span>
                    </div>
                    <div>
                      <label className="block text-[11px] tracking-[0.15em] uppercase text-[var(--color-muted-foreground)] mb-2">
                        How do you contribute to the peace of the environments you inhabit?
                      </label>
                      <textarea
                        rows={3}
                        required
                        name="Contribution to the Peace"
                        className="w-full px-0 py-3 border-0 border-b border-[var(--color-border)] bg-transparent text-[var(--color-charcoal)] focus:border-[var(--color-brass)] focus:outline-none transition-colors resize-none text-base"
                      />
                    </div>
                    <div className="mt-6">
                      <label className="block text-[11px] tracking-[0.15em] uppercase text-[var(--color-muted-foreground)] mb-2">
                        Which restorative services are you most looking forward to?
                      </label>
                      <textarea
                        rows={3}
                        name="Services of Interest"
                        placeholder="Infrared Sauna, Halotherapy, Red Light Therapy, Massage, PEMF, Counseling &amp; Coaching..."
                        className="w-full px-0 py-3 border-0 border-b border-[var(--color-border)] bg-transparent text-[var(--color-charcoal)] focus:border-[var(--color-brass)] focus:outline-none transition-colors resize-none text-base placeholder:text-[var(--color-muted-foreground)]/60"
                      />
                    </div>
                  </motion.div>

                  {/* Section 4: The Covenant */}
                  <motion.div variants={fadeUp} className="p-8 lg:p-10 border border-t-0 border-[var(--color-border)] bg-[oklch(0.98_0.005_80)]">
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-brass)]">04</span>
                      <div className="flex-1 h-[1px] bg-[var(--color-brass)]/30" />
                      <span className="font-[var(--font-display)] text-lg text-[var(--color-charcoal)]">
                        The Sanctuary Covenant
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed mb-8">
                      By submitting this inquiry, you acknowledge and embrace the following standards:
                    </p>
                    <div className="space-y-4">
                      {[
                        "I understand this is a 30-day minimum residency.",
                        "I embrace the 'Residents Only' policy — no outside guests on the grounds.",
                        "I commit to kind and gentle language at all times.",
                        "I acknowledge this is a pet-free and smoke-free sanctuary.",
                        "I respect the peace and quiet of the environment.",
                      ].map((item, i) => (
                        <label key={i} className="flex items-start gap-4 cursor-pointer group">
                          <div className="relative mt-0.5">
                            <input
                              type="checkbox"
                              required
                              name="Covenant Acknowledged"
                              value={item}
                              className="peer sr-only"
                            />
                            <div className="w-5 h-5 border border-[var(--color-border)] peer-checked:border-[var(--color-brass)] peer-checked:bg-[var(--color-brass)] transition-all duration-200 flex items-center justify-center">
                              <svg className="w-3 h-3 text-[var(--color-ivory)] opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          <span className="text-sm text-[var(--color-charcoal)] leading-relaxed group-hover:text-[var(--color-brass)] transition-colors duration-200">{item}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={fadeUp} className="pt-8">
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
              src="/photos/ewh-logo-192.webp"
              alt="EWH"
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
