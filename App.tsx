
import React, { useState, useEffect, useRef } from 'react';
import InvitationScreen from './components/InvitationScreen';
import MemoryGrid from './components/MemoryGrid';
import { AppPhase, Memory } from './types';
import { generateRomanticMessage } from './geminiService';
import { playSound, SOUNDS } from './utils/audio';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>(AppPhase.INVITE);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [dynamicIntro, setDynamicIntro] = useState<string>("Tyra, I knew you'd say yes!");
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (phase === AppPhase.CELEBRATE) {
      generateRomanticMessage("She said yes to my valentine invitation").then(setDynamicIntro);
    }
  }, [phase]);

  const handleAccept = () => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.play().catch(err => console.log("Music play blocked", err));
    }
    setPhase(AppPhase.CELEBRATE);
  };

  const handleMemoryClick = (memory: Memory) => {
    setSelectedMemory(memory);
    // IS SPICY LOGIC FOR SOUND
    if (memory.isSpicy) {
      playSound(SOUNDS.SEXY, 0.8); // Plays the sexy mood sound
    } else {
      playSound(SOUNDS.DING, 0.5); // Plays a sweet ding
    }
  };

  const closeOverlay = () => setSelectedMemory(null);

  return (
    <div className="min-h-screen">
      <audio ref={backgroundMusicRef} src="/romantic.mp3" loop />

      {phase === AppPhase.INVITE ? (
        <InvitationScreen onAccept={handleAccept} />
      ) : (
        <div className="min-h-screen bg-pink-50 py-12 px-4 animate-in fade-in duration-1000">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-romantic text-red-600 mb-4 drop-shadow-sm">And I promise forever</h1>
            <p className="text-xl text-red-800/80 max-w-2xl mx-auto italic">
              "{dynamicIntro}"
            </p>
            <div className="w-24 h-1 bg-red-300 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 text-pink-500 font-romantic">Our Secret Gallery</h2>
            <MemoryGrid onMemoryClick={handleMemoryClick} />
          </div>

          {/* IS SPICY LOGIC FOR OVERLAY */}
          {selectedMemory && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
              onClick={closeOverlay}
            >
              <div 
                className={`max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl transform transition-all scale-100 
                  ${selectedMemory.isSpicy ? 'ring-8 ring-red-500 shadow-[0_0_50px_rgba(239,68,68,0.6)]' : ''}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-square">
                  <img src={selectedMemory.imageUrl} alt="Memory" className="w-full h-full object-cover" />
                  <button onClick={closeOverlay} className="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center">✕</button>
                  
                  {selectedMemory.isSpicy && (
                    <div className="absolute bottom-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                      Only you! 🔥
                    </div>
                  )}
                </div>

                <div className="p-8 text-center bg-white">
                  <p className={`text-xl leading-relaxed ${selectedMemory.isSpicy ? 'text-red-600 font-bold italic' : 'text-gray-800'}`}>
                    {selectedMemory.message}
                  </p>
                  
                  {selectedMemory.isSpicy && (
                    <div className="mt-4 flex justify-center gap-3 animate-bounce">
                      <span className="text-3xl">🌶️</span>
                      <span className="text-3xl">🫦</span>
                      <span className="text-3xl">🔥</span>
                    </div>
                  )}

                  <button 
                    onClick={closeOverlay} 
                    className={`mt-6 w-full py-4 rounded-xl font-bold transition shadow-lg 
                      ${selectedMemory.isSpicy ? 'bg-red-600 hover:bg-red-700 text-white tracking-widest' : 'bg-pink-500 hover:bg-pink-600 text-white'}`}
                  >
                    {selectedMemory.isSpicy ? "I WANT YOU" : "ALL MINE"}
                  </button>
                </div>
              </div>
            </div>
          )}

          <footer className="text-center pb-12 mt-12 text-red-400">
            <p className="font-romantic text-2xl">Forever yours, & you're mine.</p>
          </footer>
        </div>
      )}
    </div>
  );
};

export default App;