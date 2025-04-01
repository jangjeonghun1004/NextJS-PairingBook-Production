"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface AnimatedLogoProps {
  onAnimationComplete?: () => void;
}

export default function AnimatedLogo({ onAnimationComplete }: AnimatedLogoProps) {
  const [isPathComplete, setIsPathComplete] = useState(false);
  const [isLine1Complete, setIsLine1Complete] = useState(false);
  const [isLine2Complete, setIsLine2Complete] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isPathComplete && isLine1Complete && isLine2Complete && onAnimationComplete) {
      // 페이드아웃 시작
      setIsFadingOut(true);
      // 페이드아웃 완료 후 콜백 호출
      onAnimationComplete();
    }
  }, [isPathComplete, isLine1Complete, isLine2Complete, onAnimationComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 72 72"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <g id="line">
            <motion.path
              d="m36,32.51c4.335,-4.336 8.841,-9.096 15.73,-9.096c7.226,0 12.24,5.271 12.24,12.58c-0.05592,7.058 -5.863,12.71 -12.92,12.58c-5.006,0 -8.99,-3.178 -12.47,-6.532m-2.581,-2.564c-4.335,4.335 -8.841,9.096 -15.73,9.096c-7.141,0 -12.24,-5.271 -12.24,-12.58c0.05558,-7.058 5.863,-12.71 12.92,-12.58c5.02,0 9.012,3.194 12.49,6.558m-3.476,3.475c-2.586,-2.503 -5.447,-4.932 -9.102,-4.932c-4.129,0.0055 -7.474,3.351 -7.48,7.48c-0.2047,4.113 3.108,7.542 7.226,7.48c4.844,0.0005 8.754,-4.166 11.98,-7.48m9.401,2.521c2.594,2.513 5.462,4.959 9.129,4.959c4.129,-0.0052 7.476,-3.351 7.482,-7.48l0.0004,0c0.2047,-4.113 -3.108,-7.542 -7.226,-7.48c-4.846,0 -8.756,4.165 -11.99,7.48"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              stroke="rgb(223, 29, 71)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: {
                  duration: 1.5,
                  ease: [0.43, 0.13, 0.23, 0.96],
                },
                opacity: { duration: 0.3 },
              }}
              onAnimationComplete={() => setIsPathComplete(true)}
            />
            <motion.line
              fill="none"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              y2="32.51"
              y1="36"
              x2="36"
              x1="32.6"
              stroke="rgb(223, 29, 71)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: {
                  duration: 0.5,
                  delay: 1.3,
                  ease: "easeOut",
                },
                opacity: { duration: 0.2, delay: 1.3 },
              }}
              onAnimationComplete={() => setIsLine1Complete(true)}
            />
            <motion.line
              fill="none"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              y2="36"
              y1="39.49"
              x2="39.4"
              x1="36"
              stroke="rgb(223, 29, 71)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: {
                  duration: 0.5,
                  delay: 1.6,
                  ease: "easeOut",
                },
                opacity: { duration: 0.2, delay: 1.6 },
              }}
              onAnimationComplete={() => setIsLine2Complete(true)}
            />
          </g>
        </g>
      </svg>
    </motion.div>
  );
} 