'use client';

import { useEffect } from 'react';
import { StarField } from './StarField';
import { CloudShape } from './CloudShape';
import { BirdFlock } from './BirdFlock';
import { useSkyTime } from '@/hooks/useSkyTime';

export function SkyBackground() {
  const layer1Clouds = [
    <CloudShape key="1" size="lg" style={{ top: '5%', left: '10%', animation: 'float-vertical 14s ease-in-out infinite' }} />, 
    <CloudShape key="2" size="lg" style={{ top: '65%', left: '35%', animation: 'float-vertical 16s ease-in-out infinite 2s' }} />, 
    <CloudShape key="3" size="lg" style={{ top: '30%', left: '70%', animation: 'float-vertical 18s ease-in-out infinite 4s' }} />, 
    <CloudShape key="4" size="lg" style={{ top: '80%', left: '85%', animation: 'float-vertical 15s ease-in-out infinite 1s' }} />, 
  ];

  const layer2Clouds = [
    <CloudShape key="1" size="md" style={{ top: '20%', left: '15%', animation: 'float-vertical-subtle 11s ease-in-out infinite 1s' }} />, 
    <CloudShape key="2" size="md" style={{ top: '55%', left: '45%', animation: 'float-vertical-subtle 13s ease-in-out infinite 2s' }} />, 
    <CloudShape key="3" size="md" style={{ top: '80%', left: '10%', animation: 'float-vertical-subtle 15s ease-in-out infinite 3s' }} />, 
    <CloudShape key="4" size="md" style={{ top: '35%', left: '85%', animation: 'float-vertical-subtle 12s ease-in-out infinite 0s' }} />, 
    <CloudShape key="5" size="md" style={{ top: '70%', left: '60%', animation: 'float-vertical-subtle 14s ease-in-out infinite 2s' }} />, 
  ];

  const layer3Clouds = [
    <CloudShape key="1" size="sm" style={{ top: '15%', left: '5%', animation: 'float-vertical-subtle 12s ease-in-out infinite' }} />, 
    <CloudShape key="2" size="sm" style={{ top: '45%', left: '25%', animation: 'float-vertical-subtle 14s ease-in-out infinite 2s' }} />, 
    <CloudShape key="3" size="sm" style={{ top: '75%', left: '50%', animation: 'float-vertical-subtle 10s ease-in-out infinite 1s' }} />, 
    <CloudShape key="4" size="sm" style={{ top: '25%', left: '75%', animation: 'float-vertical-subtle 16s ease-in-out infinite 3s' }} />, 
    <CloudShape key="5" size="sm" style={{ top: '60%', left: '95%', animation: 'float-vertical-subtle 13s ease-in-out infinite 4s' }} />, 
    <CloudShape key="6" size="sm" style={{ top: '85%', left: '30%', animation: 'float-vertical-subtle 15s ease-in-out infinite 1s' }} />, 
  ];

  const skyState = useSkyTime();

  useEffect(() => {
    document.documentElement.dataset.skyState = skyState;

    return () => {
      delete document.documentElement.dataset.skyState;
    };
  }, [skyState]);

  const gradients = {
    sunrise: 'linear-gradient(180deg, #ffb86c 0%, #ff9e80 60%, #ffe5d1 100%)',
    day: 'linear-gradient(180deg, #a0e8ff 0%, #77c9ff 60%, #c8e6ff 100%)',
    afternoon: 'linear-gradient(180deg, #8fd8ff 0%, #6ebdf0 42%, #ffd29a 100%)',
    sunset: 'linear-gradient(180deg, #ff7e5f 0%, #feb47b 60%, #ff9a8b 100%)',
    night: 'linear-gradient(180deg, #0b0e23 0%, #1a1e5b 60%, #2c2f9c 100%)',
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 transition-opacity duration-1000" style={{ background: gradients[skyState] }} />
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true" style={{ pointerEvents: 'none' }}>
        <div className="absolute inset-0 opacity-[0.12]" style={{ willChange: 'transform' }}>
          <div className="absolute top-0 left-0 h-full w-[200%] flex" style={{ animation: 'drift-left-to-right 300s linear infinite', willChange: 'transform' }}>
            <div className="relative w-1/2 h-full">{layer3Clouds}</div>
            <div className="relative w-1/2 h-full">{layer3Clouds}</div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-[0.18]" style={{ willChange: 'transform' }}>
          <div className="absolute top-0 left-0 h-full w-[200%] flex" style={{ animation: 'drift-right-to-left 240s linear infinite', willChange: 'transform' }}>
            <div className="relative w-1/2 h-full">{layer2Clouds}</div>
            <div className="relative w-1/2 h-full">{layer2Clouds}</div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-[0.25]" style={{ willChange: 'transform' }}>
          <div className="absolute top-0 left-0 h-full w-[200%] flex" style={{ animation: 'drift-left-to-right 180s linear infinite', willChange: 'transform' }}>
            <div className="relative w-1/2 h-full">{layer1Clouds}</div>
            <div className="relative w-1/2 h-full">{layer1Clouds}</div>
          </div>
        </div>
        <BirdFlock skyState={skyState} />
      </div>
      {skyState === 'night' && <StarField />}
    </div>
  );
}
