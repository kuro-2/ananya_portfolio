import { CSSProperties, ReactNode } from "react";
import { Card, Pill } from "./Decor";
import { Box, T, Reveal } from "./Stage";

export type ProjectCardProps = {
  pill: { text: string; x: number; y: number; bg: string; color?: string; border?: boolean; sx?: number; sy?: number };
  card: { x: number; y: number; w: number; h: number; bg: string; sx: number; sy: number; bw?: number; border?: string; shadow?: string };
  title: ReactNode;
  titleSize?: number;
  titleColor: string;
  titleTop: number; // distance from card top to title (pt)
  textTop: number; // distance from card top to first paragraph (pt)
  padX: number;
  textColor: string;
  paragraphs: ReactNode[];
  titleStyle?: CSSProperties;
};

/** The pill + description card that opens most project pages. */
export function ProjectCard({ pill, card, title, titleSize = 35, titleColor, titleTop, textTop, padX, textColor, paragraphs, titleStyle }: ProjectCardProps) {
  return (
    <>
      <Box x={pill.x} y={pill.y} reveal="down" className="pc__pill">
        <Pill bg={pill.bg} color={pill.color ?? "#fff"} border={pill.border ?? false} sx={pill.sx ?? 3} sy={pill.sy ?? 4} s={15} m={13}>
          {pill.text}
        </Pill>
      </Box>
      <Box x={card.x} y={card.y} w={card.w} h={card.h} delay={0.1} reveal="rotate" className="pc">
        <Card
          bg={card.bg}
          sx={card.sx}
          sy={card.sy}
          bw={card.bw ?? 0}
          shadow={card.shadow ?? "#000"}
          r={14}
          className="pc__card card--hover"
          style={{ "--pad-x": padX, "--title-top": titleTop, "--text-top": textTop, borderColor: card.border ?? "#000" } as CSSProperties}
        >
          <Reveal reveal="wipe" delay={0.35} className="pc__title">
            <T as="h3" s={titleSize} m={28} className="display" style={{ color: titleColor, ...titleStyle }}>
              {title}
            </T>
          </Reveal>
          <div className="pc__body" style={{ color: textColor }}>
            {paragraphs.map((p, i) => (
              <Reveal key={i} reveal={i % 2 ? "right" : "left"} delay={0.45 + i * 0.12}>
                <T s={15} m={15}>{p}</T>
              </Reveal>
            ))}
          </div>
        </Card>
      </Box>
    </>
  );
}
