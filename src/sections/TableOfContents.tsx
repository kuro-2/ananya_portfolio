import { motion } from "motion/react";
import { Pill } from "../components/Decor";
import { FitTitle } from "../components/FitTitle";
import { Box, Page, T } from "../components/Stage";
import { scrollToId } from "../lib/scroll";

const rows = [
  { num: "01", label: "Typography", id: "typography", color: "#eb6213", y: 100 },
  { num: "02", label: "Logo Design", id: "logofolio", color: "#ecae2c", y: 157 },
  { num: "03", label: "Social Media", id: "social-media", color: "#1e8084", y: 213 },
  { num: "04", label: "Posters", id: "posters", color: "#d24028", y: 270 },
  { num: "05", label: "Print Media", id: "print-media", color: "#e86420", y: 327 },
  { num: "06", label: "Packaging Design", id: "packaging", color: "#208084", y: 384 },
];

/** PDF page 3 — clickable table of contents. */
export function TableOfContents() {
  return (
    <section id="contents" aria-label="Table of contents">
      <Page n={3} label="Table of contents" bg="contents-sunburst" bgInner="contents-sunburst-inner" className="toc">
        <Box x={88} y={60} w={386} className="toc__title" reveal="down">
          <h2 className="sr-only">Table of Contents</h2>
          <FitTitle text="Table" width={224} size={83.6} shadow={[3, 4]} style={{ width: `${(228 / 386) * 100}%` }} />
          <FitTitle text="of" width={83} size={83.6} shadow={[3, 4]} style={{ width: `${(87 / 386) * 100}%` }} />
          <FitTitle text="Contents" width={378} size={83.6} shadow={[3, 4]} />
        </Box>
        <Box x={619} y={100} w={454} className="toc__list" reveal={false}>
          <nav aria-label="Portfolio sections">
            <ol>
              {rows.map((r, i) => (
                <motion.li
                  key={r.id}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a href={`#${r.id}`} className="toc__row" onClick={(e) => { e.preventDefault(); scrollToId(r.id); }}>
                    <span className="toc__num" style={{ background: r.color }}>
                      <T as="span" s={24} m={19}>{r.num}</T>
                    </span>
                    <T as="span" s={24} m={20} className="toc__label">{r.label}</T>
                    <span className="toc__go" aria-hidden="true">→</span>
                  </a>
                </motion.li>
              ))}
            </ol>
          </nav>
        </Box>
        <Box x={138} y={499} reveal="pop" delay={0.6} className="toc__pill">
          <Pill s={15} m={13} style={{ paddingInline: "1.55em" }}>SELECTED WORK . 2026</Pill>
        </Box>
      </Page>
    </section>
  );
}
