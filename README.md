# 🐾 PetSit

A full-stack pet-sitting management platform built with **NestJS** and **Angular**, featuring role-based access control and an AI-powered pet assistant named **Lello**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | NestJS + TypeScript |
| Frontend | Angular (Standalone Components) |
| Database | PostgreSQL + TypeORM |
| Auth | JWT + bcrypt |
| AI | GitHub Models (GPT-4o via OpenAI SDK) |

---

## Features

### Authentication
- Register & login with JWT-based sessions
- Password hashing with bcrypt
- Role-based guards and custom decorators

### Roles

**Admin** — Manage users and assign roles  
**Owner** — Create and manage pet-sitting requests  
**Sitter** — Browse available requests and accept assignments

### Pet-Sitting Requests
- Create, view, and update requests
- Accept assignments as a sitter
- Role-filtered result sets

---

## 🤖 Lello – AI Pet Assistant

Lello is a friendly, built-in pet-care assistant powered by GPT-4o.

**What Lello does:**
- Gives short, practical pet-care tips
- Stays cheerful and concise
- Recommends a vet for any health concerns — never diagnoses

**How it works:** The Angular frontend sends a message → the NestJS backend calls the GitHub Models inference API → the response comes back to the chat UI. The API key never touches the frontend.

```
Model:   openai/gpt-4o
BaseURL: https://models.github.ai/inference
Key:     Stored securely in backend .env
```

---

## API Reference

```
POST   /auth/register
POST   /auth/login

GET    /users           (Admin)
GET    /users/:id       (Admin)

GET    /requests
GET    /requests/:id
POST   /requests
PATCH  /requests/:id

POST   /chat            → Returns Lello's AI response
```

---

## Setup

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=1234
DB_NAME=petsit
GITHUB_TOKEN=your_github_token_here
```

```bash
npm run start:dev
# Runs on http://localhost:3000
```

### Frontend

```bash
cd frontend
npm install
ng serve --open
# Runs on http://localhost:4200
```

---

## Security

- Passwords hashed with bcrypt
- JWT authentication on all protected routes
- Role guards enforce endpoint access
- GitHub API key stored server-side only
- DTO validation via `class-validator`

