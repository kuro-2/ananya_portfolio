import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Art } from "../components/Art";
import { Parallax } from "../components/ArtPages";
import { Card, Pill } from "../components/Decor";
import { SectionDivider } from "../components/SectionDivider";
import { Box, Page, T } from "../components/Stage";

const swatches = [
  { name: "INK", hex: "#23201F", fill: "#221f1f", x: 88, y: 341 },
  { name: "IVORY", hex: "#F0E9DC", fill: "#efe9dc", x: 257, y: 344 },
  { name: "BURGUNDY", hex: "#60202B", fill: "#5f1f2b", x: 427, y: 345 },
  { name: "BLUE", hex: "#5B6976", fill: "#5b6976", x: 596, y: 345 },
  { name: "AMBER", hex: "#A66F43", fill: "#9e693e", x: 766, y: 350 },
  { name: "BRONZE", hex: "#95604B", fill: "#8f5b46", x: 935, y: 350 },
];

function Swatch({ s, i }: { s: (typeof swatches)[number]; i: number }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(s.hex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };
  return (
    <Box x={s.x} y={s.y} w={155} h={182} delay={0.3 + 0.1 * i} reveal={i % 2 ? "down" : "flip"}>
      <button className="swatch card--hover" onClick={copy} aria-label={`${s.name} ${s.hex} — copy colour`}>
        <span className="swatch__chip" style={{ background: s.fill }} />
        <T as="span" s={14} m={13} className="swatch__label">{s.name}<br />{s.hex}</T>
        <AnimatePresence>
          {copied && (
            <motion.span className="swatch__copied" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              Copied!
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </Box>
  );
}

/** PDF pages 6–12. */
export function Logofolio() {
  return (
    <section id="logofolio" aria-label="Section 02: Logofolio">
      <SectionDivider n={6} num="02" title="Logofolio" theme="teal" pill={[88, 56]} titleAt={[189, 204, 767]} badge={[943, 370]} />

      {/* 7 — VÉLUNE hero */}
      <Page n={7} label="VÉLUNE brand identity" fixed className="bleed">
        <Box x={0} y={0} w={1152} h={576} reveal="zoom">
          <Parallax>
          <Art k="velune-hero" alt="VÉLUNE eau de parfum bottle and box with calla lilies" gallery="velune" sizes="100vw" />
          </Parallax>
        </Box>
        <Box x={88} y={487} reveal="left" delay={0.5}>
          <Pill s={15} sy={7}>✦ VELUNE . BRAND IDENTITY</Pill>
        </Box>
        <Box x={983} y={26} reveal="down" delay={0.6}>
          <Pill bg="#fcf1db" s={15} sy={7}>01 - Logofolio</Pill>
        </Box>
      </Page>

      {/* 8 — The Hours Leave a Trace */}
      <Page n={8} label="VÉLUNE story and logo lockups" className="velune8">
        <Box x={56} y={52} w={496} h={479} reveal="left">
          <Card bg="#5c1f27" bw={1} sx={10} sy={12} r={14} className="velune8__story card--hover">
            <T as="h3" s={36} m={30} className="display">The Hours<br />Leave a Trace.</T>
            <T s={14} m={12.5} className="velune8__sub">VÉLUNE&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;EAU DE PARFUM</T>
            <T s={21} m={17}>A fragrance house that captures the emotions, moments and moods that linger beyond the everyday.</T>
            <T s={21} m={17}>VÉLUNE is a collection of scents inspired by the in-between hours — when the day softens, thoughts deepen and feelings leave a lasting trace.</T>
          </Card>
        </Box>
        <Box x={623} y={57} w={465} h={473} reveal="rotate" delay={0.15}>
          <div className="sunpanel" style={{ "--inset-x": 27, "--inset-y": 19 } as React.CSSProperties}>
            <div className="sunpanel__inner velune8__lockups">
              <T as="h3" s={36} m={28} className="velune8__sig">One signature.<br />Many settings.</T>
              <motion.div className="lockups" initial="h" whileInView="s" viewport={{ once: true }} transition={{ staggerChildren: 0.15, delayChildren: 0.5 }} variants={{ h: {}, s: {} }}>
                <Art k="velune-logo-horizontal" alt="VÉLUNE horizontal logo lockup" gallery="velune" fit="contain" style={{ "--lw": 286 } as React.CSSProperties} />
                <Art k="velune-logo-block" alt="VÉLUNE wordmark reversed on burgundy" gallery="velune" fit="contain" style={{ "--lw": 317 } as React.CSSProperties} />
                <div className="lockups__stacked">
                  <Art k="velune-mark-small" alt="VÉLUNE calla lily mark" fit="contain" style={{ "--lw": 41 } as React.CSSProperties} />
                  <Art k="velune-wordmark-small" alt="VÉLUNE wordmark" fit="contain" style={{ "--lw": 101 } as React.CSSProperties} />
                  <T as="span" s={5.9} m={7} className="lockups__tiny">EAU DE PARFUM</T>
                </div>
              </motion.div>
            </div>
          </div>
        </Box>
      </Page>

      {/* 9 — Logo exploration */}
      <Page n={9} label="VÉLUNE logo exploration" className="velune9">
        <Box x={64} y={68} w={464} h={433} reveal="flip">
          <Card bg="#f6e6cf" bw={3.2} sx={8} sy={17} r={14} className="velune9__card card--hover">
            <T as="h3" s={36} m={28} className="velune9__title">Logo Exploration.</T>
            <T s={14} m={14.5} style={{ color: "#5a0422" }}>From exploration inspired by the calla lily,{" "}<br className="br" /> combining elegence, flow and a hint of starlight.</T>
            <div className="velune9__explore">
              <Art k="velune-logo-exploration" alt="Logo exploration: eight mark and wordmark studies, with the chosen direction highlighted" gallery="velune" fit="contain" />
            </div>
          </Card>
        </Box>
        <Box x={613} y={68} w={470} h={432} reveal="right" delay={0.15}>
          <div className="sunpanel sunpanel--b" style={{ "--inset-x": 20, "--inset-y": 27 } as React.CSSProperties}>
            <div className="sunpanel__inner velune9__final">
              <Art k="velune-logo-final" alt="Final VÉLUNE logo — calla lily mark with star, Eau de Parfum" gallery="velune" fit="contain" className="velune9__logo" />
              <Art k="velune-calla-lily-to-mark" alt="Calla lily photograph abstracted into the VÉLUNE mark" gallery="velune" fit="contain" className="velune9__lily" />
              <Pill bg="#188381" color="#f3e5c8" s={11} m={11} sx={3} sy={2.5} className="velune9__pill">CALLA LILY . FLOW . STARLIGHT</Pill>
            </div>
          </div>
        </Box>
      </Page>

      {/* 10 — Palette */}
      <Page n={10} label="The VÉLUNE palette" className="velune10">
        <Box x={83} y={52} reveal="wipe">
          <h3 className="display velune10__title">
            <T as="span" s={60} m={42}>The VÉLUNE</T>
            <T as="span" s={60} m={42} style={{ color: "#dd652e" }}>Palette</T>
          </h3>
        </Box>
        <Box x={84} y={200} w={470} delay={0.25} reveal="left">
          <T s={16} m={15}>Burgundy and ivory hold the identity, while the accent tones add{" "}<br className="br" /> depth, mood and sensorial richness.</T>
        </Box>
        <Box x={83} y={267} delay={0.35} reveal="pop">
          <Pill s={15} m={13}>✦ VELUNE . BRAND IDENTITY</Pill>
        </Box>
        <Box x={604} y={54} w={510} h={230} reveal="down" delay={0.1} className="velune10__img">
          <Art k="velune-palette-mockup" alt="VÉLUNE perfume and box mockup in burgundy and gold" gallery="velune" />
        </Box>
        <div className="swatches">
          {swatches.map((s, i) => (
            <Swatch key={s.name} s={s} i={i} />
          ))}
        </div>
      </Page>

      {/* 11–12 — ZEVRO */}
      <Page n={11} label="ZEVRO logo" fixed className="bleed">
        <Box x={0} y={0} w={1152} h={576} reveal="zoom">
          <Parallax>
          <Art k="zevro-logo" alt="ZEVRO logo — Outwear / Jacket / Streetwear — over an orange sun and snowy mountains" gallery="zevro" sizes="100vw" />
          </Parallax>
        </Box>
      </Page>
      <Page n={12} label="ZEVRO identity mockups" fixed className="bleed">
        <Box x={0} y={0} w={1152} h={576} reveal="zoom">
          <Parallax>
          <Art k="zevro-identity-mockups" alt="ZEVRO campaign poster, jacket detail, logo on jacket and hang tag" gallery="zevro" sizes="100vw" />
          </Parallax>
        </Box>
      </Page>
    </section>
  );
}
