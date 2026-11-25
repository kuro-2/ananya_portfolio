import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { FileText, Menu, X } from "lucide-react";
import { contact, sections } from "../data/sections";
import { useActiveSection } from "../hooks/useActiveSection";
import { scrollToId } from "../lib/scroll";
import { Sparkle } from "./Decor";

export function Navigation() {
  const ids = useMemo(() => sections.map((s) => s.id), []);
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > 300 && y > prev && !open);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const current = sections.find((s) => s.id === active);
  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <motion.header className="nav" animate={{ y: hidden ? "-120%" : "0%" }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
        <a href="#home" className={`nav__pill nav__brand ${active === "home" ? "is-hidden" : ""}`} onClick={(e) => { e.preventDefault(); go("home"); }}>
          ★ ANANYA SINGHA
        </a>
        <AnimatePresence mode="wait">
          {current && current.id !== "home" && (
            <motion.span
              key={current.id}
              className="nav__current"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              aria-live="polite"
            >
              <i style={{ background: current.color }} />
              {current.num ? `${current.num} · ` : ""}
              {current.label}
            </motion.span>
          )}
        </AnimatePresence>
        <div className="nav__right">
          <a className="nav__pill nav__resume" href={contact.resume} target="_blank" rel="noopener">
            <FileText aria-hidden="true" /> <span>Resume</span>
          </a>
          <button className="nav__pill nav__menu" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="site-menu">
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />} <span>{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div className="menu" id="site-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.nav
              className="menu__panel"
              aria-label="Portfolio sections"
              initial={{ y: -30, opacity: 0, rotate: -1 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Sparkle className="menu__spark" />
              <p className="menu__eyebrow">SELECTED WORK . 2026</p>
              <ul>
                {sections.map((s, i) => (
                  <motion.li key={s.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.035 }}>
                    <a href={`#${s.id}`} className={active === s.id ? "is-active" : ""} aria-current={active === s.id ? "true" : undefined} onClick={(e) => { e.preventDefault(); go(s.id); }}>
                      <span className="menu__num" style={{ background: s.color }}>{s.num ?? "★"}</span>
                      {s.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a className="menu__resume" href={contact.resume} target="_blank" rel="noopener">
                <FileText aria-hidden="true" /> Download Resume (PDF)
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
