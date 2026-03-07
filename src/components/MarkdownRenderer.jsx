import ReactMarkdown from 'react-markdown';

const MARKDOWN_COMPONENTS = {
  h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-white mb-4" {...props} />,
  h3: ({node, ...props}) => <h3 className="text-xl font-bold text-white mb-4" {...props} />,
  p: ({node, ...props}) => <p className="m-0 mb-3" {...props} />,
  ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 mb-3" {...props} />,
  li: ({node, ...props}) => <li className="mb-1" {...props} />,
  strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
  a: ({node, ...props}) => <a {...props} className="text-sky-400 hover:text-sky-300 font-semibold underline" />,
};

export default function MarkdownRenderer({ children, className = "prose prose-invert prose-sm max-w-none" }) {
  return <ReactMarkdown className={className} components={MARKDOWN_COMPONENTS}>{children}</ReactMarkdown>;
}