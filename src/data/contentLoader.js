/**
 * Content Loader
 *
 * Uses Vite's import.meta.glob to load all content files at build time
 * and assembles them into the same data structure that courses.js used to export.
 */

const courseFiles = import.meta.glob('/src/content/*/course.json', { eager: true, import: 'default' });
const moduleFiles = import.meta.glob('/src/content/*/*/module.json', { eager: true, import: 'default' });
const mdFiles = import.meta.glob('/src/content/**/*.md', { eager: true, query: '?raw', import: 'default' });
const jsonFiles = import.meta.glob('/src/content/**/*.json', { eager: true, import: 'default' });

function stripPrefix(dirName) {
  return dirName.replace(/^\d+_/, '');
}

function parsePath(path) {
  const parts = path.split('/');
  // e.g. ['', 'src', 'content', 'ccna', '001_network-fundamentals', 'osi-model.md']
  return {
    courseId: parts[3],
    moduleDir: parts[4],
    fileName: parts[5],
  };
}

// Build courses object
const courses = {};

// 1. Initialize courses from course.json
for (const [path, data] of Object.entries(courseFiles)) {
  const courseId = path.split('/')[3];
  courses[courseId] = { ...data, modules: [] };
}

// 2. Build modules from module.json files
const moduleMap = {};
for (const [path, data] of Object.entries(moduleFiles)) {
  const { courseId, moduleDir } = parsePath(path);
  const key = `${courseId}/${moduleDir}`;
  moduleMap[key] = {
    ...data,
    lessons: data.lessons.map(l => ({ ...l })),
    _dir: moduleDir,
  };
}

// 3. Attach markdown content to note lessons
for (const [path, content] of Object.entries(mdFiles)) {
  const { courseId, moduleDir, fileName } = parsePath(path);
  const lessonId = fileName.replace('.md', '');
  const mod = moduleMap[`${courseId}/${moduleDir}`];
  if (mod) {
    const lesson = mod.lessons.find(l => l.id === lessonId);
    if (lesson) lesson.content = content;
  }
}

// 4. Attach quiz questions to quiz lessons
for (const [path, data] of Object.entries(jsonFiles)) {
  if (path.endsWith('/course.json') || path.endsWith('/module.json')) continue;
  const { courseId, moduleDir, fileName } = parsePath(path);
  const lessonId = fileName.replace('.json', '');
  const mod = moduleMap[`${courseId}/${moduleDir}`];
  if (mod) {
    const lesson = mod.lessons.find(l => l.id === lessonId);
    if (lesson) lesson.questions = data.questions;
  }
}

// 5. Assemble modules into courses, sorted by directory prefix
for (const [key, mod] of Object.entries(moduleMap)) {
  const courseId = key.split('/')[0];
  if (courses[courseId]) {
    courses[courseId].modules.push(mod);
  }
}

for (const course of Object.values(courses)) {
  course.modules.sort((a, b) => a._dir.localeCompare(b._dir));
  course.modules.forEach(m => delete m._dir);
}

export default courses;
