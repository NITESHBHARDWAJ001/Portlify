import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiUser } from 'react-icons/fi';
import { portfolioAPI } from '../utils/api';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { formatRelativeTime } from '../utils/helpers';

export default function Discover() {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPortfolios();
  }, [page]);

  const fetchPortfolios = async () => {
    try {
      const response = await portfolioAPI.discover({ page, limit: 12 });
      setPortfolios(response.data.data.portfolios);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Fetch portfolios error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPortfolio = (username) => {
    window.open(`/p/${username}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Discover Portfolios</h1>
              <p className="text-gray-600">Explore portfolios created by the community</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              ← Back
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton h-64 rounded-lg" />
            ))}
          </div>
        ) : portfolios.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-500">No published portfolios yet</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((portfolio) => (
                <Card
                  key={portfolio._id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleViewPortfolio(portfolio.owner.username)}
                >
                  <CardHeader>
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">💼</span>
                    </div>

                    <CardTitle className="line-clamp-1">
                      {portfolio.title || 'Untitled Portfolio'}
                    </CardTitle>

                    <CardDescription className="line-clamp-2">
                      {portfolio.description || 'No description'}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <FiUser />
                        {portfolio.owner.username}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiEye />
                        {portfolio.views}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500">
                      Updated {formatRelativeTime(portfolio.updatedAt)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>

                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>

                <Button
                  variant="outline"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
