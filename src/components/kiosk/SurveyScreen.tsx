
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import QuestionCard from './QuestionCard';
import ConfirmationDialog from './ConfirmationDialog';
import { Session, Answer } from '../FeedbackKiosk';
import { SurveyQuestion } from '../../types/survey';

interface SurveyScreenProps {
  session: Session;
  questions: SurveyQuestion[];
  onUpdateSession: (answers: Answer[]) => void;
  onComplete: () => void;
  onCancel: () => void;
}

const SurveyScreen = ({ 
  session, 
  questions, 
  onUpdateSession, 
  onComplete, 
  onCancel 
}: SurveyScreenProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>(session.answers);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const updateAnswer = (questionId: string, value: string | number) => {
    const newAnswers = answers.filter(a => a.questionId !== questionId);
    newAnswers.push({
      questionId,
      value,
      timestamp: Date.now(),
    });
    
    setAnswers(newAnswers);
    onUpdateSession(newAnswers);
  };

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === currentQuestion.id)?.value;
  };

  const goNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowConfirmation(true);
    }
  };

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const skipQuestion = () => {
    goNext();
  };

  const confirmSubmission = () => {
    onComplete();
  };

  return (
    <>
      <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0  ">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Customer Feedback</h2>
            <Button
              variant="ghost"
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <QuestionCard
            question={currentQuestion}
            value={getCurrentAnswer()}
            onChange={(value) => updateAnswer(currentQuestion.id, value)}
          />

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={goBack}
              disabled={currentQuestionIndex === 0}
              className="px-8"
            >
              Back
            </Button>

            <div className="space-x-4">
              <Button
                variant="ghost"
                onClick={skipQuestion}
                className="text-gray-500 hover:text-gray-700"
              >
                Skip
              </Button>
              
              <Button
                onClick={goNext}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8"
              >
                {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ConfirmationDialog
        open={showConfirmation}
        onConfirm={confirmSubmission}
        onCancel={() => setShowConfirmation(false)}
        answeredCount={answers.length}
        totalCount={totalQuestions}
      />
    </>
  );
};

export default SurveyScreen;
