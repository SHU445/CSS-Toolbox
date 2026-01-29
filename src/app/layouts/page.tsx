'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import CodePreview from '@/components/CodePreview';
import { Check, Copy } from 'lucide-react';

interface LayoutTemplate {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
  html: string;
  css: string;
}

const layoutTemplates: LayoutTemplate[] = [
  {
    id: 'holy-grail',
    name: 'Holy Grail',
    description: 'Layout classique avec header, footer, sidebar et contenu principal',
    preview: (
      <div className="w-full h-full grid grid-rows-[auto_1fr_auto] gap-1 text-xs">
        <div className="bg-[var(--accent-blue)]/30 rounded p-2 text-center">Header</div>
        <div className="grid grid-cols-[1fr_3fr_1fr] gap-1">
          <div className="bg-[var(--accent-purple)]/30 rounded p-2 text-center">Nav</div>
          <div className="bg-[var(--accent-emerald)]/30 rounded p-2 text-center">Main</div>
          <div className="bg-[var(--accent-purple)]/30 rounded p-2 text-center">Aside</div>
        </div>
        <div className="bg-[var(--accent-blue)]/30 rounded p-2 text-center">Footer</div>
      </div>
    ),
    html: `<div class="holy-grail">
  <header>Header</header>
  <nav>Navigation</nav>
  <main>Main Content</main>
  <aside>Sidebar</aside>
  <footer>Footer</footer>
</div>`,
    css: `.holy-grail {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 16px;
}

header { grid-area: header; }
nav { grid-area: nav; }
main { grid-area: main; }
aside { grid-area: aside; }
footer { grid-area: footer; }`,
  },
  {
    id: 'sidebar-layout',
    name: 'Sidebar Fixed',
    description: 'Sidebar fixe avec contenu défilant',
    preview: (
      <div className="w-full h-full flex gap-1 text-xs">
        <div className="w-1/4 bg-[var(--accent-purple)]/30 rounded p-2 text-center">Sidebar</div>
        <div className="flex-1 bg-[var(--accent-emerald)]/30 rounded p-2 text-center">Content</div>
      </div>
    ),
    html: `<div class="sidebar-layout">
  <aside class="sidebar">Sidebar</aside>
  <main class="content">Main Content</main>
</div>`,
    css: `.sidebar-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 280px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
  background: #1a1a25;
  border-right: 1px solid #2a2a3a;
}

.content {
  flex: 1;
  margin-left: 280px;
  padding: 24px;
}`,
  },
  {
    id: 'card-grid',
    name: 'Card Grid',
    description: 'Grille de cartes responsive avec auto-fit',
    preview: (
      <div className="w-full h-full grid grid-cols-3 gap-1 text-xs">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-[var(--accent-blue)]/30 rounded p-2 text-center aspect-square flex items-center justify-center">
            {i}
          </div>
        ))}
      </div>
    ),
    html: `<div class="card-grid">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
</div>`,
    css: `.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  padding: 24px;
}

.card {
  background: #16161f;
  border: 1px solid #2a2a3a;
  border-radius: 16px;
  padding: 24px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}`,
  },
  {
    id: 'masonry',
    name: 'Masonry',
    description: 'Layout en colonnes style Pinterest',
    preview: (
      <div className="w-full h-full grid grid-cols-3 gap-1 text-xs">
        <div className="space-y-1">
          <div className="bg-[var(--accent-blue)]/30 rounded p-2 h-12"></div>
          <div className="bg-[var(--accent-purple)]/30 rounded p-2 h-8"></div>
        </div>
        <div className="space-y-1">
          <div className="bg-[var(--accent-emerald)]/30 rounded p-2 h-8"></div>
          <div className="bg-[var(--accent-orange)]/30 rounded p-2 h-12"></div>
        </div>
        <div className="space-y-1">
          <div className="bg-[var(--accent-pink)]/30 rounded p-2 h-10"></div>
          <div className="bg-[var(--accent-cyan)]/30 rounded p-2 h-10"></div>
        </div>
      </div>
    ),
    html: `<div class="masonry">
  <div class="masonry-item">Item 1</div>
  <div class="masonry-item">Item 2</div>
  <div class="masonry-item">Item 3</div>
</div>`,
    css: `.masonry {
  columns: 3;
  column-gap: 24px;
  padding: 24px;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 24px;
  background: #16161f;
  border-radius: 16px;
  padding: 24px;
}

/* Alternative avec CSS Grid */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 10px;
  gap: 16px;
}

.masonry-grid-item {
  /* Ajuster grid-row-end dynamiquement avec JS */
}`,
  },
  {
    id: 'split-screen',
    name: 'Split Screen',
    description: 'Écran divisé en deux colonnes égales',
    preview: (
      <div className="w-full h-full flex gap-1 text-xs">
        <div className="flex-1 bg-[var(--accent-blue)]/30 rounded p-2 text-center flex items-center justify-center">Left</div>
        <div className="flex-1 bg-[var(--accent-purple)]/30 rounded p-2 text-center flex items-center justify-center">Right</div>
      </div>
    ),
    html: `<div class="split-screen">
  <div class="split-left">
    <h1>Left Content</h1>
  </div>
  <div class="split-right">
    <h1>Right Content</h1>
  </div>
</div>`,
    css: `.split-screen {
  display: flex;
  min-height: 100vh;
}

.split-left,
.split-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
}

.split-left {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
}

.split-right {
  background: #0a0a0f;
}`,
  },
  {
    id: 'centered',
    name: 'Centered Content',
    description: 'Contenu parfaitement centré verticalement et horizontalement',
    preview: (
      <div className="w-full h-full flex items-center justify-center text-xs">
        <div className="bg-[var(--accent-blue)]/30 rounded p-4 text-center">Centered</div>
      </div>
    ),
    html: `<div class="centered-container">
  <div class="centered-content">
    <h1>Perfectly Centered</h1>
    <p>This content is centered both ways.</p>
  </div>
</div>`,
    css: `.centered-container {
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 24px;
}

.centered-content {
  max-width: 600px;
  text-align: center;
}

/* Alternative avec Flexbox */
.centered-flex {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}`,
  },
  {
    id: 'sticky-footer',
    name: 'Sticky Footer',
    description: 'Footer toujours en bas de la page',
    preview: (
      <div className="w-full h-full flex flex-col gap-1 text-xs">
        <div className="bg-[var(--accent-blue)]/30 rounded p-2 text-center">Header</div>
        <div className="flex-1 bg-[var(--accent-emerald)]/30 rounded p-2 text-center">Content</div>
        <div className="bg-[var(--accent-purple)]/30 rounded p-2 text-center">Footer</div>
      </div>
    ),
    html: `<div class="sticky-footer-container">
  <header>Header</header>
  <main>Main Content</main>
  <footer>Footer</footer>
</div>`,
    css: `.sticky-footer-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  padding: 24px;
}

footer {
  padding: 24px;
  background: #12121a;
  border-top: 1px solid #2a2a3a;
}`,
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Layout tableau de bord avec header et sidebar',
    preview: (
      <div className="w-full h-full grid grid-rows-[auto_1fr] gap-1 text-xs">
        <div className="bg-[var(--accent-blue)]/30 rounded p-2 text-center">Header</div>
        <div className="grid grid-cols-[1fr_4fr] gap-1">
          <div className="bg-[var(--accent-purple)]/30 rounded p-2 text-center">Sidebar</div>
          <div className="bg-[var(--accent-emerald)]/30 rounded p-2 text-center">Dashboard</div>
        </div>
      </div>
    ),
    html: `<div class="dashboard">
  <header class="dashboard-header">Header</header>
  <aside class="dashboard-sidebar">Sidebar</aside>
  <main class="dashboard-main">
    <div class="dashboard-grid">
      <div class="widget">Widget 1</div>
      <div class="widget">Widget 2</div>
      <div class="widget">Widget 3</div>
    </div>
  </main>
</div>`,
    css: `.dashboard {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-columns: 280px 1fr;
  grid-template-rows: 64px 1fr;
  min-height: 100vh;
}

.dashboard-header {
  grid-area: header;
  background: #12121a;
  border-bottom: 1px solid #2a2a3a;
  display: flex;
  align-items: center;
  padding: 0 24px;
}

.dashboard-sidebar {
  grid-area: sidebar;
  background: #12121a;
  border-right: 1px solid #2a2a3a;
  padding: 24px;
}

.dashboard-main {
  grid-area: main;
  padding: 24px;
  overflow-y: auto;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}`,
  },
];

