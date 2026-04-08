import { useEffect, useRef, useState } from "react";

interface CopyButtonProps {
  value: string;
  label?: string;
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
  label = "复制 Prompt"
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
        border: "1px solid rgba(142, 228, 255, 0.26)",
        background: copied ? "rgba(139, 246, 198, 0.16)" : "rgba(12, 20, 31, 0.92)",
        color: "var(--color-ink)",
        padding: "0.8rem 1rem",
        borderRadius: "var(--radius-md)",
        cursor: "pointer",
        minWidth: "8.5rem"
      }}
      aria-live="polite"
    >
      {copied ? "已复制" : label}
    </button>
  );
}

export default CopyButton;
