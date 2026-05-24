import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProgress } from '@hooks/useProgress';
import { usePageTitle } from '@hooks/usePageTitle';
import { getModule } from '@data/courses';

export default function ModulePage() {
  const { courseId = 'ccna', moduleId } = useParams();
  const { getLessonProgress, isLessonCompleted, calculateModuleProgress } = useProgress();

  const module = getModule(courseId, moduleId);
  usePageTitle(module?.title ?? null);

  if (!module) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-display font-medium text-ink mb-4">Module not found</h1>
        <Link to="/" className="text-accent hover:underline">
          Go to dashboard
        </Link>
      </div>
    );
  }

  const moduleProgress = calculateModuleProgress(module);
  const completedCount = module.lessons.filter(l => isLessonCompleted(l.id)).length;
  const progressColor =
    moduleProgress === 0
      ? 'bg-line'
      : moduleProgress < 100
        ? 'bg-accent'
        : 'bg-accent';

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          to={`/course/${courseId}`}
          className="inline-flex items-center gap-2 text-soft hover:text-ink mb-6 transition-colors"
        >
          <span>←</span> Back to Dashboard
        </Link>

        {/* Module header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">{module.icon}</div>
          <div>
            <h1 className="text-2xl font-display font-medium text-ink">{module.title}</h1>
            <p className="text-soft">{completedCount}/{module.lessons.length} lessons completed</p>
          </div>
        </div>

        {/* Module progress bar */}
        <div className="mb-8">
          <div className="h-2 bg-line rounded-full overflow-hidden">
            <div
              className={`h-full ${progressColor} transition-all duration-500`}
              style={{ width: `${moduleProgress}%` }}
            />
          </div>
          <p className="text-xs text-soft/70 mt-1 text-right">{moduleProgress}%</p>
        </div>

        {/* Lessons list */}
        <div className="space-y-2">
          {module.lessons.map((lesson, index) => {
            const progress = getLessonProgress(lesson.id);
            const completed = isLessonCompleted(lesson.id);

            return (
              <Link
                key={lesson.id}
                to={`/course/${courseId}/module/${moduleId}/lesson/${lesson.id}`}
                className="card block p-4 group"
              >
                <div className="flex items-center gap-4">
                  {/* Lesson number / completion indicator */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono shrink-0 ${
                    completed
                      ? 'bg-accent-soft text-accent border border-accent'
                      : 'bg-line text-soft'
                  }`}>
                    {completed ? '✓' : index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-ink group-hover:text-accent transition-colors">
                      {lesson.title}
                    </h3>

                    <span className={
                      lesson.type === 'exam' ? 'tag-exam' :
                      lesson.type === 'quiz' ? 'tag-quiz' : 'tag-notes'
                    }>
                      {lesson.type === 'exam' ? '📋 Exam' : lesson.type === 'quiz' ? '📝 Quiz' : '📖 Notes'}
                    </span>
                  </div>

                  {/* Quiz score if available */}
                  {progress?.quizScore !== undefined && (
                    <span className="text-sm text-accent">
                      {progress.quizScore}/{progress.quizTotal}
                    </span>
                  )}

                  <span className="text-soft group-hover:text-accent transition-colors">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
