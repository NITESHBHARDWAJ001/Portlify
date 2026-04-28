# Quick Reference

Essential commands and information for Portfolio Builder Platform.

## 🚀 Quick Start

```bash
# Clone & Install
git clone <repo-url> && cd CPM
cd server && npm install
cd ../client && npm install

# Start Development
cd server && npm run dev     # Terminal 1
cd client && npm run dev      # Terminal 2

# Access
http://localhost:5173
```

## 📦 NPM Scripts

### Backend (server/)

```bash
npm start           # Production mode
npm run dev         # Development with nodemon
npm test            # Run tests (when available)
```

### Frontend (client/)

```bash
npm run dev         # Development server
npm run build       # Production build
npm run preview     # Preview production build
npm run lint        # Lint code
```

## 🔑 Environment Variables

### server/.env

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio-builder
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### client/.env (optional)

```env
VITE_API_URL=http://localhost:5000/api
```

## 🗄️ Database Commands

```bash
# Start MongoDB
mongod

# Connect to MongoDB
mongosh

# Use database
use portfolio-builder

# View collections
show collections

# View users
db.users.find().pretty()

# Clear database (DEV ONLY!)
db.dropDatabase()
```

## 🌐 API Endpoints

### Auth
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
PUT    /api/auth/profile
PUT    /api/auth/password
```

### Portfolios
```
POST   /api/portfolios
GET    /api/portfolios
GET    /api/portfolios/:id
PUT    /api/portfolios/:id
DELETE /api/portfolios/:id
PUT    /api/portfolios/:id/publish
GET    /api/portfolios/p/:username
GET    /api/portfolios/discover
```

### Templates
```
GET    /api/templates
GET    /api/templates/:id
POST   /api/templates
PUT    /api/templates/:id
DELETE /api/templates/:id
POST   /api/templates/:id/use
POST   /api/templates/:id/like
GET    /api/templates/user/my
GET    /api/templates/user/saved
```

## 📁 Project Structure

```
CPM/
├── server/
│   ├── src/
│   │   ├── config/          # Database config
│   │   ├── models/          # Mongoose models
│   │   ├── controllers/     # Route controllers
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth middleware
│   │   ├── services/        # Business logic
│   │   └── server.js        # Entry point
│   └── package.json
│
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── canvas/      # Canvas editor
    │   │   ├── blocks/      # Portfolio blocks
    │   │   ├── ui/          # UI components
    │   │   ├── sidebar/     # Component library
    │   │   └── inspector/   # Style panel
    │   ├── pages/           # Route pages
    │   ├── store/           # Zustand stores
    │   ├── utils/           # Utilities
    │   └── App.jsx
    └── package.json
```

## 🎨 Component Types

- `hero` - Hero section with title/subtitle
- `about` - About me section
- `project` - Project showcase card
- `skills` - Skills grid display
- `timeline` - Experience timeline
- `github-stats` - GitHub statistics
- `typing-animation` - Animated typing text
- `markdown` - Custom markdown content
- `contact` - Contact form

## 🛠️ Common Tasks

### Create New Component

1. Create file: `client/src/components/blocks/MyBlock.jsx`
2. Register in: `client/src/utils/componentRegistry.js`

```javascript
// MyBlock.jsx
export const MyBlock = ({ content, style, isEditing }) => {
  return <div style={style}>{content.text}</div>;
};

// componentRegistry.js
import { MyBlock } from '../components/blocks/MyBlock';

const componentRegistry = {
  // ... existing
  'my-block': {
    component: MyBlock,
    name: 'My Block',
    category: 'content',
    icon: 'FaIcon',
    defaultProps: {
      content: { text: 'Default' },
      style: {}
    }
  }
};
```

### Add New API Endpoint

1. Create controller: `server/src/controllers/myController.js`
2. Create route: `server/src/routes/myRoutes.js`
3. Register in: `server/src/server.js`

```javascript
// myController.js
export const getItems = async (req, res) => {
  try {
    const items = await Model.find();
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// myRoutes.js
import express from 'express';
import { getItems } from '../controllers/myController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', protect, getItems);

export default router;

// server.js
import myRoutes from './routes/myRoutes.js';
app.use('/api/my-endpoint', myRoutes);
```

## 🔐 Authentication

### Register & Login

```javascript
// Register
const response = await api.post('/auth/register', {
  username: 'johndoe',
  email: 'john@example.com',
  password: 'password123',
  fullName: 'John Doe'
});

// Save token
localStorage.setItem('token', response.data.data.token);

// Login
const response = await api.post('/auth/login', {
  email: 'john@example.com',
  password: 'password123'
});
```

### Protected Requests

```javascript
// Axios interceptor (already configured)
const token = localStorage.getItem('token');
config.headers.Authorization = `Bearer ${token}`;
```

## 🎯 State Management

### Auth Store

```javascript
import { useAuthStore } from './store/authStore';

const { user, isAuthenticated, setUser, logout } = useAuthStore();
```

### Canvas Store

```javascript
import { useCanvasStore } from './store/canvasStore';

const {
  canvasLayout,
  addSection,
  updateComponent,
  undo,
  redo,
  setDeviceMode
} = useCanvasStore();
```

## 🐛 Debugging

### Backend Logs

```bash
# View server logs
cd server && npm run dev

# MongoDB connection
MongoDB Connected: localhost

# Request logs (Morgan)
POST /api/auth/login 200 45.123 ms
```

### Frontend Logs

```javascript
// Check state
console.log(useCanvasStore.getState());

// Check API calls
// Open DevTools → Network → XHR
```

### Common Issues

**MongoDB not connecting:**
```bash
# Check if MongoDB is running
mongod --version
sudo service mongod start
```

**Port already in use:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

**CORS errors:**
- Check CLIENT_URL in server/.env
- Must match frontend URL exactly

## 📊 Testing

### Manual Testing

```bash
# Test auth
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"123456","fullName":"Test"}'

# Test with token
curl -X GET http://localhost:5000/api/portfolios \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### MongoDB Queries

```javascript
// Find user
db.users.findOne({ username: 'johndoe' });

// Find portfolios by user
db.portfolios.find({ owner: ObjectId('...') });

// Count templates
db.templates.countDocuments({ isPublic: true });
```

## 🚀 Deployment

### Backend (Railway)

```bash
railway login
cd server
railway init
railway variables set PORT=5000
railway variables set MONGODB_URI="..."
railway variables set JWT_SECRET="..."
railway up
```

### Frontend (Vercel)

```bash
vercel login
cd client
vercel
vercel env add VITE_API_URL
vercel --prod
```

## 📚 Documentation

- [README.md](./README.md) - Main documentation
- [SETUP.md](./SETUP.md) - Installation guide
- [API.md](./API.md) - API reference
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines

## 🔗 Useful Links

- MongoDB: https://www.mongodb.com/
- React Docs: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/
- shadcn/ui: https://ui.shadcn.com/
- Express.js: https://expressjs.com/

## 💡 Tips

- Use `Ctrl+C` to stop servers
- Use `npm ci` for clean install
- Clear browser cache if changes not reflecting
- Check browser console for frontend errors
- Check terminal for backend errors
- Use MongoDB Compass for database GUI

## 📞 Get Help

- GitHub Issues: For bugs and features
- Documentation: Check docs folder
- Logs: Check server terminal output

---

**Last Updated:** March 2024  
**Platform Version:** 1.0.0
