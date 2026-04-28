import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

export default function Timeline({ content = {}, style = {}, isEditing = false }) {
  const {
    title = 'Experience',
    items = [],
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
        className="text-3xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ color: style.textColor }}
      >
        {title}
      </motion.h2>

      <div className="max-w-4xl mx-auto">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="relative pl-8 pb-12 border-l-2 border-blue-500"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {/* Timeline dot */}
            <div className="absolute left-[-9px] top-0 w-4 h-4 bg-blue-500 rounded-full" />

            <div className="bg-white rounded-lg p-6 shadow-md ml-4">
              <h3 className="text-xl font-bold mb-1">{item.title}</h3>
              <p className="text-blue-600 font-medium mb-2">{item.company}</p>
              <p className="text-gray-500 text-sm mb-3">{item.duration}</p>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
