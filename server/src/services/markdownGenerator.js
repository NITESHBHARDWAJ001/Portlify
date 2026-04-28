/**
 * Markdown Generator Service
 * Converts canvas JSON layout to GitHub README markdown
 */

export const generateReadmeFromCanvas = (canvasLayout, userData = {}) => {
  let markdown = '';

  const { sections = [], globalBackground } = canvasLayout;
  const { username, fullName, bio } = userData;

  // Helper function to generate component markdown
  const generateComponentMarkdown = (component) => {
    const { type, content, props = {} } = component;

    switch (type) {
      case 'hero':
      case 'HeroBlock':
        return `# ${content.title || 'Hi, I\'m ' + (fullName || username || 'Developer')}\n\n` +
               `## ${content.subtitle || bio || 'Full Stack Developer'}\n\n` +
               `${content.description || ''}\n\n`;

      case 'about':
      case 'AboutBlock':
        return `## 👋 About Me\n\n${content.text || content.description || ''}\n\n`;

      case 'skills':
      case 'SkillsGrid':
        const skills = content.skills || content.items || [];
        return `## 🛠️ Skills & Technologies\n\n` +
               skills.map(skill => `- ${skill}`).join('\n') + '\n\n';

      case 'projects':
      case 'ProjectCard':
        const project = content;
        return `### ${project.title || 'Project'}\n\n` +
               `${project.description || ''}\n\n` +
               (project.tech ? `**Tech Stack:** ${project.tech.join(', ')}\n\n` : '') +
               (project.link ? `[View Project](${project.link})\n\n` : '');

      case 'experience':
      case 'Timeline':
        const items = content.items || [];
        return `## 💼 Experience\n\n` +
               items.map(item => 
                 `### ${item.title} - ${item.company}\n` +
                 `*${item.duration}*\n\n` +
                 `${item.description}\n\n`
               ).join('');

      case 'github-stats':
      case 'GitHubStats':
        const githubUsername = content.username || username;
        return `## 📊 GitHub Stats\n\n` +
               `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=${props.theme || 'default'})\n\n` +
               `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=${props.theme || 'default'})\n\n`;

      case 'streak-stats':
        const streakUsername = content.username || username;
        return `![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${streakUsername}&theme=${props.theme || 'default'})\n\n`;

      case 'typing-animation':
      case 'TypingAnimation':
        const texts = content.texts || [];
        return `![Typing SVG](https://readme-typing-svg.herokuapp.com?lines=${texts.join(';')})\n\n`;

      case 'markdown':
      case 'MarkdownBlock':
        return `${content.markdown || content.text || ''}\n\n`;

      case 'contact':
      case 'ContactForm':
        return `## 📫 Contact Me\n\n` +
               (content.email ? `- **Email:** ${content.email}\n` : '') +
               (content.linkedin ? `- **LinkedIn:** [${content.linkedin}](https://linkedin.com/in/${content.linkedin})\n` : '') +
               (content.github ? `- **GitHub:** [@${content.github}](https://github.com/${content.github})\n` : '') +
               (content.twitter ? `- **Twitter:** [@${content.twitter}](https://twitter.com/${content.twitter})\n` : '') +
               `\n`;

      case 'badges':
        const badges = content.badges || [];
        return badges.map(badge => 
          `![${badge.label}](${badge.url})`
        ).join(' ') + '\n\n';

      case 'profile-views':
        return `![Profile Views](https://komarev.com/ghpvc/?username=${username}&color=blue)\n\n`;

      default:
        return '';
    }
  };

  // Process sections
  sections.forEach(section => {
    const { components = [], title, type } = section;

    // Add section title if exists
    if (title && type !== 'hero') {
      markdown += `## ${title}\n\n`;
    }

    // Process components in section
    components.forEach(component => {
      markdown += generateComponentMarkdown(component);
    });
  });

  // Add footer
  markdown += `---\n\n`;
  markdown += `<div align="center">\n`;
  markdown += `  <p>Made with ❤️ using Portfolio Builder</p>\n`;
  markdown += `</div>\n`;

  return markdown;
};

// Generate markdown for specific component
export const generateComponentMarkdown = (component) => {
  // Use the internal helper
  return generateReadmeFromCanvas({ sections: [{ components: [component] }] });
};

// Parse markdown back to canvas (for import feature)
export const parseMarkdownToCanvas = (markdown) => {
  // This is a complex feature - basic implementation
  const sections = [];
  const lines = markdown.split('\n');
  
  let currentSection = null;
  let currentComponent = null;

  // Basic parser (can be enhanced)
  lines.forEach(line => {
    if (line.startsWith('# ')) {
      // Hero section
      currentSection = {
        id: `section-${Date.now()}`,
        type: 'hero',
        components: [{
          id: `comp-${Date.now()}`,
          type: 'hero',
          content: { title: line.substring(2) }
        }]
      };
      sections.push(currentSection);
    } else if (line.startsWith('## ')) {
      // New section
      currentSection = {
        id: `section-${Date.now()}-${sections.length}`,
        type: 'section',
        title: line.substring(3),
        components: []
      };
      sections.push(currentSection);
    }
    // Add more parsing logic as needed
  });

  return {
    sections,
    globalBackground: {
      type: 'color',
      value: '#ffffff'
    }
  };
};

export default {
  generateReadmeFromCanvas,
  generateComponentMarkdown,
  parseMarkdownToCanvas
};
