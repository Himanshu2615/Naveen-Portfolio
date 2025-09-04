"use client";
import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const CometCard = ({
  rotateDepth = 20,
  translateDepth = 15,
  className,
  children,
}: {
  rotateDepth?: number;
  translateDepth?: number;
  className?: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(ySpring, [-1, 1], [`${rotateDepth}deg`, `-${rotateDepth}deg`]);
  const rotateY = useTransform(xSpring, [-1, 1], [`-${rotateDepth}deg`, `${rotateDepth}deg`]);

  const translateX = useTransform(xSpring, [-1, 1], [`-${translateDepth}px`, `${translateDepth}px`]);
  const translateY = useTransform(ySpring, [-1, 1], [`${translateDepth}px`, `-${translateDepth}px`]);

  const glareX = useTransform(xSpring, [-1, 1], [0, 100]);
  const glareY = useTransform(ySpring, [-1, 1], [0, 100]);

  const glareBackground = useMotionTemplate`
    radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.5) 20%, rgba(255,255,255,0) 70%)
  `;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / rect.width) * 2 - 1;
    const yPct = (mouseY / rect.height) * 2 - 1;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className={cn("relative", className)}
      style={{ perspective: "1000px" }} // 👈 ensures 3D tilt
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          transformStyle: "preserve-3d",
          transformPerspective: 1000, // 👈 critical fix
        }}
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        className="relative rounded-2xl"
      >
        {children}
        <motion.div
          className="pointer-events-none absolute inset-0 z-50 h-full w-full rounded-[16px] mix-blend-overlay"
          style={{ background: glareBackground, opacity: 0.4 }}
        />
      </motion.div>
    </div>
  );
};
