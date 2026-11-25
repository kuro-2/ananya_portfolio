import { CSSProperties } from "react";
import { asset, AssetKey, srcSet } from "../lib/assets";
import { useLightbox } from "./ImageLightbox";

type ArtProps = {
  k: AssetKey;
  alt: string;
  gallery?: string; // omit for purely decorative artwork
  sizes?: string;
  eager?: boolean;
  fit?: "cover" | "contain" | "fill";
  className?: string;
  style?: CSSProperties;
  zoom?: boolean;
};

/** Original artwork extracted from the PDF. Opens the lightbox when part of a gallery. */
export function Art({ k, alt, gallery, sizes = "(min-width: 1024px) 50vw, 100vw", eager, fit = "cover", className = "", style, zoom = true }: ArtProps) {
  const a = asset(k);
  const { open } = useLightbox();
  const img = (
    <img
      src={a.src}
      srcSet={srcSet(a)}
      sizes={a.sm ? sizes : undefined}
      width={a.w}
      height={a.h}
      alt={gallery ? alt : alt || ""}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      style={{ objectFit: fit }}
    />
  );
  if (!gallery) {
    return (
      <span className={`art ${className}`} style={style}>
        {img}
      </span>
    );
  }
  return (
    <button
      type="button"
      className={`art art--btn ${zoom ? "art--zoom" : ""} ${className}`}
      style={style}
      data-gallery={gallery}
      data-key={k}
      data-alt={alt}
      onClick={() => open(gallery, k)}
      aria-label={`View larger: ${alt}`}
    >
      {img}
    </button>
  );
}
