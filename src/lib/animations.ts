import { Variants } from "framer-motion";

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

export const cardHover: Variants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.03,
    y: -4,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

export const navScrollAnimation: Variants = {
  top: {
    backgroundColor: "rgba(245, 242, 251, 0)",
    boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
    backdropFilter: "blur(0px)"
  },
  scrolled: {
    backgroundColor: "rgba(245, 242, 251, 0.85)",
    boxShadow: "0 10px 30px -10px rgba(43, 21, 75, 0.08)",
    backdropFilter: "blur(16px)"
  }
};
