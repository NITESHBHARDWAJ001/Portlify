/**
 * Generate README markdown from canvas layout
 */
export const generateReadme = (canvasLayout, userData = {}) => {
  let markdown = '';

  const { sections = [] } = canvasLayout;
  const { username, fullName, bio } = userData;

  sections.forEach(section => {
    const { components = [], title, type } = section;

    if (title && type !== 'hero') {
      markdown += `\n## ${title}\n\n`;
    }

    components.forEach(component => {
      markdown += generateComponentMarkdown(component, userData);
    });
  });

  // Add footer
  markdown += `\n---\n\n`;
  markdown += `<div align="center">\n`;
  markdown += `  <p>Made with ❤️ using Portfolio Builder</p>\n`;
  markdown += `</div>\n`;

  return markdown.trim();
};

const generateComponentMarkdown = (component, userData = {}) => {
  const { type, content = {}, props = {} } = component;
  const { username } = userData;

  switch (type) {
    case 'hero':
      return `# ${content.title || 'Hi, I\'m Developer'}\n\n` +
             `## ${content.subtitle || ''}\n\n` +
             `${content.description || ''}\n\n`;

    case 'about':
      return `## 👋 About Me\n\n${content.text || ''}\n\n`;

    case 'skills':
      const skills = content.skills || [];
      return `## 🛠️ Skills & Technologies\n\n` +
             skills.map(skill => `- ${skill}`).join('\n') + '\n\n';

    case 'project':
      return `### ${content.title || 'Project'}\n\n` +
             `${content.description || ''}\n\n` +
             (content.tags ? `**Tech:** ${content.tags.join(', ')}\n\n` : '') +
             (content.link ? `[View Project](${content.link})\n\n` : '');

    case 'timeline':
      const items = content.items || [];
      return `## 💼 Experience\n\n` +
             items.map(item => 
               `### ${item.title} - ${item.company}\n` +
               `*${item.duration}*\n\n` +
               `${item.description}\n\n`
             ).join('');

    case 'github-stats':
      const user = content.username || username || 'username';
      const theme = props.theme || 'default';
      return `## 📊 GitHub Stats\n\n` +
             `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=${theme})\n\n` +
             `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=compact&theme=${theme})\n\n`;

    case 'typing-animation':
      const texts = content.texts || [];
      return `![Typing SVG](https://readme-typing-svg.herokuapp.com?lines=${texts.join(';')})\n\n`;

    case 'markdown':
      return `${content.markdown || ''}\n\n`;

    case 'contact':
      return `## 📫 Contact Me\n\n` +
             (content.email ? `📧 Email: ${content.email}\n\n` : '') +
             (content.linkedin ? `💼 LinkedIn: [${content.linkedin}](https://linkedin.com/in/${content.linkedin})\n\n` : '') +
             (content.github ? `🐙 GitHub: [@${content.github}](https://github.com/${content.github})\n\n` : '') +
             (content.twitter ? `🐦 Twitter: [@${content.twitter}](https://twitter.com/${content.twitter})\n\n` : '');

    default:
      return '';
  }
};

export default generateReadme;
