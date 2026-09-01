"use client";

import { motion } from "motion/react";
import { Fragment } from "react";

type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  id?: string;
  accentFromWord?: number;
  mobileBreakAfter?: number[];
};

export function TextReveal({
  text,
  className,
  delay = 0,
  id,
  accentFromWord,
  mobileBreakAfter = [],
}: TextRevealProps) {
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
        <Fragment key={`${word}-${i}`}>
          <span
            className="inline-block overflow-hidden pt-0.5 pb-4 -mb-4"
          >
            <motion.span
              className={`inline-block ${accentFromWord !== undefined && i >= accentFromWord ? "text-reveal-accent" : ""}`}
              variants={wordVariants}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? (
            <>
              {" "}
              {mobileBreakAfter.includes(i) ? (
                <br className="text-reveal-mobile-break" />
              ) : null}
            </>
          ) : null}
        </Fragment>
      ))}
    </motion.h2>
  );
}
