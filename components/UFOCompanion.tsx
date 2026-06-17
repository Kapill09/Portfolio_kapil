"use client";

import { useState, useEffect, useRef, type FC } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Position {
  x: number;
  y: number;
}

// ─── UFO SVG ──────────────────────────────────────────────────────────────────

const UFOBody: FC = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      filter:
        "drop-shadow(0 0 10px rgba(120,180,255,0.5)) drop-shadow(0 3px 8px rgba(0,0,0,0.6))",
    }}
  >
    <defs>
      <radialGradient id="ufo-body" cx="38%" cy="28%" r="72%">
        <stop offset="0%" stopColor="#ccd9ee" />
        <stop offset="40%" stopColor="#7a98bc" />
        <stop offset="100%" stopColor="#243552" />
      </radialGradient>
      <radialGradient id="ufo-dome" cx="38%" cy="22%" r="72%">
        <stop offset="0%" stopColor="rgba(210,232,255,0.88)" />
        <stop offset="55%" stopColor="rgba(100,155,218,0.42)" />
        <stop offset="100%" stopColor="rgba(36,72,136,0.18)" />
      </radialGradient>
      <radialGradient id="ufo-beam" cx="50%" cy="0%" r="85%">
        <stop offset="0%" stopColor="rgba(110,195,255,0.38)" />
        <stop offset="100%" stopColor="rgba(70,150,255,0)" />
      </radialGradient>
      <radialGradient id="ufo-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(100,200,255,0.65)" />
        <stop offset="65%" stopColor="rgba(80,155,255,0.18)" />
        <stop offset="100%" stopColor="rgba(60,120,255,0)" />
      </radialGradient>
      <linearGradient id="ufo-rim" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(210,228,255,0.95)" />
        <stop offset="50%" stopColor="rgba(140,178,230,0.55)" />
        <stop offset="100%" stopColor="rgba(55,95,155,0.35)" />
      </linearGradient>
    </defs>
    <ellipse cx="20" cy="30" rx="15" ry="4" fill="url(#ufo-glow)" opacity="0.65" />
    <ellipse cx="20" cy="27" rx="15" ry="5" fill="url(#ufo-beam)" />
    <ellipse cx="20" cy="23" rx="15.5" ry="5" fill="url(#ufo-body)" />
    <ellipse
      cx="20"
      cy="22.5"
      rx="16"
      ry="5.4"
      fill="none"
      stroke="url(#ufo-rim)"
      strokeWidth="0.7"
      opacity="0.85"
    />
    <ellipse
      cx="14.5"
      cy="22.5"
      rx="3.5"
      ry="0.9"
      fill="rgba(255,255,255,0.1)"
      transform="rotate(-6,14.5,22.5)"
    />
    <ellipse
      cx="20"
      cy="16"
      rx="6.5"
      ry="6.5"
      fill="url(#ufo-dome)"
      stroke="rgba(160,200,240,0.22)"
      strokeWidth="0.5"
    />
    <ellipse
      cx="17.8"
      cy="13.5"
      rx="2.2"
      ry="1.4"
      fill="rgba(255,255,255,0.38)"
      transform="rotate(-18,17.8,13.5)"
    />
    <ellipse cx="20" cy="23.2" rx="1.8" ry="0.55" fill="rgba(130,210,255,0.9)" />
    <ellipse cx="13.2" cy="23.8" rx="1.1" ry="0.45" fill="rgba(130,210,255,0.65)" />
    <ellipse cx="26.8" cy="23.8" rx="1.1" ry="0.45" fill="rgba(130,210,255,0.65)" />
  </svg>
);

const MAX_SPEED = 320; // Maximum travel speed in pixels per second
const MIN_SPEED = 20;
const MAX_ACCELERATION = 520; // How quickly UFO can change velocity
const CLOSE_DISTANCE = 100;
const FAR_DISTANCE = 460;
const ARRIVAL_RADIUS = 52;
const POINTER_OFFSET: Position = { x: -96, y: -72 };
const VIEWPORT_PADDING = 40;
const FLOAT_SPEED = 0.016;
const MAX_TILT = 7;
const ROTATION_SMOOTHING = 5;
const VELOCITY_DAMPING = 3.2;

const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

