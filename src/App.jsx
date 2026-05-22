import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProgressProvider } from '@hooks/useProgress';
import Layout from '@components/Layout';
import Dashboard from '@pages/Dashboard';
import ModulePage from '@pages/ModulePage';
import LessonPage from '@pages/LessonPage';
import GlossaryPage from '@pages/GlossaryPage';
import NotFound from '@pages/NotFound';
import VocabPage from '@pages/VocabPage';

export default function App() {
  return (
    <ProgressProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="vocab" element={<VocabPage />} />
          <Route path="course/:courseId" element={<Dashboard />} />
          <Route path="course/:courseId/module/:moduleId" element={<ModulePage />} />
          <Route path="course/:courseId/module/:moduleId/lesson/:lessonId" element={<LessonPage />} />
          <Route path="course/:courseId/glossary" element={<GlossaryPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ProgressProvider>
  );
}
