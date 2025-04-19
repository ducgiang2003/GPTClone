import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
interface FormattedTextProps {
  content: string;
}
export const FormattedText = ({ content }: FormattedTextProps) => {
  const formattedContent = content.replace(/^(\d+\.\s.+)/gm, "\n\n**$1**");
  return (
    <div className="w-none prose text-2xl space-y-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // hỗ trợ GFM: table, task list, emoji, strikethrough...
        rehypePlugins={[rehypeHighlight]}
      >
        {formattedContent}
      </ReactMarkdown>
      <style jsx>{`
        .prose strong {
          font-size: 1.5rem; /* Chữ tiêu đề lớn hơn */
          line-height: 1.75rem; /* Tăng khoảng cách dòng */
          margin-top: 1rem; /* Tăng khoảng cách giữa các tiêu đề */
        }
      `}</style>
    </div>
  );
};
