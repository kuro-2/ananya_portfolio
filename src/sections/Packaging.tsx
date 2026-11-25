import { CSSProperties } from "react";
import { motion } from "motion/react";
import { Art } from "../components/Art";
import { Parallax } from "../components/ArtPages";
import { BleedPage } from "../components/ArtPages";
import { Pill } from "../components/Decor";
import { ProjectCard } from "../components/ProjectCard";
import { SectionDivider } from "../components/SectionDivider";
import { Box, Page, T } from "../components/Stage";

const palette = ["#a11c26", "#dd2f25", "#ffb8be", "#ff9a30", "#ffd06e", "#686d24", "#8d9331"];
const fills = ["#a01c25", "#dd2e24", "#ffb8bd", "#ff9a2f", "#ffd06d", "#686c23", "#8d9230"];

// product group (pt, relative to 599,22 — 441×515)
const products = [
  { k: "anyaberry-bottle", alt: "Anyaberry FarmBerry Drink glass bottle with strawberries", x: 0, y: 0, w: 189, h: 515, z: 2 },
  { k: "anyaberry-can-small", alt: "Anyaberry small can", x: 324, y: 215, w: 117, h: 265, z: 1 },
  { k: "anyaberry-can", alt: "Anyaberry FarmBerry Drink can", x: 175, y: 101, w: 171, h: 387, z: 3 },
] as const;

/** PDF pages 42–47. */
export function Packaging() {
  return (
    <section id="packaging" aria-label="Section 06: Packaging Design">
      <SectionDivider n={42} num="06" title="Packaging Design" theme="teal" pill={[81, 60]} titleAt={[65, 164, 1019]} badge={[907, 325]} />
      <BleedPage n={43} k="anyaberry-ice-bucket" alt="Anyaberry bottles and cans in a wooden ice bucket" gallery="anyaberry" />

      <Page n={44} label="Anyaberry drink packaging" bg="checker-red-anyaberry" bgInner="checker-red-anyaberry-inner">
        <ProjectCard
          pill={{ text: "01 - Packaging Design", x: 79, y: 46, bg: "#c22925", sx: 2, sy: 4 }}
          card={{ x: 81, y: 113, w: 444, h: 386, bg: "#c22925", sx: 10, sy: 15 }}
          title="Anyaberry Drink"
          titleColor="#fffcf5"
          titleTop={18}
          textTop={76}
          padX={31}
          textColor="#fffcf5"
          paragraphs={[
            "The Anyaberry drink packaging features a vibrant and playful beverage branding style, showcasing a personalised illustrated portrait surrounded by fresh strawberries and flowing graphic elements.",
            "The colour palette combines rich strawberry red, vibrant orange, soft pink, warm yellow, and leafy green, creating a fresh and energetic visual atmosphere.",
            "The bold custom typography, flowing organic patterns, strawberry illustrations, and personalised character artwork create a fun and expressive identity. The combination of fruit-inspired visuals and personal storytelling gives Anyaberry a distinctive, refreshing, and youthful brand personality.",
          ]}
        />
        <Box x={599} y={22} w={441} h={515} reveal={false} className="products">
          <div className="grp" style={{ aspectRatio: "441 / 515" }}>
            {products.map((p, i) => (
              <motion.div
                key={p.k}
                className="gi product"
                style={{ left: `${(p.x / 441) * 100}%`, top: `${(p.y / 515) * 100}%`, width: `${(p.w / 441) * 100}%`, height: `${(p.h / 515) * 100}%`, zIndex: p.z }}
                initial={{ opacity: 0, y: i === 1 ? -180 : 180, rotate: i === 0 ? -10 : 10 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 70, damping: 12, delay: 0.25 + 0.18 * i }}
              >
                <Art k={p.k} alt={p.alt} gallery="anyaberry" fit="contain" zoom={false} sizes="(min-width: 1024px) 16vw, 40vw" />
              </motion.div>
            ))}
          </div>
        </Box>
      </Page>

      <Page n={45} label="Anyaberry process — inspiration, elements, sketches and palette" className="process45">
        <Box x={79} y={36} reveal="down"><Pill bg="#c22925" color="#fff" s={15} m={13} sx={3} sy={4}>Visual Inspiration</Pill></Box>
        <Box x={77} y={78} w={423} h={200} delay={0.15} reveal="wipe">
          <div className="framed" style={{ "--fc": "#a01c25", "--sx": 9, "--sy": 11 } as CSSProperties}>
            <Art k="anyaberry-visual-inspiration" alt="Visual inspiration moodboard: strawberries, illustrated portrait, wavy shapes, pink checks" gallery="anyaberry" />
          </div>
        </Box>
        <Box x={79} y={300} reveal="down" delay={0.25}><Pill bg="#c22925" color="#fff" s={15} m={13} sx={3} sy={4}>Elements and Patterns</Pill></Box>
        <Box x={81} y={342} w={412} h={181} delay={0.35} reveal="left">
          <div className="framed" style={{ "--fc": "#a01c25", "--sx": 13, "--sy": 16 } as CSSProperties}>
            <Art k="anyaberry-elements" alt="Illustrated elements: strawberries, leaves and flowing red and yellow shapes" gallery="anyaberry" />
          </div>
        </Box>
        <Box x={617} y={33} reveal="down" delay={0.1}><Pill bg="#c22925" color="#fff" s={15} m={13} sx={3} sy={4}>Sketches</Pill></Box>
        <Box x={618} y={75} w={487} h={277} delay={0.25} reveal="rotate">
          <div className="framed" style={{ "--fc": "#211f1f", "--sx": 10, "--sy": 12, "--bw": 0.6 } as CSSProperties}>
            <Art k="anyaberry-sketches" alt="Pencil sketches of the Anyaberry can and bottle labels" gallery="anyaberry" />
          </div>
        </Box>
        <Box x={626} y={375} reveal="pop" delay={0.4}><Pill bg="#c22925" color="#fff" s={15} m={13} sx={3} sy={4}>Color Palette</Pill></Box>
        <Box x={627} y={418} w={478} className="palette7" delay={0.2}>
          <ul aria-label="Anyaberry colour palette">
            {palette.map((hex, i) => (
              <motion.li key={hex} initial={{ opacity: 0, y: i % 2 ? 50 : -50, scale: 0.6 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.55 + i * 0.08 }}>
                <span className="palette7__chip" style={{ background: fills[i] }} />
                <T as="span" s={10} m={11}>{hex}</T>
              </motion.li>
            ))}
          </ul>
        </Box>
      </Page>

      <Page n={46} label="Anyaberry full label" fixed bg="checker-red-anyaberry-label">
        <Box x={33} y={47} w={1066} h={464} reveal="flip">
          <div className="shadowed" style={{ "--sx": 20, "--sy": 22, "--r": 14, "--sc": "#420e0d" } as CSSProperties}>
            <Art k="anyaberry-label" alt="Anyaberry full wrap label — FarmBerry Drink, “Contains Curiosity”, ingredients and contact details" gallery="anyaberry" sizes="100vw" />
          </div>
        </Box>
      </Page>

      <Page n={47} label="Anyaberry lifestyle photography" fixed className="bleed">
        <Box x={0} y={0} w={1152} h={576} reveal="wipe">
          <Parallax>
          <Art
            k="anyaberry-lifestyle"
            alt="Anyaberry four-can carrier held by hand, and a smiling person sipping from an Anyaberry can with the illustrated portrait label"
            gallery="anyaberry"
            sizes="100vw"
          />
          </Parallax>
        </Box>
      </Page>
    </section>
  );
}
