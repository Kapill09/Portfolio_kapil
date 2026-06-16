// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATION CONFIGURATION - GPU-OPTIMIZED
// ═══════════════════════════════════════════════════════════════════════════════

// OPTIMIZATION: Standardized spring presets for consistent, smooth animations
// These use GPU-friendly properties (transform, opacity) for 60 FPS performance

export const springPresets = {
  // Smooth, premium feel - best for UI interactions
  smooth: { type: 'spring' as const, stiffness: 150, damping: 20, mass: 0.5 },
  
  // Snappy, responsive - for quick user feedback
  responsive: { type: 'spring' as const, stiffness: 200, damping: 25, mass: 0.4 },
  
  // Bouncy, playful - for delightful interactions
  bouncy: { type: 'spring' as const, stiffness: 120, damping: 12, mass: 0.6 },
  
  // Folder cards - carefully tuned for stacked card effect
  folder: { type: 'spring' as const, stiffness: 135, damping: 19, mass: 0.8 },
  
  // UFO physics - controlled, smooth movement
  ufo: { type: 'spring' as const, stiffness: 140, damping: 22, mass: 0.8 },
}

// OPTIMIZATION: GPU-accelerated animation variants
// Uses transform, translate3d, scale, rotate, opacity (GPU-accelerated)
// Avoids animating layout properties (width, height, margin, etc.)
export const animations = {
  // Fade in with subtle lift
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  
  // Slide up with fade - GPU-friendly
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ...springPresets.smooth },
  },
  
  // Slide left with fade
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ...springPresets.smooth },
  },
  
  // Slide right with fade
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ...springPresets.smooth },
  },
  
  // Scale in with fade - GPU-friendly
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ...springPresets.smooth },
  },
  
  // Rotate in with fade - GPU-friendly
  rotateIn: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
    transition: { duration: 0.6, ...springPresets.smooth },
  },
}

// OPTIMIZATION: will-change CSS helpers for hint browser about expensive transforms
export const willChangeHelpers = {
  transform: 'willChange: "transform"' as const,
  opacity: 'willChange: "opacity"' as const,
  all: 'willChange: "transform, opacity"' as const,
}

// OPTIMIZATION: Easing functions for consistent timing across animations
export const easings = {
  // Default ease-out-expo (premium feeling)
  outExpo: [0.16, 1, 0.3, 1],
  
  // Ease-out-cubic (smooth, responsive)
  outCubic: [0.33, 1, 0.68, 1],
  
  // Ease-out-quart (crisp)
  outQuart: [0.25, 1, 0.5, 1],
}

// OPTIMIZATION: Transition presets for common animations
export const transitionPresets = {
  // Quick interactions
  fast: { duration: 0.2, ease: easings.outCubic },
  
  // Standard interactions
  normal: { duration: 0.3, ease: easings.outExpo },
  
  // Page transitions
  page: { type: 'spring' as const, stiffness: 140, damping: 22, mass: 0.8 },
  
  // Smooth scroll reveals
  scroll: { duration: 0.6, ease: easings.outExpo },
}
