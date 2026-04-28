# Community-Driven Portfolio Builder Platform

A full-stack MERN platform that helps users build, customize, and publish professional developer portfolios through a visual drag-and-drop canvas editor.

## What This Project Does

This platform allows users to:

- Create portfolio pages visually with reusable blocks
- Customize each section with content and style controls
- Save and manage multiple portfolios
- Publish a public portfolio page at a username-based URL
- Browse and use community templates
- Import resume content and generate profile assets
- Run ATS checks and download generated resume output
- Export GitHub-ready markdown content

## Core Highlights

- Visual canvas editor with section/component-based layout
- Component variants for rapid design exploration
- Responsive preview modes (desktop/tablet/mobile)
- JWT-based authentication and protected APIs
- Template ecosystem (create, like, reuse, save)
- Resume parsing pipeline (PDF/DOC/DOCX based upload path)
- Profile lab tooling for structured profile data and generated assets
- MongoDB-backed persistence for users, templates, and portfolios

## Monorepo Structure

```text
CPM/
|- client/                      # React + Vite frontend
|  |- src/
|  |  |- components/
|  |  |  |- blocks/            # Portfolio blocks + variants
|  |  |  |- canvas/            # Canvas editor runtime
|  |  |  |- inspector/         # Style panel and controls
|  |  |  |- sidebar/           # Component library panel
|  |  |  |- ui/                # Shared UI primitives
|  |  |- pages/                # Route-level pages
|  |  |- store/                # Zustand stores
|  |  |- themes/               # Theme registry
|  |  |- utils/                # API, mappers, generators
|  |- package.json
|
|- server/                      # Express + MongoDB backend
|  |- src/
|  |  |- config/               # DB connection
|  |  |- controllers/          # Route handlers
|  |  |- middleware/           # Auth and error middleware
|  |  |- models/               # Mongoose models
|  |  |- routes/               # API route modules
|  |  |- services/             # Rendering/generator services
|  |  |- utils/                # ATS check, parsing, profile helpers
|  |  |- server.js             # App bootstrap
|  |- package.json
|
|- API.md
|- ARCHITECTURE.md
|- DEPLOYMENT.md
|- QUICK_REFERENCE.md
|- SETUP.md
```

## Technology Stack

### Frontend

- React 18
- Vite 5
- React Router 6
- Tailwind CSS 3 + PostCSS
- Zustand
- DnD Kit
- react-moveable
- Framer Motion
- react-markdown + remark-gfm
- Axios
- react-hot-toast

### Backend

- Node.js + Express 4
- MongoDB + Mongoose 8
- JWT (jsonwebtoken)
- bcryptjs
- express-validator
- multer (file upload)
- pdf-parse + mammoth (resume parsing pipeline)
- helmet + cors + morgan

## Frontend Application Flow

1. User authenticates from login/register pages.
2. Dashboard displays user portfolios.
3. User creates/opens portfolio in Canvas Editor.
4. Canvas state updates through Zustand store actions.
5. API calls persist layout/content changes.
6. User previews and publishes portfolio.
7. Public profile renders at `/p/:username`.

## Backend Service Flow

1. Request reaches route module under `/api/*`.
2. Auth middleware validates JWT where required.
3. Controller executes validation + business logic.
4. Mongoose model reads/writes MongoDB documents.
5. Standard success/error response is returned.

## Implemented Routes

Base URL (development): `http://localhost:5000/api`

### Auth Routes (`/api/auth`)

- `POST /register`
- `POST /login`
- `GET /me` (protected)
- `PUT /profile` (protected)
- `PUT /password` (protected)
- `GET /profile-data` (protected)
- `PUT /profile-data` (protected)
- `POST /generate-assets` (protected)
- `POST /ats-check` (protected)
- `GET /download-resume` (protected)

### Portfolio Routes (`/api/portfolios`)

- `GET /discover`
- `GET /p/:username`
- `POST /` (protected)
- `GET /` (protected)
- `GET /:id` (protected)
- `PUT /:id` (protected)
- `DELETE /:id` (protected)
- `PUT /:id/publish` (protected)

### Template Routes (`/api/templates`)

