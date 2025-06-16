
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Heart } from 'lucide-react';

interface ThankYouScreenProps {
  onReset: () => void;
}

const ThankYouScreen = ({ onReset }: ThankYouScreenProps) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onReset();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onReset]);

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0">
      <CardContent className="p-12 text-center">
        <div className="space-y-8">
          <div className="flex justify-center">
            <div className="relative">
              <CheckCircle className="w-24 h-24 text-green-500 animate-pulse" />
              <Heart className="w-8 h-8 text-red-500 fill-current absolute -top-2 -right-2 animate-bounce" />
            </div>
          </div>
          
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Thank You!
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              Your feedback has been submitted successfully
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mx-auto max-w-md">
              <p className="text-gray-700 mb-2">
                We truly appreciate you taking the time to share your experience with us.
              </p>
              <p className="text-sm text-gray-500">
                Your input helps us improve our service.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-2">
              Returning to start in
            </p>
            <div className="text-6xl font-bold text-blue-600 mb-2">
              {countdown}
            </div>
            <p className="text-sm text-gray-500">
              seconds
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThankYouScreen;