export default function LayoutsPage() {
  const [selectedLayout, setSelectedLayout] = useState<LayoutTemplate>(layoutTemplates[0]);
  const [copiedType, setCopiedType] = useState<'html' | 'css' | null>(null);

  const handleCopy = async (text: string, type: 'html' | 'css') => {
    await navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      
      <main className="flex-1 ml-72 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold mb-2">Layout Templates</h1>
            <p className="text-[var(--text-secondary)]">
              Templates de layouts CSS prêts à l'emploi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Layout Selection */}
            <motion.div 
              className="xl:col-span-1 glass rounded-2xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold mb-6">Choisir un layout</h2>
              
              <div className="space-y-3">
                {layoutTemplates.map((layout) => (
                  <motion.button
                    key={layout.id}
                    onClick={() => setSelectedLayout(layout)}
                    className={`w-full p-4 rounded-xl border transition-all text-left ${
                      selectedLayout.id === layout.id
                        ? 'bg-[var(--accent-blue)]/10 border-[var(--accent-blue)]'
                        : 'bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-[var(--accent-blue)]/50'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <div className="h-24 mb-3 bg-[var(--bg-tertiary)] rounded-lg p-2">
                      {layout.preview}
                    </div>
                    <h3 className="font-medium text-[var(--text-primary)]">{layout.name}</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1">{layout.description}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Preview and Code */}
            <motion.div 
              className="xl:col-span-2 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Large Preview */}
              <div className="glass rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">{selectedLayout.name}</h2>
                <p className="text-[var(--text-secondary)] mb-6">{selectedLayout.description}</p>
                
                <div className="h-64 bg-[var(--bg-secondary)] rounded-xl p-4">
                  {selectedLayout.preview}
                </div>
              </div>

              {/* Code Blocks */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* HTML */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">HTML</h3>
                    <motion.button
                      onClick={() => handleCopy(selectedLayout.html, 'html')}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {copiedType === 'html' ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-green-500">Copié!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copier</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                  <pre className="bg-[var(--bg-secondary)] rounded-xl p-4 overflow-x-auto text-sm">
                    <code className="text-[var(--text-primary)]">{selectedLayout.html}</code>
                  </pre>
                </div>

                {/* CSS */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">CSS</h3>
                    <motion.button
                      onClick={() => handleCopy(selectedLayout.css, 'css')}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {copiedType === 'css' ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-green-500">Copié!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copier</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                  <pre className="bg-[var(--bg-secondary)] rounded-xl p-4 overflow-x-auto text-sm max-h-[400px]">
                    <code className="text-[var(--text-primary)]">{selectedLayout.css}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

