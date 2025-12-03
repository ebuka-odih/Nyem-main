import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SignInScreen } from './components/SignInScreen';
import { SignUpPhoneScreen } from './components/SignUpPhoneScreen';
import { SignUpOtpScreen } from './components/SignUpOtpScreen';
import { SetupProfileScreen } from './components/SetupProfileScreen';
import { SwipeScreen } from './components/SwipeScreen';
import { ScreenState } from './types';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('welcome');
  const [signupPhone, setSignupPhone] = useState('');

  const handleSendOtp = (phone: string) => {
    setSignupPhone(phone);
    setCurrentScreen('signup_otp');
  };

  return (
    // Main container 
    // - w-full h-[100dvh]: Fills the screen on mobile
    // - md:max-w-md md:mx-auto: Constrains width on tablet/desktop to simulate mobile app size
    // - md:h-[90dvh] md:my-[5dvh] md:rounded-3xl: Adds a nice floating look on desktop
    <div className="w-full h-[100dvh] md:max-w-md md:mx-auto md:h-[95dvh] md:my-[2.5dvh] bg-white relative overflow-hidden md:rounded-[3rem] shadow-2xl md:border-[8px] md:border-gray-900">
      
      {/* Screen Content */}
      <div className="w-full h-full absolute inset-0 overflow-y-auto no-scrollbar">
        {currentScreen === 'welcome' && (
          <WelcomeScreen onGetStarted={() => setCurrentScreen('signin')} />
        )}

        {currentScreen === 'signin' && (
          <SignInScreen 
            onSignIn={() => setCurrentScreen('home')} 
            onBack={() => setCurrentScreen('welcome')}
            onSignUp={() => setCurrentScreen('signup_phone')}
          />
        )}

        {currentScreen === 'signup_phone' && (
            <SignUpPhoneScreen 
                onSendOtp={handleSendOtp}
                onBack={() => setCurrentScreen('signin')}
            />
        )}

        {currentScreen === 'signup_otp' && (
            <SignUpOtpScreen 
                phoneNumber={signupPhone}
                onVerify={() => setCurrentScreen('setup_profile')}
                onBack={() => setCurrentScreen('signup_phone')}
            />
        )}

        {currentScreen === 'setup_profile' && (
            <SetupProfileScreen 
                onComplete={() => setCurrentScreen('home')}
                onBack={() => setCurrentScreen('signup_otp')}
            />
        )}

        {currentScreen === 'home' && (
          <SwipeScreen onBack={() => setCurrentScreen('welcome')} />
        )}
      </div>
    </div>
  );
};

export default App;