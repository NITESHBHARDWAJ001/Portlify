# 🚀 Quick Start Guide

Get your Portfolio Builder platform running in minutes!

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ Node.js 18.0.0 or higher
- ✅ MongoDB 6.0.0 or higher
- ✅ npm or yarn package manager
- ✅ Git

## 🔧 Step-by-Step Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd CPM
```

### 2. Setup Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Edit `.env` file:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio-builder
JWT_SECRET=change_this_to_a_very_secure_random_string
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Setup Frontend

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install
```

Create `client/.env` file (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB

**Windows:**
```bash
# Using MongoDB as a service
net start MongoDB

# Or run mongod directly
mongod --dbpath="C:\data\db"
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 5. Start Backend Server

```bash
cd server
npm run dev
```

You should see:
```
✅ MongoDB Connected: localhost
╔═══════════════════════════════════════════╗
║   🚀 Portfolio Builder Server Running    ║
║   Port: 5000                             ║
╚═══════════════════════════════════════════╝
```

### 6. Start Frontend Server

Open a new terminal:

```bash
cd client
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 7. Access Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 🎉 First Steps

### Create Your Account

1. Click **"Sign up"** on the login page
2. Enter your details:
   - **Username**: `johndoe` (this will be your portfolio URL)
   - **Full Name**: `John Doe`
   - **Email**: `john@example.com`
   - **Password**: `yourpassword`

3. Click **"Sign Up"**

You'll be automatically logged in and redirected to the Dashboard!

### Create Your First Portfolio

1. On the Dashboard, click **"Create New Portfolio"**

2. You'll see the Canvas Editor with three panels:
   - **Left**: Component Library
   - **Center**: Canvas (drag components here)
   - **Right**: Style Panel

3. **Drag a Hero Block** from the left panel to the canvas

4. **Click the Hero Block** to select it

5. **Edit content** in the right panel:
   - Title: "Hi, I'm John Doe"
   - Subtitle: "Full Stack Developer"
   - Description: "Welcome to my portfolio"

6. **Add more components**:
   - Drag "About Block"
   - Drag "Skills Grid"
   - Drag "Project Card"

7. **Save your work**: Click the **"Save"** button

### Customize Your Portfolio

**Style Components:**
- Select any component
- Use the right panel to change:
  - Background colors
  - Text colors
  - Padding and margins
  - Font sizes

**Preview Your Portfolio:**
- Click **"Preview"** button to see the final result
- Toggle device modes: Desktop 🖥️ / Tablet 📱 / Mobile 📱

**Publish Your Portfolio:**
1. Click **"Publish"** button
2. Your portfolio is now live at:
   ```
   http://localhost:5173/p/johndoe
   ```

### Export as README

1. Click **"README"** button
2. Your portfolio will download as `README.md`
3. Use it in your GitHub profile!

## 🔍 Troubleshooting

### MongoDB Connection Error

**Error:** `MongoDB Connection Error`

**Solutions:**
1. Make sure MongoDB is running
2. Check MongoDB URI in `.env` file
3. Verify MongoDB is accessible on port 27017

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solutions:**
```bash
# Find and kill process using port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Or change port in server/.env
PORT=5001
```

### CORS Error

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
- Ensure `CLIENT_URL` in `server/.env` matches your frontend URL
- Default should be `http://localhost:5173`

### npm Install Errors

**Error:** `npm ERR! code ERESOLVE`

**Solution:**
```bash
npm install --legacy-peer-deps
```

### Module Not Found

**Error:** `Cannot find module 'xyz'`

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📦 Additional Dependencies (Optional)

### Install Tailwind CSS IntelliSense

For better development experience in VS Code:

1. Install extension: "Tailwind CSS IntelliSense"
2. Restart VS Code

### Install MongoDB Compass

Visual MongoDB database management:

1. Download from: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. View your `portfolio-builder` database

## 🔄 Regular Development Workflow

1. **Start MongoDB**
   ```bash
   mongod
   ```

2. **Start Backend** (Terminal 1)
   ```bash
   cd server
   npm run dev
   ```

3. **Start Frontend** (Terminal 2)
   ```bash
   cd client
   npm run dev
   ```

4. **Access at**: http://localhost:5173

## 📚 Next Steps

- 📖 Read the full [README.md](./README.md) for detailed documentation
- 🎨 Explore the [Component Library](./client/src/utils/componentRegistry.js)
- 🛠️ Check [API Documentation](#api-endpoints) in README
- 🚀 Deploy your application (see Deployment section in README)

## 💡 Tips

- Use **Ctrl+S** (Cmd+S) frequently to save your work
- The canvas has **undo/redo** functionality
- **Zoom in/out** for precise editing
- **Device preview** to test responsiveness
- **Templates** for quick start

## ❓ Need Help?

- Check the [README.md](./README.md) for detailed documentation
- Open an issue on GitHub
- Contact support

---

Happy Building! 🎉
