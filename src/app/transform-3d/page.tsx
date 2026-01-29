'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import CodePreview from '@/components/CodePreview';
import { RotateCcw, Box } from 'lucide-react';

interface Transform3D {
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  translateX: number;
  translateY: number;
  translateZ: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  perspective: number;
  perspectiveOriginX: number;
  perspectiveOriginY: number;
}

const presets = [
  {
    name: 'Flip Card',
    transform: { rotateX: 0, rotateY: 180, rotateZ: 0, translateX: 0, translateY: 0, translateZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1, perspective: 1000, perspectiveOriginX: 50, perspectiveOriginY: 50 },
  },
  {
    name: 'Tilt Left',
    transform: { rotateX: 0, rotateY: -25, rotateZ: 0, translateX: 0, translateY: 0, translateZ: 50, scaleX: 1, scaleY: 1, scaleZ: 1, perspective: 800, perspectiveOriginX: 50, perspectiveOriginY: 50 },
  },
  {
    name: 'Pop Up',
    transform: { rotateX: -15, rotateY: 0, rotateZ: 0, translateX: 0, translateY: 0, translateZ: 100, scaleX: 1.1, scaleY: 1.1, scaleZ: 1, perspective: 1200, perspectiveOriginX: 50, perspectiveOriginY: 50 },
  },
  {
    name: 'Isometric',
    transform: { rotateX: 45, rotateY: -45, rotateZ: 0, translateX: 0, translateY: 0, translateZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1, perspective: 0, perspectiveOriginX: 50, perspectiveOriginY: 50 },
  },
  {
    name: 'Cube Face',
    transform: { rotateX: -20, rotateY: 30, rotateZ: 0, translateX: 0, translateY: 0, translateZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1, perspective: 600, perspectiveOriginX: 50, perspectiveOriginY: 50 },
  },
  {
    name: 'Spin',
    transform: { rotateX: 0, rotateY: 0, rotateZ: 45, translateX: 0, translateY: 0, translateZ: 0, scaleX: 1, scaleY: 1, scaleZ: 1, perspective: 1000, perspectiveOriginX: 50, perspectiveOriginY: 50 },
  },
];

