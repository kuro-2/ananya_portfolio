import manifest from "../data/assets.json";

export type Asset = { src: string; w: number; h: number; sm?: string; smw?: number };
export type AssetKey = keyof typeof manifest;

export const asset = (key: AssetKey): Asset => manifest[key] as Asset;

export const srcSet = (a: Asset) => (a.sm ? `${a.sm} ${a.smw}w, ${a.src} ${a.w}w` : undefined);

/** CSS `url()` for backgrounds — the smaller variant is plenty behind content. */
export const bgUrl = (key: AssetKey, large = false) => {
  const a = asset(key);
  return `url("${large || !a.sm ? a.src : a.sm}")`;
};
