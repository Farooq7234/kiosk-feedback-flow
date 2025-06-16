
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MessageSquare } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0">
      <CardContent className="p-12 text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Star className="w-16 h-16 text-yellow-400 fill-current" />
              <MessageSquare className="w-8 h-8 text-blue-500 absolute -bottom-2 -right-2" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Share Your Experience
          </h1>
          
          <p className="text-xl text-gray-600 mb-2">
            Your feedback helps us serve you better
          </p>
          
          <p className="text-sm text-gray-500">
            Quick survey • Takes less than 2 minutes
          </p>
        </div>
        
        <Button
          onClick={onStart}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-12 py-6 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Start Survey
        </Button>
        

      </CardContent>
    </Card>
  );
};

export default WelcomeScreen;
