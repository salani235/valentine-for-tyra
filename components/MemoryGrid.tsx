
import React from 'react';
import { MEMORIES } from '../constants.tsx'; // If error here, try './constants' or '../constants.tsx'
import { Memory } from '../types';

interface MemoryGridProps {
  onMemoryClick: (memory: Memory) => void;
}

const EffectOverlay = ({ type }: { type?: string }) => {
  if (!type) return null;
  
  const icons: Record<string, string[]> = {
    sunflowers: ['🌻', '☀️', '🌻'],
    butterflies: ['🦋', '✨', '🦋'],
    hearts: ['❤️', '💖', '💕'],
    sparkles: ['✨', '🌟', '💫']
  };

  const selectedIcons = icons[type] || [];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {selectedIcons.map((icon, i) => (
        <span 
          key={i} 
          className="absolute animate-bounce opacity-80"
          style={{
            left: `${(i + 1) * 25}%`,
            top: `${20 + (i * 20)}%`,
            animationDelay: `${i * 0.5}s`,
            fontSize: '1.5rem'
          }}
        >
          {icon}
        </span>
      ))}
    </div>
  );
};

const MemoryGrid: React.FC<MemoryGridProps> = ({ onMemoryClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {MEMORIES.map((memory: Memory) => (
        <div 
          key={memory.id}
          onClick={() => onMemoryClick(memory)}
          className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg transform transition hover:scale-105 bg-white"
        >
          <EffectOverlay type={memory.effect} />
          
          <img 
            src={memory.imageUrl} 
            alt="Relationship Memory" 
            className="w-full h-48 md:h-64 object-cover filter brightness-90 group-hover:brightness-100 transition duration-300"
          />
          
          {memory.isSpicy && (
            <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse z-20">
              IS U A FREAK! 🔥
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 z-20">
            <p className="text-white text-sm font-semibold italic">Click me</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemoryGrid;