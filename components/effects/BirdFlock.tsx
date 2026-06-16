'use client';

import { useEffect } from 'react';
import {
  type MotionValue,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import type { SkyState } from '@/hooks/useSkyTime';

type AnchoredBird = {
  id: string;
  placement: 'hero' | 'project';
  size: number;
  opacity: number;
  parallax: number;
  floatRadius: number;
  rotate: number;
};

type CrossingBird = {
  id: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
};

const anchoredBirds: AnchoredBird[] = [
  {
    id: 'hero-right',
    placement: 'hero',
    size: 52,
    opacity: 0.78,
    parallax: 18,
    floatRadius: 7,
    rotate: -4,
  },
  {
    id: 'project-left',
    placement: 'project',
    size: 46,
    opacity: 0.74,
    parallax: 13,
    floatRadius: 6,
    rotate: 3,
  },
];

const crossingBird: CrossingBird = {
  id: 'sky-crossing',
  size: 38,
  opacity: 0.7,
  duration: 42,
  delay: -18,
};

type BirdFlockProps = {
  skyState: SkyState;
};

type AnchoredBirdItemProps = {
  bird: AnchoredBird;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  reduceMotion: boolean;
};

function BirdSilhouette({ size, reduceMotion }: { size: number; reduceMotion: boolean }) {
  const wingTransition = reduceMotion
    ? { duration: 0 }
    : {
        duration: 1.9,
        ease: 'easeInOut' as const,
        repeat: Infinity,
      };

  return (
    <svg
      width={size}
      height={Math.round(size * 0.5)}
      viewBox="0 0 56 28"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block' }}
    >
      <motion.path
        d="M27 17C20 7 10 5 3 13"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ originX: 1, originY: 1 }}
        animate={reduceMotion ? undefined : { rotate: [0, -9, 0, 6, 0] }}
        transition={wingTransition}
      />
      <motion.path
        d="M29 17C36 7 46 5 53 13"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ originX: 0, originY: 1 }}
        animate={reduceMotion ? undefined : { rotate: [0, 9, 0, -6, 0] }}
        transition={wingTransition}
      />
    </svg>
  );
}

function AnchoredBirdItem({ bird, parallaxX, parallaxY, reduceMotion }: AnchoredBirdItemProps) {
  const x = useTransform(parallaxX, (value) => value * bird.parallax);
  const y = useTransform(parallaxY, (value) => value * bird.parallax * 0.55);
  const placementClass =
    bird.placement === 'hero'
      ? 'right-[8%] top-[18%] md:right-[13%] md:top-[21%]'
      : 'left-[6%] top-[61%] md:left-[8%] md:top-[66%]';

  return (
    <motion.div
      className={`absolute ${placementClass}`}
      style={{
        x,
        y,
        opacity: bird.opacity,
        rotate: bird.rotate,
        willChange: 'transform',
      }}
    >
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, bird.floatRadius, 0, -bird.floatRadius, 0],
                y: [0, -bird.floatRadius, -bird.floatRadius * 0.2, bird.floatRadius, 0],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: bird.placement === 'hero' ? 9.5 : 11,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
      >
        <BirdSilhouette size={bird.size} reduceMotion={reduceMotion} />
      </motion.div>
    </motion.div>
  );
}

export function BirdFlock({ skyState }: BirdFlockProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 22, mass: 0.6 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 22, mass: 0.6 });
  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [-1, 1]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [-1, 1]);
  const color = skyState === 'night' ? 'rgb(203 213 225)' : 'rgb(31 41 55)';

  useEffect(() => {
    if (reduceMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      mouseX.set(event.clientX / window.innerWidth - 0.5);
      mouseY.set(event.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [mouseX, mouseY, reduceMotion]);

  return (
    <div
      className="absolute inset-0 z-[1] overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{ color }}
    >
      {anchoredBirds.map((bird) => (
        <AnchoredBirdItem
          key={bird.id}
          bird={bird}
          parallaxX={parallaxX}
          parallaxY={parallaxY}
          reduceMotion={reduceMotion}
        />
      ))}

      <motion.div
        className="absolute left-0 top-[9%] md:top-[12%]"
        style={{
          opacity: crossingBird.opacity,
          willChange: 'transform',
        }}
        animate={
          reduceMotion
            ? { x: '72vw', y: 0 }
            : {
                x: ['-10vw', '24vw', '64vw', '110vw'],
                y: [0, 10, -8, 4],
                rotate: [-3, -1, 2, -2],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: crossingBird.duration,
                delay: crossingBird.delay,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.28, 0.72, 1],
              }
        }
      >
        <BirdSilhouette size={crossingBird.size} reduceMotion={reduceMotion} />
      </motion.div>
    </div>
  );
}
