import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Link2, Loader2 } from "lucide-react";
import RevealText from "../components/RevealText";
import SectionTag from "../components/SectionTag";
import OrbitalScene from "../components/LazyOrbitalScene";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

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
      <section className="pt-40 pb-28 px-6 md:px-10">
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
              <Field label="Project type" name="projectType" placeholder="Tourism, healthcare, gaming, custom…" />
              <Field label="Message" name="message" textarea error={errors.message} placeholder="Tell me about it" />

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
            One rescue-and-rebuild slot and one full platform build left this
            quarter. Advisory calls stay open year-round.
          </p>
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
  error,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  error?: string;
  placeholder?: string;
}) {
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
          className={`w-full rounded-xl border bg-charcoal px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-hotpink/40 transition-shadow ${
            error ? "border-hotpink" : "border-blush-100"
          }`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`w-full rounded-xl border bg-charcoal px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-hotpink/40 transition-shadow ${
            error ? "border-hotpink" : "border-blush-100"
          }`}
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