import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Link2, Loader2, ChevronDown } from "lucide-react";
import RevealText from "../components/RevealText";
import SectionTag from "../components/SectionTag";
import OrbitalScene from "../components/LazyOrbitalScene";
import WatermarkText from "../components/WatermarkText";
import WatermarkHint from "../components/WatermarkHint";
import { AVAILABILITY_LINE } from "../config/availability";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mppakljw";
const PROJECT_TYPES = ["Tourism platform", "Healthcare / booking system", "Gaming experience", "Rescue & rebuild", "Custom system", "Not sure yet"];
const BUDGET_RANGES = [
  "A focused build or a rescue — R15,000 – R35,000",
  "A full platform, with booking or payments — R35,000 – R75,000",
  "Multi-site or aggregator work — R75,000+",
  "An advisory call or audit — from R6,000",
  "Still working it out",
];
const TIMELINES = ["ASAP", "1–2 months", "Flexible / exploring"];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sendError, setSendError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Add a valid email.";
    if (!message) nextErrors.message = "Tell me a little about the project.";

    setErrors(nextErrors);
    setSendError(null);
    if (Object.keys(nextErrors).length > 0) return;

    if (FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")) {
      console.warn(
        "Contact form: FORMSPREE_ENDPOINT is still a placeholder in src/pages/Contact.tsx — messages are not actually being sent yet."
      );
      setSubmitted(true);
      return;
    }

    setSending(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: form,
      });
      if (res.ok) {
        setSubmitted(true);
        formEl.reset();
      } else {
        setSendError("Something went wrong sending that — try the email link below instead.");
      }
    } catch {
      setSendError("Couldn't reach the server — check your connection, or use the email link below.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      <section className="relative overflow-hidden pt-40 pb-28 px-6 md:px-10">
        <WatermarkText
          text="SIGNAL"
          playful
          className="select-none absolute -bottom-10 right-[-4%] md:right-0 -z-10 whitespace-nowrap font-display text-[24vw] font-semibold leading-none text-ink/[0.03] md:text-[11rem]"
        />
        <WatermarkHint
          id="contact"
          anchorClassName="right-6 bottom-24 md:right-16"
          messages={["there's a signal hiding in the corner", "catch the signal, bottom right"]}
        />
        <div className="max-w-2xl mx-auto">
          <SectionTag>contact</SectionTag>
          <RevealText
            as="h1"
            text="Tell me what's breaking."
            className="font-display text-4xl md:text-6xl font-semibold mt-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-gray-700/80"
          >
            Tourism platform, healthcare system, gaming experience, or a
            custom web system — let's collaborate on your next project.
          </motion.p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 border border-hotpink/30 bg-blush/20 rounded-2xl p-8"
            >
              <p className="font-display text-xl font-semibold text-hotpink">Message received.</p>
              <p className="mt-2 text-sm text-gray-700/70">
                Thanks for reaching out — expect a reply within two business days.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSubmit}
              noValidate
              className="mt-12 space-y-6"
            >
              <Field label="Name" name="name" error={errors.name} />
              <Field label="Email" name="email" type="email" error={errors.email} />
              <Field label="Project type" name="projectType" select options={PROJECT_TYPES} placeholder="What are we building?" />
              <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Budget" name="budget" select options={BUDGET_RANGES} placeholder="Where's your budget sitting?" />
                <Field label="Timeline" name="timeline" select options={TIMELINES} placeholder="When's this live?" />
              </div>
              <Field
                label="What's breaking?"
                name="message"
                textarea
                error={errors.message}
                placeholder="The thing that's unfinished, broken, or hasn't been built yet…"
              />

              {sendError && <p className="text-sm text-hotpink">{sendError}</p>}

              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 bg-charcoal text-white font-heading text-sm font-medium rounded-full px-7 py-4 hover:bg-hotpink transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending && <Loader2 size={16} className="animate-spin" />}
                {sending ? "Sending…" : "Send message"}
              </button>
            </motion.form>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm"
          >
            <a href="mailto:ayacorestudios@gmail.com" className="inline-flex items-center gap-2 text-gray-700/70 hover:text-hotpink transition-colors">
              <Mail size={16} /> ayacorestudios@gmail.com
            </a>
            <a href="https://github.com/kwaAya" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-gray-700/70 hover:text-hotpink transition-colors">
              <Link2 size={16} /> github.com/kwaAya
            </a>
            <a href="https://www.linkedin.com/in/unako-mtumtum/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-gray-700/70 hover:text-hotpink transition-colors">
              <Link2 size={16} /> linkedin.com/in/unako-mtumtum
            </a>
            <a href="https://www.instagram.com/ayabukwaaaa/?__pwa=1#" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-gray-700/70 hover:text-hotpink transition-colors">
              <Link2 size={16} /> @ayabukwaaaa
            </a>
          </motion.div>
        </div>
      </section>

      <section className="dark-section relative bg-charcoal text-white px-6 md:px-10 py-28 overflow-hidden">
        <div
          className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 -z-0"
          style={{ background: "radial-gradient(circle, #F81295, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="absolute top-1/2 right-[8%] -translate-y-1/2 opacity-70 hidden lg:block">
          <OrbitalScene interactive={false} className="w-[280px] h-[280px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <SectionTag tone="dark">availability</SectionTag>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mt-6">Currently booking Q4 builds.</h2>
          <p className="mt-6 text-white/60">
            {AVAILABILITY_LINE}. Advisory calls stay open year-round.
          </p>

          <div className="mt-10 inline-flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-left font-mono text-xs backdrop-blur-sm">
            {[
              { label: "platform build", status: "1 slot left" },
              { label: "rescue & rebuild", status: "1 slot left" },
              { label: "advisory & audit", status: "open year-round" },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-3">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hotpink opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-hotpink" />
                </span>
                <span className="text-white/80">{row.label}</span>
                <span className="ml-auto text-white/40">{row.status}</span>
              </div>
            ))}
          </div>
       </motion.div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
  select = false,
  options,
  error,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  select?: boolean;
  options?: string[];
  error?: string;
  placeholder?: string;
}) {
  const baseClasses = `w-full rounded-xl border bg-charcoal px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-hotpink/40 transition-shadow ${
    error ? "border-hotpink" : "border-blush-100"
  }`;

  return (
    <div>
      <label htmlFor={name} className="block font-mono text-xs uppercase tracking-wide text-gray-700/60 mb-2">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={baseClasses}
        />
      ) : select ? (
        <div className="relative">
          <select
            id={name}
            name={name}
            defaultValue=""
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            className={`${baseClasses} appearance-none pr-10 text-gray-300/80`}
          >
            <option value="" disabled>
              {placeholder || "Select…"}
            </option>
            {options?.map((opt) => (
              <option key={opt} value={opt} className="bg-charcoal text-white">
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={baseClasses}
        />
      )}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-hotpink">
          {error}
        </p>
      )}
    </div>
  );
}