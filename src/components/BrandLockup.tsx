interface BrandLockupProps {
  name: string;
  markColor?: string;
  suffixColor?: string;
}

/** The "KLEENE*suffix" wordmark used for branded work items. */
export function BrandLockup({ name, markColor, suffixColor }: BrandLockupProps) {
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline" }}>
      <span style={{ color: markColor, transition: "color 220ms linear" }}>KLEENE</span>
      <span style={{ color: "var(--accent)" }}>*</span>
      <span style={{ color: suffixColor, transition: "color 220ms linear" }}>{name}</span>
    </span>
  );
}