- `GET /`
- `GET /:id` (optional auth)
- `POST /` (protected)
- `GET /user/my` (protected)
- `GET /user/saved` (protected)
- `PUT /:id` (protected)
- `DELETE /:id` (protected)
- `POST /:id/use` (protected)
- `POST /:id/like` (protected)

### Resume Routes (`/api/resume`)

- `POST /parse` (protected, multipart upload)

### Utility Route

- `GET /api/health`

For complete request/response payload examples, see [API.md](API.md).

## Client Routes

### Public

- `/login`
- `/register`
- `/discover`
- `/p/:username`

### Protected

- `/dashboard`
- `/editor/:id?`
- `/templates`
- `/resume-import`
- `/profile-lab`

## Data Model Summary

### User

- Identity fields: username, email, password hash
- Profile fields: fullName, avatar, bio
- Role field for authorization
- References to portfolios/templates/saved templates

### Portfolio

- Owner reference to user
- Title, description, slug
- `canvasLayout` JSON structure with sections/components/styles
- Publish and visibility metadata
- View tracking + SEO metadata

### Template

- Author reference
- Reusable layout structure
- Engagement fields such as likes/usage
- Public discovery metadata

## Installation and Local Development

## Prerequisites

- Node.js 18+
- MongoDB 6+
- npm

## 1) Clone and Enter Project

```bash
git clone <your-repository-url>
cd CPM
```

## 2) Setup Backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio-builder
JWT_SECRET=replace_with_a_strong_secret
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## 3) Setup Frontend

```bash
cd ../client
npm install
```

Create `client/.env` (optional but recommended):

```env
VITE_API_URL=http://localhost:5000/api
```

## 4) Run Development Servers

Backend terminal:

```bash
cd server
npm run dev
```

Frontend terminal:

```bash
cd client
npm run dev
```

Open: `http://localhost:5173`

## Scripts

### Client (`client/package.json`)

- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

### Server (`server/package.json`)

- `npm run dev` - start Express with nodemon
- `npm start` - start Express in normal mode

## Configuration Notes

- CORS origin is controlled by `CLIENT_URL` in backend env.
- API base URL in frontend is controlled by `VITE_API_URL`.
- JSON payload limit is set to 10mb in backend (`server.js`).

## Security Practices Implemented

- Password hashing using bcryptjs
- Token-based auth using JWT
- `helmet` for secure headers
- CORS restrictions for allowed client origin
- Validation support via express-validator
- Centralized not-found and error middleware

## Deployment Overview

Recommended split deployment:

- Backend: Railway or Render
- Frontend: Vercel or Netlify
- Database: MongoDB Atlas

See full operational steps in [DEPLOYMENT.md](DEPLOYMENT.md).

## Documentation Index

- [SETUP.md](SETUP.md) - step-by-step local setup
- [API.md](API.md) - full API documentation
- [ARCHITECTURE.md](ARCHITECTURE.md) - architecture and design details
- [DEPLOYMENT.md](DEPLOYMENT.md) - production deployment guide
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - quick usage references
- [CONTRIBUTING.md](CONTRIBUTING.md) - contribution workflow

## Troubleshooting

### MongoDB Connection Errors

- Ensure MongoDB service is running
- Verify `MONGODB_URI` correctness
- Check network/firewall accessibility

### CORS Errors

- Ensure `CLIENT_URL` exactly matches frontend origin
- Ensure frontend calls use correct `VITE_API_URL`

### Port Conflicts

- Backend default: 5000
- Frontend default: 5173
- Change `PORT` in `server/.env` if needed

### Install/Build Failures

- Remove `node_modules` and reinstall
- Ensure supported Node version (18+)

## Roadmap Ideas

- Add rate-limiting middleware for auth and upload endpoints
- Add automated tests (unit/integration/e2e)
- Add CI/CD pipeline with lint/build/test gates
- Add audit logging and monitoring integrations
- Add role-based admin workflows for template moderation

## License

MIT. See [LICENSE](LICENSE).

## Credits

Built as a community-focused portfolio platform with visual authoring, reusable blocks, and publishing workflows for developer profiles.