const magnitude = (position: Position): number => {
  return Math.hypot(position.x, position.y);
};

const clampVector = (vector: Position, maxLength: number): Position => {
  const length = magnitude(vector);

  if (length <= maxLength || length === 0) {
    return vector;
  }

  const scale = maxLength / length;
  return {
    x: vector.x * scale,
    y: vector.y * scale,
  };
};

const easeOutCubic = (value: number): number => {
  return 1 - Math.pow(1 - value, 3);
};

// ─── Component ────────────────────────────────────────────────────────────────

interface UFOState {
  position: Position;
  rotation: number;
  floatOffset: number;
  scale: number;
  showFlash: boolean;
}

const UFOCompanion: FC = () => {
  const [state, setState] = useState<UFOState>({
    position: { x: 0, y: 0 },
    rotation: 0,
    floatOffset: 0,
    scale: 1,
    showFlash: false,
  });
  const [mounted, setMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const posRef = useRef<Position>({ x: 0, y: 0 });
  const mouseRef = useRef<Position>({ x: 0, y: 0 });
  const hasMouseRef = useRef(false);
  const velocityRef = useRef<Position>({ x: 0, y: 0 }); // Physics velocity
  const rotationRef = useRef(0); // Smooth rotation tracking
  const floatTimeRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  // Initialize on client side
  useEffect(() => {
    setMounted(true);
    // Detect touch device
const isTouchCapable = () =>
  'ontouchstart' in window ||
  navigator.maxTouchPoints > 0;

setIsTouchDevice(isTouchCapable());
    
    const initialPos = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    posRef.current = initialPos;
    mouseRef.current = {
      x: initialPos.x - POINTER_OFFSET.x,
      y: initialPos.y - POINTER_OFFSET.y,
    };
    setState(prev => ({ ...prev, position: initialPos }));
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      hasMouseRef.current = true;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation loop - Physics-based independent movement
  useEffect(() => {
    let rafId: number;

    const animate = () => {
      if (!mounted) return;

      const now = performance.now();
      const previousTime = lastTimeRef.current ?? now;
      const deltaTime = clamp((now - previousTime) / 1000, 0.001, 0.05);
      lastTimeRef.current = now;

      // Update floating offset
      floatTimeRef.current += FLOAT_SPEED;
      const floatY = Math.sin(floatTimeRef.current * 0.7) * 4.5 + Math.cos(floatTimeRef.current * 0.25) * 3;
      const floatX = Math.sin(floatTimeRef.current * 0.3) * 2;

      if (hasMouseRef.current) {
        const target = {
          x: clamp(mouseRef.current.x + POINTER_OFFSET.x, VIEWPORT_PADDING, window.innerWidth - VIEWPORT_PADDING),
          y: clamp(mouseRef.current.y + POINTER_OFFSET.y, VIEWPORT_PADDING, window.innerHeight - VIEWPORT_PADDING),
        };
        const toTarget = {
          x: target.x - posRef.current.x,
          y: target.y - posRef.current.y,
        };
        const distance = magnitude(toTarget);

        if (distance > ARRIVAL_RADIUS) {
          const direction = {
            x: toTarget.x / distance,
            y: toTarget.y / distance,
          };
          const distanceFactor = clamp((distance - CLOSE_DISTANCE) / (FAR_DISTANCE - CLOSE_DISTANCE), 0, 1);
          const desiredSpeed = MIN_SPEED + easeOutCubic(distanceFactor) * (MAX_SPEED - MIN_SPEED);
          const arrivalFactor = clamp(distance / CLOSE_DISTANCE, 0.12, 1);
          const desiredVelocity = {
            x: direction.x * desiredSpeed * arrivalFactor,
            y: direction.y * desiredSpeed * arrivalFactor,
          };
          const steering = clampVector(
            {
              x: desiredVelocity.x - velocityRef.current.x,
              y: desiredVelocity.y - velocityRef.current.y,
            },
            MAX_ACCELERATION * deltaTime
          );

          velocityRef.current.x += steering.x;
          velocityRef.current.y += steering.y;
        } else {
          const damping = Math.exp(-VELOCITY_DAMPING * deltaTime);
          velocityRef.current.x *= damping;
          velocityRef.current.y *= damping;
        }
      } else {
        const damping = Math.exp(-VELOCITY_DAMPING * deltaTime);
        velocityRef.current.x *= damping;
        velocityRef.current.y *= damping;
      }

      velocityRef.current = clampVector(velocityRef.current, MAX_SPEED);

      // Update position based on velocity
      posRef.current.x += velocityRef.current.x * deltaTime;
      posRef.current.y += velocityRef.current.y * deltaTime;

      if (posRef.current.x < VIEWPORT_PADDING && velocityRef.current.x < 0) {
        velocityRef.current.x *= -0.25;
      } else if (posRef.current.x > window.innerWidth - VIEWPORT_PADDING && velocityRef.current.x > 0) {
        velocityRef.current.x *= -0.25;
      }

      if (posRef.current.y < VIEWPORT_PADDING && velocityRef.current.y < 0) {
        velocityRef.current.y *= -0.25;
      } else if (posRef.current.y > window.innerHeight - VIEWPORT_PADDING && velocityRef.current.y > 0) {
        velocityRef.current.y *= -0.25;
      }

      const speed = magnitude(velocityRef.current);
      const speedFactor = clamp(speed / MAX_SPEED, 0, 1);
      const hoverWobble = Math.sin(now * 0.002) * 1.2 * (1 - speedFactor);
      const targetRotation = clamp((velocityRef.current.x / MAX_SPEED) * MAX_TILT + hoverWobble, -10, 10);
      const rotationEase = 1 - Math.exp(-ROTATION_SMOOTHING * deltaTime);
      rotationRef.current = clamp(
        rotationRef.current + (targetRotation - rotationRef.current) * rotationEase,
        -10,
        10
      );
      
      // OPTIMIZATION: Single setState instead of three separate calls
      // Batched state update for better performance (60 FPS with 1 re-render instead of 3)
      setState({
        position: { x: posRef.current.x, y: posRef.current.y },
        rotation: rotationRef.current,
        floatOffset: floatY + floatX * 0.5,
        scale: state.scale,
        showFlash: state.showFlash,
      });

      rafId = requestAnimationFrame(animate);
    };

    if (mounted) {
      rafId = requestAnimationFrame(animate);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mounted ]);

  // Teleport on click
  const handleClick = () => {
    setState(prev => ({ ...prev, scale: 0.5, showFlash: true }));

    // Reset velocity on teleport
    velocityRef.current = { x: 0, y: 0 };

    setTimeout(() => {
      const offsetX = (Math.random() - 0.5) * 200;
      const offsetY = (Math.random() - 0.5) * 200;

      const newX = Math.max(40, Math.min(window.innerWidth - 40, posRef.current.x + offsetX));
      const newY = Math.max(40, Math.min(window.innerHeight - 40, posRef.current.y + offsetY));

      posRef.current = { x: newX, y: newY };
      setState(prev => ({ 
        ...prev,
        position: posRef.current,
        showFlash: false,
        scale: 1,
      }));
    }, 150);
  };

  if (!mounted || isTouchDevice) return null;

  return (
    <>
      {/* Flash effect */}
      {state.showFlash && (
        <div
          style={{
            position: "fixed",
            left: state.position.x - 28,
            top: state.position.y - 28,
            width: 56,
            height: 56,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(180,228,255,0.92) 0%, rgba(110,185,255,0.38) 48%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 10000,
            animation: "ufo-flash 0.2s ease-out forwards",
          }}
        />
      )}

      {/* UFO */}
      <div
        onClick={handleClick}
        style={{
          position: "fixed",
          left: `${state.position.x}px`,
          top: `${state.position.y + state.floatOffset}px`,
          transform: `translate(-50%, -50%) rotate(${state.rotation}deg) scale(${state.scale})`,
          cursor: "pointer",
          zIndex: 9999,
          userSelect: "none",
          pointerEvents: "auto",
          transition: "transform 0.05s linear",
          willChange: "transform",
        }}
      >
        <UFOBody />
      </div>

      <style>{`
        @keyframes ufo-flash {
          0%   { transform: scale(0.5); opacity: 1; }
          65%  { transform: scale(1.3); opacity: 0.6; }
          100% { transform: scale(2);   opacity: 0; }
        }

      `}</style>
    </>
  );
};

export default UFOCompanion;
