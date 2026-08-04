import { Variants } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const cardHover: Variants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.015,
    y: -6,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export const navScrollAnimation: Variants = {
  top: {
    backgroundColor: "rgba(247, 245, 251, 0)",
    boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
    backdropFilter: "blur(0px)",
  },
  scrolled: {
    backgroundColor: "rgba(247, 245, 251, 0.88)",
    boxShadow: "0 10px 30px -12px rgba(78, 42, 132, 0.08)",
    backdropFilter: "blur(16px)",
  },
};
