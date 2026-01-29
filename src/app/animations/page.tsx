'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import CodePreview from '@/components/CodePreview';
import { Plus, X, Play, Pause, RotateCcw } from 'lucide-react';

interface Keyframe {
  id: string;
  percentage: number;
  transform: string;
  opacity: number;
  scale: number;
  rotate: number;
  translateX: number;
  translateY: number;
}

interface AnimationSettings {
  name: string;
  duration: number;
  timingFunction: string;
  delay: number;
  iterationCount: string;
  direction: string;
  fillMode: string;
}

const presetAnimations = [
  {
    name: 'Bounce',
    keyframes: [
      { percentage: 0, translateY: 0, scale: 1, opacity: 1, rotate: 0, translateX: 0 },
      { percentage: 50, translateY: -30, scale: 1.1, opacity: 1, rotate: 0, translateX: 0 },
      { percentage: 100, translateY: 0, scale: 1, opacity: 1, rotate: 0, translateX: 0 },
    ],
  },
  {
    name: 'Fade In',
    keyframes: [
      { percentage: 0, translateY: 20, scale: 1, opacity: 0, rotate: 0, translateX: 0 },
      { percentage: 100, translateY: 0, scale: 1, opacity: 1, rotate: 0, translateX: 0 },
    ],
  },
  {
    name: 'Pulse',
    keyframes: [
      { percentage: 0, translateY: 0, scale: 1, opacity: 1, rotate: 0, translateX: 0 },
      { percentage: 50, translateY: 0, scale: 1.15, opacity: 1, rotate: 0, translateX: 0 },
      { percentage: 100, translateY: 0, scale: 1, opacity: 1, rotate: 0, translateX: 0 },
    ],
  },
  {
    name: 'Shake',
    keyframes: [
      { percentage: 0, translateY: 0, scale: 1, opacity: 1, rotate: 0, translateX: 0 },
      { percentage: 25, translateY: 0, scale: 1, opacity: 1, rotate: 0, translateX: -10 },
      { percentage: 50, translateY: 0, scale: 1, opacity: 1, rotate: 0, translateX: 10 },
      { percentage: 75, translateY: 0, scale: 1, opacity: 1, rotate: 0, translateX: -10 },
      { percentage: 100, translateY: 0, scale: 1, opacity: 1, rotate: 0, translateX: 0 },
    ],
  },
  {
    name: 'Rotate',
    keyframes: [
      { percentage: 0, translateY: 0, scale: 1, opacity: 1, rotate: 0, translateX: 0 },
      { percentage: 100, translateY: 0, scale: 1, opacity: 1, rotate: 360, translateX: 0 },
    ],
  },
  {
    name: 'Slide In',
    keyframes: [
      { percentage: 0, translateY: 0, scale: 1, opacity: 0, rotate: 0, translateX: -100 },
      { percentage: 100, translateY: 0, scale: 1, opacity: 1, rotate: 0, translateX: 0 },
    ],
  },
];

const timingFunctions = [
  'linear',
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
  'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
];