export default function Transform3DPage() {
  const [transform, setTransform] = useState<Transform3D>({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    perspective: 1000,
    perspectiveOriginX: 50,
    perspectiveOriginY: 50,
  });

  const [preserves3D, setPreserves3D] = useState(true);
  const [backfaceVisible, setBackfaceVisible] = useState(true);

  const resetTransform = () => {
    setTransform({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      translateX: 0,
      translateY: 0,
      translateZ: 0,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
      perspective: 1000,
      perspectiveOriginX: 50,
      perspectiveOriginY: 50,
    });
  };

  const applyPreset = (preset: typeof presets[0]) => {
    setTransform(preset.transform);
  };

  const getTransformString = () => {
    const transforms = [];
    if (transform.translateX !== 0) transforms.push(`translateX(${transform.translateX}px)`);
    if (transform.translateY !== 0) transforms.push(`translateY(${transform.translateY}px)`);
    if (transform.translateZ !== 0) transforms.push(`translateZ(${transform.translateZ}px)`);
    if (transform.rotateX !== 0) transforms.push(`rotateX(${transform.rotateX}deg)`);
    if (transform.rotateY !== 0) transforms.push(`rotateY(${transform.rotateY}deg)`);
    if (transform.rotateZ !== 0) transforms.push(`rotateZ(${transform.rotateZ}deg)`);
    if (transform.scaleX !== 1 || transform.scaleY !== 1 || transform.scaleZ !== 1) {
      transforms.push(`scale3d(${transform.scaleX}, ${transform.scaleY}, ${transform.scaleZ})`);
    }
    return transforms.length > 0 ? transforms.join(' ') : 'none';
  };

  const generateCSS = () => {
    return `/* Container - appliquer la perspective au parent */
.container {
  perspective: ${transform.perspective}px;
  perspective-origin: ${transform.perspectiveOriginX}% ${transform.perspectiveOriginY}%;
}

/* Element transformé */
.element {
  transform: ${getTransformString()};
  transform-style: ${preserves3D ? 'preserve-3d' : 'flat'};
  backface-visibility: ${backfaceVisible ? 'visible' : 'hidden'};
  transition: transform 0.3s ease;
}

/* Hover effect example */
.element:hover {
  transform: ${getTransformString()} translateZ(20px);
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
            <h1 className="text-4xl font-bold mb-2">3D Transform</h1>
            <p className="text-[var(--text-secondary)]">
              Explorez les transformations CSS 3D et la perspective
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
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Box className="w-5 h-5" />
                  Aperçu 3D
                </h2>
                <button
                  onClick={resetTransform}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] transition-colors text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              <div 
                className="min-h-[400px] flex items-center justify-center bg-[var(--bg-secondary)] rounded-2xl overflow-hidden"
                style={{
                  perspective: `${transform.perspective}px`,
                  perspectiveOrigin: `${transform.perspectiveOriginX}% ${transform.perspectiveOriginY}%`,
                }}
              >
                <motion.div
                  className="w-40 h-40 rounded-2xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center relative"
                  style={{
                    transform: getTransformString(),
                    transformStyle: preserves3D ? 'preserve-3d' : 'flat',
                    backfaceVisibility: backfaceVisible ? 'visible' : 'hidden',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white font-bold text-xl">FRONT</span>
                  {/* Back face for flip effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent-pink)] to-[var(--accent-orange)] flex items-center justify-center"
                    style={{
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <span className="text-white font-bold text-xl">BACK</span>
                  </div>
                </motion.div>
              </div>

              {/* Presets */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">Préréglages</h3>
                <div className="grid grid-cols-3 gap-2">
                  {presets.map((preset) => (
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

              {/* Quick Options */}
              <div className="mt-6 flex gap-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preserves3D}
                    onChange={(e) => setPreserves3D(e.target.checked)}
                    className="w-4 h-4 rounded accent-[var(--accent-blue)]"
                  />
                  <span className="text-[var(--text-secondary)]">preserve-3d</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={backfaceVisible}
                    onChange={(e) => setBackfaceVisible(e.target.checked)}
                    className="w-4 h-4 rounded accent-[var(--accent-blue)]"
                  />
                  <span className="text-[var(--text-secondary)]">backface-visibility</span>
                </label>
              </div>
            </motion.div>

            {/* Controls Panel */}
            <motion.div 
              className="glass rounded-2xl p-6 max-h-[700px] overflow-y-auto"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-6">Paramètres</h2>

              {/* Perspective */}
              <div className="mb-6 p-4 bg-[var(--bg-secondary)] rounded-xl">
                <h3 className="text-sm font-medium text-[var(--accent-blue)] mb-4">Perspective (Container)</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      perspective: {transform.perspective}px
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="2000"
                      value={transform.perspective}
                      onChange={(e) => setTransform({ ...transform, perspective: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[var(--text-muted)] mb-1">
                        perspective-origin X: {transform.perspectiveOriginX}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={transform.perspectiveOriginX}
                        onChange={(e) => setTransform({ ...transform, perspectiveOriginX: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[var(--text-muted)] mb-1">
                        perspective-origin Y: {transform.perspectiveOriginY}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={transform.perspectiveOriginY}
                        onChange={(e) => setTransform({ ...transform, perspectiveOriginY: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Rotation */}
              <div className="mb-6 p-4 bg-[var(--bg-secondary)] rounded-xl">
                <h3 className="text-sm font-medium text-[var(--accent-purple)] mb-4">Rotation</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      rotateX: {transform.rotateX}°
                    </label>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={transform.rotateX}
                      onChange={(e) => setTransform({ ...transform, rotateX: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      rotateY: {transform.rotateY}°
                    </label>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={transform.rotateY}
                      onChange={(e) => setTransform({ ...transform, rotateY: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      rotateZ: {transform.rotateZ}°
                    </label>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={transform.rotateZ}
                      onChange={(e) => setTransform({ ...transform, rotateZ: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Translation */}
              <div className="mb-6 p-4 bg-[var(--bg-secondary)] rounded-xl">
                <h3 className="text-sm font-medium text-[var(--accent-emerald)] mb-4">Translation</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      translateX: {transform.translateX}px
                    </label>
                    <input
                      type="range"
                      min="-200"
                      max="200"
                      value={transform.translateX}
                      onChange={(e) => setTransform({ ...transform, translateX: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      translateY: {transform.translateY}px
                    </label>
                    <input
                      type="range"
                      min="-200"
                      max="200"
                      value={transform.translateY}
                      onChange={(e) => setTransform({ ...transform, translateY: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      translateZ: {transform.translateZ}px
                    </label>
                    <input
                      type="range"
                      min="-200"
                      max="200"
                      value={transform.translateZ}
                      onChange={(e) => setTransform({ ...transform, translateZ: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Scale */}
              <div className="p-4 bg-[var(--bg-secondary)] rounded-xl">
                <h3 className="text-sm font-medium text-[var(--accent-orange)] mb-4">Scale</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      scaleX: {transform.scaleX}
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="2"
                      step="0.1"
                      value={transform.scaleX}
                      onChange={(e) => setTransform({ ...transform, scaleX: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      scaleY: {transform.scaleY}
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="2"
                      step="0.1"
                      value={transform.scaleY}
                      onChange={(e) => setTransform({ ...transform, scaleY: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      scaleZ: {transform.scaleZ}
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="2"
                      step="0.1"
                      value={transform.scaleZ}
                      onChange={(e) => setTransform({ ...transform, scaleZ: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
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
            <CodePreview code={generateCSS()} title="3d-transforms.css" />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

