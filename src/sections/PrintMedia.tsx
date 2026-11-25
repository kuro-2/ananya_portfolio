import { CSSProperties } from "react";
import { motion } from "motion/react";
import { Art } from "../components/Art";
import { BleedPage } from "../components/ArtPages";
import { Pill } from "../components/Decor";
import { ProjectCard } from "../components/ProjectCard";
import { SectionDivider } from "../components/SectionDivider";
import { Box, Page, Reveal } from "../components/Stage";

const stages = [
  ["macbeth-stage-1-rough", "Stage 1 — rough blue-pencil sketch"],
  ["macbeth-stage-2-sketch", "Stage 2 — refined pencil cover sketch"],
  ["macbeth-stage-3-colour", "Stage 3 — flat colour illustration"],
  ["macbeth-stage-4-final", "Stage 4 — final painted cover"],
] as const;

/** PDF pages 37–41. */
export function PrintMedia() {
  return (
    <section id="print-media" aria-label="Section 05: Print Media">
      <SectionDivider n={37} num="05" title="Print Media" theme="orange" pill={[79, 48]} titleAt={[118, 160, 907]} badge={[905, 314]} />
      <BleedPage n={38} k="macbeth-banner-mockup" alt="Macbeth cover printed as a banner hanging in a classical stone archway" gallery="macbeth" />

      <Page n={39} label="Macbeth book cover" bg="checker-crimson-macbeth" bgInner="checker-crimson-macbeth-inner">
        <ProjectCard
          pill={{ text: "01 - Book Cover", x: 64, y: 33, bg: "#821010", sx: 2, sy: 3 }}
          card={{ x: 62, y: 83, w: 445, h: 431, bg: "#821010", sx: 10, sy: 18 }}
          title="Macbeth Book Cover"
          titleColor="#fffcf5"
          titleTop={26}
          textTop={100}
          padX={30}
          textColor="#fffcf5"
          paragraphs={[
            "This Macbeth book cover features a dark and dramatic literary illustration, showcasing the central themes of William Shakespeare’s tragedy through symbolic characters and atmospheric storytelling.",
            "The colour palette combines deep crimson red, dark burgundy, black, muted ivory, and antique gold, creating a mysterious and intense visual atmosphere.",
            "The three hooded witches, blood-red moon, armoured Macbeth, and Lady Macbeth surrounded by symbolic imagery represent ambition, prophecy, guilt, and the consequences of power. The crown and sword reinforce the struggle for kingship, while the rough watercolor textures, distressed paper effects, and dramatic composition capture the dark and tragic essence of Macbeth.",
          ]}
        />
        <Box x={587} y={34} w={519} h={509} reveal={false} className="books">
          <div className="grp" style={{ aspectRatio: "519 / 509" }}>
            <motion.div initial={{ opacity: 0, x: -120, rotate: -8 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.35 }} className="gi book" style={{ left: "0%", top: `${(91 / 509) * 100}%`, width: `${(275 / 519) * 100}%`, height: `${(412 / 509) * 100}%` }}>
              <Art k="macbeth-book-back" alt="Macbeth hardcover, angled view" gallery="macbeth" fit="contain" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: -160 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 70, damping: 13, delay: 0.15 }} className="gi book" style={{ left: `${(177 / 519) * 100}%`, top: "0%", width: `${(336 / 519) * 100}%`, height: `${(502 / 509) * 100}%` }}>
              <Art k="macbeth-book-front" alt="Macbeth hardcover — William Shakespeare — front cover" gallery="macbeth" fit="contain" />
            </motion.div>
          </div>
        </Box>
      </Page>

      <Page n={40} label="Macbeth book illustration stages" bg="diamonds-crimson-macbeth" bgInner="diamonds-crimson-macbeth-inner">
        <Box x={68} y={42} reveal="down">
          <Pill bg="#821010" color="#fff" border={false} s={15} m={13} sx={3} sy={4}>Book Illustration Stages</Pill>
        </Box>
        <Box x={28} y={108} w={1078} h={385} reveal="wipe" delay={0.15}>
          <div className="tray tray--border" style={{ "--tray-bg": "#f4e4ca", "--sx": 22, "--sy": 22, "--sc": "#1e1304", "--pad-x": 0, "--pad-y": 0 } as CSSProperties}>
            <div className="grid grid--4 stages">
              {stages.map(([k, alt], i) => (
                <Reveal key={k} delay={0.5 + 0.18 * i} reveal={i % 2 ? "up" : "down"}>
                  <Art k={k} alt={`Macbeth cover — ${alt}`} gallery="macbeth" sizes="(min-width: 1024px) 24vw, 50vw" />
                </Reveal>
              ))}
            </div>
          </div>
        </Box>
      </Page>

      <BleedPage n={41} k="macbeth-book-mockup" alt="Macbeth hardcover front and back cover with blurb, ISBN barcode and Classic Books Library logo" gallery="macbeth" />
    </section>
  );
}
