import React from 'react';
import TermTooltip from './TermTooltip';
import { wrapGlossaryTerms } from '@utils/glossaryHelper';

/**
 * Renders markdown-like content with automatic glossary term highlighting
 */
export default function ContentRenderer({ content }) {
  if (!content) return null;
  
  const lines = content.trim().split('\n');
  const elements = [];
  let inTable = false;
  let tableRows = [];
  let inCodeBlock = false;
  let codeContent = [];
  let lineIndex = 0;
  
  // Format inline text (bold, code)
  const formatInline = (text) => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '###BOLD_START###$1###BOLD_END###')
      .replace(/`(.+?)`/g, '###CODE_START###$1###CODE_END###');
  };
  
  // Render formatted text with glossary term wrapping
  const renderFormattedText = (text, keyPrefix) => {
    const formatted = formatInline(text);
    const parts = formatted.split(/(###BOLD_START###|###BOLD_END###|###CODE_START###|###CODE_END###)/);
    
    const result = [];
    let inBold = false;
    let inCode = false;
    let partIdx = 0;
    
    parts.forEach((part, i) => {
      if (part === '###BOLD_START###') {
        inBold = true;
      } else if (part === '###BOLD_END###') {
        inBold = false;
      } else if (part === '###CODE_START###') {
        inCode = true;
      } else if (part === '###CODE_END###') {
        inCode = false;
      } else if (part) {
        const content = wrapGlossaryTerms(part, `${keyPrefix}-${partIdx++}`, TermTooltip);
        
        if (inBold) {
          result.push(
            <strong key={`${keyPrefix}-b-${i}`} className="text-white font-semibold">
              {content}
            </strong>
          );
        } else if (inCode) {
          result.push(
            <code key={`${keyPrefix}-c-${i}`} className="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded text-sm font-mono">
              {content}
            </code>
          );
        } else {
          result.push(<React.Fragment key={`${keyPrefix}-t-${i}`}>{content}</React.Fragment>);
        }
      }
    });
    
    return result;
  };
  
  // Process each line
  const processLine = (line, index) => {
    // Code blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${index}`} className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm my-4 font-mono">
            {codeContent.join('\n')}
          </pre>
        );
        codeContent = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }
    
    if (inCodeBlock) {
      codeContent.push(line);
      return;
    }
    
    // Tables
    if (line.includes('|') && line.trim().startsWith('|')) {
      if (!inTable) inTable = true;
      if (!line.includes('---')) {
        tableRows.push(
          line.split('|').filter(cell => cell.trim()).map(cell => cell.trim())
        );
      }
      return;
    } else if (inTable) {
      elements.push(
        <div key={`table-${index}`} className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-800">
                {tableRows[0]?.map((cell, i) => (
                  <th key={i} className="border border-slate-600 px-3 py-2 text-left text-amber-400 font-semibold">
                    {renderFormattedText(cell, `th-${index}-${i}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.slice(1).map((row, ri) => (
                <tr key={ri} className="hover:bg-slate-800/50">
                  {row.map((cell, ci) => (
                    <td key={ci} className="border border-slate-700 px-3 py-2">
                      {renderFormattedText(cell, `td-${index}-${ri}-${ci}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
    
    // Headers
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={index} className="text-2xl font-bold text-white mt-6 mb-4">
          {renderFormattedText(line.slice(2), `h1-${index}`)}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={index} className="text-xl font-semibold text-amber-400 mt-6 mb-3">
          {renderFormattedText(line.slice(3), `h2-${index}`)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={index} className="text-lg font-medium text-slate-200 mt-4 mb-2">
          {renderFormattedText(line.slice(4), `h3-${index}`)}
        </h3>
      );
    }
    // Unordered list items
    else if (line.trim().startsWith('- ')) {
      const text = line.trim().slice(2);
      elements.push(
        <li key={index} className="ml-4 text-slate-300 mb-1 flex items-start">
          <span className="text-amber-500 mr-2">•</span>
          <span>{renderFormattedText(text, `li-${index}`)}</span>
        </li>
      );
    }
    // Ordered list items
    else if (/^\d+\.\s/.test(line.trim())) {
      const text = line.trim().replace(/^\d+\.\s/, '');
      const num = line.trim().match(/^(\d+)\./)?.[1] || '1';
      elements.push(
        <li key={index} className="ml-4 text-slate-300 mb-2 flex items-start">
          <span className="text-amber-500 mr-3 font-mono">{num}.</span>
          <span>{renderFormattedText(text, `ol-${index}`)}</span>
        </li>
      );
    }
    // Horizontal rule
    else if (line.trim() === '---') {
      elements.push(
        <hr key={index} className="my-6 border-slate-700" />
      );
    }
    // Regular paragraph
    else if (line.trim()) {
      elements.push(
        <p key={index} className="text-slate-300 mb-3 leading-relaxed">
          {renderFormattedText(line, `p-${index}`)}
        </p>
      );
    }
  };
  
  lines.forEach((line, idx) => processLine(line, idx));
  
  // Handle any remaining table
  if (inTable && tableRows.length > 0) {
    elements.push(
      <div key="table-final" className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-800">
              {tableRows[0]?.map((cell, i) => (
                <th key={i} className="border border-slate-600 px-3 py-2 text-left text-amber-400 font-semibold">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.slice(1).map((row, ri) => (
              <tr key={ri} className="hover:bg-slate-800/50">
                {row.map((cell, ci) => (
                  <td key={ci} className="border border-slate-700 px-3 py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  return <div className="prose-custom">{elements}</div>;
}
