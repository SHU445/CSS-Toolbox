'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import CodePreview from '@/components/CodePreview';
import { Plus, X, Layers, RotateCcw } from 'lucide-react';

interface Shadow {
  id: string;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

const presetShadows: { name: string; shadows: Omit<Shadow, 'id'>[] }[] = [
  {
    name: 'Subtle',
    shadows: [{ x: 0, y: 2, blur: 8, spread: 0, color: 'rgba(0,0,0,0.1)', inset: false }],
  },
  {
    name: 'Medium',
    shadows: [{ x: 0, y: 4, blur: 20, spread: 0, color: 'rgba(0,0,0,0.15)', inset: false }],
  },
  {
    name: 'Large',
    shadows: [{ x: 0, y: 25, blur: 50, spread: -12, color: 'rgba(0,0,0,0.25)', inset: false }],
  },
  {
    name: 'Glow Blue',
    shadows: [{ x: 0, y: 0, blur: 30, spread: 5, color: 'rgba(59,130,246,0.4)', inset: false }],
  },
  {
    name: 'Layered',
    shadows: [
      { x: 0, y: 2, blur: 4, spread: 0, color: 'rgba(0,0,0,0.1)', inset: false },
      { x: 0, y: 8, blur: 16, spread: 0, color: 'rgba(0,0,0,0.1)', inset: false },
      { x: 0, y: 24, blur: 48, spread: 0, color: 'rgba(0,0,0,0.1)', inset: false },
    ],
  },
  {
    name: 'Neumorphism',
    shadows: [
      { x: 8, y: 8, blur: 16, spread: 0, color: 'rgba(0,0,0,0.25)', inset: false },
      { x: -8, y: -8, blur: 16, spread: 0, color: 'rgba(255,255,255,0.03)', inset: false },
    ],
  },
  {
    name: 'Inset',
    shadows: [{ x: 0, y: 4, blur: 12, spread: 0, color: 'rgba(0,0,0,0.4)', inset: true }],
  },
  {
    name: 'Hard',
    shadows: [{ x: 6, y: 6, blur: 0, spread: 0, color: 'rgba(59,130,246,0.8)', inset: false }],
  },
];

export default function BoxShadowPage() {
  const [shadows, setShadows] = useState<Shadow[]>([
    { id: '1', x: 0, y: 10, blur: 30, spread: -5, color: 'rgba(59,130,246,0.4)', inset: false },
    { id: '2', x: 0, y: 20, blur: 50, spread: -10, color: 'rgba(0,0,0,0.3)', inset: false },
  ]);
  const [boxColor, setBoxColor] = useState('#1a1a25');
  const [borderRadius, setBorderRadius] = useState(16);

  const addShadow = () => {
    const newShadow: Shadow = {
      id: Date.now().toString(),
      x: 0,
      y: 4,
      blur: 16,
      spread: 0,
      color: 'rgba(0,0,0,0.2)',
      inset: false,
    };
    setShadows([...shadows, newShadow]);
  };

  const removeShadow = (id: string) => {
    if (shadows.length > 1) {
      setShadows(shadows.filter((s) => s.id !== id));
    }
  };

  const updateShadow = (id: string, updates: Partial<Shadow>) => {
    setShadows(shadows.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const applyPreset = (preset: { shadows: Omit<Shadow, 'id'>[] }) => {
    setShadows(preset.shadows.map((s, i) => ({ ...s, id: Date.now().toString() + i })));
  };

  const resetAll = () => {
    setShadows([{ id: '1', x: 0, y: 10, blur: 30, spread: -5, color: 'rgba(59,130,246,0.4)', inset: false }]);
    setBoxColor('#1a1a25');
    setBorderRadius(16);
  };

  const getShadowString = () => {
    return shadows
      .map((s) => `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`)
      .join(',\n    ');
  };

  const generateCSS = () => {
    return `.element {
  box-shadow: ${getShadowString()};
  border-radius: ${borderRadius}px;
  background: ${boxColor};
}`;
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
            <h1 className="text-4xl font-bold mb-2">Box Shadow Generator</h1>
            <p className="text-[var(--text-secondary)]">
              Créez des ombres CSS complexes avec plusieurs couches
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
                <button
                  onClick={resetAll}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] transition-colors text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              <div className="min-h-[350px] flex items-center justify-center bg-[var(--bg-secondary)] rounded-2xl p-8">
                <motion.div
                  className="w-48 h-48"
                  style={{
                    background: boxColor,
                    borderRadius: `${borderRadius}px`,
                    boxShadow: shadows
                      .map((s) => `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`)
                      .join(', '),
                  }}
                  animate={{
                    boxShadow: shadows
                      .map((s) => `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`)
                      .join(', '),
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              {/* Quick Settings */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                    Couleur de fond
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={boxColor}
                      onChange={(e) => setBoxColor(e.target.value)}
                      className="w-12 h-10"
                    />
                    <input
                      type="text"
                      value={boxColor}
                      onChange={(e) => setBoxColor(e.target.value)}
                      className="input-dark flex-1 text-sm font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                    Border Radius: {borderRadius}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                    className="w-full mt-2"
                  />
                </div>
              </div>

              {/* Presets */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">Préréglages</h3>
                <div className="grid grid-cols-4 gap-2">
                  {presetShadows.map((preset) => (
                    <motion.button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-blue)] transition-colors text-xs text-center"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {preset.name}
                    </motion.button>
                  ))}
                </div>
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
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Couches d'ombre ({shadows.length})
                </h2>
                <button
                  onClick={addShadow}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[var(--accent-blue)] text-white text-sm font-medium hover:bg-[var(--accent-blue)]/80 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter
                </button>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {shadows.map((shadow, index) => (
                  <motion.div
                    key={shadow.id}
                    className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        Couche {index + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={shadow.inset}
                            onChange={(e) => updateShadow(shadow.id, { inset: e.target.checked })}
                            className="w-4 h-4 rounded accent-[var(--accent-blue)]"
                          />
                          <span className="text-[var(--text-secondary)]">Inset</span>
                        </label>
                        {shadows.length > 1 && (
                          <button
                            onClick={() => removeShadow(shadow.id)}
                            className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs text-[var(--text-muted)] mb-1">
                          X Offset: {shadow.x}px
                        </label>
                        <input
                          type="range"
                          min="-50"
                          max="50"
                          value={shadow.x}
                          onChange={(e) => updateShadow(shadow.id, { x: parseInt(e.target.value) })}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[var(--text-muted)] mb-1">
                          Y Offset: {shadow.y}px
                        </label>
                        <input
                          type="range"
                          min="-50"
                          max="50"
                          value={shadow.y}
                          onChange={(e) => updateShadow(shadow.id, { y: parseInt(e.target.value) })}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[var(--text-muted)] mb-1">
                          Blur: {shadow.blur}px
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={shadow.blur}
                          onChange={(e) => updateShadow(shadow.id, { blur: parseInt(e.target.value) })}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[var(--text-muted)] mb-1">
                          Spread: {shadow.spread}px
                        </label>
                        <input
                          type="range"
                          min="-50"
                          max="50"
                          value={shadow.spread}
                          onChange={(e) => updateShadow(shadow.id, { spread: parseInt(e.target.value) })}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-[var(--text-muted)] mb-1">
                        Couleur
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={shadow.color.startsWith('rgba') ? '#3b82f6' : shadow.color}
                          onChange={(e) => updateShadow(shadow.id, { color: e.target.value })}
                          className="w-10 h-8"
                        />
                        <input
                          type="text"
                          value={shadow.color}
                          onChange={(e) => updateShadow(shadow.id, { color: e.target.value })}
                          className="input-dark flex-1 text-xs font-mono"
                          placeholder="rgba(0,0,0,0.2)"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
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

