import { CSSProperties, ReactNode, useRef } from "react";
import { motion, useInView, type HTMLMotionProps } from "motion/react";
import { AssetKey, bgUrl } from "../lib/assets";

/**
 * A Page reproduces one PDF page. On desktop (and always for `fixed` pages) it is a
 * 2:1 (or 1:1) stage: children are positioned with the PDF's own point coordinates,
 * converted to percentages, and type is sized in container-query units so the whole
 * composition scales exactly like the original. Below 1024px a `flow` page reflows its
 * children into a readable stacked layout inside the same frame.
 */
type PageProps = {
  n: number; // original PDF page number
  label: string;
  bg?: AssetKey; // full background (incl. the drawn frame) used on the desktop stage
  bgInner?: AssetKey; // frameless crop used behind the reflowed mobile layout
  fixed?: boolean; // keep the stage composition at every width (artwork pages)
  square?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function Page({ n, label, bg = "paper-frame", bgInner = "paper-inner", fixed, square, className = "", style, children }: PageProps) {
  return (
    <div
      className={`page ${fixed ? "page--fixed" : "page--flow"} ${square ? "page--square" : ""} ${className}`}
      data-page={n}
      role="group"
      aria-label={`Page ${n}: ${label}`}
      style={{ "--bg": bgUrl(bg, true), "--bg-inner": bgUrl(bgInner, true), ...style } as CSSProperties}
    >
      <div className="page__inner">{children}</div>
    </div>
  );
}

type BoxProps = Omit<HTMLMotionProps<"div">, "style"> & {
  x: number;
  y: number;
  w?: number;
  h?: number;
  /** width/height of the page coordinate space */
  pw?: number;
  ph?: number;
  delay?: number;
  reveal?: keyof typeof variants | false;
  style?: CSSProperties;
};

export const variants = {
  up: { opacity: 0, y: 22 },
  down: { opacity: 0, y: -18 },
  fade: { opacity: 0 },
  scale: { opacity: 0, scale: 0.97 },
  left: { opacity: 0, x: -24 },
  right: { opacity: 0, x: 24 },
  zoom: { opacity: 0 },
  rotate: { opacity: 0, y: 22 },
  flip: { opacity: 0, y: 22 },
  pop: { opacity: 0, scale: 0.96 },
  wipe: { opacity: 0, y: 16 },
  rise: { opacity: 0, y: 22 },
};
const shown = { opacity: 1, x: 0, y: 0, scale: 1 };
const trans = (_reveal: string, delay: number) => ({ duration: 0.7, delay: Math.min(delay, 0.35), ease: [0.25, 0.1, 0.25, 1] as const });

/** Absolutely positioned block in PDF points (static in the mobile flow). */
export function Box({ x, y, w, h, pw = 1152, ph = 576, delay = 0, reveal = "up", className = "", style, children, ...rest }: BoxProps) {
  const pos = {
    "--l": `${(x / pw) * 100}%`,
    "--t": `${(y / ph) * 100}%`,
    ...(w !== undefined ? { "--wd": `${(w / pw) * 100}%` } : {}),
    ...(h !== undefined ? { "--ht": `${(h / ph) * 100}%` } : {}),
    ...style,
  } as CSSProperties;
  if (!reveal) {
    return (
      <motion.div className={`bx ${className}`} style={pos} {...rest}>
        {children}
      </motion.div>
    );
  }
  if (clipReveals.has(reveal)) {
    // a fully clipped element never counts as "in view", so observe the outer box
    return (
      <motion.div className={`bx ${className}`} style={pos} {...rest}>
        <ClipReveal reveal={reveal} delay={delay} style={{ height: "100%" }}>
          {children as ReactNode}
        </ClipReveal>
      </motion.div>
    );
  }
  return (
    <motion.div
      className={`bx ${className}`}
      style={pos}
      initial={variants[reveal]}
      whileInView={shown}
      viewport={{ once: true, amount: 0.12 }}
      transition={trans(reveal, delay)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Scroll reveal for items that sit inside a layout (grid cells etc.). */
const clipReveals = new Set<string>();

function ClipReveal({ reveal, delay, className = "", style, children }: { reveal: keyof typeof variants; delay: number; className?: string; style?: CSSProperties; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={{ height: "100%" }} initial={variants[reveal]} animate={inView ? shown : variants[reveal]} transition={trans(reveal, delay)}>
        {children}
      </motion.div>
    </div>
  );
}

export function Reveal({ delay = 0, reveal = "up", className = "", children, style }: { delay?: number; reveal?: keyof typeof variants; className?: string; children: ReactNode; style?: CSSProperties }) {
  if (clipReveals.has(reveal)) {
    return (
      <ClipReveal reveal={reveal} delay={delay} className={className} style={style}>
        {children}
      </ClipReveal>
    );
  }
  return (
    <motion.div
      className={className}
      style={style}
      initial={variants[reveal]}
      whileInView={shown}
      viewport={{ once: true, amount: 0.12 }}
      transition={trans(reveal, delay)}
    >
      {children}
    </motion.div>
  );
}

/** Text whose size is given in PDF points; `m` overrides the size (px) in the mobile flow. */
export function T({ as: Tag = "p", s, m, className = "", style, children }: { as?: keyof JSX.IntrinsicElements; s: number; m?: number; className?: string; style?: CSSProperties; children: ReactNode }) {
  const El = Tag as "p";
  return (
    <El className={`t ${className}`} style={{ "--fs": s, ...(m ? { "--fsm": m } : {}), ...style } as CSSProperties}>
      {children}
    </El>
  );
}
