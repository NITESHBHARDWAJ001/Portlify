import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiUser, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { portfolioAPI } from '../utils/api';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import BrandLogo from '../components/branding/BrandLogo';
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
                <h1 className="text-2xl font-bold text-white sm:text-3xl">Discover Portfolios</h1>
                <p className="mt-1 text-sm text-[#9CA3AF]">Explore portfolios created by talented creators</p>
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
          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 animate-pulse rounded-[24px] border border-white/8 bg-white/5" />
              ))}
            </div>
          ) : portfolios.length === 0 ? (
            <Card className="border-white/8 bg-gradient-to-br from-[#111827] to-[#0B0F1A] shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <CardContent className="py-16 text-center">
                <p className="text-[#9CA3AF]">No published portfolios yet. Be the first to create one!</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {portfolios.map((portfolio) => (
                  <Card
                    key={portfolio._id}
                    onClick={() => handleViewPortfolio(portfolio.owner.username)}
                    className="group cursor-pointer border-white/8 bg-gradient-to-br from-[#111827] to-[#0B0F1A] shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-200 hover:-translate-y-1 hover:border-[#2563EB]/30 hover:shadow-[0_16px_40px_rgba(124,58,237,0.15)]"
                  >
                    <CardHeader className="pb-3">
                      <div className="mb-4 aspect-video overflow-hidden rounded-[20px] border border-white/8 bg-gradient-to-br from-[#7C3AED]/25 via-[#1E2A78]/15 to-[#06B6D4]/20 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-300">
                        💼
                      </div>

                      <CardTitle className="line-clamp-2 text-white">{portfolio.title || 'Untitled Portfolio'}</CardTitle>
                      <CardDescription className="mt-2 line-clamp-2 text-[#9CA3AF]">
                        {portfolio.description || 'A beautiful portfolio'}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2 text-[#9CA3AF]">
                          <FiUser className="h-4 w-4" />
                          <span className="font-medium text-white">{portfolio.owner.username}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#9CA3AF]">
                          <FiEye className="h-4 w-4" />
                          <span>{portfolio.views} views</span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-2 text-xs text-[#6B7280]">
                        Updated {formatRelativeTime(portfolio.updatedAt)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-3 rounded-[28px] border border-white/8 bg-white/5 py-6 px-4">
                  <Button
                    variant="outline"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="border-white/10 bg-white/5 text-[#E5E7EB] hover:border-[#06B6D4] hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>

                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white">
                    {page} of {totalPages}
                  </span>

                  <Button
                    variant="outline"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="border-white/10 bg-white/5 text-[#E5E7EB] hover:border-[#06B6D4] hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next <FiArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
