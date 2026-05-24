import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useProgress } from '@hooks/useProgress';
import { getCourse } from '@data/courses';
import { hasGlossary } from '@data/glossaries';

export default function Layout() {
  const location = useLocation();
  const { calculateCourseProgress } = useProgress();

  const courseMatch = location.pathname.match(/\/course\/([^/]+)/);
  const courseId = courseMatch ? courseMatch[1] : null;
  const course = courseId ? getCourse(courseId) : null;
  const courseProgress = course ? calculateCourseProgress(course) : 0;

  const onVocabPage = location.pathname.startsWith('/vocab');

  const progressColor =
    courseProgress === 0
      ? 'bg-line'
      : courseProgress < 100
        ? 'bg-accent'
        : 'bg-accent';

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Navigation */}
      <nav className="bg-paper/90 backdrop-blur-md border-b border-line sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/favicon.svg" alt="" className="w-5 h-5 rounded-sm group-hover:opacity-80 transition-opacity" />
            <span className="font-display font-medium text-ink hidden sm:block">
              CertFarmer
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Vocab link — always visible */}
            <Link
              to="/vocab"
              className={`text-base transition-colors ${
                onVocabPage
                  ? 'text-ink font-medium'
                  : 'text-soft hover:text-ink'
              }`}
            >
              Vocab
            </Link>

            {/* Glossary link — course-scoped */}
            {courseId && hasGlossary(courseId) && (
              <Link
                to={`/course/${courseId}/glossary`}
                className={`flex items-center gap-2 text-sm transition-colors ${
                  location.pathname === `/course/${courseId}/glossary`
                    ? 'text-ink font-medium'
                    : 'text-soft hover:text-ink'
                }`}
              >
                <span>🇻🇳</span>
                <span className="hidden sm:inline">Glossary</span>
              </Link>
            )}

            {/* Progress indicator — shown when viewing a course */}
            {course && !onVocabPage && (
              <div className="text-sm text-soft">
                <span className="font-display font-medium text-accent">{courseProgress}%</span>
                <span className="hidden sm:inline"> complete</span>
              </div>
            )}
          </div>
        </div>

        {/* Thin progress bar — only when viewing a course */}
        {course && !onVocabPage && (
          <div className="h-0.5 bg-line">
            <div
              className={`h-full ${progressColor} transition-all duration-500`}
              style={{ width: `${courseProgress}%` }}
            />
          </div>
        )}
      </nav>

      {/* Main content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-line py-6 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-soft">
          <p>CertFarmer — Software Engineering Certification Platform</p>
          <p className="mt-1">
            Copyright by lowie1803 &copy; 2026. All rights reserved.
          </p>
          <p>100% làm từ tình iu của anh Dũng dành cho bé Phanh 😘</p>
        </div>
      </footer>
    </div>
  );
}
