export interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

export type ScreenState = 'welcome' | 'signin' | 'signup_phone' | 'signup_otp' | 'home';

export interface FeatureItem {
  icon: React.ReactNode;
  text: string;
}