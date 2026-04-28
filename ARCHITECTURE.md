# Architecture Documentation

## System Overview

The Portfolio Builder Platform is a full-stack MERN application that enables users to create, customize, and publish developer portfolios using a visual canvas editor.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Client (React)                       │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │   Pages     │  │ Components   │  │  State (Zustand)│ │
│  │             │  │              │  │                 │  │
│  │ • Login     │  │ • Canvas     │  │ • authStore    │  │
│  │ • Dashboard │  │ • Blocks     │  │ • canvasStore  │  │
│  │ • Editor    │  │ • UI         │  │                 │  │
│  └─────────────┘  └──────────────┘  └───────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/REST API (Axios)
                     │
┌────────────────────▼────────────────────────────────────┐
│                   Server (Express)                       │
│  ┌───────────────┐  ┌─────────────┐  ┌──────────────┐  │
│  │   Routes      │  │ Controllers │  │  Middleware  │  │
│  │               │  │             │  │              │  │
│  │ • /auth       │  │ • authCtrl  │  │ • protect    │  │
│  │ • /portfolios │  │ • portCtrl  │  │ • authorize  │  │
│  │ • /templates  │  │ • tempCtrl  │  │ • errorHandler│ │
│  └───────────────┘  └─────────────┘  └──────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │ Mongoose ODM
                     │
┌────────────────────▼────────────────────────────────────┐
│                  Database (MongoDB)                      │
│  ┌──────────────┐  ┌───────────────┐  ┌─────────────┐  │
│  │   Users      │  │  Portfolios   │  │  Templates  │  │
│  │              │  │               │  │             │  │
│  │ • username   │  │ • owner       │  │ • author    │  │
│  │ • email      │  │ • canvasLayout│  │ • layout    │  │
│  │ • password   │  │ • published   │  │ • category  │  │
│  └──────────────┘  └───────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Technology Stack

- **Framework**: React 18 with hooks
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3
- **UI Components**: shadcn/ui
- **State Management**: Zustand with persistence
- **Routing**: React Router v6
- **HTTP Client**: Axios with interceptors
- **Drag & Drop**: dnd-kit
- **Animations**: Framer Motion
- **Transformations**: react-moveable

### Component Hierarchy

```
App.jsx
├── Layout Components
│   ├── Navbar
│   └── Footer
│
├── Pages
│   ├── Login
│   ├── Register
│   ├── Dashboard
│   ├── CanvasEditor
│   │   ├── Canvas
│   │   │   └── SectionRenderer
│   │   │       └── BlockRenderer
│   │   ├── ComponentLibrary (Sidebar)
│   │   └── StylePanel (Inspector)
│   ├── Templates
│   ├── PortfolioView
│   └── Discover
│
└── Shared Components
    ├── UI (shadcn/ui)
    │   ├── Button
    │   ├── Input
    │   ├── Card
    │   └── ...
    │
    └── Blocks (Portfolio Components)
        ├── HeroBlock
        ├── AboutBlock
        ├── ProjectCard
        ├── SkillsGrid
        ├── Timeline
        ├── MarkdownBlock
        ├── GitHubStats
        ├── ContactForm
        └── TypingAnimation
```

### State Management

#### Auth Store (`authStore.js`)

```javascript
{
  user: User | null,
  token: string | null,
  isAuthenticated: boolean,
  
  // Actions
  setUser(user),
  logout(),
  updateProfile(data)
}
```

#### Canvas Store (`canvasStore.js`)

```javascript
{
  canvasLayout: {
    sections: Section[],
    globalBackground: Object,
    responsive: Object
  },
  
  selectedComponent: string | null,
  selectedSection: string | null,
  
  deviceMode: 'desktop' | 'tablet' | 'mobile',
  zoomLevel: number,
  
  history: Layout[],
  historyIndex: number,
  
  // Actions
  addSection(section),
  updateSection(id, updates),
  deleteSection(id),
  
  addComponent(sectionId, component),
  updateComponent(sectionId, componentId, updates),
  deleteComponent(sectionId, componentId),
  
  undo(),
  redo(),
  
  setDeviceMode(mode),
  setZoomLevel(level)
}
```

### Component Registry Pattern

```javascript
// componentRegistry.js
const componentRegistry = {
  hero: {
    component: HeroBlock,
    name: 'Hero Section',
    category: 'header',
    icon: 'FaRocket',
    defaultProps: { ... }
  },
  // ... other components
};

export const getComponent = (type) => componentRegistry[type];
```

## Backend Architecture

### Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Security**: Helmet.js, CORS
- **Logging**: Morgan
- **Validation**: express-validator

