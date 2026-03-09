import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useProgress } from '@hooks/useProgress';
import { getCourse } from '@data/courses';

export default function Layout() {
  const location = useLocation();
  const { calculateCourseProgress } = useProgress();
  
  // Get current course progress (default to CCNA)
  const courseProgress = calculateCourseProgress(getCourse('ccna'));
  
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
            {/* Glossary link */}
            <Link
              to="/glossary"
              className={`flex items-center gap-2 text-sm transition-colors ${
                location.pathname === '/glossary'
                  ? 'text-amber-400'
                  : 'text-slate-400 hover:text-amber-400'
              }`}
            >
              <span>🇻🇳</span>
              <span className="hidden sm:inline">Glossary</span>
            </Link>
            
            {/* Progress indicator */}
            <div className="text-sm text-slate-400">
              <span className="text-amber-400 font-semibold">{courseProgress}%</span>
              <span className="hidden sm:inline"> complete</span>
            </div>
          </div>
        </div>
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
            Built for efficient learning with Vietnamese language support
          </p>
        </div>
      </footer>
    </div>
  );
}
