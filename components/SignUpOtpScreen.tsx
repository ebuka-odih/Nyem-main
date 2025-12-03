import React, { useState, useRef, useEffect } from 'react';
import { Button } from './Button';
import { ArrowLeft } from 'lucide-react';

interface SignUpOtpScreenProps {
  phoneNumber: string;
  onVerify: () => void;
  onBack: () => void;
}

export const SignUpOtpScreen: React.FC<SignUpOtpScreenProps> = ({ phoneNumber, onVerify, onBack }) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("").length === 6) {
        onVerify();
    }
  };

  useEffect(() => {
      inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="flex flex-col h-full bg-brand relative overflow-hidden">
        {/* Top Section: Header */}
        <div className="px-6 pt-10 pb-8">
            <button 
                onClick={onBack} 
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
                aria-label="Go back"
            >
                <ArrowLeft size={22} strokeWidth={2.5} />
            </button>
            <div className="mt-8 mb-4">
                <h1 className="text-4xl font-extrabold text-white leading-tight tracking-wide">
                    Enter<br/>verification code
                </h1>
            </div>
        </div>

        {/* Bottom Section: Form Card */}
        <div className="flex-1 bg-white w-full rounded-t-[36px] px-8 pt-12 pb-6 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom duration-500">
            
            <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                <p className="text-gray-500 font-medium mb-8 text-center px-4">
                    We sent a code to <span className="text-gray-700 font-semibold">+234{phoneNumber}</span>
                </p>

                {/* OTP Inputs */}
                <div className="flex justify-between gap-2 mb-10">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            ref={(el) => { inputRefs.current[index] = el; }}
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-12 h-14 border border-gray-300 rounded-lg text-center text-2xl font-bold text-gray-800 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-all bg-gray-50"
                        />
                    ))}
                </div>
                
                {/* Submit Button */}
                <div>
                     <Button fullWidth type="submit" className="shadow-xl py-4 font-extrabold text-lg tracking-wide rounded-full">
                        Verify
                    </Button>
                </div>

                <div className="mt-8 text-center">
                    <button type="button" className="text-brand font-bold hover:text-brand-dark transition-colors">
                        Resend OTP
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};