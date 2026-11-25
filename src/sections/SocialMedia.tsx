import { CSSProperties } from "react";
import { Art } from "../components/Art";
import { ProjectCard } from "../components/ProjectCard";
import { SectionDivider } from "../components/SectionDivider";
import { Box, Page, Reveal, T } from "../components/Stage";
import { AssetKey } from "../lib/assets";

const brigadeSix: [AssetKey, string][] = [
  ["brigade-post-homes", "Homes that create Better Living"],
  ["brigade-post-lifestyle", "A Lifestyle Beyond a Home"],
  ["brigade-post-communities", "More than Homes, Complete Communities"],
  ["brigade-post-wellness", "Wellness, Recreation and More at Your Doorstep"],
  ["brigade-post-sustainable", "Building Sustainable Cities for a Better Tomorrow"],
  ["brigade-post-legacy", "Invest in a Legacy of Trust"],
];

// widths of each creative in the PDF (pt) — kept so the mosaic matches page 15
const brigadeRows: [AssetKey, string, number][][] = [
  [
    ["brigade-grid-01", "Homes that create Better Living", 255],
    ["brigade-grid-02", "Spaces That Breathe with Nature", 189],
    ["brigade-grid-03", "Invest in a Legacy of Trust", 254],
    ["brigade-grid-04", "A Greener and Smarter Tomorrow", 189],
    ["brigade-grid-05", "Building Sustainable Cities for a Better Tomorrow", 247],
  ],
  [
    ["brigade-grid-06", "More than Homes, Complete Communities", 253],
    ["brigade-grid-07", "Wellness, Recreation and More at Your Doorstep", 254],
    ["brigade-grid-08", "A Self-Sustained Lifestyle at Brigade", 188],
    ["brigade-grid-09", "A Lifestyle Beyond a Home", 256],
    ["brigade-grid-10", "Live Closer to What Matters", 186],
  ],
];

const stackd: [AssetKey, string][] = [
  ["stackd-post-lunch-deal", "Lunch Deal — Grab yours now! ₹199"],
  ["stackd-post-stack", "Exploded burger stack"],
  ["stackd-post-packaging", "New Packaging!"],
  ["stackd-post-combo", "Burger + Fries + Drink ₹199 only"],
  ["stackd-post-doorstep", "At Your Doorstep"],
  ["stackd-post-double-stack", "The Double Stack"],
  ["stackd-post-burger-type", "Burger Burger Burger"],
  ["stackd-post-crunchy", "Crunchy Juicy Bold"],
];

