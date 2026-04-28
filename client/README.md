# Portfolio Builder Client

React frontend for Portfolio Builder platform.

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- shadcn/ui
- dnd-kit (Drag & Drop)
- Framer Motion (Animations)
- Zustand (State Management)

## Structure

```
client/
├── src/
│   ├── components/
│   │   ├── canvas/      # Canvas editor
│   │   ├── blocks/      # UI blocks
│   │   ├── ui/          # UI components
│   │   ├── sidebar/     # Sidebar components
│   │   └── inspector/   # Style panel
│   ├── pages/           # Route pages
│   ├── store/           # State management
│   ├── utils/           # Utilities
│   └── App.jsx
└── package.json
```

## Installation

```bash
npm install
```

## Environment Variables (Optional)

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Lint code
```

## Features

- 🎨 Visual Canvas Editor
- 🖱️ Drag & Drop Components
- ✨ Real-time Styling
- 📱 Responsive Preview
- 💾 Auto-save
- 📄 README Export
- 🎭 Template System

## Pages

- `/login` - User login
- `/register` - User registration
- `/dashboard` - User dashboard
- `/editor/:id?` - Canvas editor
- `/templates` - Template marketplace
- `/discover` - Explore portfolios
- `/p/:username` - Public portfolio view

## License

MIT
