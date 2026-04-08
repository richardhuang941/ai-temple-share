interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  summary?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  summary,
  id
}: SectionHeadingProps) {
  return (
    <header style={{ display: "grid", gap: "0.65rem", maxWidth: "40rem" }}>
      <span className="eyebrow">{eyebrow}</span>
      <h2
        id={id}
        style={{
          margin: 0,
          fontSize: "var(--type-heading-lg)",
          lineHeight: "var(--line-heading)"
        }}
      >
        {title}
      </h2>
      {summary ? (
        <p style={{ margin: 0, color: "var(--color-muted)", lineHeight: "var(--line-body)" }}>
          {summary}
        </p>
      ) : null}
    </header>
  );
}

export default SectionHeading;
