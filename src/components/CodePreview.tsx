'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

interface CodePreviewProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodePreview({ code, language = 'css', title }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting
  const highlightCode = (code: string) => {
    if (language === 'css') {
      return code
        .replace(/([\w-]+)(?=\s*:)/g, '<span class="text-[var(--accent-cyan)]">$1</span>')
        .replace(/(:)(\s*)([^;]+)(;)/g, '$1$2<span class="text-[var(--accent-orange)]">$3</span>$4')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-[var(--text-muted)]">$1</span>')
        .replace(/(\{|\})/g, '<span class="text-[var(--accent-purple)]">$1</span>');
    }
    return code;
  };

  return (
    <div className="code-block overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-tertiary)]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          {title && <span className="text-xs text-[var(--text-muted)]">{title}</span>}
        </div>
        <motion.button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-xs text-green-500">Copié!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="text-xs">Copier</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Code content */}
      <pre className="p-4 overflow-x-auto">
        <code 
          className="text-[var(--text-primary)]"
          dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
        />
      </pre>
    </div>
  );
}

