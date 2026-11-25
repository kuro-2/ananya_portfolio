import { motion } from "motion/react";
import { Art } from "../components/Art";
import { Card, Pill } from "../components/Decor";
import { SectionDivider } from "../components/SectionDivider";
import { Box, Page, T } from "../components/Stage";

const chips = ["Custom Letterforms", "Red × Cobalt Palette", "Ornamental Serifs", "Form & Contrast", "Geometric Structure", "Rhythm & Consistency"];

/** PDF pages 4–5. */
export function Typography() {
  return (
    <section id="typography" aria-label="Section 01: Typography">
      <SectionDivider n={4} num="01" title="Typography" theme="orange" pill={[91, 49]} titleAt={[92, 193, 961]} badge={[930, 369]} />
      <Page n={5} label="Typography project" className="typo">
        <Box x={86} y={31} reveal="down">
          <Pill bg="#e7631f" color="#fdf2db" s={15} m={13} sx={3} sy={4}>01 - Typography</Pill>
        </Box>
        <Box x={87} y={91} w={418} h={450} reveal="rotate" className="typo__alpha">
          <div className="stack3">
            <Art k="custom-alphabet" alt="Hand-drawn custom alphabet A–Z and numerals 0–3 in red and cobalt markers" gallery="typography" sizes="(min-width: 1024px) 36vw, 92vw" />
          </div>
        </Box>
        <Box x={600} y={66} w={255} h={161} delay={0.1} reveal="down">
          <Card bg="#fcf1db" bw={1} sx={7} sy={8} r={13} className="typo__card card--hover">
            <T as="h3" s={16} m={16} className="label" style={{ color: "#dd652e" }}>ABOUT THE PROJECT</T>
            <T s={11} m={14.5}>
              A personal exploration of expressive letterforms, contrast and geometric structure.{" "}<br className="br" />
              I experimented with custom alphabets and numbers using ornamental serifs, angular shapes and bold colour contrast to create a unique visual language.
            </T>
          </Card>
        </Box>
        <Box x={876} y={66} w={234} h={112} delay={0.2} reveal="right">
          <Card bg="#208084" bw={0.8} sx={6} sy={5} shadow="#211f1f" r={12} className="typo__process card--hover">
            <T as="h3" s={16} m={16} className="label" style={{ color: "#fdf2db" }}>PROCESS</T>
            <div className="typo__processimg">
              <Art k="letterform-process" alt="Letterform process: pencil sketches, construction drawing and final inked A" gallery="typography" fit="contain" />
            </div>
          </Card>
        </Box>
        <Box x={597} y={250} w={255} h={72} delay={0.3} reveal="left">
          <Card bg="#eaab35" bw={0.7} sx={6} sy={3} shadow="#211f1f" r={11} className="typo__medium card--hover">
            <T as="h3" s={16} m={16} className="label">
              MEDIUM <i className="sw" style={{ background: "#d8261d" }} /><i className="sw" style={{ background: "#1d2a60" }} />
            </T>
            <T s={11} m={14.5} className="tracked">Hand-drawn on paper using markers and fineliners.</T>
          </Card>
        </Box>
        <Box x={597} y={343} w={261} h={174} delay={0.4} reveal="up">
          <Card bg="#fcf1db" bw={1.1} sx={6} sy={8} r={13} className="typo__keys card--hover">
            <T as="h3" s={16} m={16} className="label" style={{ color: "#dd652e" }}>KEY ELEMENTS</T>
            <ul className="chips">
              {chips.map((c, i) => (
                <motion.li
                  key={c}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: Math.min(0.6 + i * 0.08, 0.5) }}
                >
                  <T as="span" s={11.5} m={13}>{c}</T>
                </motion.li>
              ))}
            </ul>
          </Card>
        </Box>
        <Box x={876} y={204} w={258} h={316} reveal="pop" delay={0.45} className="typo__sketch">
          <Art k="sketchbook-photo" alt="Photo of the alphabet drawn in a spiral sketchbook" gallery="typography" fit="contain" className="tilt" />
        </Box>
      </Page>
    </section>
  );
}
