"use client";

import { useEffect, useRef, type FC } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const NEKO_SPEED = 9;
const SPRITE_SIZE = 32;
const IDLE_THRESHOLD = 48;
const IDLE_SCRATCH_DELAY = 4;
const IDLE_TIRED_DELAY = 8;
const IDLE_SLEEP_DELAY = 14;

// ─── Sprite Positions ─────────────────────────────────────────────────────────
// Each frame is [col, row] on the 8×4 sprite sheet (32×32 per frame).
// Negative values index from the right/bottom per the canonical layout.

type SpriteFrame = [number, number];

const spriteSets: Record<string, SpriteFrame[]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return true;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setSprite(
  el: HTMLDivElement,
  name: string,
  frame: number,
): void {
  const frames = spriteSets[name];
  if (!frames) return;
  const spriteFrame = frames[frame % frames.length];
  const x = spriteFrame[0] * SPRITE_SIZE;
  const y = spriteFrame[1] * SPRITE_SIZE;
  el.style.backgroundPosition = `${x}px ${y}px`;
}

// ─── Component ────────────────────────────────────────────────────────────────

const OnekoCompanion: FC = () => {
  const nekoRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    nekoPosX: 32,
    nekoPosY: 32,
    mousePosX: 0,
    mousePosY: 0,
    frameCount: 0,
    idleTime: 0,
    idleAnimation: null as string | null,
    idleAnimationFrame: 0,
    lastTimestamp: 0,
    accumulator: 0,
    mounted: false,
    hasMouseMoved: false,
  });

  useEffect(() => {
    // Guard: touch devices and reduced motion
    if (isTouchDevice() || isReducedMotion()) return;

    const el = nekoRef.current;
    if (!el) return;

    const state = stateRef.current;
    state.mounted = true;

    // Initialize position to center-ish
    state.nekoPosX = window.innerWidth / 2 - 16;
    state.nekoPosY = window.innerHeight / 2 - 16;
    el.style.left = `${state.nekoPosX - 16}px`;
    el.style.top = `${state.nekoPosY - 16}px`;
    el.style.display = "block";

    // ── Mouse tracking ──────────────────────────────────────────────────

    const onMouseMove = (e: MouseEvent) => {
      state.mousePosX = e.clientX;
      state.mousePosY = e.clientY;
      state.hasMouseMoved = true;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── Tick-based animation at ~10 FPS (classic Oneko rate) ─────────

    const TICK_INTERVAL = 100; // ms per logic tick

    const tick = () => {
      const el = nekoRef.current;
      if (!el || !state.mounted) return;

      state.frameCount++;

      // ── Idle behavior ───────────────────────────────────────────────

      if (state.idleAnimation) {
        handleIdleAnimation(el);
        return;
      }

      // ── Movement ────────────────────────────────────────────────────

      const diffX = state.mousePosX - state.nekoPosX;
      const diffY = state.mousePosY - state.nekoPosY;
      const distance = Math.sqrt(diffX * diffX + diffY * diffY);

      // If close enough to cursor, go idle
      if (distance < IDLE_THRESHOLD || !state.hasMouseMoved) {
        state.idleTime++;
        handleIdle(el);
        return;
      }

      // Cat is chasing — reset idle state
      state.idleAnimation = null;
      state.idleAnimationFrame = 0;

      // If we were idle and cursor moved, show alert first
      if (state.idleTime > 1) {
        setSprite(el, "alert", 0);
        state.idleTime = 0;
        return;
      }

      state.idleTime = 0;

      // ── Direction & movement ────────────────────────────────────────

      let direction = "";
      direction += diffY / distance > 0.5 ? "S" : "";
      direction += diffY / distance < -0.5 ? "N" : "";
      direction += diffX / distance > 0.5 ? "E" : "";
      direction += diffX / distance < -0.5 ? "W" : "";

      // Move toward cursor
      const stepX = (diffX / distance) * NEKO_SPEED;
      const stepY = (diffY / distance) * NEKO_SPEED;
      state.nekoPosX += stepX;
      state.nekoPosY += stepY;

      // Clamp to viewport
      state.nekoPosX = Math.max(16, Math.min(state.nekoPosX, window.innerWidth - 16));
      state.nekoPosY = Math.max(16, Math.min(state.nekoPosY, window.innerHeight - 16));

      // Apply position directly to DOM
      el.style.left = `${state.nekoPosX - 16}px`;
      el.style.top = `${state.nekoPosY - 16}px`;

      // Set walk animation frame
      if (direction && spriteSets[direction]) {
        setSprite(el, direction, state.frameCount);
      }
    };

    // ── Idle handler ──────────────────────────────────────────────────

    const handleIdle = (el: HTMLDivElement) => {
      // Check for wall scratching at viewport edges
      if (state.nekoPosX <= 18) {
        state.idleAnimation = "scratchWallW";
        return;
      }
      if (state.nekoPosX >= window.innerWidth - 18) {
        state.idleAnimation = "scratchWallE";
        return;
      }
      if (state.nekoPosY <= 18) {
        state.idleAnimation = "scratchWallN";
        return;
      }
      if (state.nekoPosY >= window.innerHeight - 18) {
        state.idleAnimation = "scratchWallS";
        return;
      }

      // Progressive idle states
      if (state.idleTime > IDLE_SLEEP_DELAY) {
        // After a while sleeping, occasionally groom
        if (state.idleTime % 16 === 0 && Math.random() < 0.3) {
          state.idleAnimation = "scratchSelf";
          return;
        }
        state.idleAnimation = "sleeping";
        return;
      }
      if (state.idleTime > IDLE_TIRED_DELAY) {
        state.idleAnimation = "tired";
        return;
      }
      if (state.idleTime > IDLE_SCRATCH_DELAY) {
        state.idleAnimation = "scratchSelf";
        return;
      }

      // Just sitting
      setSprite(el, "idle", 0);
    };

    // ── Idle animation handler ────────────────────────────────────────

    const handleIdleAnimation = (el: HTMLDivElement) => {
      const anim = state.idleAnimation;
      if (!anim) return;

      // Check if cursor moved — wake up
      const diffX = state.mousePosX - state.nekoPosX;
      const diffY = state.mousePosY - state.nekoPosY;
      const distance = Math.sqrt(diffX * diffX + diffY * diffY);

      if (distance >= IDLE_THRESHOLD && state.hasMouseMoved) {
        // Wake up!
        setSprite(el, "alert", 0);
        state.idleAnimation = null;
        state.idleAnimationFrame = 0;
        state.idleTime = 0;
        return;
      }

      // Continue idle animation
      state.idleAnimationFrame++;

      if (anim === "sleeping") {
        setSprite(el, "sleeping", Math.floor(state.idleAnimationFrame / 4));
      } else if (anim === "scratchSelf") {
        setSprite(el, "scratchSelf", state.idleAnimationFrame);
        // After a few loops of grooming, progress to tired/sleeping
        if (state.idleAnimationFrame > 9) {
          state.idleAnimation = null;
          state.idleAnimationFrame = 0;
          // Let the normal idle handler pick up next state
        }
      } else if (anim === "tired") {
        setSprite(el, "tired", 0);
        if (state.idleAnimationFrame > 6) {
          state.idleAnimation = "sleeping";
          state.idleAnimationFrame = 0;
        }
      } else {
        // Wall scratching animations
        setSprite(el, anim, state.idleAnimationFrame);
        if (state.idleAnimationFrame > 9) {
          state.idleAnimation = null;
          state.idleAnimationFrame = 0;
        }
      }
    };

    // ── RAF loop with fixed timestep for consistent speed ─────────

    let rafId: number;

    const loop = (timestamp: number) => {
      if (!state.mounted) return;

      if (state.lastTimestamp === 0) {
        state.lastTimestamp = timestamp;
      }

      const delta = timestamp - state.lastTimestamp;
      state.lastTimestamp = timestamp;
      state.accumulator += delta;

      // Process ticks at fixed intervals
      while (state.accumulator >= TICK_INTERVAL) {
        tick();
        state.accumulator -= TICK_INTERVAL;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    // ── Cleanup ───────────────────────────────────────────────────────

    return () => {
      state.mounted = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // Don't render on server or touch devices
  // The actual visibility is controlled by display:none → display:block in useEffect
  return (
    <div
      ref={nekoRef}
      id="oneko"
      aria-hidden="true"
      style={{
        position: "fixed",
        width: `${SPRITE_SIZE}px`,
        height: `${SPRITE_SIZE}px`,
        backgroundImage: "url(/oneko.gif)",
        imageRendering: "pixelated",
        pointerEvents: "none",
        zIndex: 9999,
        display: "none",
        left: "0px",
        top: "0px",
        willChange: "left, top",
      }}
    />
  );
};

export default OnekoCompanion;
