import React from 'react';
import { Button } from './Button';
import { Smartphone, Heart, Repeat } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col h-full bg-brand relative overflow-hidden">
      
      {/* Top Section: Branding */}
      <div className="flex-1 flex flex-col items-center justify-center pt-12 pb-16 px-6 text-white z-10">
        
        {/* Logo Circle */}
        <div className="w-24 h-24 rounded-full border-2 border-white/30 flex items-center justify-center bg-white/10 mb-6 backdrop-blur-sm shadow-xl">
          <span className="text-5xl font-extrabold tracking-tight">N</span>
        </div>
        
        {/* App Name */}
        <h1 className="text-4xl font-extrabold tracking-wide mb-2">Nyem</h1>
        
        {/* Tagline */}
        <p className="text-white/90 font-medium text-lg tracking-wide">Tinder For Barter</p>
      </div>

      {/* Bottom Card Section */}
      <div className="bg-white rounded-t-[36px] w-full px-8 pt-10 pb-8 flex flex-col items-center shadow-[0_-10px_40px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom duration-500">
        
        {/* Card Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Swap. Match. Trade.</h2>
          <p className="text-gray-500 text-base leading-relaxed max-w-[280px] mx-auto">
            Turn your unused items into something you actually want
          </p>
        </div>

        {/* Features List */}
        <div className="w-full space-y-8 mb-12">
          
          {/* Item 1 */}
          <div className="flex items-center space-x-5">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-6 h-6 text-gray-800" strokeWidth={2.5} />
            </div>
            <span className="text-gray-800 font-semibold text-lg">Swipe to discover items</span>
          </div>

          {/* Item 2 */}
          <div className="flex items-center space-x-5">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-green-500 fill-green-500" />
            </div>
            <span className="text-gray-800 font-semibold text-lg">Match with traders</span>
          </div>

          {/* Item 3 */}
          <div className="flex items-center space-x-5">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Repeat className="w-6 h-6 text-blue-500" strokeWidth={2.5} />
            </div>
            <span className="text-gray-800 font-semibold text-lg">Trade locally</span>
          </div>

        </div>

        {/* Action Button */}
        <div className="w-full mt-auto">
          <Button fullWidth onClick={onGetStarted}>
            Get Started
          </Button>
        </div>

        {/* Footer Legal */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            By continuing, you agree to our <a href="#" className="font-bold underline decoration-1">Terms of Use</a> and <a href="#" className="font-bold underline decoration-1 text-brand">Privacy Policy</a>
          </p>
        </div>

      </div>
    </div>
  );
};