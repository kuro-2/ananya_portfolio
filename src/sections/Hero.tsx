import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef } from "react";
import { Art } from "../components/Art";
import { Pill } from "../components/Decor";
import { FitTitle } from "../components/FitTitle";
import { Box, Page, T } from "../components/Stage";

/** PDF page 1 — the square cover, framed by a live sunburst on wide screens. */
export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const girlY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const badgeR = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const play = ready ? "show" : "hide";
  const ease = [0.22, 1, 0.36, 1] as const;
  const item = (d: number) => ({
    variants: { hide: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { delay: d, duration: 0.8, ease } } } as Variants,
    initial: "hide",
    animate: play,
  });

  return (
    <section id="home" ref={ref} className="hero" aria-label="Cover">
      <div className="hero__rays" aria-hidden="true" />
      <h1 className="sr-only">Ananya Singha — Design Portfolio 2026. Brand, Type, Interface.</h1>
      <Page n={1} label="Cover" square fixed bg="cover-sunburst" bgInner="cover-sunburst-inner" className="cover">
        <Box x={421} y={18} w={141} h={143} pw={576} reveal={false} className="cover__badge">
          <motion.div {...item(0.5)} style={{ rotate: badgeR }}>
            <Art k="portfolio-badge" alt="Design Portfolio 2026 badge" eager fit="contain" className="spin" />
          </motion.div>
        </Box>
        <Box x={228} y={118} w={348} h={494} pw={576} reveal={false} className="cover__girl">
          <motion.div
            variants={{ hide: { opacity: 0, x: 60 }, show: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 1.1, ease } } } as Variants}
            initial="hide"
            animate={play}
            style={{ y: girlY, height: "100%" }}
          >
            <Art k="cover-illustration" alt="Illustrated portrait of Ananya Singha" eager fit="contain" sizes="(min-width: 640px) 45vw, 70vw" />
          </motion.div>
        </Box>
        <Box x={30} y={41} pw={576} reveal={false} className="cover__pills">
          <motion.div {...item(0.25)} className="cover__pillrow">
            <Pill bg="#eaab2a" s={11.4} m={11} sx={2} sy={1.5}>★ ANANYA SINGHA</Pill>
            <Pill bg="#fff" s={11.4} m={11} sx={2} sy={1.5}>DESIGN PORTFOLIO . 2026</Pill>
          </motion.div>
        </Box>
        <Box x={29} y={170} w={200} pw={576} reveal={false} className="cover__kicker">
          <motion.div {...item(0.4)}>
            <T as="p" s={16} m={18} className="serif">Brand . Type . Interface</T>
            <div className="stripes" aria-hidden="true"><i /><i /><i /></div>
          </motion.div>
        </Box>
        <Box x={22} y={213} w={348} pw={576} reveal={false} className="cover__title">
          <motion.div {...item(0.55)}>
            <FitTitle text="Portfolio" width={342} size={79} color="#fff" shadow={[-1, 7]} as="div" />
          </motion.div>
        </Box>
        <Box x={28} y={310} pw={576} reveal={false}>
          <motion.div {...item(0.7)}>
            <Pill bg="#e4661a" color="#fff" s={12} m={11.5} sy={7}>BVA GRAPHIC &amp; COMMUNICATION DESIGN</Pill>
          </motion.div>
        </Box>
        <Box x={28} y={362} pw={576} reveal={false}>
          <motion.div {...item(0.8)}>
            <Pill bg="#fff" s={11} m={11} sy={5}>ACHARYA SCHOOL OF DESIGN</Pill>
          </motion.div>
        </Box>
      </Page>
      <motion.a href="#about" className="hero__cue" aria-label="Scroll to About" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: 1.4 }}>
        <span>SCROLL</span>
        <i />
      </motion.a>
    </section>
  );
}
