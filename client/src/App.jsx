import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CanvasEditor from './pages/CanvasEditor';
import Templates from './pages/Templates';
import PortfolioView from './pages/PortfolioView';
import Discover from './pages/Discover';
import ResumeImport from './pages/ResumeImport';
import ProfileLab from './pages/ProfileLab';
import ChatBuilder from './pages/ChatBuilder';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const LandingRoute = () => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Home />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
        
        <Routes>
          <Route path="/" element={<LandingRoute />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/p/:username" element={<PortfolioView />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/editor/:id?" 
            element={
              <ProtectedRoute>
                <CanvasEditor />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/templates" 
            element={
              <ProtectedRoute>
                <Templates />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/resume-import"
            element={
              <ProtectedRoute>
                <ResumeImport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile-lab"
            element={
              <ProtectedRoute>
                <ProfileLab />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat-builder"
            element={
              <ProtectedRoute>
                <ChatBuilder />
              </ProtectedRoute>
            }
          />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
