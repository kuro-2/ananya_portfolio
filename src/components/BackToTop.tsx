import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUp } from "lucide-react";
import { scrollToId } from "../lib/scroll";

export function BackToTop() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > window.innerHeight * 1.2));
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="to-top"
          onClick={() => scrollToId("home")}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.6 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
        >
          <ArrowUp aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
