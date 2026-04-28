import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash, FiGlobe, FiEye, FiUpload, FiTarget } from 'react-icons/fi';
import { portfolioAPI } from '../utils/api';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import toast from 'react-hot-toast';
import { formatRelativeTime } from '../utils/helpers';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Portfolio Builder</h1>
              <p className="text-gray-600">Welcome back, {user?.fullName || user?.username}!</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate('/templates')}>
                Templates
              </Button>
              <Button variant="outline" onClick={() => navigate('/discover')}>
                Discover
              </Button>
              <Button variant="outline" onClick={() => navigate('/profile-lab')}>
                <FiTarget className="mr-2" /> Profile Lab
              </Button>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">My Portfolios</h2>
          <Button onClick={handleCreateNew}>
            <FiPlus className="mr-2" /> Create New Portfolio
          </Button>
          <Button variant="outline" onClick={() => navigate('/resume-import')}>
            <FiUpload className="mr-2" /> Import Resume
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-64 rounded-lg" />
            ))}
          </div>
        ) : portfolios.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-500 mb-4">You haven't created any portfolios yet</p>
              <Button onClick={handleCreateNew}>
                <FiPlus className="mr-2" /> Create Your First Portfolio
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio) => (
              <Card key={portfolio._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{portfolio.title || 'Untitled Portfolio'}</CardTitle>
                      <CardDescription>
                        Updated {formatRelativeTime(portfolio.updatedAt)}
                      </CardDescription>
                    </div>
                    {portfolio.isPublished && (
                      <Badge variant="secondary">
                        <FiGlobe className="mr-1" /> Published
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {portfolio.description || 'No description'}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FiEye className="mr-1" />
                    <span>{portfolio.views} views</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(portfolio._id)}
                      className="flex-1"
                    >
                      <FiEdit className="mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant={portfolio.isPublished ? 'secondary' : 'default'}
                      onClick={() => handleTogglePublish(portfolio._id)}
                    >
                      {portfolio.isPublished ? 'Unpublish' : 'Publish'}
                    </Button>
                    {portfolio.isPublished && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`/p/${user?.username}`, '_blank')}
                      >
                        <FiGlobe className="mr-1" /> View Live
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(portfolio._id)}
                    >
                      <FiTrash />
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
