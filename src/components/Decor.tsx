import { CSSProperties, ReactNode } from "react";
import { T } from "./Stage";

/** The four-point sparkle used throughout the portfolio. */
export function Sparkle({ fill = "#f0b232", className = "", style }: { fill?: string; className?: string; style?: CSSProperties }) {
  return (
    <svg className={`sparkle ${className}`} style={style} viewBox="0 0 40 40" aria-hidden="true">
      <path
        d="M20 2c1.7 9.6 6.4 14.3 16 16-9.6 1.7-14.3 6.4-16 16-1.7-9.6-6.4-14.3-16-16 9.6-1.7 14.3-6.4 16-16z"
        fill={fill}
        stroke="#211f1f"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type PillProps = {
  children: ReactNode;
  bg?: string;
  color?: string;
  s?: number; // font size in pt
  m?: number;
  sx?: number; // shadow offset in pt
  sy?: number;
  border?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** Pill label with the portfolio's hard offset shadow. */
export function Pill({ children, bg = "var(--yellow)", color = "var(--ink)", s = 15, m, sx = 0, sy = 7, border = true, className = "", style }: PillProps) {
  return (
    <span
      className={`pill ${border ? "" : "pill--flat"} ${className}`}
      style={{ "--pill-bg": bg, "--pill-fg": color, "--sx": sx, "--sy": sy, ...style } as CSSProperties}
    >
      <T as="span" s={s} m={m}>
        {children}
      </T>
    </span>
  );
}

type CardProps = {
  children?: ReactNode;
  bg?: string;
  sx?: number;
  sy?: number;
  shadow?: string;
  bw?: number;
  r?: number;
  className?: string;
  style?: CSSProperties;
};

/** Rounded card with a solid offset shadow (values in PDF points). */
export function Card({ children, bg = "var(--cream)", sx = 8, sy = 10, shadow = "#000", bw = 1.4, r = 14, className = "", style }: CardProps) {
  return (
    <div
      className={`card ${className}`}
      style={{ "--card-bg": bg, "--sx": sx, "--sy": sy, "--sc": shadow, "--bw": bw, "--r": r, ...style } as CSSProperties}
    >
      {children}
    </div>
  );
}
