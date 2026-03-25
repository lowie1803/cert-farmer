import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProgress } from '@hooks/useProgress';
import { getLesson, getModule } from '@data/courses';
import ContentRenderer from '@components/ContentRenderer';
import QuizView from '@components/QuizView';
import ExamView from '@components/ExamView';

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

  // Prev / Next lesson navigation
  const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);
  const prevLesson = lessonIndex > 0 ? module.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < module.lessons.length - 1 ? module.lessons[lessonIndex + 1] : null;

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
          <span className={
            lesson.type === 'exam' ? 'tag-exam' :
            lesson.type === 'quiz' ? 'tag-quiz' : 'tag-notes'
          }>
            {lesson.type === 'exam' ? '📋 Exam' : lesson.type === 'quiz' ? '📝 Quiz' : '📖 Notes'}
          </span>
          <h1 className="text-2xl font-bold text-white mt-2">{lesson.title}</h1>
        </div>

        {/* Lesson content */}
        {lesson.type === 'exam' ? (
          <ExamView
            questions={lesson.questions}
            timeLimit={lesson.timeLimit || 45}
            passingScore={lesson.passingScore || 80}
            onComplete={handleQuizComplete}
          />
        ) : lesson.type === 'quiz' ? (
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
            <ContentRenderer content={lesson.content} courseId={courseId} />

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

        {/* Prev / Next navigation (hidden for exams) */}
        {lesson.type !== 'exam' && <div className="mt-10 pt-6 border-t border-slate-700 flex items-center justify-between">
          {prevLesson ? (
            <Link
              to={`/course/${courseId}/module/${moduleId}/lesson/${prevLesson.id}`}
              className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors"
            >
              <span>←</span>
              <span className="text-sm">{prevLesson.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {nextLesson ? (
            <Link
              to={`/course/${courseId}/module/${moduleId}/lesson/${nextLesson.id}`}
              className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors"
            >
              <span className="text-sm">{nextLesson.title}</span>
              <span>→</span>
            </Link>
          ) : (
            <Link
              to={`/course/${courseId}/module/${moduleId}`}
              className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors"
            >
              <span className="text-sm">Back to module</span>
              <span>→</span>
            </Link>
          )}
        </div>}
      </div>
    </div>
  );
}
