import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash, FiGlobe, FiEye, FiUpload, FiTarget, FiArrowRight, FiLogOut, FiMessageSquare, FiUser, FiX } from 'react-icons/fi';
import { portfolioAPI } from '../utils/api';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import BrandLogo from '../components/branding/BrandLogo';
import toast from 'react-hot-toast';
import { formatRelativeTime } from '../utils/helpers';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await portfolioAPI.getAll();
      setPortfolios(response.data.data.portfolios);
    } catch (error) {
      console.error('Fetch portfolios error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    navigate('/editor');
  };

  const handleEdit = (portfolioId) => {
    navigate(`/editor/${portfolioId}`);
  };

  const handleDelete = async (portfolioId) => {
    if (!confirm('Are you sure you want to delete this portfolio?')) return;

    try {
      await portfolioAPI.delete(portfolioId);
      toast.success('Portfolio deleted');
      fetchPortfolios();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleTogglePublish = async (portfolioId) => {
    try {
      await portfolioAPI.togglePublish(portfolioId);
      toast.success('Portfolio status updated');
      fetchPortfolios();
    } catch (error) {
      console.error('Publish error:', error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0F1A] text-[#E5E7EB]">
      <div className="absolute inset-0 brand-grid opacity-25" />
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-3xl" />
      <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-[#06B6D4]/12 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 rounded-[28px] border border-white/8 bg-white/5 px-4 py-5 backdrop-blur sm:px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4 sm:gap-6">
              <BrandLogo />
              <div>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">Portfolio Builder</h1>
                <p className="mt-1 text-sm text-[#9CA3AF]">Welcome back, {user?.fullName || user?.username}!</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/templates')}
                className="border-white/10 bg-white/5 text-[#E5E7EB] hover:border-[#06B6D4] hover:bg-white/10"
              >
                Templates
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/discover')}
                className="border-white/10 bg-white/5 text-[#E5E7EB] hover:border-[#06B6D4] hover:bg-white/10"
              >
                Discover
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/profile-lab')}
                className="border-white/10 bg-white/5 text-[#E5E7EB] hover:border-[#06B6D4] hover:bg-white/10"
              >
                <FiTarget className="mr-1 h-4 w-4" /> Lab
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-[#EF4444]/40 bg-transparent text-[#E5E7EB] hover:border-[#EF4444] hover:bg-[#EF4444]/10"
              >
                <FiLogOut className="mr-1 h-4 w-4" /> Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {/* Section Header */}
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">My Portfolios</h2>
              <p className="mt-2 text-sm text-[#9CA3AF]">Manage and publish your portfolio projects</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() => navigate('/resume-import')}
                variant="outline"
                className="border-white/10 bg-white/5 text-[#E5E7EB] hover:border-[#06B6D4] hover:bg-white/10"
              >
                <FiUpload className="mr-2 h-4 w-4" /> Import Resume
              </Button>
              <Button
                onClick={() => navigate('/chat-builder')}
                variant="outline"
                className="border-white/10 bg-white/5 text-[#E5E7EB] hover:border-[#06B6D4] hover:bg-white/10"
              >
                <FiMessageSquare className="mr-2 h-4 w-4" /> Chat Builder
              </Button>
              <Button
                onClick={handleCreateNew}
                className="group bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-lg shadow-[#7C3AED]/20 transition-all duration-200 hover:scale-[1.02]"
              >
                <FiPlus className="mr-2 h-4 w-4" /> Create Portfolio
                <FiArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>

          {/* Portfolio Grid */}
          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 animate-pulse rounded-[24px] border border-white/8 bg-white/5" />
              ))}
            </div>
          ) : portfolios.length === 0 ? (
            <Card className="border-white/8 bg-gradient-to-br from-[#111827] to-[#0B0F1A] shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <CardContent className="py-16 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-2xl bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 p-4">
                    <FiPlus className="h-8 w-8 text-[#06B6D4]" />
                  </div>
                </div>
                <p className="mb-6 text-[#9CA3AF]">You haven't created any portfolios yet</p>
                <Button
                  onClick={handleCreateNew}
                  className="group bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-lg shadow-[#7C3AED]/20 transition-all duration-200 hover:scale-[1.02]"
                >
                  <FiPlus className="mr-2 h-4 w-4" /> Create Your First Portfolio
                  <FiArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {portfolios.map((portfolio) => (
                <Card
                  key={portfolio._id}
                  className="border-white/8 bg-gradient-to-br from-[#111827] to-[#0B0F1A] shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-200 hover:-translate-y-1 hover:border-[#2563EB]/30 hover:shadow-[0_16px_40px_rgba(124,58,237,0.15)]"
                >
                  <CardHeader className="pb-3">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <CardTitle className="truncate text-white">{portfolio.title || 'Untitled Portfolio'}</CardTitle>
                        <CardDescription className="mt-1 text-xs text-[#9CA3AF]">
                          Updated {formatRelativeTime(portfolio.updatedAt)}
                        </CardDescription>
                      </div>
                      {portfolio.isPublished && (
                        <Badge className="shrink-0 border-[#06B6D4]/30 bg-[#06B6D4]/15 text-[#A5F3FC]">
                          <FiGlobe className="mr-1 h-3 w-3" /> Published
                        </Badge>
                      )}
                    </div>

                    <div className="h-32 rounded-[20px] border border-white/8 bg-gradient-to-br from-[#7C3AED]/20 via-[#1E2A78]/10 to-[#06B6D4]/15" />
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="line-clamp-2 text-sm text-[#9CA3AF]">
                      {portfolio.description || 'No description added yet'}
                    </p>

                    <div className="flex items-center gap-2 rounded-2xl border border-white/8 bg-white/5 px-3 py-2 text-xs text-[#9CA3AF]">
                      <FiEye className="h-4 w-4" />
                      <span className="font-medium">{portfolio.views}</span>
                      <span className="text-[#6B7280]">views</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleEdit(portfolio._id)}
                        className="flex-1 border-white/10 bg-white/5 text-[#E5E7EB] hover:border-[#06B6D4] hover:bg-white/10"
                        variant="outline"
                      >
                        <FiEdit className="mr-1 h-4 w-4" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleTogglePublish(portfolio._id)}
                        className={
                          portfolio.isPublished
                            ? 'bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white shadow-lg shadow-[#06B6D4]/20 hover:scale-[1.01]'
                            : 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-lg shadow-[#7C3AED]/20 hover:scale-[1.01]'
                        }
                      >
                        {portfolio.isPublished ? 'Unpublish' : 'Publish'}
                      </Button>
                      {portfolio.isPublished && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`/p/${user?.username}`, '_blank')}
                          className="border-white/10 bg-white/5 text-[#E5E7EB] hover:border-[#06B6D4] hover:bg-white/10"
                        >
                          <FiGlobe className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(portfolio._id)}
                        className="border-[#EF4444]/40 bg-[#EF4444]/10 text-[#FCA5A5] hover:border-[#EF4444] hover:bg-[#EF4444]/20"
                      >
                        <FiTrash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Floating chatbot launcher (dashboard) */}
      {chatOpen && (
        <div className="fixed bottom-24 right-4 z-30 sm:right-6 w-[calc(100vw-2rem)] max-w-[340px] rounded-2xl border border-white/10 bg-[#0F172A]/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#7C3AED]/25 to-[#06B6D4]/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-white">
                <FiUser size={14} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">AI Assistant</p>
                <p className="text-[11px] text-[#9CA3AF]">Build via chat</p>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-[#E5E7EB] flex items-center justify-center"
              aria-label="Close assistant panel"
            >
              <FiX size={14} />
            </button>
          </div>
          <div className="p-4 space-y-3">
            <p className="text-sm text-[#E5E7EB] leading-6">
              Want to generate your resume or portfolio by chatting? I can ask questions and build everything automatically.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/chat-builder')}
                className="flex-1 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-3 py-2 text-white text-sm font-medium hover:shadow-lg"
              >
                Open Chat Builder
              </button>
              <button
                onClick={() => navigate('/resume-import')}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[#E5E7EB] text-sm hover:border-[#06B6D4]/40"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setChatOpen((v) => !v)}
        className="fixed bottom-6 right-4 z-40 sm:right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-xl shadow-[#06B6D4]/25 flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Open AI assistant"
      >
        {chatOpen ? <FiX size={18} /> : <FiMessageSquare size={20} />}
      </button>
    </div>
  );
}
