import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TermTooltip from './TermTooltip';
import { wrapGlossaryTerms } from '@utils/glossaryHelper';

/**
 * Walk React children tree and wrap glossary terms in text nodes.
 */
function processChildren(children, keyPrefix) {
  let idx = 0;
  return React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      return wrapGlossaryTerms(child, `${keyPrefix}-${idx++}`, TermTooltip);
    }
    if (React.isValidElement(child) && child.props?.children) {
      return React.cloneElement(child, {
        ...child.props,
        children: processChildren(child.props.children, `${keyPrefix}-${idx++}`),
      });
    }
    return child;
  });
}

const components = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold text-white mt-6 mb-4">
      {processChildren(children, 'h1')}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-semibold text-amber-400 mt-6 mb-3">
      {processChildren(children, 'h2')}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-medium text-slate-200 mt-4 mb-2">
      {processChildren(children, 'h3')}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-slate-300 mb-3 leading-relaxed">
      {processChildren(children, 'p')}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = className?.startsWith('language-');
    if (isBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm my-4 font-mono">
      {children}
    </pre>
  ),
  ul: ({ children }) => <ul className="mb-3">{children}</ul>,
  ol: ({ children }) => <ol className="mb-3">{children}</ol>,
  li: ({ children, ordered, index }) => (
    <li className="ml-4 text-slate-300 mb-1 flex items-start">
      <span className="text-amber-500 mr-2 shrink-0">
        {ordered ? `${(index ?? 0) + 1}.` : '\u2022'}
      </span>
      <span>{processChildren(children, 'li')}</span>
    </li>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-slate-800">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="border border-slate-600 px-3 py-2 text-left text-amber-400 font-semibold">
      {processChildren(children, 'th')}
    </th>
  ),
  tr: ({ children, isHeader }) => (
    <tr className={isHeader ? '' : 'hover:bg-slate-800/50'}>{children}</tr>
  ),
  td: ({ children }) => (
    <td className="border border-slate-700 px-3 py-2">
      {processChildren(children, 'td')}
    </td>
  ),
  hr: () => <hr className="my-6 border-slate-700" />,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
      {children}
    </a>
  ),
};

export default function ContentRenderer({ content }) {
  if (!content) return null;
  return (
    <div className="prose-custom">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
