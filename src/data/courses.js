/**
 * Courses API — thin adapter over file-based content loader.
 * Consumer pages import helpers from here; the data comes from contentLoader.
 */
import courses from './contentLoader';

export default courses;

export const getCourse = (courseId) => courses[courseId] || null;

export const getModule = (courseId, moduleId) => {
  const course = courses[courseId];
  return course?.modules.find(m => m.id === moduleId) || null;
};

export const getLesson = (courseId, moduleId, lessonId) => {
  const module = getModule(courseId, moduleId);
  return module?.lessons.find(l => l.id === lessonId) || null;
};

export const getAllCourses = () => Object.values(courses);
