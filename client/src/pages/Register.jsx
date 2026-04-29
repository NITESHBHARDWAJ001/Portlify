import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import AuthShell from '../components/layout/AuthShell';
import { FiArrowRight, FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiUserCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getErrorMessage = (error) =>
    error?.response?.data?.message || 'Unable to create your account right now. Please try again.';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.register(formData);
      const { user, token } = response.data.data;
      
      login(user, token);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Create your account"
      title="Set up Portlify and launch a profile that feels designed from the start."
      description="Create a workspace for your portfolio, resume details, and public profile. The experience is responsive, clean, and fast to edit."
      badgeText="Fast onboarding"
    >
      <Card className="border-white/8 bg-white/5 shadow-[0_18px_70px_rgba(0,0,0,0.35)]">
        <CardHeader className="p-0 pb-6">
          <CardTitle className="text-2xl text-white">Create account</CardTitle>
          <CardDescription className="text-[#9CA3AF]">
            Add your details once, then shape your portfolio and resume story from one place.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-[#E5E7EB]">Username</Label>
              <div className="relative">
                <FiUser className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="h-12 border-white/10 bg-white/5 pl-10 text-white placeholder:text-[#6B7280] focus:border-[#06B6D4]"
                  required
                />
              </div>
              <p className="text-xs text-[#6B7280]">This becomes your portfolio URL.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-[#E5E7EB]">Full Name</Label>
              <div className="relative">
                <FiUserCheck className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="h-12 border-white/10 bg-white/5 pl-10 text-white placeholder:text-[#6B7280] focus:border-[#06B6D4]"
                />
              </div>
            </div>

            <div className="space-y-2">
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

            <div className="space-y-2">
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
                  minLength={6}
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
              {loading ? 'Creating account...' : 'Create account'}
              {!loading && <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-0.5" />}
            </Button>
          </form>

          <div className="mt-5 flex items-center justify-between gap-4 text-sm text-[#9CA3AF]">
            <span>Already have an account?</span>
            <Link to="/login" className="font-medium text-[#A5F3FC] transition hover:text-white">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