export default function AnimationsPage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);
  
  const [settings, setSettings] = useState<AnimationSettings>({
    name: 'myAnimation',
    duration: 1,
    timingFunction: 'ease-in-out',
    delay: 0,
    iterationCount: 'infinite',
    direction: 'normal',
    fillMode: 'forwards',
  });

  const [keyframes, setKeyframes] = useState<Keyframe[]>([
    { id: '1', percentage: 0, transform: '', opacity: 1, scale: 1, rotate: 0, translateX: 0, translateY: 0 },
    { id: '2', percentage: 50, transform: '', opacity: 1, scale: 1.2, rotate: 0, translateX: 0, translateY: -20 },
    { id: '3', percentage: 100, transform: '', opacity: 1, scale: 1, rotate: 0, translateX: 0, translateY: 0 },
  ]);

  const addKeyframe = () => {
    const lastKeyframe = keyframes[keyframes.length - 1];
    const newKeyframe: Keyframe = {
      id: Date.now().toString(),
      percentage: Math.min(lastKeyframe.percentage + 25, 100),
      transform: '',
      opacity: 1,
      scale: 1,
      rotate: 0,
      translateX: 0,
      translateY: 0,
    };
    setKeyframes([...keyframes, newKeyframe].sort((a, b) => a.percentage - b.percentage));
  };

  const removeKeyframe = (id: string) => {
    if (keyframes.length > 2) {
      setKeyframes(keyframes.filter((k) => k.id !== id));
    }
  };

  const updateKeyframe = (id: string, updates: Partial<Keyframe>) => {
    setKeyframes(
      keyframes
        .map((k) => (k.id === id ? { ...k, ...updates } : k))
        .sort((a, b) => a.percentage - b.percentage)
    );
  };

  const applyPreset = (preset: typeof presetAnimations[0]) => {
    const newKeyframes = preset.keyframes.map((kf, i) => ({
      id: Date.now().toString() + i,
      percentage: kf.percentage,
      transform: '',
      opacity: kf.opacity,
      scale: kf.scale,
      rotate: kf.rotate,
      translateX: kf.translateX,
      translateY: kf.translateY,
    }));
    setKeyframes(newKeyframes);
    setSettings({ ...settings, name: preset.name.toLowerCase().replace(' ', '-') });
    restartAnimation();
  };

  const restartAnimation = () => {
    setAnimationKey((prev) => prev + 1);
  };

  const resetAll = () => {
    setKeyframes([
      { id: '1', percentage: 0, transform: '', opacity: 1, scale: 1, rotate: 0, translateX: 0, translateY: 0 },
      { id: '2', percentage: 100, transform: '', opacity: 1, scale: 1, rotate: 0, translateX: 0, translateY: 0 },
    ]);
    setSettings({
      name: 'myAnimation',
      duration: 1,
      timingFunction: 'ease-in-out',
      delay: 0,
      iterationCount: 'infinite',
      direction: 'normal',
      fillMode: 'forwards',
    });
    restartAnimation();
  };

  const generateKeyframesCSS = () => {
    const kfStrings = keyframes.map((kf) => {
      const transforms = [];
      if (kf.translateX !== 0) transforms.push(`translateX(${kf.translateX}px)`);
      if (kf.translateY !== 0) transforms.push(`translateY(${kf.translateY}px)`);
      if (kf.scale !== 1) transforms.push(`scale(${kf.scale})`);
      if (kf.rotate !== 0) transforms.push(`rotate(${kf.rotate}deg)`);
      
      const transformStr = transforms.length > 0 ? `transform: ${transforms.join(' ')};` : '';
      const opacityStr = kf.opacity !== 1 ? `opacity: ${kf.opacity};` : '';
      
      return `  ${kf.percentage}% {
    ${[transformStr, opacityStr].filter(Boolean).join('\n    ') || '/* no changes */'}
  }`;
    });

    return `@keyframes ${settings.name} {
${kfStrings.join('\n')}
}

.animated-element {
  animation-name: ${settings.name};
  animation-duration: ${settings.duration}s;
  animation-timing-function: ${settings.timingFunction};
  animation-delay: ${settings.delay}s;
  animation-iteration-count: ${settings.iterationCount};
  animation-direction: ${settings.direction};
  animation-fill-mode: ${settings.fillMode};
}`;
  };

  // Generate inline style for preview
  const generatePreviewStyle = (): React.CSSProperties => {
    const keyframeSteps = keyframes.map((kf) => {
      const transforms = [];
      if (kf.translateX !== 0) transforms.push(`translateX(${kf.translateX}px)`);
      if (kf.translateY !== 0) transforms.push(`translateY(${kf.translateY}px)`);
      if (kf.scale !== 1) transforms.push(`scale(${kf.scale})`);
      if (kf.rotate !== 0) transforms.push(`rotate(${kf.rotate}deg)`);
      return {
        offset: kf.percentage / 100,
        transform: transforms.join(' ') || 'none',
        opacity: kf.opacity,
      };
    });

    return {
      animation: isPlaying
        ? `preview-animation ${settings.duration}s ${settings.timingFunction} ${settings.delay}s ${settings.iterationCount} ${settings.direction} ${settings.fillMode}`
        : 'none',
    };
  };

  // Inject keyframes dynamically
  useEffect(() => {
    const styleId = 'dynamic-keyframes';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    const keyframeSteps = keyframes.map((kf) => {
      const transforms = [];
      if (kf.translateX !== 0) transforms.push(`translateX(${kf.translateX}px)`);
      if (kf.translateY !== 0) transforms.push(`translateY(${kf.translateY}px)`);
      if (kf.scale !== 1) transforms.push(`scale(${kf.scale})`);
      if (kf.rotate !== 0) transforms.push(`rotate(${kf.rotate}deg)`);
      
      return `${kf.percentage}% { 
        transform: ${transforms.join(' ') || 'none'}; 
        opacity: ${kf.opacity}; 
      }`;
    });

    styleEl.textContent = `
      @keyframes preview-animation {
        ${keyframeSteps.join('\n')}
      }
    `;
  }, [keyframes, animationKey]);

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
            <h1 className="text-4xl font-bold mb-2">Animation Generator</h1>
            <p className="text-[var(--text-secondary)]">
              Créez des animations CSS keyframes de manière visuelle
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
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isPlaying 
                        ? 'bg-[var(--accent-blue)] text-white' 
                        : 'bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)]'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                  <button
                    onClick={restartAnimation}
                    className="p-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="min-h-[300px] flex items-center justify-center bg-[var(--bg-secondary)] rounded-2xl">
                <div
                  key={animationKey}
                  className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)]"
                  style={generatePreviewStyle()}
                />
              </div>

              {/* Presets */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">Préréglages</h3>
                <div className="grid grid-cols-3 gap-2">
                  {presetAnimations.map((preset) => (
                    <motion.button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent-blue)] transition-colors text-sm"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {preset.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Animation Settings */}
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      value={settings.name}
                      onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                      className="input-dark w-full text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Durée: {settings.duration}s
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="5"
                      step="0.1"
                      value={settings.duration}
                      onChange={(e) => {
                        setSettings({ ...settings, duration: parseFloat(e.target.value) });
                        restartAnimation();
                      }}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Timing Function
                    </label>
                    <select
                      value={settings.timingFunction}
                      onChange={(e) => {
                        setSettings({ ...settings, timingFunction: e.target.value });
                        restartAnimation();
                      }}
                      className="input-dark w-full text-sm"
                    >
                      {timingFunctions.map((tf) => (
                        <option key={tf} value={tf}>{tf}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Itérations
                    </label>
                    <select
                      value={settings.iterationCount}
                      onChange={(e) => {
                        setSettings({ ...settings, iterationCount: e.target.value });
                        restartAnimation();
                      }}
                      className="input-dark w-full text-sm"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="infinite">Infinite</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Direction
                    </label>
                    <select
                      value={settings.direction}
                      onChange={(e) => {
                        setSettings({ ...settings, direction: e.target.value });
                        restartAnimation();
                      }}
                      className="input-dark w-full text-sm"
                    >
                      <option value="normal">Normal</option>
                      <option value="reverse">Reverse</option>
                      <option value="alternate">Alternate</option>
                      <option value="alternate-reverse">Alternate Reverse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Fill Mode
                    </label>
                    <select
                      value={settings.fillMode}
                      onChange={(e) => {
                        setSettings({ ...settings, fillMode: e.target.value });
                        restartAnimation();
                      }}
                      className="input-dark w-full text-sm"
                    >
                      <option value="none">None</option>
                      <option value="forwards">Forwards</option>
                      <option value="backwards">Backwards</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Keyframes Panel */}
            <motion.div 
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Keyframes</h2>
                <div className="flex gap-2">
                  <button
                    onClick={resetAll}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] transition-colors text-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                  <button
                    onClick={addKeyframe}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[var(--accent-blue)] text-white text-sm font-medium hover:bg-[var(--accent-blue)]/80 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                </div>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {keyframes.map((kf) => (
                  <motion.div
                    key={kf.id}
                    className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-[var(--accent-blue)]">
                          {kf.percentage}%
                        </span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={kf.percentage}
                          onChange={(e) => updateKeyframe(kf.id, { percentage: parseInt(e.target.value) })}
                          className="w-24"
                        />
                      </div>
                      {keyframes.length > 2 && (
                        <button
                          onClick={() => removeKeyframe(kf.id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-[var(--text-muted)] mb-1">
                          Translate X: {kf.translateX}px
                        </label>
                        <input
                          type="range"
                          min="-100"
                          max="100"
                          value={kf.translateX}
                          onChange={(e) => {
                            updateKeyframe(kf.id, { translateX: parseInt(e.target.value) });
                            restartAnimation();
                          }}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[var(--text-muted)] mb-1">
                          Translate Y: {kf.translateY}px
                        </label>
                        <input
                          type="range"
                          min="-100"
                          max="100"
                          value={kf.translateY}
                          onChange={(e) => {
                            updateKeyframe(kf.id, { translateY: parseInt(e.target.value) });
                            restartAnimation();
                          }}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[var(--text-muted)] mb-1">
                          Scale: {kf.scale}
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="2"
                          step="0.05"
                          value={kf.scale}
                          onChange={(e) => {
                            updateKeyframe(kf.id, { scale: parseFloat(e.target.value) });
                            restartAnimation();
                          }}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[var(--text-muted)] mb-1">
                          Rotate: {kf.rotate}°
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={kf.rotate}
                          onChange={(e) => {
                            updateKeyframe(kf.id, { rotate: parseInt(e.target.value) });
                            restartAnimation();
                          }}
                          className="w-full"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs text-[var(--text-muted)] mb-1">
                          Opacity: {kf.opacity}
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={kf.opacity}
                          onChange={(e) => {
                            updateKeyframe(kf.id, { opacity: parseFloat(e.target.value) });
                            restartAnimation();
                          }}
                          className="w-full"
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
            <CodePreview code={generateKeyframesCSS()} title="animations.css" />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

