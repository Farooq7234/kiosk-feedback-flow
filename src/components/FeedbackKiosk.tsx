
import React, { useState, useEffect } from 'react';
import WelcomeScreen from './kiosk/WelcomeScreen';
import SurveyScreen from './kiosk/SurveyScreen';
import ThankYouScreen from './kiosk/ThankYouScreen';
import { generateSessionId, saveSession, getSession } from '../utils/sessionManager';
import { defaultQuestions } from '../data/surveyQuestions';

export type KioskState = 'welcome' | 'survey' | 'thank-you';

export interface Answer {
  questionId: string;
  value: string | number;
  timestamp: number;
}

export interface Session {
  id: string;
  answers: Answer[];
  status: 'IN_PROGRESS' | 'COMPLETED';
  startTime: number;
  endTime?: number;
}

const FeedbackKiosk = () => {
  const [currentState, setCurrentState] = useState<KioskState>('welcome');
  const [currentSession, setCurrentSession] = useState<Session | null>(null);

  const startSurvey = () => {
    const sessionId = generateSessionId();
    const newSession: Session = {
      id: sessionId,
      answers: [],
      status: 'IN_PROGRESS',
      startTime: Date.now(),
    };
    
    setCurrentSession(newSession);
    saveSession(newSession);
    setCurrentState('survey');
  };

  const updateSession = (answers: Answer[]) => {
    if (!currentSession) return;
    
    const updatedSession = {
      ...currentSession,
      answers,
    };
    
    setCurrentSession(updatedSession);
    saveSession(updatedSession);
  };

  const completeSurvey = () => {
    if (!currentSession) return;
    
    const completedSession = {
      ...currentSession,
      status: 'COMPLETED' as const,
      endTime: Date.now(),
    };
    
    setCurrentSession(completedSession);
    saveSession(completedSession);
    setCurrentState('thank-you');
  };

  const resetKiosk = () => {
    setCurrentSession(null);
    setCurrentState('welcome');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full md:max-w-4xl ">
        {currentState === 'welcome' && (
          <WelcomeScreen onStart={startSurvey} />
        )}
        
        {currentState === 'survey' && currentSession && (
          <SurveyScreen
            session={currentSession}
            questions={defaultQuestions}
            onUpdateSession={updateSession}
            onComplete={completeSurvey}
            onCancel={resetKiosk}
          />
        )}
        
        {currentState === 'thank-you' && (
          <ThankYouScreen onReset={resetKiosk} />
        )}
      </div>
    </div>
  );
};

export default FeedbackKiosk;
