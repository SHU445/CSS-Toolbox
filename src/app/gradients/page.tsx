'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import CodePreview from '@/components/CodePreview';
import { Plus, X, RotateCcw, Shuffle } from 'lucide-react';

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

type GradientType = 'linear' | 'radial' | 'conic';

const presetGradients = [
  { name: 'Sunset', colors: ['#FF6B6B', '#FEC89A'] },
  { name: 'Ocean', colors: ['#667eea', '#764ba2'] },
  { name: 'Forest', colors: ['#11998e', '#38ef7d'] },
  { name: 'Fire', colors: ['#f12711', '#f5af19'] },
  { name: 'Purple Dream', colors: ['#8E2DE2', '#4A00E0'] },
  { name: 'Midnight', colors: ['#232526', '#414345'] },
  { name: 'Aurora', colors: ['#00C9FF', '#92FE9D'] },
  { name: 'Warm', colors: ['#F953C6', '#B91D73'] },
];

export default function GradientsPage() {
  const [gradientType, setGradientType] = useState<GradientType>('linear');
  const [angle, setAngle] = useState(135);
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: '1', color: '#3b82f6', position: 0 },
    { id: '2', color: '#8b5cf6', position: 50 },
    { id: '3', color: '#ec4899', position: 100 },
  ]);

  const addColorStop = () => {
    const newId = Date.now().toString();
    setColorStops([...colorStops, { id: newId, color: '#ffffff', position: 50 }]);
  };

  const removeColorStop = (id: string) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter((stop) => stop.id !== id));
    }
  };

  const updateColorStop = (id: string, updates: Partial<ColorStop>) => {
    setColorStops(colorStops.map((stop) => 
      stop.id === id ? { ...stop, ...updates } : stop
    ));
  };

  const applyPreset = (preset: { colors: string[] }) => {
    const newStops = preset.colors.map((color, i) => ({
      id: Date.now().toString() + i,
      color,
      position: (i / (preset.colors.length - 1)) * 100,
    }));
    setColorStops(newStops);
  };

  const randomGradient = () => {
    const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setColorStops([
      { id: '1', color: randomColor(), position: 0 },
      { id: '2', color: randomColor(), position: 100 },
    ]);
    setAngle(Math.floor(Math.random() * 360));
  };

  const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
  
  const getGradientString = () => {
    const stops = sortedStops.map((s) => `${s.color} ${s.position}%`).join(', ');
    switch (gradientType) {
      case 'linear':
        return `linear-gradient(${angle}deg, ${stops})`;
      case 'radial':
        return `radial-gradient(circle, ${stops})`;
      case 'conic':
        return `conic-gradient(from ${angle}deg, ${stops})`;
    }
  };

  const generateCSS = () => {
    return `.element {
  background: ${getGradientString()};
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
            <h1 className="text-4xl font-bold mb-2">Gradient Generator</h1>
            <p className="text-[var(--text-secondary)]">
              Créez des dégradés CSS personnalisés avec contrôle total
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
                  onClick={randomGradient}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <Shuffle className="w-4 h-4" />
                  Aléatoire
                </button>
              </div>

              <div 
                className="h-[350px] rounded-2xl transition-all duration-300"
                style={{ background: getGradientString() }}
              />

              {/* Presets */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">Préréglages</h3>
                <div className="grid grid-cols-4 gap-2">
                  {presetGradients.map((preset) => (
                    <motion.button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className="aspect-video rounded-lg cursor-pointer hover:scale-105 transition-transform"
                      style={{
                        background: `linear-gradient(135deg, ${preset.colors.join(', ')})`,
                      }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      title={preset.name}
                    />
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
              <h2 className="text-xl font-semibold mb-6">Paramètres</h2>

              {/* Gradient Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3 text-[var(--text-secondary)]">
                  Type de dégradé
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['linear', 'radial', 'conic'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setGradientType(type)}
                      className={`px-4 py-3 rounded-lg font-medium capitalize transition-all ${
                        gradientType === type
                          ? 'bg-[var(--accent-blue)] text-white'
                          : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Angle Control */}
              {(gradientType === 'linear' || gradientType === 'conic') && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3 text-[var(--text-secondary)]">
                    Angle: {angle}°
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={angle}
                      onChange={(e) => setAngle(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <div 
                      className="w-12 h-12 rounded-full border-2 border-[var(--border-color)] relative"
                      style={{ background: getGradientString() }}
                    >
                      <div 
                        className="absolute top-1/2 left-1/2 w-1 h-5 bg-white rounded-full origin-bottom"
                        style={{ 
                          transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Color Stops */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-[var(--text-secondary)]">
                    Points de couleur
                  </label>
                  <button
                    onClick={addColorStop}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/20 transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                </div>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {colorStops.map((stop, index) => (
                    <motion.div
                      key={stop.id}
                      className="flex items-center gap-3 p-3 bg-[var(--bg-secondary)] rounded-xl"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                    >
                      <input
                        type="color"
                        value={stop.color}
                        onChange={(e) => updateColorStop(stop.id, { color: e.target.value })}
                        className="w-12 h-10"
                      />
                      <input
                        type="text"
                        value={stop.color}
                        onChange={(e) => updateColorStop(stop.id, { color: e.target.value })}
                        className="input-dark flex-1 text-sm font-mono"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={stop.position}
                          onChange={(e) => updateColorStop(stop.id, { position: parseInt(e.target.value) })}
                          className="w-20"
                        />
                        <span className="w-12 text-xs text-[var(--text-muted)]">
                          {stop.position}%
                        </span>
                      </div>
                      {colorStops.length > 2 && (
                        <button
                          onClick={() => removeColorStop(stop.id)}
                          className="p-2 rounded-lg hover:bg-red-500/20 text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Gradient Bar Preview */}
              <div className="mb-4">
                <div 
                  className="h-8 rounded-lg"
                  style={{ background: `linear-gradient(90deg, ${sortedStops.map((s) => `${s.color} ${s.position}%`).join(', ')})` }}
                />
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

