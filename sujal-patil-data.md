# Sujal Patil — Resume & Portfolio Data

## Personal Info
- **Name:** Sujal Patil
- **Location:** Bhiwandi, Maharashtra, India (commuting distance to Mumbai)
- **Portfolio:** sujalpatil.dev
- **Education:** B.E. Information Technology, ARMIET (Mumbai University) — Graduated June 2026
- **Target roles:** Backend Developer / Full-Stack Developer (Internship / Fresher)

---

## Academic Profile
- **SSC:** 68.60%
- **HSC:** 54.50%
- **CGPI:** 7.41 (consistent upward trend)
  - S3: 6.39 → ... → S8: 8.05 (best semester)
  - Overall: 65.73%

---

## Skills

### Languages
- JavaScript, SQL

### Backend
- Node.js, Express.js
- REST API design (modular MVC architecture)
- JWT authentication (httpOnly cookies)
- bcrypt password hashing
- Zod schema validation
- MySQL (connection pooling, parameterized queries)
- ES Modules

### Strengths (confirmed solid)
- Modular API structure
- JWT + httpOnly cookie auth flows
- Input validation with Zod
- Parameterized SQL queries (injection-safe)
- Rate limiting, CORS, Helmet security middleware

### Areas of growth (in progress)
- Automated testing
- Production-grade error modeling
- Observability / logging
- TypeScript (highest-ROI next skill)
- System design basics, Docker, Redis (stretch goals)

### DSA / Problem Solving
**Known topics:** Arrays, Strings, Two Pointers, Hash Table, DFS, BFS, Stack, Linked List, Binary Tree, Binary Search, Sorting, Bit Manipulation, Recursion, Sliding Window, Greedy, Dynamic Programming , Graph fundamentals, Backtracking

**Practiced extensively across:** backtracking, DP, linked lists, trees, graphs, binary search, monotonic stack, sliding window

**Not yet covered:** Heap/Priority Queue, advanced graph algorithms (Dijkstra implementation, DSU), Interval DP, Bitmask DP, Digit DP

---

## Projects

### 1. CivicDesk (Primary Portfolio Project)
**Role-based civic complaint management system** with separate citizen and police-facing frontends.

**Tech Stack:** Node.js, Express, MySQL, JWT, Zod, plain HTML/CSS/JS frontend

**Key Features:**
- Dual-frontend architecture (public/citizen portal + police portal)
- Role-based access control via JWT
- Complaint lifecycle tracking with Kanban-style status flow: Pending → In Progress → Resolved → Closed
- Officer assignment system via `complaint_assignments` join table
- Comment system (`complaint_comments`) for case communication
- Evidence upload support with dual foreign-key relations (`complaint_evidence`)
- Denormalized `is_busy` cache field on police table for fast availability lookups

**Database Design Highlights:**
- Normalized schema redesign: `public` → `citizens`, `ticket` → `complaints`
- Surrogate `INT id` added for police table
- Join table architecture replacing flag-based assignment tracking
- Strict input validation: phone (`VARCHAR(10)` + regex), Aadhar (`VARCHAR(12)`), email format validation, `.strict()` Zod schemas throughout

---

### 2. Job Application Tracker
**Full-stack application tracking tool** — Node.js/Express/MySQL backend (complete) with React frontend (in progress).

**Tech Stack:** Node.js, Express, MySQL, JWT, bcrypt, Zod, React, ES Modules

**API — 11 RESTful Endpoints:**
| Method | Endpoint | Auth | Notes |
|---|---|---|---|
| POST | `/user/register` | Public | Rate-limited |
| POST | `/user/login` | Public | Rate-limited |
| POST | `/user/logout` | Public | — |
| GET | `/user/me` | Protected | JWT verification |
| DELETE | `/user/me` | Protected | Password re-verification required |
| GET | `/application` | Protected | Rate-limited |
| POST | `/application` | Protected | Rate-limited |
| GET | `/application/:id` | Protected | Rate-limited |
| PUT | `/application/:id` | Protected | Rate-limited |
| DELETE | `/application/:id` | Protected | Returns 204 |
| PATCH | `/application/:id/status` | Protected | Rate-limited |

**Database Schema:**
- `users`: id (PK, AI), firstName, lastName, email (UNIQUE), password (bcrypt-hashed)
- `applications`: id (PK, AI), userId (FK → users.id, ON DELETE CASCADE), title, roleApplied, jobDescription, dateApplied, applicationStatus (ENUM: applied/interview/accepted/rejected), 4 stage-specific note fields, createdAt, updatedAt (auto-updates)

**Security Implementation:**
- JWT (HS256, 24h expiry), payload `{id, email}`
- httpOnly cookies, environment-aware `secure`/`sameSite` config (prod vs dev)
- bcrypt password hashing (12 salt rounds)
- Two-tier rate limiting: auth endpoints (10 req/15min) vs general API (100 req/15min)
- All Zod schemas use `.strict()` mode to reject unexpected fields
- Centralized error handling via `createError(message, statusCode)` factory pattern
- User data isolation — every application query scoped to `userId`
- Cascading deletes maintain referential integrity

**Architecture:**
- Clean separation: `config/`, `controllers/`, `routes/`, `middleware/`, `schemas/`, `utils/`, `db/`
- Dynamic SQL query building (Object.keys-based INSERT/UPDATE) while maintaining parameterization — no injection risk
- Middleware chain: CORS → Helmet → cookie-parser → JSON body parser → trust proxy → routes
- 100% ES Modules

---

### 3. LeetCode Practice Tooling
- Built a browser extension to assist LeetCode practice (`content.js`, `helper.js`)
- Implemented duck-typed structural comparison logic for linked lists and binary trees
- *(Note: excluded from core resume skill list — built using Chrome Extension APIs, not part of primary backend stack)*

---

## "Why Hire Me" Talking Points
- Builds independently before seeking feedback — strong self-sufficiency signal
- Two defensible, full-stack projects with real security implementation (JWT, bcrypt, rate limiting, input validation) — not just CRUD tutorials
- Demonstrates database design maturity: normalized schemas, join tables, FK constraints, denormalized caching where appropriate
- Sustained, daily DSA practice across 15+ topic areas
- Upward academic trend (6.39 → 8.05 CGPI) showing growth trajectory despite a weak HSC score
