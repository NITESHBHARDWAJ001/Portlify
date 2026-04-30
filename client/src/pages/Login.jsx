import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import AuthShell from '../components/layout/AuthShell';
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getErrorMessage = (error) =>
    error?.response?.data?.message || 'Unable to sign in right now. Please check your details and try again.';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      const { user, token } = response.data.data;
      
      login(user, token);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to keep building a portfolio that looks and feels premium."
      description="Use the same workspace to manage your portfolio, refine your resume story, and publish responsive pages that look sharp on every screen."
      badgeText="Secure sign in"
    >
      <Card className="mx-auto max-w-[520px] overflow-hidden border-white/8 bg-white/5 p-2 shadow-[0_18px_70px_rgba(0,0,0,0.35)] sm:p-3">
        <CardHeader className="pb-6 pt-1 sm:pt-2">
          <CardTitle className="text-2xl text-white">Portfolio Builder</CardTitle>
          <CardDescription className="text-[#9CA3AF]">
            Use your account to access the editor, templates, resume tools, and your live portfolio.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3.5">
              <Label htmlFor="email" className="text-[#E5E7EB]">Email</Label>
              <div className="relative">
                <FiMail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 border-white/10 bg-white/5 pl-10 text-white placeholder:text-[#6B7280] focus:border-[#06B6D4]"
                  required
                />
              </div>
            </div>

            <div className="space-y-3.5">
              <Label htmlFor="password" className="text-[#E5E7EB]">Password</Label>
              <div className="relative">
                <FiLock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-12 border-white/10 bg-white/5 pl-10 pr-12 text-white placeholder:text-[#6B7280] focus:border-[#06B6D4]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] transition hover:text-white"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="group flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-lg shadow-[#7C3AED]/20 transition-all duration-200 hover:scale-[1.01]"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
              {!loading && <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-0.5" />}
            </Button>
          </form>

          <div className="mt-8 flex items-center justify-between gap-4 text-sm text-[#9CA3AF]">
            <span>Need an account?</span>
            <Link to="/register" className="font-medium text-[#A5F3FC] transition hover:text-white">
              Create one
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
