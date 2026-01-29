'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import CodePreview from '@/components/CodePreview';
import { Plus, Minus, RotateCcw } from 'lucide-react';

type DisplayMode = 'flex' | 'grid';

interface FlexSettings {
  display: 'flex';
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap: number;
}

interface GridSettings {
  display: 'grid';
  columns: number;
  rows: number;
  gap: number;
  columnGap: number;
  rowGap: number;
  justifyItems: 'start' | 'end' | 'center' | 'stretch';
  alignItems: 'start' | 'end' | 'center' | 'stretch';
}

export default function FlexboxGridPage() {
  const [mode, setMode] = useState<DisplayMode>('flex');
  const [itemCount, setItemCount] = useState(4);
  
  const [flexSettings, setFlexSettings] = useState<FlexSettings>({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    gap: 16,
  });

  const [gridSettings, setGridSettings] = useState<GridSettings>({
    display: 'grid',
    columns: 3,
    rows: 2,
    gap: 16,
    columnGap: 16,
    rowGap: 16,
    justifyItems: 'stretch',
    alignItems: 'stretch',
  });

  const resetSettings = () => {
    if (mode === 'flex') {
      setFlexSettings({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexWrap: 'nowrap',
        gap: 16,
      });
    } else {
      setGridSettings({
        display: 'grid',
        columns: 3,
        rows: 2,
        gap: 16,
        columnGap: 16,
        rowGap: 16,
        justifyItems: 'stretch',
        alignItems: 'stretch',
      });
    }
    setItemCount(4);
  };

  const containerStyle = mode === 'flex' 
    ? {
        display: 'flex',
        flexDirection: flexSettings.flexDirection,
        justifyContent: flexSettings.justifyContent,
        alignItems: flexSettings.alignItems,
        flexWrap: flexSettings.flexWrap,
        gap: `${flexSettings.gap}px`,
      } as React.CSSProperties
    : {
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSettings.columns}, 1fr)`,
        gridTemplateRows: `repeat(${gridSettings.rows}, 1fr)`,
        gap: `${gridSettings.gap}px`,
        justifyItems: gridSettings.justifyItems,
        alignItems: gridSettings.alignItems,
      } as React.CSSProperties;

  const generateCSS = () => {
    if (mode === 'flex') {
      return `.container {
  display: flex;
  flex-direction: ${flexSettings.flexDirection};
  justify-content: ${flexSettings.justifyContent};
  align-items: ${flexSettings.alignItems};
  flex-wrap: ${flexSettings.flexWrap};
  gap: ${flexSettings.gap}px;
}`;
    } else {
      return `.container {
  display: grid;
  grid-template-columns: repeat(${gridSettings.columns}, 1fr);
  grid-template-rows: repeat(${gridSettings.rows}, 1fr);
  gap: ${gridSettings.gap}px;
  justify-items: ${gridSettings.justifyItems};
  align-items: ${gridSettings.alignItems};
}`;
    }
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
            <h1 className="text-4xl font-bold mb-2">Flexbox & Grid Generator</h1>
            <p className="text-[var(--text-secondary)]">
              Créez visuellement vos layouts Flexbox et CSS Grid
            </p>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Preview Panel */}
            <motion.div 
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Aperçu</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setItemCount(Math.max(1, itemCount - 1))}
                    className="p-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] text-sm">
                    {itemCount} items
                  </span>
                  <button
                    onClick={() => setItemCount(Math.min(12, itemCount + 1))}
                    className="p-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div 
                className="min-h-[400px] bg-[var(--bg-secondary)] rounded-xl p-4 border border-dashed border-[var(--border-color)]"
                style={containerStyle}
              >
                {Array.from({ length: itemCount }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="min-w-[80px] min-h-[80px] rounded-lg bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {i + 1}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Controls Panel */}
            <motion.div 
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Paramètres</h2>
                <button
                  onClick={resetSettings}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] transition-colors text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              {/* Mode Toggle */}
              <div className="flex gap-2 mb-6 p-1 bg-[var(--bg-secondary)] rounded-xl">
                <button
                  onClick={() => setMode('flex')}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                    mode === 'flex' 
                      ? 'bg-[var(--accent-blue)] text-white' 
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Flexbox
                </button>
                <button
                  onClick={() => setMode('grid')}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                    mode === 'grid' 
                      ? 'bg-[var(--accent-blue)] text-white' 
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Grid
                </button>
              </div>

              {/* Flexbox Controls */}
              {mode === 'flex' && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      flex-direction
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['row', 'row-reverse', 'column', 'column-reverse'] as const).map((dir) => (
                        <button
                          key={dir}
                          onClick={() => setFlexSettings({ ...flexSettings, flexDirection: dir })}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            flexSettings.flexDirection === dir
                              ? 'bg-[var(--accent-blue)] text-white'
                              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                          }`}
                        >
                          {dir}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      justify-content
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] as const).map((jc) => (
                        <button
                          key={jc}
                          onClick={() => setFlexSettings({ ...flexSettings, justifyContent: jc })}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            flexSettings.justifyContent === jc
                              ? 'bg-[var(--accent-blue)] text-white'
                              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                          }`}
                        >
                          {jc.replace('flex-', '')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      align-items
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['flex-start', 'center', 'flex-end', 'stretch', 'baseline'] as const).map((ai) => (
                        <button
                          key={ai}
                          onClick={() => setFlexSettings({ ...flexSettings, alignItems: ai })}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            flexSettings.alignItems === ai
                              ? 'bg-[var(--accent-blue)] text-white'
                              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                          }`}
                        >
                          {ai.replace('flex-', '')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      flex-wrap
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['nowrap', 'wrap', 'wrap-reverse'] as const).map((fw) => (
                        <button
                          key={fw}
                          onClick={() => setFlexSettings({ ...flexSettings, flexWrap: fw })}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            flexSettings.flexWrap === fw
                              ? 'bg-[var(--accent-blue)] text-white'
                              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                          }`}
                        >
                          {fw}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      gap: {flexSettings.gap}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="48"
                      value={flexSettings.gap}
                      onChange={(e) => setFlexSettings({ ...flexSettings, gap: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {/* Grid Controls */}
              {mode === 'grid' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                        Colonnes: {gridSettings.columns}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="6"
                        value={gridSettings.columns}
                        onChange={(e) => setGridSettings({ ...gridSettings, columns: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                        Lignes: {gridSettings.rows}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="6"
                        value={gridSettings.rows}
                        onChange={(e) => setGridSettings({ ...gridSettings, rows: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      gap: {gridSettings.gap}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="48"
                      value={gridSettings.gap}
                      onChange={(e) => setGridSettings({ ...gridSettings, gap: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      justify-items
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['start', 'center', 'end', 'stretch'] as const).map((ji) => (
                        <button
                          key={ji}
                          onClick={() => setGridSettings({ ...gridSettings, justifyItems: ji })}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            gridSettings.justifyItems === ji
                              ? 'bg-[var(--accent-blue)] text-white'
                              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                          }`}
                        >
                          {ji}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      align-items
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['start', 'center', 'end', 'stretch'] as const).map((ai) => (
                        <button
                          key={ai}
                          onClick={() => setGridSettings({ ...gridSettings, alignItems: ai })}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            gridSettings.alignItems === ai
                              ? 'bg-[var(--accent-blue)] text-white'
                              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                          }`}
                        >
                          {ai}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Code Output */}
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CodePreview code={generateCSS()} title="styles.css" />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

