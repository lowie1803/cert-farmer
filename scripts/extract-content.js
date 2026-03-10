#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = join(__dirname, '..', 'src', 'content');

// Import courses data
const { default: courses } = await import('../src/data/courses.js');

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

for (const [courseId, course] of Object.entries(courses)) {
  const courseDir = join(contentDir, courseId);
  ensureDir(courseDir);

  // Write course.json
  const courseJson = {
    id: course.id,
    title: course.title,
    description: course.description,
    version: course.version,
    modules: course.modules.map((m, i) =>
      `${String(i + 1).padStart(3, '0')}_${m.id}`
    ),
  };
  writeFileSync(
    join(courseDir, 'course.json'),
    JSON.stringify(courseJson, null, 2) + '\n'
  );

  // Write module directories and files
  course.modules.forEach((mod, modIndex) => {
    const modDirName = `${String(modIndex + 1).padStart(3, '0')}_${mod.id}`;
    const modDir = join(courseDir, modDirName);
    ensureDir(modDir);

    // module.json - lesson metadata
    const moduleJson = {
      id: mod.id,
      title: mod.title,
      icon: mod.icon,
      description: mod.description,
      lessons: mod.lessons.map((lesson) => {
        const entry = { id: lesson.id, title: lesson.title, type: lesson.type };
        if (lesson.resources && lesson.resources.length > 0) {
          entry.resources = lesson.resources;
        }
        return entry;
      }),
    };
    writeFileSync(
      join(modDir, 'module.json'),
      JSON.stringify(moduleJson, null, 2) + '\n'
    );

    // Write lesson files
    mod.lessons.forEach((lesson) => {
      if (lesson.type === 'notes') {
        const content = lesson.content.trim() + '\n';
        writeFileSync(join(modDir, `${lesson.id}.md`), content);
      } else if (lesson.type === 'quiz') {
        const quizJson = { questions: lesson.questions };
        writeFileSync(
          join(modDir, `${lesson.id}.json`),
          JSON.stringify(quizJson, null, 2) + '\n'
        );
      }
    });
  });

  console.log(`Extracted course: ${courseId}`);
  console.log(`  ${course.modules.length} modules`);
  console.log(`  ${course.modules.flatMap(m => m.lessons).length} lessons`);
}

console.log('\nContent extraction complete!');
