import React from 'react';

export interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

export type ScreenState = 'welcome' | 'signin' | 'signup_phone' | 'signup_otp' | 'setup_profile' | 'home' | 'match_requests' | 'chat' | 'edit_profile';

export type TabState = 'discover' | 'upload' | 'matches' | 'profile';

export interface FeatureItem {
  icon: React.ReactNode;
  text: string;
}