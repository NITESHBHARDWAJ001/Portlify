import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

export default function GitHubStats({ content = {}, style = {}, isEditing = false }) {
  const {
    username = 'octocat',
    theme = 'default',
    showStats = true,
    showLanguages = true,
    showStreak = false,
  } = content;

  const themeMap = {
    default: 'default',
    dark: 'dark',
    radical: 'radical',
    merko: 'merko',
    gruvbox: 'gruvbox',
    tokyonight: 'tokyonight',
  };

  const selectedTheme = themeMap[theme] || 'default';

  return (
    <div
      className={cn(
        "w-full p-8",
        isEditing && "cursor-move"
      )}
      style={style}
    >
      <motion.div
        className="max-w-4xl mx-auto flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {showStats && (
          <motion.img
            src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${selectedTheme}&hide_border=true`}
            alt={`${username}'s GitHub Stats`}
            className="w-full max-w-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          />
        )}

        {showLanguages && (
          <motion.img
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${selectedTheme}&hide_border=true`}
            alt={`${username}'s Top Languages`}
            className="w-full max-w-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          />
        )}

        {showStreak && (
          <motion.img
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${selectedTheme}&hide_border=true`}
            alt={`${username}'s GitHub Streak`}
            className="w-full max-w-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          />
        )}
      </motion.div>
    </div>
  );
}
