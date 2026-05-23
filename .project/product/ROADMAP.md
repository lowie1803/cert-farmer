# CertFarmer — CCNA 200-301 Roadmap

## Phase 1 — Scale to Full 200-301 Syllabus (Done)

Scaled from 5 modules to the full 6-domain syllabus (~20 modules), added midterm/final exams, and built a quiz bank of ~230 questions.

### Infrastructure
- [x] ExamView component (timer, question palette, per-domain scoring)
- [x] LessonPage: add `exam` type branch
- [x] ModulePage + Dashboard: exam module styling (gold border)
- [x] CSS: `.tag-exam` style

### Content Gaps
- [x] `ip-services-quiz.json` (5 questions) — module 013
- [x] `security-quiz.json` (5 questions) — module 016

### Tooling
- [x] `scripts/syllabus-outline.json` — topic definitions for all modules
- [x] `scripts/generate-content.js` — Claude API content generator (idempotent)
- [x] `scripts/validate-content.js` — schema validator

### New Modules (15 total)
- [x] 002 Cabling & Topology
- [x] 003 IPv6 Fundamentals
- [x] 004 Virtualization & Switching
- [x] 006 STP & EtherChannel
- [x] 007 Wireless Architectures
- [x] 008 Midterm 1 (40 questions, Domains 1-2)
- [x] 010 Routing Fundamentals
- [x] 011 OSPF
- [x] 012 FHRP (HSRP/VRRP/GLBP)
- [x] 014 Network Services (NTP, SNMP, QoS, SSH)
- [x] 015 Midterm 2 (40 questions, Domains 3-4)
- [x] 017 Network Security
- [x] 018 Automation Fundamentals
- [x] 019 Network Programmability
- [x] 020 Final Exam (60 questions, all domains)

### Glossary
- [ ] Expand glossary with OSPF, HSRP, SDN, and new module terms (current: 145 terms)

## Phase 2 — TBD

<!-- Add future phases here -->
