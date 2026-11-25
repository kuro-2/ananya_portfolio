import { Fragment } from "react";
import { motion } from "motion/react";
import { Art } from "../components/Art";
import { Card, Sparkle } from "../components/Decor";
import { Box, Page, T } from "../components/Stage";

const columns = [
  { x: 411, y: 299, w: 194, title: "AT A GLANCE", items: ["Final-Year BVA", "Acharya College", "Bengaluru", "Graphic & Comm."], gap: 24, s: 12 },
  { x: 647, y: 298, w: 193, title: "WHAT I DO", items: ["UI/UX Design", "Visual Design", "Branding & Identity", "Motion & Content."], gap: 28, s: 12 },
  { x: 883, y: 298, w: 194, title: "A LITTLE ABOUT ME", items: ["Visual Thinker", "Detail-Oriented", "Curious Learner", "Research-Driven", "Loves Storytelling"], gap: 24, s: 11 },
];

const steps = [
  { label: "Research", bg: "#f6e6cf", x: 411, w: 57 },
  { label: "Ideate", bg: "#eeab33", x: 497, w: 58 },
  { label: "Design", bg: "#eb6213", x: 588, w: 59 },
  { label: "Iterate", bg: "#277e83", x: 676, w: 59 },
  { label: "Deliver", bg: "#f6e6cf", x: 764, w: 59 },
];

/** PDF page 2 — About me. */
export function About() {
  return (
    <section id="about" aria-label="About me">
      <Page n={2} label="About me" className="about">
        <Box x={36} y={48} w={316} h={475} reveal="left" className="about__portrait">
          <Art k="about-portrait" alt="Illustrated portrait of Ananya Singha on a teal sunburst" gallery="about" sizes="(min-width: 1024px) 28vw, 80vw" />
        </Box>
        <Box x={411} y={36} reveal="down" className="about__hello">
          <h2 className="display">
            <T as="span" s={47} m={34}>Hi,I’m <span style={{ color: "#f06723" }}>Ananya Singha!</span></T>
          </h2>
        </Box>
        <Box x={368} y={98} w={30} h={30} className="deco" reveal="scale" delay={0.3}>
          <Sparkle fill="#e04b2c" className="float" />
        </Box>
        <Box x={411} y={121} w={671} h={137} delay={0.15} reveal="right">
          <Card bg="#f6e6cf" bw={2.5} sx={10} sy={14} r={16} className="about__bio card--hover">
            <T s={16} m={15.5} className="about__lead">
              A final-year BVA Graphic &amp; Communication Design student at Acharya College, Bengaluru.{" "}<br className="br" />
              I&apos;m a curious, research-driven designer who loves creating meaningful, visual and{" "}<br className="br" />
              user-focused experiences across graphic design and UI/UX.
            </T>
            <T s={15} m={15} className="about__accent">I enjoy turning ideas into designs that are simple, engaging, and solve real user needs.</T>
          </Card>
        </Box>
        <div className="about__cols">
          {columns.map((c, i) => (
            <Box key={c.title} x={c.x} y={c.y} w={c.w} h={153} delay={0.2 + i * 0.12} reveal="flip">
              <Card bg="#f6e6cf" sx={7} sy={11} r={13} className="about__card card--hover">
                <T as="h3" s={14} m={14} className="about__cardtitle">{c.title}</T>
                <ul style={{ "--gap": c.gap } as React.CSSProperties}>
                  {c.items.map((it) => (
                    <T as="li" key={it} s={c.s} m={13.5}>{it}</T>
                  ))}
                </ul>
              </Card>
            </Box>
          ))}
        </div>
        <Box x={852} y={410} w={36} h={34} className="deco" reveal="scale" delay={0.5}>
          <Sparkle fill="#208084" className="float float--slow" />
        </Box>
        <Box x={411} y={504} w={420} className="about__process" delay={0.3} reveal="fade">
          <ol aria-label="Design process">
            {steps.map((s, i) => (
              <Fragment key={s.label}>
                <motion.li
                  className="step"
                  style={{ background: s.bg, "--w": s.w } as React.CSSProperties}
                  initial={{ opacity: 0, scale: 0.3, y: -30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 220, damping: 13, delay: 0.4 + i * 0.13 }}
                >
                  <T as="span" s={11.2} m={13}>{s.label}</T>
                </motion.li>
                {i < steps.length - 1 && <li className="arrow" aria-hidden="true"><T as="span" s={17} m={16}>→</T></li>}
              </Fragment>
            ))}
          </ol>
        </Box>
        <Box x={856} y={483} w={233} h={58} delay={0.9} reveal="pop" className="about__tools">
          <Art k="tool-icons" alt="Tools: Adobe Illustrator, Photoshop, Figma, Premiere Pro and After Effects" fit="contain" />
        </Box>
      </Page>
    </section>
  );
}