/** PDF pages 13–19. */
export function SocialMedia() {
  return (
    <section id="social-media" aria-label="Section 03: Social Media">
      <SectionDivider n={13} num="03" title="Social Media" theme="orange" pill={[73, 50]} titleAt={[52, 202, 1035]} badge={[913, 369]} />

      {/* 14 — Brigade Group */}
      <Page n={14} label="Real estate social media campaign" bg="checker-orange-brigade" bgInner="checker-orange-brigade-inner">
        <ProjectCard
          pill={{ text: "01 - Social Media", x: 85, y: 32, bg: "#f4ac06", color: "#23201f" }}
          card={{ x: 76, y: 88, w: 445, h: 433, bg: "#f17606", sx: 10, sy: 17, bw: 0.5 }}
          title="REAL ESTATE"
          titleSize={36}
          titleColor="#fff"
          titleStyle={{ letterSpacing: "0.1em" }}
          titleTop={14}
          textTop={72}
          padX={26}
          textColor="#f5e6cd"
          paragraphs={[
            "About the project: A social media design campaign for Brigade Group, a leading real estate developer in India. The project focuses on creating visually engaging Instagram creatives that communicate the brand's residential lifestyle, architectural design, premium amenities, community living and sustainable development.",
            "Design Approach: Developed a consistent visual direction using warm sunset tones, rich brown overlays, elegant typography and architectural photography to communicate a premium and aspirational living experience.",
            "Result: Created a cohesive collection of six social media creatives that highlight Brigade Group's brand values, residential offerings and lifestyle experiences through a consistent visual identity. The campaign aims to strengthen brand recognition and create a premium digital presence.",
          ]}
        />
        <Box x={589} y={131} w={510} h={345} reveal="right" delay={0.2}>
          <div className="tray" style={{ "--tray-bg": "#f5e6cd", "--sx": 15, "--sy": 16 } as CSSProperties}>
            <div className="grid grid--3">
              {brigadeSix.map(([k, alt], i) => (
                <Reveal key={k} reveal={i < 3 ? "down" : "up"} delay={0.45 + (i % 3) * 0.12}>
                  <Art k={k} alt={`Brigade Group post — ${alt}`} gallery="brigade" sizes="(min-width: 1024px) 15vw, 33vw" />
                </Reveal>
              ))}
            </div>
          </div>
        </Box>
      </Page>

      {/* 15 — full campaign mosaic */}
      <Page n={15} label="Brigade Group campaign — all creatives" className="mosaic-page">
        <Box x={10} y={11} w={1133} h={550} reveal="fade" className="mosaic">
          {brigadeRows.map((row, r) => (
            <div className="mosaic__row" key={r}>
              {row.map(([k, alt, w], i) => (
                <div className="mosaic__cell" key={k} style={{ flexGrow: w }}>
                  <Reveal delay={0.07 * i + r * 0.2} reveal={r === 0 ? "down" : "up"} className="mosaic__in">
                    <Art k={k} alt={`Brigade Group post — ${alt}`} gallery="brigade" sizes="(min-width: 1024px) 22vw, 50vw" />
                  </Reveal>
                </div>
              ))}
            </div>
          ))}
        </Box>
      </Page>

      {/* 16 — Instagram mockup */}
      <Page n={16} label="Brigade Group Instagram mockup" fixed>
        <Box x={13} y={13} w={1128} h={550} reveal="wipe">
          <Art k="brigade-instagram-mockup" alt="Brigade Group social media campaign shown on an Instagram profile mockup" gallery="brigade" sizes="100vw" />
        </Box>
      </Page>

      {/* 17 — STACK'D BURGERS */}
      <Page n={17} label="Burger brand social media campaign" bg="checker-yellow-stackd" bgInner="checker-yellow-stackd-inner">
        <ProjectCard
          pill={{ text: "02 - Social Media", x: 84, y: 34, bg: "#fbb500", color: "#23201f", sx: 2 }}
          card={{ x: 81, y: 87, w: 448, h: 441, bg: "#fbb500", sx: 13, sy: 18, bw: 2, border: "#211f1f" }}
          title="Burger Brand"
          titleColor="#860102"
          titleTop={12}
          textTop={64}
          padX={22}
          textColor="#000"
          paragraphs={[
            "A social media design campaign for STACK’D BURGERS, a bold and contemporary burger brand. The project focuses on creating visually engaging Instagram creatives that showcase signature burgers, delicious food combinations, promotional offers, packaging and doorstep delivery through an energetic visual identity.",
            "Design Approach:Developed a distinctive visual direction using bold red, warm cream and vibrant yellow tones, chunky typography, appetising burger photography and playful graphic elements to create an eye-catching and memorable fast-food identity.",
            "Result:Created a cohesive collection of nine social media posters highlighting the brand's signature burgers, combo meals, special offers, packaging and delivery experience. The campaign aims to build brand recognition, create a strong visual presence and attract customers through engaging food-focused communication.",
          ]}
        />
        <Box x={615} y={40} w={486} h={486} reveal="pop" delay={0.2}>
          <div className="shadowed" style={{ "--sx": 11, "--sy": 13, "--r": 14 } as CSSProperties}>
            <Art k="stackd-campaign-grid" alt="Nine STACK'D BURGERS Instagram creatives in a 3×3 grid" gallery="stackd" />
          </div>
        </Box>
      </Page>

      {/* 18 — eight creatives */}
      <Page n={18} label="STACK'D BURGERS creatives">
        <Box x={9} y={15} w={1133} h={543} reveal={false} className="grid grid--4 grid--gap">
          {stackd.map(([k, alt], i) => (
            <Reveal key={k} delay={0.08 * (i % 4) + (i < 4 ? 0 : 0.25)} reveal={i < 4 ? "down" : "up"} className="grid__item">
              <Art k={k} alt={`STACK'D BURGERS post — ${alt}`} gallery="stackd" sizes="(min-width: 1024px) 24vw, 50vw" />
            </Reveal>
          ))}
        </Box>
      </Page>

      {/* 19 — Instagram mockup with campaign copy */}
      <Page n={19} label="STACK'D BURGERS Instagram mockup" className="stackd19">
        <Box x={13} y={9} w={1131} h={549} reveal="zoom" className="stackd19__img">
          <Art k="stackd-instagram-mockup" alt="STACK'D BURGERS campaign on an Instagram profile mockup in front of a red arch" gallery="stackd" sizes="100vw" />
        </Box>
        <Box x={128} y={96} w={174} h={104} reveal="pop" delay={0.45} className="stackd19__logo">
          <Art k="stackd-logo" alt="STACK'D BURGERS logo" fit="contain" />
        </Box>
        <Box x={97} y={216} w={300} delay={0.6} reveal="left" className="stackd19__copy">
          <T as="h3" s={35} m={30} className="black">Social Media<br />Campaign</T>
          <T s={12} m={15} className="myriad">A bold and playful digital campaign for Stack&apos;d Burgers, designed to build brand presence, drive engagement, and highlight the brand&apos;s offerings.</T>
        </Box>
      </Page>
    </section>
  );
}
