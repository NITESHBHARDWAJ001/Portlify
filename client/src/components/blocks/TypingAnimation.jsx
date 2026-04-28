import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

export default function TypingAnimation({ content = {}, style = {}, isEditing = false }) {
  const {
    texts = ['Developer', 'Designer', 'Creator'],
    speed = 100,
    deleteSpeed = 50,
    pauseTime = 2000,
  } = content;

  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[currentIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          } else {
            // Pause before deleting
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          // Deleting
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((currentIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts, speed, deleteSpeed, pauseTime]);

  return (
    <div
      className={cn(
        "w-full p-8 flex items-center justify-center",
        isEditing && "cursor-move"
      )}
      style={style}
    >
      <div className="text-center">
        <span className="text-4xl md:text-5xl font-bold" style={{ color: style.textColor }}>
          {displayText}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="border-r-4 border-blue-600 ml-1"
          >
            |
          </motion.span>
        </span>
      </div>
    </div>
  );
}
