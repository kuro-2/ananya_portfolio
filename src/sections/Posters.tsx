import { CSSProperties } from "react";
import { Art } from "../components/Art";
import { BleedPage, PressPage } from "../components/ArtPages";
import { ProjectCard } from "../components/ProjectCard";
import { SectionDivider } from "../components/SectionDivider";
import { Box, Page, Reveal } from "../components/Stage";

/** PDF pages 20–36. */
export function Posters() {
  return (
    <section id="posters" aria-label="Section 04: Posters">
      <SectionDivider n={20} num="04" title="Posters" theme="teal" pill={[90, 58]} titleAt={[261, 175, 621]} badge={[917, 324]} />

      {/* Sprite */}
      <PressPage n={21} k="sprite-press" alt="Vintage Sprite poster rolling out of an antique printing press" gallery="sprite" floor="press-floor-green" rect={[285, 13, 582, 560]} />
      <BleedPage n={22} k="sprite-subway-mockup" alt="Vintage and modern Sprite posters framed in a subway station" gallery="sprite" />
      <Page n={23} label="Sprite Refresh poster" bg="checker-green-sprite" bgInner="checker-green-sprite-inner">
        <ProjectCard
          pill={{ text: "01 - Posters", x: 85, y: 29, bg: "#003922", sx: 1.5 }}
          card={{ x: 85, y: 74, w: 448, h: 441, bg: "#003922", sx: 13, sy: 18, bw: 2, border: "#161312" }}
          title="Sprite Refresh"
          titleColor="#efcb97"
          titleTop={26}
          textTop={80}
          padX={25}
          textColor="#fff"
          paragraphs={[
            "This Sprite poster features - a vintage retro advertising style, showcasing a six-pack of Sprite bottles with bold typography and a classic product illustration. The sunburst pattern and distressed textures add a nostalgic, old-school print aesthetic.",
            "The colour palette combines - sage green, forest green, lime green, muted yellow, and warm beige. Green represents freshness and energy, while beige and yellow create a warm vintage feel.",
            "The bold typography, grain effects, and sunburst background create a visually engaging composition. Overall, the poster blends nostalgic advertising with refreshing brand communication.",
          ]}
        />
        <Box x={674} y={40} w={424} h={477} reveal="pop" delay={0.2}>
          <div className="shadowed" style={{ "--sx": 14, "--sy": 22, "--r": 12, "--sc": "#254138" } as CSSProperties}>
            <Art k="sprite-six-pack-panel" alt="Illustrated Sprite six-pack on a green and beige sunburst" gallery="sprite" />
          </div>
        </Box>
      </Page>
      <Page n={24} label="Sprite posters on a brick wall" fixed className="bleed">
        <Box x={0} y={0} w={567} h={576} reveal="down">
          <Art k="sprite-vintage-wall" alt="Vintage Sprite poster — Enjoy Today! Don't forget to treat yourself — on a brick wall" gallery="sprite" sizes="50vw" />
        </Box>
        <Box x={567} y={0} w={585} h={576} reveal="up" delay={0.15}>
          <Art k="sprite-modern-wall" alt="Modern Sprite bottle poster — Enjoy Today! — on a brick wall" gallery="sprite" sizes="50vw" />
        </Box>
      </Page>

      {/* Madbury */}
      <PressPage n={25} k="madbury-press" alt="Madbury Chocobakes poster rolling out of an antique printing press" gallery="madbury" floor="press-floor-brown" rect={[277, 34, 548, 521]} />
      <BleedPage n={26} k="madbury-cafe-mockup" alt="Two Madbury Chocobakes posters framed on a café wall" gallery="madbury" />
      <Page n={27} label="Madbury Chocobakes poster" bg="checker-brown-madbury" bgInner="checker-brown-madbury-inner">
        <ProjectCard
          pill={{ text: "02 - Posters", x: 86, y: 28, bg: "#3d312c", sx: 2 }}
          card={{ x: 86, y: 76, w: 448, h: 441, bg: "#3d312c", sx: 13, sy: 22, bw: 2, border: "#161312", shadow: "#161312" }}
          title="Madbury Chocobakes"
          titleColor="#efcb97"
          titleTop={26}
          textTop={100}
          padX={24}
          textColor="#fff"
          paragraphs={[
            "This Madbury Chocobakes poster features  - a dramatic, premium food advertising style, showcasing chocolate-filled cookies with dripping melted chocolate. The rich food photography and bold typography create an indulgent, eye-catching visual aesthetic.",
            "The colour palette combines - dark chocolate brown, espresso black, caramel, warm beige, creamy white, and muted lavender. Brown and caramel create a rich chocolate feel, while lavender adds a distinctive accent.",
            "The bold typography, dramatic lighting, and chocolate textures create a visually engaging composition. Overall, the poster blends premium food advertising with a vintage-inspired aesthetic.",
          ]}
        />
        <Box x={685} y={37} w={355} h={483} reveal="rotate" delay={0.2}>
          <div className="frame" style={{ "--frame-bg": "#3d312c", "--sx": 24, "--sy": 20, "--sc": "#171312", "--pad": 13 } as CSSProperties}>
            <Art k="madbury-poster" alt="Madbury Chocobakes poster — Ugly outside, delicious inside! — chocolate-dipped hand over a cookie stack" gallery="madbury" />
          </div>
        </Box>
      </Page>
      <BleedPage n={28} k="madbury-subway-mockup" alt="Madbury Chocobakes posters on a white-tiled subway wall" gallery="madbury" />

      {/* Happy Feet */}
      <PressPage n={29} k="happy-feet-press" alt="Happy Feet poster rolling out of an antique printing press" gallery="happy-feet" floor="press-floor-navy" rect={[320, 33, 459, 526]} />
      <BleedPage n={30} k="happy-feet-cinema-mockup" alt="Three Happy Feet posters framed on an orange cinema wall" gallery="happy-feet" />
      <Page n={31} label="Happy Feet poster redesign" bg="checker-orange-happy-feet" bgInner="checker-orange-happy-feet-inner">
        <ProjectCard
          pill={{ text: "03 - Posters", x: 75, y: 25, bg: "#f17300", sx: 2, sy: 3 }}
          card={{ x: 75, y: 81, w: 445, h: 433, bg: "#f17300", sx: 10, sy: 17, bw: 0.5 }}
          title={<>Happy Feet – Poster{" "}<br className="br" /> Redesign</>}
          titleColor="#fffcf5"
          titleTop={26}
          textTop={145}
          padX={33}
          textColor="#fffcf5"
          paragraphs={[
            "This Happy Feet poster series features a playful and vibrant movie advertising style, showcasing penguin characters through three unique poster compositions.",
            "The colour palette combines deep navy blue, icy blue, turquoise, bright red, sunny yellow, and crisp white, creating a lively winter atmosphere.",
            "The bold typography, distressed yellow shadow effects, and cartoon-style illustrations bring energy and character to the designs. Overall, the series creates a consistent visual identity while highlighting the fun, adventure, and excitement of the movie.",
          ]}
        />
        <Box x={587} y={156} w={524} h={309} reveal="right" delay={0.2}>
          <div className="tray tray--border" style={{ "--tray-bg": "#f4e4ca", "--sx": 14, "--sy": 12, "--sc": "#1b212c", "--pad-x": 10, "--pad-y": 24 } as CSSProperties}>
            <div className="grid grid--3 grid--tall">
              {(["happy-feet-poster-1", "happy-feet-poster-2", "happy-feet-poster-3"] as const).map((k, i) => (
                <Reveal key={k} delay={0.45 + 0.15 * i} reveal={i === 1 ? "up" : "down"}>
                  <Art k={k} alt={["Happy Feet poster — giant penguin face", "Happy Feet poster — dancing penguins", "Happy Feet poster — snowboarding penguin"][i]} gallery="happy-feet" sizes="(min-width: 1024px) 15vw, 33vw" />
                </Reveal>
              ))}
            </div>
          </div>
        </Box>
      </Page>
      <BleedPage n={32} k="happy-feet-series" alt="The three Happy Feet poster redesigns side by side" gallery="happy-feet" />

      {/* Sock Racing */}
      <PressPage n={33} k="sock-racing-press" alt="Sock Racing poster rolling out of an antique printing press" gallery="sock-racing" floor="press-floor-red" rect={[312, 20, 528, 527]} />
      <BleedPage n={34} k="sock-racing-wall-mockup" alt="Three Sock Racing posters pasted on a sports-court wall" gallery="sock-racing" rect={[0, -3, 1167, 583]} />
      <Page n={35} label="Sock Racing poster" bg="checker-red-sock-racing" bgInner="checker-red-sock-racing-inner">
        <ProjectCard
          pill={{ text: "04 - Posters", x: 74, y: 24, bg: "#d31522", sx: 2, sy: 3 }}
          card={{ x: 73, y: 74, w: 447, h: 433, bg: "#d31522", sx: 11, sy: 18 }}
          title="Sock Racing Poster"
          titleColor="#fffcf5"
          titleTop={50}
          textTop={112}
          padX={33}
          textColor="#fffcf5"
          paragraphs={[
            "This Sock Racing poster series features a playful and energetic sports advertising style, showcasing colourful anthropomorphic sock characters through three unique poster compositions.",
            "The colour palette combines bold blue, vibrant red, sunny yellow, soft pink, warm cream, and crisp white, creating a lively and eye-catching visual atmosphere.",
            "The bold stencil-style typography, colour-block backgrounds, and cartoon illustrations create a fun, energetic look. Racing tracks and dynamic sock characters capture the excitement and competitive spirit of the event.citement of the Sock Racing event.",
          ]}
        />
        <Box x={670} y={47} w={322} h={462} reveal="down" delay={0.2}>
          <div className="frame frame--border" style={{ "--frame-bg": "#f4e4ca", "--sx": 22, "--sy": 22, "--sc": "#1e1304", "--pad": 8 } as CSSProperties}>
            <Art k="sock-racing-poster" alt="Sock Racing poster — blue and red socks racing, chief guest Usain Bolt" gallery="sock-racing" />
          </div>
        </Box>
      </Page>
      <Page n={36} label="Sock Racing poster series" fixed className="trio">
        {(
          [
            ["sock-racing-blue-red", "Sock Racing poster — blue and red", 15, 372],
            ["sock-racing-yellow-red", "Sock Racing poster — yellow and red", 387, 374],
            ["sock-racing-blue-pink", "Sock Racing poster — blue and pink", 761, 373],
          ] as const
        ).map(([k, alt, x, w], i) => (
          <Box key={k} x={x} y={14} w={w} h={552} reveal={i === 1 ? "up" : "down"} delay={0.15 * i}>
            <Art k={k} alt={alt} gallery="sock-racing" sizes="33vw" />
          </Box>
        ))}
      </Page>
    </section>
  );
}