### API Architecture

```
/api
├── /auth
│   ├── POST   /register          - Register user
│   ├── POST   /login             - Login user
│   ├── GET    /me                - Get current user
│   ├── PUT    /profile           - Update profile
│   └── PUT    /password          - Change password
│
├── /portfolios
│   ├── POST   /                  - Create portfolio
│   ├── GET    /                  - Get user portfolios
│   ├── GET    /:id               - Get portfolio by ID
│   ├── PUT    /:id               - Update portfolio
│   ├── DELETE /:id               - Delete portfolio
│   ├── PUT    /:id/publish       - Toggle publish status
│   ├── GET    /p/:username       - Get published portfolio
│   └── GET    /discover          - Browse all portfolios
│
└── /templates
    ├── GET    /                  - Get public templates
    ├── GET    /:id               - Get template by ID
    ├── POST   /                  - Create template
    ├── PUT    /:id               - Update template
    ├── DELETE /:id               - Delete template
    ├── POST   /:id/use           - Use template
    ├── POST   /:id/like          - Like/unlike template
    ├── GET    /user/my           - Get user templates
    └── GET    /user/saved        - Get saved templates
```

### Middleware Stack

```javascript
app.use(helmet());              // Security headers
app.use(cors({ origin: ... })); // CORS
app.use(express.json());        // Body parser
app.use(morgan('dev'));         // Logging

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolios', protect, portfolioRoutes);
app.use('/api/templates', protect, templateRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);
```

### Authentication Flow

```
1. User Registration
   ├── Client: POST /api/auth/register
   ├── Server: Hash password with bcrypt
   ├── Server: Create user in database
   ├── Server: Generate JWT token
   └── Server: Return user + token

2. User Login
   ├── Client: POST /api/auth/login
   ├── Server: Find user by email
   ├── Server: Compare password with hash
   ├── Server: Generate JWT token
   └── Server: Return user + token

3. Protected Request
   ├── Client: Request with Authorization header
   ├── Server: Extract token from header
   ├── Server: Verify JWT signature
   ├── Server: Attach user to req.user
   └── Server: Process request
```

## Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  username: String (unique, indexed),
  email: String (unique, indexed),
  password: String (hashed),
  fullName: String,
  avatar: String,
  bio: String,
  role: String (enum: ['user', 'admin']),
  portfolios: [ObjectId] (ref: Portfolio),
  templates: [ObjectId] (ref: Template),
  savedTemplates: [ObjectId] (ref: Template),
  createdAt: Date,
  updatedAt: Date
}
```

### Portfolio Model

```javascript
{
  _id: ObjectId,
  title: String (required),
  slug: String (unique, indexed),
  owner: ObjectId (ref: User, required),
  description: String,
  canvasLayout: Mixed {
    sections: [{
      id: String,
      type: String,
      title: String,
      components: [{
        id: String,
        type: String,
        content: Object,
        style: Object,
        props: Object
      }],
      layout: String,
      style: Object
    }],
    globalBackground: Object,
    responsive: Object
  },
  isPublished: Boolean (default: false),
  isPublic: Boolean (default: true),
  views: Number (default: 0),
  publishedUrl: String,
  previewImage: String,
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Template Model

```javascript
{
  _id: ObjectId,
  name: String (required),
  author: ObjectId (ref: User, required),
  description: String,
  canvasLayout: Mixed (same as Portfolio),
  thumbnail: String,
  category: String (enum: ['developer', 'designer', ...]),
  tags: [String] (indexed),
  isPublic: Boolean (default: true),
  usageCount: Number (default: 0),
  likes: [ObjectId] (ref: User),
  likesCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes

```javascript
// User
username: unique index
email: unique index

// Portfolio
slug: unique index
owner: standard index
isPublished: standard index

// Template
author: standard index
category: standard index
tags: text index
name: text index
description: text index
```

## Canvas Data Structure

### Canvas Layout JSON

```json
{
  "sections": [
    {
      "id": "section-uuid-1",
      "type": "hero",
      "title": "Header Section",
      "components": [
        {
          "id": "comp-uuid-1",
          "type": "hero",
          "content": {
            "title": "John Doe",
            "subtitle": "Full Stack Developer",
            "description": "Building amazing web applications",
            "image": "https://...",
            "cta": {
              "text": "View Projects",
              "link": "#projects"
            }
          },
          "style": {
            "backgroundColor": "#ffffff",
            "textColor": "#000000",
            "padding": "80px 20px",
            "fontSize": {
              "title": "56px",
              "subtitle": "24px"
            },
            "alignment": "center"
          },
          "props": {
            "animated": true,
            "animationDelay": 0.3
          }
        }
      ],
      "layout": "flex",
      "style": {
        "minHeight": "100vh",
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center"
      }
    }
  ],
  "globalBackground": {
    "type": "gradient",
    "value": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  "responsive": {
    "desktop": {},
    "tablet": {
      "sections[0].style.padding": "60px 15px"
    },
    "mobile": {
      "sections[0].style.padding": "40px 10px",
      "sections[0].components[0].style.fontSize.title": "32px"
    }
  }
}
```

## Drag & Drop Architecture

### DnD Context

```javascript
<DndContext onDragEnd={handleDragEnd}>
  <ComponentLibrary /> {/* Drag Source */}
  <Canvas />           {/* Drop Target */}
</DndContext>
```

### Drag Flow

```
1. User starts dragging component from library
   ├── Component becomes "active"
   ├── Drag overlay appears
   └── Drop zones highlight

2. User drags over canvas
   ├── Canvas detects hovering
   ├── Shows drop indicator
   └── Calculates target section

3. User drops component
   ├── onDragEnd event fires
   ├── Extract component type from drag data
   ├── Generate unique ID
   ├── Add to canvasStore
   └── Re-render canvas
```

## State History & Undo/Redo

### History Implementation

```javascript
// When canvas changes
const saveHistory = (newLayout) => {
  const newHistory = history.slice(0, historyIndex + 1);
  newHistory.push(newLayout);
  setHistory(newHistory);
  setHistoryIndex(newHistory.length - 1);
};

// Undo
const undo = () => {
  if (historyIndex > 0) {
    setHistoryIndex(historyIndex - 1);
    setCanvasLayout(history[historyIndex - 1]);
  }
};

// Redo
const redo = () => {
  if (historyIndex < history.length - 1) {
    setHistoryIndex(historyIndex + 1);
    setCanvasLayout(history[historyIndex + 1]);
  }
};
```

## Security Architecture

### Authentication & Authorization

```javascript
// JWT Token Structure
{
  header: {
    alg: "HS256",
    typ: "JWT"
  },
  payload: {
    id: "user-id",
    role: "user",
    iat: 1234567890,
    exp: 1234567890
  },
  signature: "..."
}

// Middleware Protection
const protect = async (req, res, next) => {
  // Extract token from Authorization header
  // Verify token signature
  // Attach user to req.user
  // Continue to route handler
};

// Role-based Authorization
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};
```

### Input Validation

```javascript
// Using express-validator
const registerValidation = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .isAlphanumeric()
    .toLowerCase()
    .trim(),
  body('email')
    .isEmail()
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
];
```

## Performance Optimizations

### Frontend

- **Code Splitting**: React.lazy() for route-based splitting
- **Memoization**: React.memo() for expensive components
- **Virtual Scrolling**: For large lists (templates, discover)
- **Debouncing**: Canvas updates, search inputs
- **Image Optimization**: Lazy loading, WebP format
- **Bundle Size**: Tree shaking, minimize dependencies

### Backend

- **Database Indexing**: Critical fields indexed
- **Query Optimization**: Populate only needed fields
- **Caching**: Add Redis for frequently accessed data
- **Pagination**: Limit query results
- **Connection Pooling**: MongoDB connection pool

## Scalability Considerations

### Horizontal Scaling

- **Stateless Backend**: JWT tokens, no server sessions
- **Load Balancer**: Distribute traffic across instances
- **Database Sharding**: Partition by user ID
- **CDN**: Static assets served from CDN

### Vertical Scaling

- **Database**: Upgrade MongoDB instance
- **Application**: Increase server resources
- **Caching**: Add Redis/Memcached layer

## Monitoring & Observability

### Logging

```javascript
// Structured logging
logger.info('User login', { 
  userId: user._id, 
  ip: req.ip,
  timestamp: new Date()
});

logger.error('Database error', {
  error: err.message,
  stack: err.stack
});
```

### Metrics

- Request rate
- Response times
- Error rates
- Database query performance
- API endpoint usage

### Health Checks

```javascript
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});
```

## Future Architecture Enhancements

### Phase 2

- WebSocket integration for real-time collaboration
- Redis caching layer
- Microservices architecture
- Event-driven architecture with message queues
- GraphQL API alongside REST

### Phase 3

- Kubernetes deployment
- Auto-scaling infrastructure
- Multi-region deployment
- Advanced analytics pipeline
- AI-powered component suggestions

---

This architecture provides a solid foundation for a production-ready SaaS platform with room for future growth and scalability.
