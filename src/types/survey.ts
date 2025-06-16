
export interface SurveyQuestion {
  id: string;
  type: 'rating' | 'star' | 'text';
  text: string;
  description?: string;
  scale?: number; // For rating questions (5 or 10 point scale)
  required?: boolean;
}

export interface QuestionConfig {
  questions: SurveyQuestion[];
  title?: string;
  description?: string;
}
