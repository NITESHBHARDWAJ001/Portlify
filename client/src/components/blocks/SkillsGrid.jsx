import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

const defaultSkills = [
  { name: 'React', icon: '⚛️', level: 90 },
  { name: 'Node.js', icon: '🟢', level: 85 },
  { name: 'MongoDB', icon: '🍃', level: 80 },
  { name: 'TypeScript', icon: '📘', level: 85 },
  { name: 'Tailwind CSS', icon: '🎨', level: 90 },
  { name: 'Next.js', icon: '▲', level: 80 },
];

export default function SkillsGrid({ content = {}, style = {}, isEditing = false }) {
  const {
    title = 'Skills & Technologies',
    skills = defaultSkills,
    showLevel = true,
  } = content;

  return (
    <div
      className={cn(
        "w-full p-8",
        isEditing && "cursor-move"
      )}
      style={style}
    >
      <motion.h2
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ color: style.textColor }}
      >
        {title}
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-center">
              {skill.icon && (
                <div className="text-4xl mb-2">{skill.icon}</div>
              )}
              <h3 className="font-semibold text-lg mb-2">{skill.name}</h3>
              
              {showLevel && skill.level && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
