import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { asset } from "../lib/assets";

/** Brief intro while fonts and the cover artwork load (max ~2.4s). */
export function Loader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const wait = (src: string) =>
      new Promise<void>((res) => {
        const i = new Image();
        i.onload = i.onerror = () => res();
        i.src = src;
      });
    const min = new Promise((r) => setTimeout(r, 1100));
    const max = new Promise((r) => setTimeout(r, 2400));
    const ready = Promise.all([document.fonts?.ready, wait(asset("cover-sunburst").src), wait(asset("cover-illustration").src), min]);
    Promise.race([ready, max]).then(() => setVisible(false));
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="loader"
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <motion.img
            src={asset("portfolio-badge").src}
            alt=""
            className="loader__badge"
            initial={{ scale: 0.4, opacity: 0, rotate: -120 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.p className="loader__name" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            ANANYA SINGHA
          </motion.p>
          <div className="loader__bar">
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.8, ease: "easeInOut" }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
