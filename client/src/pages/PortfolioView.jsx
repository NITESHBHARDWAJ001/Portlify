import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { portfolioAPI } from '../utils/api';
import { getVariantComponent } from '../utils/componentRegistry';
import { ThemeContext, getTheme, loadThemeFonts } from '../themes';

export default function PortfolioView() {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    portfolioAPI.getPublished(username)
      .then((response) => setPortfolio(response.data.data.portfolio))
      .catch(() => setError('Portfolio not found'))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0F1A]">
        <div className="absolute inset-0 brand-grid opacity-25" />
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-[#06B6D4]/12 blur-3xl" />
        
        <div className="relative text-center">
          <div className="w-16 h-16 rounded-full border-4 border-[#2563EB]/30 border-t-[#06B6D4] animate-spin mx-auto mb-6" />
          <p className="text-[#9CA3AF]">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0F1A] text-[#E5E7EB]">
        <div className="absolute inset-0 brand-grid opacity-25" />
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-[#06B6D4]/12 blur-3xl" />
        
        <div className="relative text-center">
          <h1 className="text-6xl font-bold text-[#E5E7EB] mb-4">404</h1>
          <p className="text-[#9CA3AF] mb-6 text-lg">{error || 'Portfolio not found'}</p>
          <a href="/" className="inline-block rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-6 py-3 text-white font-medium hover:shadow-lg transition-all">
            Go back home
          </a>
        </div>
      </div>
    );
  }

  const { canvasLayout } = portfolio;
  const theme = getTheme(canvasLayout?.theme || 'midnight');
  loadThemeFonts(theme);
  const sections = canvasLayout?.sections || [];

  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ background: theme.colors.bg, minHeight: '100vh', fontFamily: `'${theme.fontBody}', sans-serif` }}>
        {sections.map((section) => {
          const Component = getVariantComponent(section.type, section.variant);
          if (!Component) return null;
          return (
            <div key={section.id}>
              <Component content={section.content || {}} isEditing={false} />
            </div>
          );
        })}
      </div>
    </ThemeContext.Provider>
  );
}
