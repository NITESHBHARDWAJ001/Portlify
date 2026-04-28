import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

export default function HeroBlock({ content = {}, style = {}, isEditing = false }) {
  const {
    title = 'Hi, I\'m Your Name',
    subtitle = 'Full Stack Developer',
    description = 'Welcome to my portfolio',
    image = '',
  } = content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative w-full min-h-[400px] flex items-center justify-center p-8",
        isEditing && "cursor-move"
      )}
      style={style}
    >
      <div className="max-w-4xl mx-auto text-center">
        {image && (
          <motion.img
            src={image}
            alt={title}
            className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          />
        )}
        
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ color: style.textColor }}
        >
          {title}
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-3xl text-gray-600 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {subtitle}
        </motion.h2>

        {description && (
          <motion.p
            className="text-lg text-gray-500 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
