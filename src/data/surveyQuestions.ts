
import { SurveyQuestion } from '../types/survey';

export const defaultQuestions: SurveyQuestion[] = [
  {
    id: 'overall_satisfaction',
    type: 'star',
    text: 'How would you rate your overall experience today?',
    description: 'Please rate from 1 to 5 stars',
    required: true,
  },
  {
    id: 'service_quality',
    type: 'rating',
    text: 'How satisfied were you with our service quality?',
    description: 'Rate from 1 (Poor) to 5 (Excellent)',
    scale: 5,
    required: true,
  },
  {
    id: 'staff_helpfulness',
    type: 'rating',
    text: 'How helpful was our staff today?',
    description: 'Rate from 1 (Not helpful) to 5 (Very helpful)',
    scale: 5,
    required: true,
  },
  {
    id: 'recommend_likelihood',
    type: 'rating',
    text: 'How likely are you to recommend us to others?',
    description: 'Rate from 1 (Not likely) to 10 (Very likely)',
    scale: 10,
    required: true,
  },
  {
    id: 'additional_comments',
    type: 'text',
    text: 'Do you have any additional comments or suggestions?',
    description: 'Please share any thoughts that would help us improve',
    required: false,
  },
];

export const addQuestion = (question: SurveyQuestion): SurveyQuestion[] => {
  return [...defaultQuestions, question];
};

// Example of custom question sets for different scenarios
export const quickSurveyQuestions: SurveyQuestion[] = [
  {
    id: 'quick_rating',
    type: 'star',
    text: 'How was your experience today?',
    required: true,
  },
  {
    id: 'quick_feedback',
    type: 'text',
    text: 'Any quick feedback for us?',
    required: false,
  },
];

export const detailedSurveyQuestions: SurveyQuestion[] = [
  ...defaultQuestions,
  {
    id: 'product_quality',
    type: 'rating',
    text: 'How would you rate our product quality?',
    scale: 5,
    required: true,
  },
  {
    id: 'store_cleanliness',
    type: 'rating',
    text: 'How clean was our store?',
    scale: 5,
    required: true,
  },
  {
    id: 'wait_time',
    type: 'rating',
    text: 'How satisfied were you with the wait time?',
    scale: 5,
    required: true,
  },
];
