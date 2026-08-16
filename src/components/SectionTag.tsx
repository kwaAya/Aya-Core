type Props = {
  children: string;
  tone?: "light" | "dark";
};

/**
 * Small kicker label used above section headings — a dot marker instead of
 * a `//` code-comment prefix, echoing the orbital "core" motif rather than
 * reading as a leftover dev annotation.
 */
export default function SectionTag({ children, tone = "light" }: Props) {
  const color = tone === "dark" ? "var(--color-hotpink-glow)" : "var(--color-hotpink)";
  return (
    <span
      className="inline-flex items-center gap-2 font-heading text-xs font-semibold tracking-[0.22em] uppercase"
      style={{ color }}
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ background: color }}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
