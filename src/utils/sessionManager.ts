
export const generateSessionId = (): string => {
  return `feedback_${Date.now()}_${Math.random().toString(36).substring(2)}`;
};

export const saveSession = (session: any): void => {
  try {
    localStorage.setItem(`session_${session.id}`, JSON.stringify(session));
    console.log('Session saved:', session.id);
  } catch (error) {
    console.error('Error saving session:', error);
  }
};

export const getSession = (sessionId: string): any => {
  try {
    const sessionData = localStorage.getItem(`session_${sessionId}`);
    return sessionData ? JSON.parse(sessionData) : null;
  } catch (error) {
    console.error('Error retrieving session:', error);
    return null;
  }
};

export const getAllSessions = (): any[] => {
  try {
    const sessions = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('session_')) {
        const sessionData = localStorage.getItem(key);
        if (sessionData) {
          sessions.push(JSON.parse(sessionData));
        }
      }
    }
    return sessions;
  } catch (error) {
    console.error('Error retrieving all sessions:', error);
    return [];
  }
};

export const clearOldSessions = (daysOld: number = 30): void => {
  try {
    const cutoffTime = Date.now() - (daysOld * 24 * 60 * 60 * 1000);
    
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith('session_')) {
        const sessionData = localStorage.getItem(key);
        if (sessionData) {
          const session = JSON.parse(sessionData);
          if (session.startTime < cutoffTime) {
            localStorage.removeItem(key);
            console.log('Removed old session:', session.id);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error clearing old sessions:', error);
  }
};
