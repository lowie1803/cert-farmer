import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProgress } from '@hooks/useProgress';
import { getCourse, getAllCourses } from '@data/courses';
import glossary from '@data/glossary';
import ProgressRing from '@components/ProgressRing';

export default function Dashboard() {
  const { courseId = 'ccna' } = useParams();
  const { calculateCourseProgress, calculateModuleProgress, getCompletedCount, progress } = useProgress();

  const course = getCourse(courseId);

  if (!course) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Course not found</h1>
        <Link to="/" className="text-amber-400 hover:underline">
          Go to homepage
        </Link>
      </div>
    );
  }

  const courseProgress = calculateCourseProgress(course);
  const allLessons = course.modules.flatMap(m =>
    m.lessons.map(l => ({ ...l, moduleId: m.id, moduleTitle: m.title }))
  );
  const totalLessons = allLessons.length;
  const completedCount = getCompletedCount();

  // "Continue Studying" — 3 most recently accessed lessons
  const recentLessons = allLessons
    .filter(l => progress[l.id]?.lastAccessed)
    .sort((a, b) => (progress[b.id].lastAccessed || 0) - (progress[a.id].lastAccessed || 0))
    .slice(0, 3);

  const progressColor = (pct) =>
    pct === 0 ? 'bg-slate-600' : pct < 100 ? 'bg-amber-500' : 'bg-green-500';

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
              {course.title}
            </h1>
            <p className="text-slate-400">{course.description}</p>
          </div>
          <ProgressRing progress={courseProgress} size={70} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="card p-4 text-center">
            <span className="text-2xl mb-1 block">📁</span>
            <div className="text-2xl font-bold text-white">{course.modules.length}</div>
            <div className="text-xs text-slate-400">Modules</div>
          </div>

          <div className="card p-4 text-center">
            <span className="text-2xl mb-1 block">📖</span>
            <div className="text-2xl font-bold text-white">{totalLessons}</div>
            <div className="text-xs text-slate-400">Lessons</div>
          </div>

          <div className="card p-4 text-center">
            <span className="text-2xl mb-1 block">✓</span>
            <div className="text-2xl font-bold text-white">{completedCount}</div>
            <div className="text-xs text-slate-400">Completed</div>
          </div>

          <Link
            to="/glossary"
            className="card p-4 text-center hover:border-amber-500/50 transition-all"
          >
            <span className="text-2xl mb-1 block">🇻🇳</span>
            <div className="text-2xl font-bold text-white">
              {Object.keys(glossary).length}
            </div>
            <div className="text-xs text-slate-400">Glossary</div>
          </Link>
        </div>

        {/* Continue Studying */}
        {recentLessons.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-200 mb-4">
              Continue Studying
            </h2>
            <div className="grid gap-2 sm:grid-cols-3">
              {recentLessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/course/${courseId}/module/${lesson.moduleId}/lesson/${lesson.id}`}
                  className="card p-3 group hover:bg-slate-700"
                >
                  <span className={lesson.type === 'quiz' ? 'tag-quiz' : 'tag-notes'}>
                    {lesson.type === 'quiz' ? '📝 Quiz' : '📖 Notes'}
                  </span>
                  <h4 className="font-medium text-white mt-1 truncate group-hover:text-amber-400 transition-colors">
                    {lesson.title}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">{lesson.moduleTitle}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Modules list */}
        <h2 className="text-lg font-semibold text-slate-200 mb-4">
          Course Modules
        </h2>

        <div className="space-y-3">
          {course.modules.map((module) => {
            const moduleProgress = calculateModuleProgress(module);
            const completed = module.lessons.filter(l => progress[l.id]?.completed).length;

            return (
              <Link
                key={module.id}
                to={`/course/${courseId}/module/${module.id}`}
                className="card block p-4 md:p-5 group hover:bg-slate-700"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{module.icon}</div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors truncate">
                      {module.title}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {completed}/{module.lessons.length} lessons
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Progress bar (visible on all sizes) */}
                    <div className="w-20 md:w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${progressColor(moduleProgress)} transition-all duration-500`}
                        style={{ width: `${moduleProgress}%` }}
                      />
                    </div>

                    <span className="text-sm text-slate-400 w-12 text-right">
                      {moduleProgress}%
                    </span>

                    <span className="text-slate-500 group-hover:text-amber-400 transition-colors">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
