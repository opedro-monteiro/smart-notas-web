"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import logoSrc from "@/components/icons/logo.png";

interface LogoLoaderProps {
  size?: number;
  className?: string;
}

export function LogoLoader({ size = 72, className }: LogoLoaderProps) {
  return (
    <div
      className={className}
      style={{ width: size, height: size, position: "relative" }}
    >
      {/* Spinning ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: -6,
          borderRadius: "9999px",
          border: "3px solid transparent",
          borderTopColor: "var(--color-primary)",
          borderRightColor: "var(--color-primary)",
        }}
      />

      {/* Faint track ring */}
      <div
        style={{
          position: "absolute",
          inset: -6,
          borderRadius: "9999px",
          border: "3px solid",
          borderColor: "oklch(0.7 0.12 160 / 0.15)",
        }}
      />

      {/* Logo pulse */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: size, height: size, borderRadius: "24%", overflow: "hidden" }}
      >
        <Image
          src={logoSrc}
          alt="Lembreto"
          width={size}
          height={size}
          priority
        />
      </motion.div>
    </div>
  );
}

export function LogoLoaderScreen() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <LogoLoader size={80} />
    </div>
  );
}
