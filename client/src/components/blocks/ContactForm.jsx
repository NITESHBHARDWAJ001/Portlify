import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { cn } from '../../utils/helpers';

export default function ContactForm({ content = {}, style = {}, isEditing = false }) {
  const {
    title = 'Get In Touch',
    email = '',
    linkedin = '',
    github = '',
    twitter = '',
  } = content;

  const socialLinks = [
    { icon: FiMail, label: 'Email', value: email, href: `mailto:${email}` },
    { icon: FiGithub, label: 'GitHub', value: github, href: `https://github.com/${github}` },
    { icon: FiLinkedin, label: 'LinkedIn', value: linkedin, href: `https://linkedin.com/in/${linkedin}` },
    { icon: FiTwitter, label: 'Twitter', value: twitter, href: `https://twitter.com/${twitter}` },
  ].filter(link => link.value);

  return (
    <div
      className={cn(
        "w-full p-8",
        isEditing && "cursor-move"
      )}
      style={style}
    >
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 
          className="text-3xl font-bold mb-8"
          style={{ color: style.textColor }}
        >
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={(e) => isEditing && e.preventDefault()}
            >
              <link.icon className="text-2xl text-blue-600" />
              <div className="text-left">
                <p className="text-sm text-gray-500">{link.label}</p>
                <p className="font-medium">{link.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
