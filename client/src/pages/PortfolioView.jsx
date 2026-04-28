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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600 mb-4">{error || 'Portfolio not found'}</p>
          <a href="/" className="text-blue-600 hover:underline">
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
