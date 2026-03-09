import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProgress } from '@hooks/useProgress';
import { getLesson, getModule } from '@data/courses';
import ContentRenderer from '@components/ContentRenderer';
import QuizView from '@components/QuizView';

export default function LessonPage() {
  const { courseId = 'ccna', moduleId, lessonId } = useParams();
  const { markCompleted, saveQuizScore } = useProgress();
  
  const module = getModule(courseId, moduleId);
  const lesson = getLesson(courseId, moduleId, lessonId);
  
  // Mark notes as completed when viewed
  useEffect(() => {
    if (lesson?.type === 'notes') {
      markCompleted(lesson.id);
    }
  }, [lesson?.id, lesson?.type, markCompleted]);
  
  if (!lesson || !module) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Lesson not found</h1>
        <Link to="/" className="text-amber-400 hover:underline">
          Go to dashboard
        </Link>
      </div>
    );
  }
  
  const handleQuizComplete = (score, total) => {
    saveQuizScore(lesson.id, score, total);
  };
  
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <Link
          to={`/course/${courseId}/module/${moduleId}`}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <span>←</span> Back to {module.title}
        </Link>
        
        {/* Lesson header */}
        <div className="mb-6 pb-6 border-b border-slate-700">
          <span className={lesson.type === 'quiz' ? 'tag-quiz' : 'tag-notes'}>
            {lesson.type === 'quiz' ? '📝 Quiz' : '📖 Notes'}
          </span>
          <h1 className="text-2xl font-bold text-white mt-2">{lesson.title}</h1>
        </div>
        
        {/* Lesson content */}
        {lesson.type === 'quiz' ? (
          <QuizView
            questions={lesson.questions}
            onComplete={handleQuizComplete}
          />
        ) : (
          <>
            {/* Glossary hint */}
            <div className="mb-6 p-3 bg-slate-800/50 rounded-lg border border-slate-700 flex items-center gap-3">
              <span className="text-xl">🇻🇳</span>
              <p className="text-sm text-slate-400">
                <span className="glossary-term cursor-default">Highlighted terms</span>
                {' '}have Vietnamese explanations. Hover or tap to view.
              </p>
            </div>
            
            {/* Notes content */}
            <ContentRenderer content={lesson.content} />
            
            {/* Resources */}
            {lesson.resources && lesson.resources.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-700">
                <h3 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
                  <span>📚</span> Additional Resources
                </h3>
                <div className="space-y-3">
                  {lesson.resources.map((resource, i) => (
                    <a
                      key={i}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors group"
                    >
                      <span className="text-xl">
                        {resource.type === 'video' ? '🎬' : '🔗'}
                      </span>
                      <span className="text-slate-200 group-hover:text-amber-400 transition-colors">
                        {resource.title}
                      </span>
                      <span className="ml-auto text-slate-500 group-hover:text-slate-400">
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
