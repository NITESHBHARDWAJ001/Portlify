import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHeart, FiEye, FiUsers } from 'react-icons/fi';
import { templateAPI } from '../utils/api';
import { useCanvasStore } from '../store/canvasStore';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Template Marketplace</h1>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              ← Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="capitalize whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton h-80 rounded-lg" />
            ))}
          </div>
        ) : templates.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-500">No templates found in this category</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-4xl">🎨</span>
                  </div>
                  
                  <CardTitle className="line-clamp-1">{template.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {template.description || 'No description'}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FiUsers /> {template.usageCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiHeart className="text-red-500" /> {template.likesCount}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">{template.category}</Badge>
                    <Badge variant="outline">{template.difficulty}</Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => handleUseTemplate(template)}
                    >
                      Use Template
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleLikeTemplate(template._id)}
                    >
                      <FiHeart />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
