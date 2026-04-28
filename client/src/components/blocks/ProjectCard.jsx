import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { cn } from '../../utils/helpers';
import { Badge } from '../ui/Badge';

export default function ProjectCard({ content = {}, style = {}, isEditing = false }) {
  const {
    title = 'Project Name',
    description = 'Project description goes here',
    image = '',
    tags = [],
    link = '',
    githubLink = '',
  } = content;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "bg-white rounded-lg shadow-lg overflow-hidden",
        isEditing && "cursor-move"
      )}
      style={style}
    >
      {image && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2" style={{ color: style.textColor }}>
          {title}
        </h3>

        <p className="text-gray-600 mb-4">
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              onClick={(e) => isEditing && e.preventDefault()}
            >
              <FiExternalLink /> View Project
            </a>
          )}
          
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
              onClick={(e) => isEditing && e.preventDefault()}
            >
              <FiGithub /> Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
