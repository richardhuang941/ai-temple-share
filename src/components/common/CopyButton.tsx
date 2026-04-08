import { useEffect, useRef, useState } from "react";

interface CopyButtonProps {
  value: string;
  label?: string;
  copiedLabel?: string;
}

function fallbackCopy(value: string): void {
  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.setAttribute("readonly", "true");
  textArea.style.position = "absolute";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

export function CopyButton({
  value,
  label = "复制 Prompt",
  copiedLabel = "已复制"
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = async (): Promise<void> => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        fallbackCopy(value);
      }

      setCopied(true);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      fallbackCopy(value);
      setCopied(true);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(24, 34, 54, 0.08)",
        background: copied ? "rgba(16, 185, 129, 0.14)" : "rgba(255, 255, 255, 0.94)",
        color: copied ? "#047857" : "var(--color-ink)",
        padding: "0.8rem 1rem",
        borderRadius: "1rem",
        cursor: "pointer",
        minWidth: "8.5rem",
        fontWeight: 700,
        boxShadow: "0 10px 24px rgba(17, 24, 39, 0.08)"
      }}
      aria-live="polite"
    >
      {copied ? copiedLabel : label}
    </button>
  );
}

export default CopyButton;
