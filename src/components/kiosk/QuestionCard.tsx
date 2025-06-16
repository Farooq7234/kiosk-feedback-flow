
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SurveyQuestion } from '../../types/survey';
import { Star } from 'lucide-react';

interface QuestionCardProps {
  question: SurveyQuestion;
  value?: string | number;
  onChange: (value: string | number) => void;
}

const QuestionCard = ({ question, value, onChange }: QuestionCardProps) => {
  const renderRatingQuestion = () => {
    const ratings = Array.from({ length: question.scale || 5 }, (_, i) => i + 1);
    
    return (
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="flex space-x-2">
            {ratings.map((rating) => (
              <Button
                key={rating}
                variant={value === rating ? "default" : "outline"}
                size="lg"
                onClick={() => onChange(rating)}
                className={`w-16 h-16 rounded-full text-lg font-bold transition-all duration-200 ${
                  value === rating
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white scale-110 shadow-lg'
                    : 'border-2 border-gray-300 hover:border-blue-400 hover:scale-105'
                }`}
              >
                {rating}
              </Button>
            ))}
          </div>
        </div>
        
        {question.scale === 5 && (
          <div className="flex justify-between text-sm text-gray-500 px-8">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        )}
        
        {question.scale === 10 && (
          <div className="flex justify-between text-sm text-gray-500 px-4">
            <span>Not likely</span>
            <span>Very likely</span>
          </div>
        )}
      </div>
    );
  };

  const renderStarRating = () => {
    const stars = Array.from({ length: 5 }, (_, i) => i + 1);
    
    return (
      <div className="flex justify-center space-x-1">
        {stars.map((star) => (
          <Button
            key={star}
            variant="ghost"
            size="lg"
            onClick={() => onChange(star)}
            className="p-2 hover:bg-transparent"
          >
            <Star
              className={`w-12 h-12 transition-all duration-200 ${
                (value as number) >= star
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300 hover:text-yellow-300'
              }`}
            />
          </Button>
        ))}
      </div>
    );
  };

  const renderTextQuestion = () => {
    return (
      <Textarea
        placeholder="Please share your thoughts..."
        value={(value as string) || ''}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-32 text-lg p-4 border-2 border-gray-300 focus:border-blue-400 rounded-lg resize-none"
      />
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          {question.text}
        </h3>
        
        {question.description && (
          <p className="text-gray-600 text-lg">
            {question.description}
          </p>
        )}
      </div>

      <Card className="bg-gray-50 border-2 border-gray-200">
        <CardContent className="p-8">
          {question.type === 'rating' && renderRatingQuestion()}
          {question.type === 'star' && renderStarRating()}
          {question.type === 'text' && renderTextQuestion()}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionCard;
