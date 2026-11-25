import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { asset, AssetKey } from "../lib/assets";

type Item = { key: AssetKey; alt: string };
type Ctx = { open: (gallery: string, key: AssetKey) => void };

const LightboxContext = createContext<Ctx>({ open: () => {} });
export const useLightbox = () => useContext(LightboxContext);

/** Collects the gallery from the DOM so the order always matches the page order. */
function collect(gallery: string): Item[] {
  const seen = new Set<string>();
  const items: Item[] = [];
  document.querySelectorAll<HTMLElement>(`[data-gallery="${gallery}"]`).forEach((el) => {
    const key = el.dataset.key as AssetKey;
    if (!seen.has(key)) {
      seen.add(key);
      items.push({ key, alt: el.dataset.alt || "" });
    }
  });
  return items;
}

export function LightboxProvider({ children, onToggle }: { children: ReactNode; onToggle?: (open: boolean) => void }) {
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState(-1);
  const [dir, setDir] = useState(0);
  const lastFocus = useRef<HTMLElement | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const isOpen = index >= 0;

  const open = useCallback((gallery: string, key: AssetKey) => {
    const list = collect(gallery);
    lastFocus.current = document.activeElement as HTMLElement;
    setItems(list);
    setDir(0);
    setIndex(Math.max(0, list.findIndex((i) => i.key === key)));
  }, []);

  const close = useCallback(() => setIndex(-1), []);
  const go = useCallback(
    (d: number) => {
      if (items.length < 2) return;
      setDir(d);
      setIndex((i) => (i + d + items.length) % items.length);
    },
    [items.length],
  );

  useEffect(() => {
    onToggle?.(isOpen);
    if (!isOpen) {
      lastFocus.current?.focus?.({ preventScroll: true });
      return;
    }
    document.documentElement.classList.add("no-scroll");
    dialog.current?.querySelector<HTMLElement>(".lb__close")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialog.current) {
        const f = dialog.current.querySelectorAll<HTMLElement>("button");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("no-scroll");
    };
  }, [isOpen, close, go, onToggle]);

  const item = isOpen ? items[index] : null;
  const a = item ? asset(item.key) : null;

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {item && a && (
          <motion.div
            ref={dialog}
            className="lb"
            role="dialog"
            aria-modal="true"
            aria-label={`Image viewer: ${item.alt}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <button className="lb__btn lb__close" onClick={close} aria-label="Close image viewer">
              <X />
            </button>
            {items.length > 1 && (
              <>
                <button className="lb__btn lb__prev" onClick={() => go(-1)} aria-label="Previous image">
                  <ChevronLeft />
                </button>
                <button className="lb__btn lb__next" onClick={() => go(1)} aria-label="Next image">
                  <ChevronRight />
                </button>
              </>
            )}
            <AnimatePresence mode="popLayout" custom={dir} initial={false}>
              <motion.figure
                key={item.key}
                className="lb__figure"
                custom={dir}
                initial={{ opacity: 0, scale: dir === 0 ? 0.92 : 1, x: dir * 80 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -80, scale: dir === 0 ? 0.95 : 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                drag={items.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(1);
                  else if (info.offset.x > 70) go(-1);
                }}
                onClick={(e) => e.target === e.currentTarget && close()}
              >
                <img src={a.src} width={a.w} height={a.h} alt={item.alt} draggable={false} />
                <figcaption>
                  <span>{item.alt}</span>
                  {items.length > 1 && (
                    <span className="lb__count">
                      {index + 1} / {items.length}
                    </span>
                  )}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}
