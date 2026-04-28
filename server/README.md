# Backend Server

Express.js backend for Portfolio Builder platform.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Structure

```
server/
├── src/
│   ├── config/          # Configuration files
│   ├── models/          # Database models
│   ├── controllers/     # Route controllers
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── services/        # Business logic
│   └── server.js        # Entry point
└── package.json
```

## Installation

```bash
npm install
```

## Environment Variables

Create `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio-builder
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## Scripts

```bash
npm start       # Production
npm run dev     # Development with nodemon
```

## API Routes

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Portfolios
- POST `/api/portfolios` - Create portfolio
- GET `/api/portfolios` - Get user portfolios
- GET `/api/portfolios/:id` - Get portfolio by ID
- PUT `/api/portfolios/:id` - Update portfolio
- DELETE `/api/portfolios/:id` - Delete portfolio

### Templates
- GET `/api/templates` - Get all templates
- POST `/api/templates` - Create template
- GET `/api/templates/:id` - Get template by ID
- PUT `/api/templates/:id` - Update template
- DELETE `/api/templates/:id` - Delete template

## License

MIT
