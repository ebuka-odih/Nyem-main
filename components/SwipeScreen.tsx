import React, { useState } from 'react';
import { X, Heart, MessageCircle, User } from 'lucide-react';

interface SwipeScreenProps {
  onBack: () => void;
}

export const SwipeScreen: React.FC<SwipeScreenProps> = ({ onBack }) => {
  const [lastDirection, setLastDirection] = useState<string | null>(null);

  // Mock item data
  const item = {
    name: "Vintage Film Camera",
    distance: "2 miles away",
    owner: "Alex M.",
    image: "https://picsum.photos/600/800",
    description: "Canon AE-1 in working condition. Looking for a road bike or guitar."
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    setLastDirection(direction);
    setTimeout(() => setLastDirection(null), 800);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      {/* Top Nav */}
      <div className="h-16 px-4 flex items-center justify-between bg-white shadow-sm z-20 shrink-0">
        <div className="w-8 h-8 rounded-full bg-gray-200 cursor-pointer overflow-hidden" onClick={onBack}>
             <img src="https://picsum.photos/100/100" className="w-full h-full object-cover" alt="Profile" />
        </div>
        <h1 className="text-brand font-extrabold text-xl tracking-tight">Nyem</h1>
        <MessageCircle className="text-gray-400 w-6 h-6" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 flex flex-col justify-center relative overflow-hidden">
        
        {/* Card Container - uses aspect ratio or max-height to fit nicely */}
        <div className={`relative w-full aspect-[3/4] max-h-[70vh] bg-white rounded-3xl shadow-xl overflow-hidden transition-transform duration-300 mx-auto ${lastDirection === 'left' ? '-translate-x-full rotate-[-20deg] opacity-0' : ''} ${lastDirection === 'right' ? 'translate-x-full rotate-[20deg] opacity-0' : ''}`}>
            
            {/* Image */}
            <div className="h-[65%] w-full relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                
                <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl md:text-3xl font-bold">{item.name}</h2>
                    <p className="font-medium opacity-90 text-sm md:text-base">{item.distance}</p>
                </div>
            </div>

            {/* Details */}
            <div className="p-4 md:p-6 h-[35%] flex flex-col justify-between">
                <div>
                    <div className="flex items-center space-x-2 mb-2">
                        <User size={16} className="text-gray-400" />
                        <span className="text-xs md:text-sm font-semibold text-gray-600">Owned by {item.owner}</span>
                    </div>
                    <p className="text-gray-500 text-xs md:text-sm line-clamp-3">{item.description}</p>
                </div>
            </div>

            {/* Swipe Indicators (Visual Feedback) */}
            {lastDirection === 'right' && (
                <div className="absolute top-8 left-8 border-4 border-green-500 text-green-500 rounded-lg px-4 py-1 text-3xl md:text-4xl font-extrabold transform -rotate-12 bg-white/20 backdrop-blur-sm">
                    TRADE
                </div>
            )}
            {lastDirection === 'left' && (
                <div className="absolute top-8 right-8 border-4 border-red-500 text-red-500 rounded-lg px-4 py-1 text-3xl md:text-4xl font-extrabold transform rotate-12 bg-white/20 backdrop-blur-sm">
                    PASS
                </div>
            )}
        </div>

      </div>

      {/* Action Buttons */}
      <div className="h-20 md:h-24 px-8 md:px-10 pb-4 md:pb-6 flex items-center justify-between shrink-0">
        <button 
            onClick={() => handleSwipe('left')}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
        >
            <X size={28} className="md:w-8 md:h-8" strokeWidth={3} />
        </button>

        <button 
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow flex items-center justify-center text-blue-400"
        >
            <span className="text-[10px] md:text-xs font-bold">INFO</span>
        </button>

        <button 
            onClick={() => handleSwipe('right')}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg flex items-center justify-center text-white hover:scale-105 transition-transform"
        >
            <Heart size={28} className="md:w-8 md:h-8" fill="currentColor" />
        </button>
      </div>
    </div>
  );
};