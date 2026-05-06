import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "../lib/utils";
import React from "react";

interface CyberButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  glow?: boolean;
}

export function CyberButton({ children, className, variant = 'primary', glow = true, ...props }: CyberButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative px-6 py-3 font-mono font-bold tracking-wider uppercase overflow-hidden rounded-lg border",
        "transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variant === 'primary' && "bg-purple-600/20 border-purple-500 text-purple-100 hover:bg-purple-600/40",
        variant === 'secondary' && "bg-cyan-600/20 border-cyan-500 text-cyan-100 hover:bg-cyan-600/40",
        variant === 'danger' && "bg-red-600/20 border-red-500 text-red-100 hover:bg-red-600/40",
        variant === 'ghost' && "bg-transparent border-transparent text-slate-400 hover:text-slate-200",
        glow && variant === 'primary' && "shadow-[0_0_15px_rgba(168,85,247,0.3)]",
        glow && variant === 'secondary' && "shadow-[0_0_15px_rgba(34,211,238,0.3)]",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {glow && (
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
      )}
    </motion.button>
  );
}
