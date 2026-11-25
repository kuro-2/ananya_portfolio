import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { AssetKey } from "../lib/assets";
import { Art } from "./Art";
import { Box, Page } from "./Stage";

/** Full-bleed mockup page (single original image covering the page). */
export function BleedPage({ n, k, alt, gallery, rect = [0, 0, 1152, 576] }: { n: number; k: AssetKey; alt: string; gallery: string; rect?: [number, number, number, number] }) {
  return (
    <Page n={n} label={alt} fixed className="bleed">
      <Box x={rect[0]} y={rect[1]} w={rect[2]} h={rect[3]} reveal="zoom" className="bleed__img">
        <Parallax>
          <Art k={k} alt={alt} gallery={gallery} sizes="100vw" />
        </Parallax>
      </Box>
    </Page>
  );
}

/** Very light scroll parallax for full-bleed photography. */
export function Parallax({ children, amount = 0 }: { children: ReactNode; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className="parallax">
      {amount ? <motion.div style={{ y, scale: 1 + amount / 40, height: "100%" }}>{children}</motion.div> : children}
    </div>
  );
}

/** Vintage printing-press page: decorative floor + press with the poster rolling out. */
export function PressPage({ n, k, alt, gallery, floor, rect }: { n: number; k: AssetKey; alt: string; gallery: string; floor: AssetKey; rect: [number, number, number, number] }) {
  return (
    <Page n={n} label={alt} fixed bg={floor} className="press">
      <Box x={rect[0]} y={rect[1]} w={rect[2]} h={rect[3]} reveal={false} className="press__img">
        <motion.div
          style={{ height: "100%" }}
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Art k={k} alt={alt} gallery={gallery} fit="contain" zoom={false} sizes="(min-width: 1024px) 50vw, 60vw" />
        </motion.div>
      </Box>
    </Page>
  );
}
