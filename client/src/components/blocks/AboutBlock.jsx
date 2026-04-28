import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

export default function AboutBlock({ content = {}, style = {}, isEditing = false }) {
  const {
    title = 'About Me',
    text = 'Tell your story here...',
    image = '',
  } = content;

  return (
    <div
      className={cn(
        "w-full p-8",
        isEditing && "cursor-move"
      )}
      style={style}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ color: style.textColor }}
        >
          {title}
        </motion.h2>

        <div className={cn("flex flex-col gap-6", image && "md:flex-row items-center")}>
          {image && (
            <motion.img
              src={image}
              alt={title}
              className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            />
          )}

          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
              {text}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
