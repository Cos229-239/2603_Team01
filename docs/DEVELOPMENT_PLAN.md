# DevReflect — Development Plan

A journaling app for CS students and developers. This document outlines the app format, features, and implementation roadmap.

---

## 1. App Overview

**DevReflect** helps developers and CS students:

- Log and organize ideas
- Talk through problems (Rubber Duck mode)
- Build a searchable log of problems and solutions
- Track mood and get brief mental health / cognitive insights via daily check-ins

---

## 2. Core Features Summary

| Feature | Purpose | Key Behaviors |
|--------|---------|----------------|
| **Journal** | Log ideas | Free-form entries, optional tags, timestamps |
| **Rubber Duck** | Debug by talking | Real-time chat with AI to talk through problems |
| **Solutions Log** | Track problems & fixes | Structured problem/solution pairs, searchable |
| **Daily Check-in** | Mood + insights | Mood scale, short notes, mental health tips |

---

## 3. Navigation Structure

```
DevReflect
├── Home / Dashboard   → Quick access to recent activity & today's check-in
├── Journal            → Idea log
├── Rubber Duck        → Chat / "talk it out" mode
├── Solutions Log      → Searchable problems & solutions
└── Daily Check-in     → Mood logging & insights
```

- **Primary:** Bottom tab navigation for the five main sections.
- **Optional:** Drawer or profile/settings for account and preferences.

---

## 4. Feature Breakdown

### 4.1 Journal

- **Entries:** Title, body, optional tags (e.g. `#idea`, `#bug`, `#learning`).
- **List view:** Chronological, filterable by tag.
- **Entry view:** Read/edit with optional rich text or markdown.
- **Data:** Local-first storage (e.g. SQLite) with optional sync later.

### 4.2 Rubber Duck Mode

- **Flow:** User describes the problem in natural language; AI responds in real time.
- **AI behavior:** Asks clarifying questions, summarizes, suggests next steps (not full solutions—rubber duck style).
- **UX:** Chat UI, minimal distractions.
- **Technical:** Backend/API for the chatbot (e.g. OpenAI, Claude, or similar).
- **Privacy:** Clear policy; consider anonymization or local-only option.

### 4.3 Solutions Log

- **Structure per entry:**
  - Problem (what went wrong / what was unclear)
  - Solution (what fixed it or clarified it)
  - Tags / keywords
  - Optional links (docs, Stack Overflow, etc.)
  - Date / project
- **Search:** Full-text search on problem, solution, and tags.
- **Reuse:** “Add to Solutions” from Rubber Duck or Journal when appropriate.

### 4.4 Daily Check-in

- **Mood:** Scale (1–5 or emoji) + optional short note.
- **Time slots:** e.g. Morning / Afternoon / Evening (or configurable).
- **Insights:** Short prompts or tips based on mood/consistency (rest, breaks, sleep).
- **Trends:** Simple charts of mood over time (weekly/monthly).

---

## 5. Data Models (Conceptual)

```
JournalEntry
  - id, createdAt, updatedAt
  - title, body
  - tags[] (optional)

SolutionLogEntry
  - id, createdAt
  - problem (text)
  - solution (text)
  - tags[], links[]
  - source (journal / rubber-duck / manual)

RubberDuckConversation
  - id, createdAt
  - messages[] (role, content, timestamp)
  - summary (optional, after session)

CheckIn
  - id, date, timeOfDay
  - mood (1-5 or enum)
  - note (optional)
  - insightPrompt (optional)
```

---

## 6. Implementation Phases

| Phase | Focus | Outcomes |
|-------|--------|----------|
| **1. Foundation** | Navigation, theme, basic screens | Tab nav, empty screens, shared styling |
| **2. Journal** | CRUD, storage | Create, list, edit, delete entries |
| **3. Solutions Log** | Structured entries + search | Add/search problem–solution pairs |
| **4. Daily Check-in** | Mood + simple insights | Mood input, stored history, basic prompts |
| **5. Rubber Duck** | Chat UI + API | Chat screen, API integration, basic flow |
| **6. Polish** | Linking, insights, UX | Link Journal/Solutions to Rubber Duck, trend views, notifications |

---

## 7. Technical Considerations

- **Storage:** SQLite (e.g. `react-native-sqlite-storage` or WatermelonDB) for offline-first.
- **State:** React Context or Zustand/Redux for UI state; persistence separate from state.
- **Rubber Duck API:** Serverless functions or small backend calling an LLM API; keys never in the app.
- **Security:** API keys on server only; optional auth for cloud/sync.
- **Offline:** Journal, Solutions Log, and Check-in work offline; Rubber Duck requires network.

---

## 8. Screen Wireframe (Conceptual)

```
┌─────────────────────────────────────┐
│  DevReflect                    ⚙️   │
├─────────────────────────────────────┤
│  Today's Check-in: [   ] Not done   │
│  Recent: 2 journal entries, 1 soln  │
├─────────────────────────────────────┤
│  [Journal] [Rubber Duck] [Solutions] │
│  [Check-in]                          │
├─────────────────────────────────────┤
│  📔 Journal  🦆  📋  ☀️  ⚙️         │
└─────────────────────────────────────┘
```

---

## 9. Next Steps

1. Lock feature set and priorities with the team.
2. Rename app branding to **DevReflect** in `app.json` and native projects.
3. Implement **Phase 1** (navigation + theme).
4. Choose storage solution (e.g. WatermelonDB vs plain SQLite).
5. Implement **Journal** (Phase 2) as the first full feature.

---

*Last updated: March 2026*
