#!/usr/bin/env node
/**
 * Content Validator — checks all content files for completeness and correctness
 *
 * Usage: node scripts/validate-content.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '..', 'src', 'content', 'ccna');

let errors = 0;
let warnings = 0;

function error(msg) {
  console.error(`  ERROR: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`  WARN:  ${msg}`);
  warnings++;
}

function ok(msg) {
  console.log(`  OK:    ${msg}`);
}

function validateQuizJson(filePath, isExam = false) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    error(`${filePath}: Invalid JSON — ${e.message}`);
    return;
  }

  if (!data.questions || !Array.isArray(data.questions)) {
    error(`${filePath}: Missing "questions" array`);
    return;
  }

  const ids = new Set();
  for (const q of data.questions) {
    // Duplicate ID check
    if (ids.has(q.id)) {
      error(`${filePath}: Duplicate question ID "${q.id}"`);
    }
    ids.add(q.id);

    // Options count
    if (!q.options || q.options.length !== 4) {
      error(`${filePath}: Question "${q.id}" must have exactly 4 options (has ${q.options?.length})`);
    }

    // Correct answer range
    if (typeof q.correct !== 'number' || q.correct < 0 || q.correct > 3) {
      error(`${filePath}: Question "${q.id}" correct answer must be 0-3 (got ${q.correct})`);
    }

    // Explanation
    if (!q.explanation || q.explanation.length < 10) {
      warn(`${filePath}: Question "${q.id}" has short/missing explanation`);
    }

    // Exam questions need domain field
    if (isExam && !q.domain) {
      error(`${filePath}: Exam question "${q.id}" missing "domain" field`);
    }
  }

  ok(`${path.basename(filePath)}: ${data.questions.length} questions validated`);
}

function validateModule(dirPath) {
  const dirName = path.basename(dirPath);
  const moduleJsonPath = path.join(dirPath, 'module.json');

  if (!fs.existsSync(moduleJsonPath)) {
    error(`${dirName}: Missing module.json`);
    return;
  }

  let moduleData;
  try {
    moduleData = JSON.parse(fs.readFileSync(moduleJsonPath, 'utf-8'));
  } catch (e) {
    error(`${dirName}/module.json: Invalid JSON — ${e.message}`);
    return;
  }

  console.log(`\n  Module: ${moduleData.title} (${dirName})`);

  const isExamModule = moduleData.category === 'exam';

  for (const lesson of moduleData.lessons) {
    if (lesson.type === 'notes') {
      const mdPath = path.join(dirPath, `${lesson.id}.md`);
      if (!fs.existsSync(mdPath)) {
        error(`${dirName}: Missing ${lesson.id}.md for notes lesson "${lesson.title}"`);
      } else {
        const content = fs.readFileSync(mdPath, 'utf-8');
        const wordCount = content.split(/\s+/).length;
        if (wordCount < 200) {
          warn(`${dirName}/${lesson.id}.md: Only ${wordCount} words (recommend 200+)`);
        } else {
          ok(`${lesson.id}.md: ${wordCount} words`);
        }
      }
    } else if (lesson.type === 'quiz') {
      const jsonPath = path.join(dirPath, `${lesson.id}.json`);
      if (!fs.existsSync(jsonPath)) {
        error(`${dirName}: Missing ${lesson.id}.json for quiz lesson "${lesson.title}"`);
      } else {
        validateQuizJson(jsonPath, false);
      }
    } else if (lesson.type === 'exam') {
      const jsonPath = path.join(dirPath, `${lesson.id}.json`);
      if (!fs.existsSync(jsonPath)) {
        error(`${dirName}: Missing ${lesson.id}.json for exam lesson "${lesson.title}"`);
      } else {
        validateQuizJson(jsonPath, true);
      }
    }
  }
}

function main() {
  console.log('=== Content Validator ===\n');

  // Check course.json
  const courseJsonPath = path.join(CONTENT_DIR, 'course.json');
  if (!fs.existsSync(courseJsonPath)) {
    error('Missing course.json');
    return;
  }

  const courseData = JSON.parse(fs.readFileSync(courseJsonPath, 'utf-8'));
  console.log(`Course: ${courseData.title} v${courseData.version}`);
  console.log(`Modules listed: ${courseData.modules.length}`);

  // Validate each module directory
  const moduleDirs = fs.readdirSync(CONTENT_DIR)
    .filter(d => fs.statSync(path.join(CONTENT_DIR, d)).isDirectory())
    .sort();

  console.log(`Module directories found: ${moduleDirs.length}`);

  // Check that all listed modules have directories
  for (const modRef of courseData.modules) {
    if (!moduleDirs.includes(modRef)) {
      error(`course.json references "${modRef}" but directory not found`);
    }
  }

  // Check that all directories are listed in course.json
  for (const dir of moduleDirs) {
    if (!courseData.modules.includes(dir)) {
      warn(`Directory "${dir}" exists but not listed in course.json`);
    }
  }

  // Validate each module
  for (const dir of moduleDirs) {
    validateModule(path.join(CONTENT_DIR, dir));
  }

  // Summary
  console.log('\n=== Summary ===');
  console.log(`Modules: ${moduleDirs.length}`);
  console.log(`Errors:  ${errors}`);
  console.log(`Warnings: ${warnings}`);

  if (errors > 0) {
    console.log('\nValidation FAILED');
    process.exit(1);
  } else {
    console.log('\nValidation PASSED');
  }
}

main();
