#!/usr/bin/env node
/**
 * Content Generator — uses Claude API to generate lesson notes, quizzes, and exams
 *
 * Usage: ANTHROPIC_API_KEY=sk-... node scripts/generate-content.js
 *
 * Idempotent: skips files that already exist. Run incrementally.
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '..', 'src', 'content', 'ccna');
const SYLLABUS = JSON.parse(fs.readFileSync(path.join(__dirname, 'syllabus-outline.json'), 'utf-8'));

const client = new Anthropic();

// Module directory number mapping
const MODULE_DIR_MAP = {
  'cabling-and-topology': '002',
  'ipv6-fundamentals': '003',
  'virtualization-switching': '004',
  'stp-etherchannel': '006',
  'wireless-architectures': '007',
  'routing-fundamentals': '010',
  'ospf': '011',
  'fhrp': '012',
  'network-services': '014',
  'network-security': '017',
  'automation-fundamentals': '018',
  'network-programmability': '019',
};

const EXAM_DIR_MAP = {
  'midterm-1': '008',
  'midterm-2': '015',
  'final-exam': '020',
};

async function callClaude(systemPrompt, userPrompt) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  });
  return response.content[0].text;
}

async function generateLesson(moduleId, lessonId, lessonDef, moduleDef) {
  const dirNum = MODULE_DIR_MAP[moduleId];
  const dirName = `${dirNum}_${moduleId}`;
  const filePath = path.join(CONTENT_DIR, dirName, `${lessonId}.md`);

  if (fs.existsSync(filePath)) {
    console.log(`  SKIP ${filePath} (exists)`);
    return;
  }

  console.log(`  GEN  ${filePath}`);

  const systemPrompt = `You are a CCNA instructor writing study notes for the Cisco CCNA 200-301 v1.1 exam.
Write clear, concise notes in Markdown format. Use tables, bullet lists, and code blocks for CLI commands.
Target audience: networking students studying for certification.
Keep content between 300-600 words. Be technically accurate.
Do NOT include a title heading (# Title) — just start with the content.
Use ## for major sections and ### for subsections.`;

  const userPrompt = `Write study notes for: "${lessonDef.title}"

Module: ${moduleDef.title} (${moduleDef.description})
Domain: ${moduleDef.domainName}

Cover these subtopics:
${lessonDef.subtopics.map(s => `- ${s}`).join('\n')}

Use tables where appropriate (e.g., for comparing standards, listing values).
Include relevant Cisco IOS commands in code blocks where applicable.`;

  const content = await callClaude(systemPrompt, userPrompt);
  fs.writeFileSync(filePath, `# ${lessonDef.title}\n\n${content}\n`);
}

async function generateQuiz(moduleId, moduleDef) {
  const dirNum = MODULE_DIR_MAP[moduleId];
  const dirName = `${dirNum}_${moduleId}`;
  const quizId = `${moduleId}-quiz`;
  const filePath = path.join(CONTENT_DIR, dirName, `${quizId}.json`);

  if (fs.existsSync(filePath)) {
    console.log(`  SKIP ${filePath} (exists)`);
    return;
  }

  console.log(`  GEN  ${filePath}`);

  const allSubtopics = Object.values(moduleDef.lessons)
    .flatMap(l => l.subtopics);

  const systemPrompt = `You are a CCNA exam question writer. Generate quiz questions in JSON format.
Each question must have exactly 4 options, one correct answer (0-indexed), and an explanation.
Questions should test understanding, not just memorization. Mix difficulty levels.
Return ONLY valid JSON, no markdown code fences.`;

  const userPrompt = `Generate ${moduleDef.quizCount} multiple-choice questions for: "${moduleDef.title}"

Topics to cover:
${allSubtopics.map(s => `- ${s}`).join('\n')}

Return JSON in this exact format:
{
  "questions": [
    {
      "id": "${moduleId}-q1",
      "question": "Question text?",
      "options": ["A", "B", "C", "D"],
      "correct": 0,
      "explanation": "Why this is correct..."
    }
  ]
}

Use IDs: ${moduleId}-q1 through ${moduleId}-q${moduleDef.quizCount}`;

  const content = await callClaude(systemPrompt, userPrompt);

  // Parse and validate JSON
  const parsed = JSON.parse(content.replace(/```json?\n?/g, '').replace(/```\n?/g, ''));
  fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2) + '\n');
}

async function generateExam(examId, examDef) {
  const dirNum = EXAM_DIR_MAP[examId];
  const dirName = `${dirNum}_${examId}`;
  const filePath = path.join(CONTENT_DIR, dirName, `${examId}-exam.json`);

  if (fs.existsSync(filePath)) {
    console.log(`  SKIP ${filePath} (exists)`);
    return;
  }

  console.log(`  GEN  ${filePath}`);

  // Gather all subtopics from relevant domains
  const domainTopics = {};
  for (const [, modDef] of Object.entries(SYLLABUS.modules)) {
    if (examDef.domains.includes(modDef.domain)) {
      const domainName = modDef.domainName;
      if (!domainTopics[domainName]) domainTopics[domainName] = [];
      for (const lesson of Object.values(modDef.lessons)) {
        domainTopics[domainName].push(...lesson.subtopics);
      }
    }
  }

  const questionsPerDomain = Math.ceil(examDef.questionCount / examDef.domains.length);

  const systemPrompt = `You are a CCNA exam question writer creating a practice exam.
Generate questions in JSON format. Each question must have exactly 4 options, one correct answer (0-indexed),
an explanation, and a "domain" field with the domain name.
Questions should simulate real CCNA exam difficulty. Mix easy, medium, and hard questions.
Return ONLY valid JSON, no markdown code fences.`;

  const userPrompt = `Generate ${examDef.questionCount} exam questions for: "${examDef.title}"

Distribute questions across these domains (roughly ${questionsPerDomain} each):
${Object.entries(domainTopics).map(([domain, topics]) =>
  `\n${domain}:\n${topics.map(t => `  - ${t}`).join('\n')}`
).join('\n')}

Return JSON in this exact format:
{
  "questions": [
    {
      "id": "${examId}-q1",
      "question": "Question text?",
      "options": ["A", "B", "C", "D"],
      "correct": 0,
      "explanation": "Why this is correct...",
      "domain": "Domain N: Name"
    }
  ]
}

Use IDs: ${examId}-q1 through ${examId}-q${examDef.questionCount}`;

  const content = await callClaude(systemPrompt, userPrompt);
  const parsed = JSON.parse(content.replace(/```json?\n?/g, '').replace(/```\n?/g, ''));
  fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2) + '\n');
}

function ensureModuleJson(moduleId, moduleDef) {
  const dirNum = MODULE_DIR_MAP[moduleId];
  const dirName = `${dirNum}_${moduleId}`;
  const dirPath = path.join(CONTENT_DIR, dirName);
  const jsonPath = path.join(dirPath, 'module.json');

  if (fs.existsSync(jsonPath)) {
    console.log(`  SKIP ${jsonPath} (exists)`);
    return;
  }

  fs.mkdirSync(dirPath, { recursive: true });

  const lessons = Object.entries(moduleDef.lessons).map(([id, def]) => ({
    id,
    title: def.title,
    type: 'notes',
  }));

  // Add quiz lesson
  const quizId = `${moduleId}-quiz`;
  lessons.push({
    id: quizId,
    title: `${moduleDef.title} Quiz`,
    type: 'quiz',
  });

  const moduleJson = {
    id: moduleId,
    title: moduleDef.title,
    icon: moduleDef.icon,
    description: moduleDef.description,
    domain: moduleDef.domainName,
    lessons,
  };

  console.log(`  CREATE ${jsonPath}`);
  fs.writeFileSync(jsonPath, JSON.stringify(moduleJson, null, 2) + '\n');
}

function ensureExamModuleJson(examId, examDef) {
  const dirNum = EXAM_DIR_MAP[examId];
  const dirName = `${dirNum}_${examId}`;
  const dirPath = path.join(CONTENT_DIR, dirName);
  const jsonPath = path.join(dirPath, 'module.json');

  if (fs.existsSync(jsonPath)) {
    console.log(`  SKIP ${jsonPath} (exists)`);
    return;
  }

  fs.mkdirSync(dirPath, { recursive: true });

  const moduleJson = {
    id: examId,
    title: examDef.title,
    icon: '📋',
    description: `${examDef.questionCount} questions covering ${examDef.domainNames.join(', ')}`,
    category: 'exam',
    domain: examDef.domainNames[0],
    lessons: [{
      id: `${examId}-exam`,
      title: examDef.title,
      type: 'exam',
      timeLimit: examDef.timeLimit,
      passingScore: examDef.passingScore,
    }],
  };

  console.log(`  CREATE ${jsonPath}`);
  fs.writeFileSync(jsonPath, JSON.stringify(moduleJson, null, 2) + '\n');
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ERROR: Set ANTHROPIC_API_KEY environment variable');
    process.exit(1);
  }

  console.log('=== Content Generator ===\n');

  // Step 1: Ensure all module directories and module.json files
  console.log('1. Creating module directories...');
  for (const [moduleId, moduleDef] of Object.entries(SYLLABUS.modules)) {
    ensureModuleJson(moduleId, moduleDef);
  }
  for (const [examId, examDef] of Object.entries(SYLLABUS.exams)) {
    ensureExamModuleJson(examId, examDef);
  }

  // Step 2: Generate lesson content
  console.log('\n2. Generating lesson notes...');
  for (const [moduleId, moduleDef] of Object.entries(SYLLABUS.modules)) {
    console.log(`\n  Module: ${moduleDef.title}`);
    for (const [lessonId, lessonDef] of Object.entries(moduleDef.lessons)) {
      await generateLesson(moduleId, lessonId, lessonDef, moduleDef);
    }
  }

  // Step 3: Generate quizzes
  console.log('\n3. Generating quizzes...');
  for (const [moduleId, moduleDef] of Object.entries(SYLLABUS.modules)) {
    await generateQuiz(moduleId, moduleDef);
  }

  // Step 4: Generate exams
  console.log('\n4. Generating exams...');
  for (const [examId, examDef] of Object.entries(SYLLABUS.exams)) {
    await generateExam(examId, examDef);
  }

  console.log('\n=== Done! ===');
  console.log('Run "node scripts/validate-content.js" to verify generated content.');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
