import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../../utils/helpers';

export default function MarkdownBlock({ content = {}, style = {}, isEditing = false }) {
  const { markdown = '# Hello World\n\nWrite your markdown here...' } = content;

  return (
    <div
      className={cn(
        "w-full p-8 prose prose-lg max-w-none",
        isEditing && "cursor-move"
      )}
      style={style}
    >
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        className="markdown-content"
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
