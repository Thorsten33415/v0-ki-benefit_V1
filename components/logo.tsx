"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* AI Circuit Icon */}
      <div className="relative">
        <svg
          width={size === "sm" ? "24" : size === "md" ? "32" : size === "lg" ? "40" : "48"}
          height={size === "sm" ? "24" : size === "md" ? "32" : size === "lg" ? "40" : "48"}
          viewBox="0 0 32 32"
          className="text-primary"
          fill="none"
        >
          {/* Neural network inspired design */}
          <circle cx="8" cy="8" r="2" fill="currentColor" />
          <circle cx="24" cy="8" r="2" fill="currentColor" />
          <circle cx="8" cy="24" r="2" fill="currentColor" />
          <circle cx="24" cy="24" r="2" fill="currentColor" />
          <circle cx="16" cy="16" r="3" fill="currentColor" className="text-secondary" />

          {/* Connection lines */}
          <line x1="10" y1="8" x2="13" y2="14" stroke="currentColor" strokeWidth="1.5" className="text-primary/60" />
          <line x1="22" y1="8" x2="19" y2="14" stroke="currentColor" strokeWidth="1.5" className="text-primary/60" />
          <line x1="10" y1="24" x2="13" y2="18" stroke="currentColor" strokeWidth="1.5" className="text-primary/60" />
          <line x1="22" y1="24" x2="19" y2="18" stroke="currentColor" strokeWidth="1.5" className="text-primary/60" />
        </svg>
      </div>

      {/* Wordmark */}
      <div className={cn("font-sans font-bold tracking-tight", sizeClasses[size])}>
        <span className="text-black">ki</span>
        <span className="text-black">-</span>
        <span className="text-black">benefits</span>
      </div>
    </div>
  )
}

// Alternative version with background
export function LogoWithBackground({ className, size = "md" }: LogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-3 px-4 py-2 bg-card rounded-lg border shadow-sm", className)}>
      <Logo size={size} />
    </div>
  )
}

// Icon-only version
export function LogoIcon({ className, size = "md" }: LogoProps) {
  const iconSize = size === "sm" ? "24" : size === "md" ? "32" : size === "lg" ? "40" : "48"

  return (
    <div className={cn("relative", className)}>
      <svg width={iconSize} height={iconSize} viewBox="0 0 32 32" className="text-primary" fill="none">
        {/* Neural network inspired design */}
        <circle cx="8" cy="8" r="2" fill="currentColor" />
        <circle cx="24" cy="8" r="2" fill="currentColor" />
        <circle cx="8" cy="24" r="2" fill="currentColor" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
        <circle cx="16" cy="16" r="3" fill="currentColor" className="text-secondary" />

        {/* Connection lines */}
        <line x1="10" y1="8" x2="13" y2="14" stroke="currentColor" strokeWidth="1.5" className="text-primary/60" />
        <line x1="22" y1="8" x2="19" y2="14" stroke="currentColor" strokeWidth="1.5" className="text-primary/60" />
        <line x1="10" y1="24" x2="13" y2="18" stroke="currentColor" strokeWidth="1.5" className="text-primary/60" />
        <line x1="22" y1="24" x2="19" y2="18" stroke="currentColor" strokeWidth="1.5" className="text-primary/60" />
      </svg>
    </div>
  )
}

// Footer-specific logo variant with proper colors for dark background
export function LogoFooter({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* AI Circuit Icon */}
      <div className="relative">
        <svg
          width={size === "sm" ? "24" : size === "md" ? "32" : size === "lg" ? "40" : "48"}
          height={size === "sm" ? "24" : size === "md" ? "32" : size === "lg" ? "40" : "48"}
          viewBox="0 0 32 32"
          className="text-accent"
          fill="none"
        >
          {/* Neural network inspired design */}
          <circle cx="8" cy="8" r="2" fill="currentColor" />
          <circle cx="24" cy="8" r="2" fill="currentColor" />
          <circle cx="8" cy="24" r="2" fill="currentColor" />
          <circle cx="24" cy="24" r="2" fill="currentColor" />
          <circle cx="16" cy="16" r="3" fill="currentColor" className="text-primary-foreground" />

          {/* Connection lines */}
          <line x1="10" y1="8" x2="13" y2="14" stroke="currentColor" strokeWidth="1.5" className="text-accent/60" />
          <line x1="22" y1="8" x2="19" y2="14" stroke="currentColor" strokeWidth="1.5" className="text-accent/60" />
          <line x1="10" y1="24" x2="13" y2="18" stroke="currentColor" strokeWidth="1.5" className="text-accent/60" />
          <line x1="22" y1="24" x2="19" y2="18" stroke="currentColor" strokeWidth="1.5" className="text-accent/60" />
        </svg>
      </div>

      {/* Wordmark */}
      <div className={cn("font-sans font-bold tracking-tight", sizeClasses[size])}>
        <span className="text-black">ki</span>
        <span className="text-black">-</span>
        <span className="text-black">benefits</span>
      </div>
    </div>
  )
}
