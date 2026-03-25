import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useProgress } from '@hooks/useProgress';
import { getCourse } from '@data/courses';
import { hasGlossary } from '@data/glossaries';

export default function Layout() {
  const location = useLocation();
  const { calculateCourseProgress } = useProgress();

  // Extract courseId from URL path
  const courseMatch = location.pathname.match(/\/course\/([^/]+)/);
  const courseId = courseMatch ? courseMatch[1] : null;
  const course = courseId ? getCourse(courseId) : null;
  const courseProgress = course ? calculateCourseProgress(course) : 0;

  const progressColor =
    courseProgress === 0
      ? 'bg-slate-600'
      : courseProgress < 100
        ? 'bg-amber-500'
        : 'bg-green-500';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-slate-100">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-slate-900 group-hover:bg-amber-400 transition-colors">
              C
            </div>
            <span className="font-semibold text-white hidden sm:block">
              CertFarmer
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Glossary link — courses with a glossary */}
            {courseId && hasGlossary(courseId) && (
              <Link
                to={`/course/${courseId}/glossary`}
                className={`flex items-center gap-2 text-sm transition-colors ${
                  location.pathname === `/course/${courseId}/glossary`
                    ? 'text-amber-400'
                    : 'text-slate-400 hover:text-amber-400'
                }`}
              >
                <span>🇻🇳</span>
                <span className="hidden sm:inline">Glossary</span>
              </Link>
            )}

            {/* Progress indicator — shown when viewing a course */}
            {course && (
              <div className="text-sm text-slate-400">
                <span className="text-amber-400 font-semibold">{courseProgress}%</span>
                <span className="hidden sm:inline"> complete</span>
              </div>
            )}
          </div>
        </div>

        {/* Thin progress bar along bottom of navbar */}
        {course && (
          <div className="h-0.5 bg-slate-800">
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
      <footer className="border-t border-slate-800 py-6 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-slate-500">
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
