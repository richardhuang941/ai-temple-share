interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  summary: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  summary,
  id
}: SectionHeadingProps) {
  return (
    <header style={{ display: "grid", gap: "0.8rem", maxWidth: "44rem" }}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id} style={{ margin: 0, fontSize: "clamp(2rem, 4vw, 3.4rem)", lineHeight: 1.02 }}>
        {title}
      </h2>
      <p style={{ margin: 0, color: "var(--color-muted)", lineHeight: 1.7 }}>{summary}</p>
    </header>
  );
}

export default SectionHeading;
