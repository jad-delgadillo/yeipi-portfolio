"use client";

import { motion } from "motion/react";

type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  id?: string;
};

export function TextReveal({ text, className, delay = 0, id }: TextRevealProps) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.035,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.h2
      className={className}
      id={id}
      initial="hidden"
      variants={containerVariants}
      viewport={{ once: true, margin: "-8% 0px" }}
      whileInView="visible"
    >
      {words.map((word, i) => (
        <span
          className="inline-block overflow-hidden mr-[0.22em] pt-0.5 pb-4 -mb-4"
          key={`${word}-${i}`}
        >
          <motion.span
            className="inline-block"
            variants={wordVariants}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
