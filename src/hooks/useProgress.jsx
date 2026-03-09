import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext(null);

const STORAGE_KEY = 'certfarmer_progress';

/**
 * Progress data structure:
 * {
 *   lessonId: {
 *     completed: boolean,
 *     quizScore: number (optional),
 *     quizTotal: number (optional),
 *     lastAccessed: timestamp
 *   }
 * }
 */

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Persist to localStorage whenever progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  }, [progress]);

  const updateLessonProgress = (lessonId, data) => {
    setProgress(prev => ({
      ...prev,
      [lessonId]: {
        ...prev[lessonId],
        ...data,
        lastAccessed: Date.now()
      }
    }));
  };

  const markCompleted = (lessonId) => {
    updateLessonProgress(lessonId, { completed: true });
  };

  const saveQuizScore = (lessonId, score, total) => {
    updateLessonProgress(lessonId, {
      completed: true,
      quizScore: score,
      quizTotal: total
    });
  };

  const getLessonProgress = (lessonId) => {
    return progress[lessonId] || null;
  };

  const isLessonCompleted = (lessonId) => {
    return progress[lessonId]?.completed || false;
  };

  const calculateModuleProgress = (module) => {
    if (!module?.lessons?.length) return 0;
    const completed = module.lessons.filter(l => isLessonCompleted(l.id)).length;
    return Math.round((completed / module.lessons.length) * 100);
  };

  const calculateCourseProgress = (course) => {
    if (!course?.modules?.length) return 0;
    const allLessons = course.modules.flatMap(m => m.lessons);
    if (!allLessons.length) return 0;
    const completed = allLessons.filter(l => isLessonCompleted(l.id)).length;
    return Math.round((completed / allLessons.length) * 100);
  };

  const getCompletedCount = () => {
    return Object.values(progress).filter(p => p.completed).length;
  };

  const resetProgress = () => {
    setProgress({});
  };

  const value = {
    progress,
    updateLessonProgress,
    markCompleted,
    saveQuizScore,
    getLessonProgress,
    isLessonCompleted,
    calculateModuleProgress,
    calculateCourseProgress,
    getCompletedCount,
    resetProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}

export default useProgress;
