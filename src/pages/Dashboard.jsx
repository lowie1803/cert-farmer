import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProgress } from '@hooks/useProgress';
import { getCourse, getAllCourses } from '@data/courses';
import { getGlossary, hasGlossary } from '@data/glossaries';
import ProgressRing from '@components/ProgressRing';

function CourseSelector() {
  const allCourses = getAllCourses();
  const { calculateCourseProgress } = useProgress();

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-medium text-ink mb-1">
            Choose a Course
          </h1>
          <p className="text-soft">Select a certification track to start studying</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {allCourses.map((course) => {
            const progress = calculateCourseProgress(course);
            return (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="card p-6 group hover:border-accent/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-display font-medium text-ink group-hover:text-accent transition-colors">
                      {course.title}
                    </h2>
                    <p className="text-sm text-soft mt-1">{course.description}</p>
                  </div>
                  <ProgressRing progress={progress} size={56} />
                </div>

                <div className="flex items-center gap-4 text-sm text-soft">
                  <span>{course.modules.length} modules</span>
                  <span>{course.modules.reduce((sum, m) => sum + m.lessons.length, 0)} lessons</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { courseId } = useParams();

  if (!courseId) {
    return <CourseSelector />;
  }

  const { calculateCourseProgress, calculateModuleProgress, getCompletedCount, progress } = useProgress();

  const course = getCourse(courseId);

  if (!course) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-display font-medium text-ink mb-4">Course not found</h1>
        <Link to="/" className="text-accent hover:underline">
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

  const recentLessons = allLessons
    .filter(l => progress[l.id]?.lastAccessed)
    .sort((a, b) => (progress[b.id].lastAccessed || 0) - (progress[a.id].lastAccessed || 0))
    .slice(0, 3);

  const progressColor = (pct) =>
    pct === 0 ? 'bg-line' : pct < 100 ? 'bg-accent' : 'bg-accent';

  const showGlossary = hasGlossary(courseId);

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-medium text-ink mb-1">
              {course.title}
            </h1>
            <p className="text-soft">{course.description}</p>
          </div>
          <ProgressRing progress={courseProgress} size={70} />
        </div>

        {/* Stats */}
        <div className={`grid ${showGlossary ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'} gap-3 mb-8`}>
          <div className="card p-4 text-center">
            <span className="text-2xl mb-1 block">📁</span>
            <div className="text-2xl font-display font-medium text-ink">{course.modules.length}</div>
            <div className="text-xs text-soft">Modules</div>
          </div>

          <div className="card p-4 text-center">
            <span className="text-2xl mb-1 block">📖</span>
            <div className="text-2xl font-display font-medium text-ink">{totalLessons}</div>
            <div className="text-xs text-soft">Lessons</div>
          </div>

          <div className="card p-4 text-center">
            <span className="text-2xl mb-1 block">✓</span>
            <div className="text-2xl font-display font-medium text-ink">{completedCount}</div>
            <div className="text-xs text-soft">Completed</div>
          </div>

          {showGlossary && (
            <Link
              to={`/course/${courseId}/glossary`}
              className="card p-4 text-center hover:border-accent/50 transition-all"
            >
              <span className="text-2xl mb-1 block">🇻🇳</span>
              <div className="text-2xl font-display font-medium text-ink">
                {Object.keys(getGlossary(courseId)).length}
              </div>
              <div className="text-xs text-soft">Glossary</div>
            </Link>
          )}
        </div>

        {/* Continue Studying */}
        {recentLessons.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-display font-medium text-ink mb-4">
              Continue Studying
            </h2>
            <div className="grid gap-2 sm:grid-cols-3">
              {recentLessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/course/${courseId}/module/${lesson.moduleId}/lesson/${lesson.id}`}
                  className="card p-3 group"
                >
                  <span className={
                    lesson.type === 'exam' ? 'tag-exam' :
                    lesson.type === 'quiz' ? 'tag-quiz' : 'tag-notes'
                  }>
                    {lesson.type === 'exam' ? '📋 Exam' : lesson.type === 'quiz' ? '📝 Quiz' : '📖 Notes'}
                  </span>
                  <h4 className="font-medium text-ink mt-1 truncate group-hover:text-accent transition-colors">
                    {lesson.title}
                  </h4>
                  <p className="text-xs text-soft/70 truncate">{lesson.moduleTitle}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Modules list */}
        <h2 className="text-lg font-display font-medium text-ink mb-4">
          Course Modules
        </h2>

        <div className="space-y-3">
          {course.modules.map((module, idx) => {
            const moduleProgress = calculateModuleProgress(module);
            const completed = module.lessons.filter(l => progress[l.id]?.completed).length;
            const isExam = module.category === 'exam';

            const prevModule = idx > 0 ? course.modules[idx - 1] : null;
            const showDomainHeader = module.domain && (!prevModule || prevModule.domain !== module.domain);

            return (
              <React.Fragment key={module.id}>
                {showDomainHeader && (
                  <h3 className="text-sm font-display font-medium text-accent uppercase tracking-wider pt-4 first:pt-0">
                    {module.domain}
                  </h3>
                )}
                <Link
                  to={`/course/${courseId}/module/${module.id}`}
                  className={`card block p-4 md:p-5 group ${
                    isExam ? 'border-miss/50 bg-miss/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{module.icon}</div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-ink group-hover:text-accent transition-colors truncate">
                        {module.title}
                      </h3>
                      <p className="text-sm text-soft">
                        {completed}/{module.lessons.length} lessons
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-20 md:w-24 h-2 bg-line rounded-full overflow-hidden">
                        <div
                          className={`h-full ${progressColor(moduleProgress)} transition-all duration-500`}
                          style={{ width: `${moduleProgress}%` }}
                        />
                      </div>

                      <span className="text-sm text-soft w-12 text-right">
                        {moduleProgress}%
                      </span>

                      <span className="text-soft group-hover:text-accent transition-colors">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
