import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiEye, FiUsers, FiArrowLeft } from 'react-icons/fi';
import { templateAPI } from '../utils/api';
import { useCanvasStore } from '../store/canvasStore';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import BrandLogo from '../components/branding/BrandLogo';
import toast from 'react-hot-toast';

export default function Templates() {
  const navigate = useNavigate();
  const { setCanvasLayout } = useCanvasStore();
  const [templates, setTemplates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'developer', 'designer', 'creative', 'business', 'minimal', 'modern'];

  useEffect(() => {
    fetchTemplates();
  }, [selectedCategory]);

  const fetchTemplates = async () => {
    try {
      const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
      const response = await templateAPI.getAll(params);
      setTemplates(response.data.data.templates);
    } catch (error) {
      console.error('Fetch templates error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUseTemplate = async (template) => {
    try {
      // Track usage
      await templateAPI.use(template._id);
      
      // Load template into canvas
      setCanvasLayout(template.canvasLayout);
      toast.success('Template loaded!');
      navigate('/editor');
    } catch (error) {
      console.error('Use template error:', error);
    }
  };

  const handleLikeTemplate = async (templateId) => {
    try {
      await templateAPI.toggleLike(templateId);
      fetchTemplates();
    } catch (error) {
      console.error('Like template error:', error);
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
            <div className="flex items-center gap-4">
              <BrandLogo />
              <div>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">Template Marketplace</h1>
                <p className="mt-1 text-sm text-[#9CA3AF]">Start with a professionally designed template</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="border-white/10 bg-white/5 text-[#E5E7EB] hover:border-[#06B6D4] hover:bg-white/10"
            >
              <FiArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'border border-[#06B6D4] bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-lg'
                    : 'border border-white/10 bg-white/5 text-[#E5E7EB] hover:border-white/20 hover:bg-white/10'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 animate-pulse rounded-[24px] border border-white/8 bg-white/5" />
              ))}
            </div>
          ) : templates.length === 0 ? (
            <Card className="border-white/8 bg-gradient-to-br from-[#111827] to-[#0B0F1A] shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <CardContent className="py-16 text-center">
                <p className="text-[#9CA3AF]">No templates found in this category</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <Card
                  key={template._id}
                  className="group border-white/8 bg-gradient-to-br from-[#111827] to-[#0B0F1A] shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-200 hover:-translate-y-1 hover:border-[#2563EB]/30 hover:shadow-[0_16px_40px_rgba(124,58,237,0.15)]"
                >
                  <CardHeader className="pb-3">
                    <div className="mb-4 aspect-video overflow-hidden rounded-[20px] border border-white/8 bg-gradient-to-br from-[#7C3AED]/25 via-[#1E2A78]/15 to-[#06B6D4]/20 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-300">
                      🎨
                    </div>

                    <CardTitle className="line-clamp-1 text-white">{template.name}</CardTitle>
                    <CardDescription className="mt-2 line-clamp-2 text-[#9CA3AF]">
                      {template.description || 'A beautiful template'}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-[#9CA3AF]">
                        <FiUsers className="h-4 w-4" /> {template.usageCount}
                      </span>
                      <span className="flex items-center gap-1 text-red-400">
                        <FiHeart className="h-4 w-4" /> {template.likesCount}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge className="border-white/10 bg-white/5 text-[#E5E7EB]">{template.category}</Badge>
                      <Badge className="border-[#06B6D4]/20 bg-[#06B6D4]/10 text-[#06B6D4]">{template.difficulty}</Badge>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        className="flex-1 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white hover:shadow-lg"
                        onClick={() => handleUseTemplate(template)}
                      >
                        Use Template
                      </Button>
                      <button
                        onClick={() => handleLikeTemplate(template._id)}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 transition-all hover:border-red-400/30 hover:bg-red-400/10"
                      >
                        <FiHeart className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
