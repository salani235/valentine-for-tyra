
import React, { useState, useEffect } from 'react';
import { FUNNY_NO_REPLIES } from '../constants';
import { playSound, SOUNDS } from '../utils/audio';

interface InvitationScreenProps {
  onAccept: () => void;
}

const InvitationScreen: React.FC<InvitationScreenProps> = ({ onAccept }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const moveNoButton = () => {
    // Avoid edges: maintain a 100px padding
    const padding = 100;
    const availableWidth = window.innerWidth - (padding * 2);
    const availableHeight = window.innerHeight - (padding * 2);
    
    // Ensure the button stays within the "safe zone"
    const newX = Math.max(padding, Math.random() * availableWidth);
    const newY = Math.max(padding, Math.random() * availableHeight);
    
    setNoButtonPos({ x: newX, y: newY });
    setNoCount(prev => prev + 1);
    
    // Play funny dodge sound
    playSound(SOUNDS.BOING, 0.4);
  };

  const handleAcceptClick = () => {
    playSound(SOUNDS.SUCCESS, 0.6);
    onAccept();
  };

  const currentNoReply = FUNNY_NO_REPLIES[noCount % FUNNY_NO_REPLIES.length];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-8 bg-pink-50 relative overflow-hidden">
      {/* Decorative Floating Hearts */}
      <div className="absolute top-10 left-10 text-red-300 text-6xl opacity-20 animate-float">❤️</div>
      <div className="absolute bottom-20 right-10 text-red-300 text-8xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>❤️</div>
      <div className="absolute top-1/2 right-20 text-red-300 text-4xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>❤️</div>

      <div className="max-w-md w-full bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-red-100 relative z-10">
        <img 
          src="yourphoto.jpg" 
          alt="Cute Valentine" 
          className="w-48 h-48 mx-auto mb-6 rounded-2xl object-cover shadow-lg"
        />
        
        <h1 className="text-4xl font-extrabold text-red-600 mb-2 font-romantic">Hey Tyra!</h1>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
           My favourite place is where we're together.
          <br /><br />
          <span className="font-bold text-red-500">Will you be my Valentine?</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={handleAcceptClick}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-10 rounded-full shadow-lg transform transition active:scale-95 text-xl"
          >
            YES! 😍
          </button>

          {isClient && (
            <button
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              style={{
                position: noCount > 0 ? 'fixed' : 'relative',
                left: noCount > 0 ? `${noButtonPos.x}px` : 'auto',
                top: noCount > 0 ? `${noButtonPos.y}px` : 'auto',
                transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: 100
              }}
              className="bg-gray-200 text-gray-600 font-bold py-3 px-10 rounded-full text-lg cursor-not-allowed whitespace-nowrap"
            >
              {noCount === 0 ? "No 😢" : currentNoReply}
            </button>
          )}
        </div>
        
        {noCount > 3 && (
          <p className="mt-4 text-xs text-red-400 italic">
            Hint: DON'T PLAY WITH ME!
          </p>
        )}
      </div>
    </div>
  );
};

export default InvitationScreen;
