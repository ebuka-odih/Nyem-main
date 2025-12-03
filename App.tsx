import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SignInScreen } from './components/SignInScreen';
import { SignUpPhoneScreen } from './components/SignUpPhoneScreen';
import { SignUpOtpScreen } from './components/SignUpOtpScreen';
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
    // Main container - Fills viewport height, centers on large screens
    // Removed the "phone frame" borders, rounded corners, and notch.
    <div className="w-full h-[100dvh] sm:max-w-md sm:mx-auto bg-white relative overflow-hidden sm:shadow-xl sm:border-x sm:border-gray-100">
      
      {/* Screen Content */}
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
              onVerify={() => setCurrentScreen('home')}
              onBack={() => setCurrentScreen('signup_phone')}
          />
      )}

      {currentScreen === 'home' && (
        <SwipeScreen onBack={() => setCurrentScreen('welcome')} />
      )}
      
    </div>
  );
};

export default App;