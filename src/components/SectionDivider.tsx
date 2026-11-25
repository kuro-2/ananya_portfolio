import { CSSProperties } from "react";
import { motion } from "motion/react";
import { Box, Page, T } from "./Stage";
import { Pill } from "./Decor";
import { FitTitle } from "./FitTitle";

type Props = {
  n: number;
  num: string;
  title: string;
  theme: "orange" | "teal";
  pill: [number, number];
  titleAt: [number, number, number]; // x, y, width (pt)
  badge: [number, number]; // circle top-left (pt)
};

/** Colourful sunburst section opener (PDF pages 4, 6, 13, 20, 37, 42). */
export function SectionDivider({ n, num, title, theme, pill, titleAt, badge }: Props) {
  const bg = theme === "orange" ? "sunburst-orange" : "sunburst-teal";
  return (
    <Page n={n} label={`Section ${num} – ${title}`} bg={bg} bgInner={`${bg}-inner` as "sunburst-orange-inner"} className={`divider divider--${theme}`}>
      <Box x={pill[0]} y={pill[1]} reveal="down">
        <Pill s={15} m={13}>SECTION - {num}</Pill>
      </Box>
      <Box x={titleAt[0]} y={titleAt[1]} w={titleAt[2] + 9} className="divider__title" reveal="rise" delay={0.15}>
        <FitTitle as="h2" text={title} width={titleAt[2]} size={163} shadow={[7, 8]} />
      </Box>
      <Box x={badge[0]} y={badge[1]} w={165} h={158} className="divider__badge" reveal={false}>
        <motion.div
          className="badge"
          initial={{ scale: 0, rotate: -160 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.25 }}
          style={{ "--fs": 80.9 } as CSSProperties}
        >
          <T as="span" s={80.9} m={46}>{num}</T>
        </motion.div>
      </Box>
    </Page>
  );
}
