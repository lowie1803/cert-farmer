import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '@hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('Page Not Found');
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-display font-medium text-ink mb-2">Page Not Found</h1>
        <p className="text-soft mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary inline-block">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
