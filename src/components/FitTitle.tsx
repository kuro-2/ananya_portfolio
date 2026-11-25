import { CSSProperties } from "react";

type Props = {
  text: string;
  width: number; // rendered width of the word in the PDF (pt)
  size: number; // font size in the PDF (pt)
  color?: string;
  shadow?: [number, number] | null; // hard offset shadow (pt)
  shadowColor?: string;
  base?: number; // baseline as a fraction of size
  as?: "h1" | "h2" | "h3" | "div";
  label?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Oversized display type from the PDF (Acumin Black). Rendered as SVG text with
 * `textLength` so every title keeps its exact original width at any screen size,
 * and can never overflow on mobile.
 */
export function FitTitle({ text, width, size, color = "#f3e6ce", shadow = [7, 8], shadowColor = "#000", base = 0.8, as: Tag = "div", label, className = "", style }: Props) {
  const [dx, dy] = shadow ?? [0, 0];
  const padX = Math.max(0, -dx);
  const W = width + Math.abs(dx) + 2;
  const H = size * 1.04 + Math.abs(dy);
  const y = size * base + Math.max(0, -dy);
  const common = {
    x: padX,
    y,
    textLength: width,
    lengthAdjust: "spacingAndGlyphs" as const,
    fontSize: size,
  };
  return (
    <Tag className={`fit ${className}`} style={style} aria-label={label ?? text}>
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
        {shadow && (
          <text {...common} x={padX + dx} y={y + dy} fill={shadowColor}>
            {text}
          </text>
        )}
        <text {...common} fill={color}>
          {text}
        </text>
      </svg>
    </Tag>
  );
}
