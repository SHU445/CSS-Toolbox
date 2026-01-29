'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import CodePreview from '@/components/CodePreview';
import { RotateCcw, Boxes } from 'lucide-react';

type ShapeType = 'cube' | 'pyramid' | 'prism' | 'cylinder' | 'cone' | 'octahedron';

interface ShapeSettings {
  type: ShapeType;
  size: number;
  depth: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  perspective: number;
  faceColors: {
    front: string;
    back: string;
    right: string;
    left: string;
    top: string;
    bottom: string;
  };
  autoRotate: boolean;
}

const shapePresets = [
  { name: 'Cube Classique', type: 'cube' as ShapeType, size: 200, depth: 200 },
  { name: 'Pyramide', type: 'pyramid' as ShapeType, size: 200, depth: 200 },
  { name: 'Prisme', type: 'prism' as ShapeType, size: 180, depth: 250 },
  { name: 'Cylindre', type: 'cylinder' as ShapeType, size: 150, depth: 200 },
  { name: 'Cône', type: 'cone' as ShapeType, size: 150, depth: 200 },
  { name: 'Octaèdre', type: 'octahedron' as ShapeType, size: 180, depth: 180 },
];

export default function Shapes3DPage() {
  const [settings, setSettings] = useState<ShapeSettings>({
    type: 'cube',
    size: 200,
    depth: 200,
    rotateX: -20,
    rotateY: 30,
    rotateZ: 0,
    perspective: 1000,
    faceColors: {
      front: '#3b82f6',
      back: '#8b5cf6',
      right: '#ec4899',
      left: '#10b981',
      top: '#f59e0b',
      bottom: '#ef4444',
    },
    autoRotate: false,
  });

  const resetSettings = () => {
    setSettings({
      type: 'cube',
      size: 200,
      depth: 200,
      rotateX: -20,
      rotateY: 30,
      rotateZ: 0,
      perspective: 1000,
      faceColors: {
        front: '#3b82f6',
        back: '#8b5cf6',
        right: '#ec4899',
        left: '#10b981',
        top: '#f59e0b',
        bottom: '#ef4444',
      },
      autoRotate: false,
    });
  };

  const applyPreset = (preset: typeof shapePresets[0]) => {
    setSettings({
      ...settings,
      type: preset.type,
      size: preset.size,
      depth: preset.depth,
    });
  };

  const renderCube = () => {
    const halfSize = settings.size / 2;
    
    return (
      <div
        className="preserve-3d relative"
        style={{
          width: settings.size,
          height: settings.size,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${settings.rotateX}deg) rotateY(${settings.rotateY}deg) rotateZ(${settings.rotateZ}deg)`,
          animation: settings.autoRotate ? 'rotate-3d 10s linear infinite' : 'none',
        }}
      >
        {/* Front */}
        <div
          className="absolute flex items-center justify-center text-white font-bold text-2xl"
          style={{
            width: settings.size,
            height: settings.size,
            background: settings.faceColors.front,
            transform: `translateZ(${halfSize}px)`,
            opacity: 0.9,
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        >
          FRONT
        </div>
        
        {/* Back */}
        <div
          className="absolute flex items-center justify-center text-white font-bold text-2xl"
          style={{
            width: settings.size,
            height: settings.size,
            background: settings.faceColors.back,
            transform: `translateZ(-${halfSize}px) rotateY(180deg)`,
            opacity: 0.9,
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        >
          BACK
        </div>
        
        {/* Right */}
        <div
          className="absolute flex items-center justify-center text-white font-bold text-2xl"
          style={{
            width: settings.size,
            height: settings.size,
            background: settings.faceColors.right,
            transform: `rotateY(90deg) translateZ(${halfSize}px)`,
            opacity: 0.9,
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        >
          RIGHT
        </div>
        
        {/* Left */}
        <div
          className="absolute flex items-center justify-center text-white font-bold text-2xl"
          style={{
            width: settings.size,
            height: settings.size,
            background: settings.faceColors.left,
            transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
            opacity: 0.9,
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        >
          LEFT
        </div>
        
        {/* Top */}
        <div
          className="absolute flex items-center justify-center text-white font-bold text-2xl"
          style={{
            width: settings.size,
            height: settings.size,
            background: settings.faceColors.top,
            transform: `rotateX(90deg) translateZ(${halfSize}px)`,
            opacity: 0.9,
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        >
          TOP
        </div>
        
        {/* Bottom */}
        <div
          className="absolute flex items-center justify-center text-white font-bold text-2xl"
          style={{
            width: settings.size,
            height: settings.size,
            background: settings.faceColors.bottom,
            transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
            opacity: 0.9,
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        >
          BOTTOM
        </div>
      </div>
    );
  };

  const renderPyramid = () => {
    const base = settings.size;
    const height = settings.depth;
    
    return (
      <div
        className="preserve-3d relative"
        style={{
          width: base,
          height: height,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${settings.rotateX}deg) rotateY(${settings.rotateY}deg) rotateZ(${settings.rotateZ}deg)`,
          animation: settings.autoRotate ? 'rotate-3d 10s linear infinite' : 'none',
        }}
      >
        {/* Base */}
        <div
          className="absolute"
          style={{
            width: base,
            height: base,
            background: settings.faceColors.bottom,
            transform: `translateY(${height}px) rotateX(-90deg)`,
            opacity: 0.9,
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        />
        
        {/* Front face */}
        <div
          className="absolute"
          style={{
            width: 0,
            height: 0,
            borderLeft: `${base/2}px solid transparent`,
            borderRight: `${base/2}px solid transparent`,
            borderBottom: `${height}px solid ${settings.faceColors.front}`,
            transform: `translateX(${base/2}px) translateY(${height}px) rotateX(40deg) translateZ(${base/4}px)`,
            transformOrigin: 'bottom center',
            opacity: 0.85,
          }}
        />
        
        {/* Right face */}
        <div
          className="absolute"
          style={{
            width: 0,
            height: 0,
            borderLeft: `${base/2}px solid transparent`,
            borderRight: `${base/2}px solid transparent`,
            borderBottom: `${height}px solid ${settings.faceColors.right}`,
            transform: `translateX(${base/2}px) translateY(${height}px) rotateX(40deg) rotateY(90deg) translateZ(${base/4}px)`,
            transformOrigin: 'bottom center',
            opacity: 0.85,
          }}
        />
        
        {/* Back face */}
        <div
          className="absolute"
          style={{
            width: 0,
            height: 0,
            borderLeft: `${base/2}px solid transparent`,
            borderRight: `${base/2}px solid transparent`,
            borderBottom: `${height}px solid ${settings.faceColors.back}`,
            transform: `translateX(${base/2}px) translateY(${height}px) rotateX(40deg) rotateY(180deg) translateZ(${base/4}px)`,
            transformOrigin: 'bottom center',
            opacity: 0.85,
          }}
        />
        
        {/* Left face */}
        <div
          className="absolute"
          style={{
            width: 0,
            height: 0,
            borderLeft: `${base/2}px solid transparent`,
            borderRight: `${base/2}px solid transparent`,
            borderBottom: `${height}px solid ${settings.faceColors.left}`,
            transform: `translateX(${base/2}px) translateY(${height}px) rotateX(40deg) rotateY(270deg) translateZ(${base/4}px)`,
            transformOrigin: 'bottom center',
            opacity: 0.85,
          }}
        />
      </div>
    );
  };

  const renderPrism = () => {
    const width = settings.size;
    const height = settings.size;
    const depth = settings.depth;
    
    return (
      <div
        className="preserve-3d relative"
        style={{
          width: width,
          height: height,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${settings.rotateX}deg) rotateY(${settings.rotateY}deg) rotateZ(${settings.rotateZ}deg)`,
          animation: settings.autoRotate ? 'rotate-3d 10s linear infinite' : 'none',
        }}
      >
        {/* Front triangle */}
        <div
          className="absolute"
          style={{
            width: 0,
            height: 0,
            borderLeft: `${width/2}px solid transparent`,
            borderRight: `${width/2}px solid transparent`,
            borderBottom: `${height}px solid ${settings.faceColors.front}`,
            transform: `translateZ(${depth/2}px)`,
            opacity: 0.9,
          }}
        />
        
        {/* Back triangle */}
        <div
          className="absolute"
          style={{
            width: 0,
            height: 0,
            borderLeft: `${width/2}px solid transparent`,
            borderRight: `${width/2}px solid transparent`,
            borderBottom: `${height}px solid ${settings.faceColors.back}`,
            transform: `translateZ(-${depth/2}px) rotateY(180deg)`,
            opacity: 0.9,
          }}
        />
        
        {/* Bottom */}
        <div
          className="absolute"
          style={{
            width: width,
            height: depth,
            background: settings.faceColors.bottom,
            transform: `translateY(${height}px) rotateX(-90deg)`,
            opacity: 0.9,
          }}
        />
        
        {/* Left side */}
        <div
          className="absolute"
          style={{
            width: depth,
            height: Math.sqrt(Math.pow(height, 2) + Math.pow(width/2, 2)),
            background: settings.faceColors.left,
            transform: `translateY(${height/2}px) rotateZ(${-Math.atan((width/2)/height) * (180/Math.PI)}deg) rotateY(-90deg) translateZ(${width/4}px)`,
            transformOrigin: 'top center',
            opacity: 0.9,
          }}
        />
        
        {/* Right side */}
        <div
          className="absolute"
          style={{
            width: depth,
            height: Math.sqrt(Math.pow(height, 2) + Math.pow(width/2, 2)),
            background: settings.faceColors.right,
            transform: `translateX(${width}px) translateY(${height/2}px) rotateZ(${Math.atan((width/2)/height) * (180/Math.PI)}deg) rotateY(90deg) translateZ(${width/4}px)`,
            transformOrigin: 'top center',
            opacity: 0.9,
          }}
        />
      </div>
    );
  };

  const renderCylinder = () => {
    const radius = settings.size / 2;
    const height = settings.depth;
    const sides = 20;
    
    return (
      <div
        className="preserve-3d relative"
        style={{
          width: settings.size,
          height: height,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${settings.rotateX}deg) rotateY(${settings.rotateY}deg) rotateZ(${settings.rotateZ}deg)`,
          animation: settings.autoRotate ? 'rotate-3d 10s linear infinite' : 'none',
        }}
      >
        {/* Top circle */}
        <div
          className="absolute rounded-full"
          style={{
            width: settings.size,
            height: settings.size,
            background: settings.faceColors.top,
            transform: `rotateX(90deg) translateZ(0)`,
            opacity: 0.9,
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        />
        
        {/* Bottom circle */}
        <div
          className="absolute rounded-full"
          style={{
            width: settings.size,
            height: settings.size,
            background: settings.faceColors.bottom,
            transform: `rotateX(90deg) translateZ(-${height}px)`,
            opacity: 0.9,
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        />
        
        {/* Sides */}
        {Array.from({ length: sides }).map((_, i) => {
          const angle = (360 / sides) * i;
          const sideWidth = (2 * Math.PI * radius) / sides;
          
          return (
            <div
              key={i}
              className="absolute"
              style={{
                width: sideWidth,
                height: height,
                background: i % 2 === 0 ? settings.faceColors.front : settings.faceColors.right,
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                opacity: 0.85,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            />
          );
        })}
      </div>
    );
  };

  const renderCone = () => {
    const radius = settings.size / 2;
    const height = settings.depth;
    const sides = 20;
    
    return (
      <div
        className="preserve-3d relative"
        style={{
          width: settings.size,
          height: height,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${settings.rotateX}deg) rotateY(${settings.rotateY}deg) rotateZ(${settings.rotateZ}deg)`,
          animation: settings.autoRotate ? 'rotate-3d 10s linear infinite' : 'none',
        }}
      >
        {/* Base circle */}
        <div
          className="absolute rounded-full"
          style={{
            width: settings.size,
            height: settings.size,
            background: settings.faceColors.bottom,
            transform: `rotateX(90deg) translateZ(-${height}px)`,
            opacity: 0.9,
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        />
        
        {/* Cone sides */}
        {Array.from({ length: sides }).map((_, i) => {
          const angle = (360 / sides) * i;
          const sideWidth = (2 * Math.PI * radius) / sides;
          
          return (
            <div
              key={i}
              className="absolute"
              style={{
                width: 0,
                height: 0,
                borderLeft: `${sideWidth/2}px solid transparent`,
                borderRight: `${sideWidth/2}px solid transparent`,
                borderBottom: `${height}px solid ${i % 2 === 0 ? settings.faceColors.front : settings.faceColors.right}`,
                transform: `translateY(${height}px) rotateX(${90 - Math.atan(height/radius) * (180/Math.PI)}deg) rotateZ(${angle}deg) translateZ(${radius}px)`,
                transformOrigin: 'bottom center',
                opacity: 0.85,
              }}
            />
          );
        })}
      </div>
    );
  };

  const renderOctahedron = () => {
    const size = settings.size;
    
    return (
      <div
        className="preserve-3d relative"
        style={{
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${settings.rotateX}deg) rotateY(${settings.rotateY}deg) rotateZ(${settings.rotateZ}deg)`,
          animation: settings.autoRotate ? 'rotate-3d 10s linear infinite' : 'none',
        }}
      >
        {/* Top pyramid */}
        {[0, 90, 180, 270].map((angle, i) => (
          <div
            key={`top-${i}`}
            className="absolute"
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size/2}px solid transparent`,
              borderRight: `${size/2}px solid transparent`,
              borderBottom: `${size/2}px solid ${[settings.faceColors.front, settings.faceColors.right, settings.faceColors.back, settings.faceColors.left][i]}`,
              transform: `translateX(${size/2}px) translateY(${size/2}px) rotateX(-55deg) rotateZ(${angle}deg) translateZ(${size/4}px)`,
              transformOrigin: 'bottom center',
              opacity: 0.85,
            }}
          />
        ))}
        
        {/* Bottom pyramid */}
        {[0, 90, 180, 270].map((angle, i) => (
          <div
            key={`bottom-${i}`}
            className="absolute"
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size/2}px solid transparent`,
              borderRight: `${size/2}px solid transparent`,
              borderTop: `${size/2}px solid ${[settings.faceColors.top, settings.faceColors.front, settings.faceColors.bottom, settings.faceColors.back][i]}`,
              transform: `translateX(${size/2}px) translateY(${size/2}px) rotateX(55deg) rotateZ(${angle}deg) translateZ(${size/4}px)`,
              transformOrigin: 'top center',
              opacity: 0.85,
            }}
          />
        ))}
      </div>
    );
  };

  const renderShape = () => {
    switch (settings.type) {
      case 'cube':
        return renderCube();
      case 'pyramid':
        return renderPyramid();
      case 'prism':
        return renderPrism();
      case 'cylinder':
        return renderCylinder();
      case 'cone':
        return renderCone();
      case 'octahedron':
        return renderOctahedron();
      default:
        return renderCube();
    }
  };

  const generateCSS = () => {
    const baseCSS = `.scene {
  perspective: ${settings.perspective}px;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shape-3d {
  width: ${settings.size}px;
  height: ${settings.type === 'cube' ? settings.size : settings.depth}px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(${settings.rotateX}deg) rotateY(${settings.rotateY}deg) rotateZ(${settings.rotateZ}deg);
  ${settings.autoRotate ? 'animation: rotate-3d 10s linear infinite;' : ''}
}

${settings.autoRotate ? `@keyframes rotate-3d {
  from {
    transform: rotateX(${settings.rotateX}deg) rotateY(0deg) rotateZ(${settings.rotateZ}deg);
  }
  to {
    transform: rotateX(${settings.rotateX}deg) rotateY(360deg) rotateZ(${settings.rotateZ}deg);
  }
}` : ''}`;

    if (settings.type === 'cube') {
      return `${baseCSS}

.shape-3d .face {
  position: absolute;
  width: ${settings.size}px;
  height: ${settings.size}px;
  opacity: 0.9;
  border: 2px solid rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.face.front {
  background: ${settings.faceColors.front};
  transform: translateZ(${settings.size/2}px);
}

.face.back {
  background: ${settings.faceColors.back};
  transform: translateZ(-${settings.size/2}px) rotateY(180deg);
}

.face.right {
  background: ${settings.faceColors.right};
  transform: rotateY(90deg) translateZ(${settings.size/2}px);
}

.face.left {
  background: ${settings.faceColors.left};
  transform: rotateY(-90deg) translateZ(${settings.size/2}px);
}

.face.top {
  background: ${settings.faceColors.top};
  transform: rotateX(90deg) translateZ(${settings.size/2}px);
}

.face.bottom {
  background: ${settings.faceColors.bottom};
  transform: rotateX(-90deg) translateZ(${settings.size/2}px);
}`;
    }

    return baseCSS + `\n\n/* ${settings.type.toUpperCase()} */\n/* Structure CSS complexe - voir le code généré */`;
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
            <h1 className="text-4xl font-bold mb-2">3D Shapes Generator</h1>
            <p className="text-[var(--text-secondary)]">
              Créez des formes 3D en CSS pur (cube, pyramide, cylindre...)
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
                  <Boxes className="w-5 h-5" />
                  Aperçu 3D
                </h2>
                <button
                  onClick={resetSettings}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] transition-colors text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              <div 
                className="min-h-[400px] flex items-center justify-center bg-[var(--bg-secondary)] rounded-2xl overflow-hidden"
                style={{
                  perspective: `${settings.perspective}px`,
                }}
              >
                <style jsx>{`
                  @keyframes rotate-3d {
                    from {
                      transform: rotateX(${settings.rotateX}deg) rotateY(0deg) rotateZ(${settings.rotateZ}deg);
                    }
                    to {
                      transform: rotateX(${settings.rotateX}deg) rotateY(360deg) rotateZ(${settings.rotateZ}deg);
                    }
                  }
                  .preserve-3d {
                    transform-style: preserve-3d;
                  }
                `}</style>
                {renderShape()}
              </div>

              {/* Shape Type Selection */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">Type de forme</h3>
                <div className="grid grid-cols-3 gap-2">
                  {shapePresets.map((preset) => (
                    <motion.button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className={`p-3 rounded-lg border transition-all text-sm ${
                        settings.type === preset.type
                          ? 'bg-[var(--accent-blue)] text-white border-[var(--accent-blue)]'
                          : 'bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-[var(--accent-blue)]'
                      }`}
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
              className="glass rounded-2xl p-6 max-h-[700px] overflow-y-auto"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-6">Paramètres</h2>

              {/* Dimensions */}
              <div className="mb-6 p-4 bg-[var(--bg-secondary)] rounded-xl">
                <h3 className="text-sm font-medium text-[var(--accent-blue)] mb-4">Dimensions</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Taille: {settings.size}px
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="300"
                      value={settings.size}
                      onChange={(e) => setSettings({ ...settings, size: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Profondeur: {settings.depth}px
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="400"
                      value={settings.depth}
                      onChange={(e) => setSettings({ ...settings, depth: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Rotation */}
              <div className="mb-6 p-4 bg-[var(--bg-secondary)] rounded-xl">
                <h3 className="text-sm font-medium text-[var(--accent-purple)] mb-4">Rotation</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Rotate X: {settings.rotateX}°
                    </label>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={settings.rotateX}
                      onChange={(e) => setSettings({ ...settings, rotateX: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Rotate Y: {settings.rotateY}°
                    </label>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={settings.rotateY}
                      onChange={(e) => setSettings({ ...settings, rotateY: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Rotate Z: {settings.rotateZ}°
                    </label>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={settings.rotateZ}
                      onChange={(e) => setSettings({ ...settings, rotateZ: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Perspective */}
              <div className="mb-6 p-4 bg-[var(--bg-secondary)] rounded-xl">
                <h3 className="text-sm font-medium text-[var(--accent-emerald)] mb-4">Perspective</h3>
                <div>
                  <label className="block text-xs text-[var(--text-muted)] mb-1">
                    perspective: {settings.perspective}px
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="2000"
                    value={settings.perspective}
                    onChange={(e) => setSettings({ ...settings, perspective: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6 p-4 bg-[var(--bg-secondary)] rounded-xl">
                <h3 className="text-sm font-medium text-[var(--accent-orange)] mb-4">Couleurs des faces</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(settings.faceColors).map(([face, color]) => (
                    <div key={face}>
                      <label className="block text-xs text-[var(--text-muted)] mb-1 capitalize">
                        {face}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={color}
                          onChange={(e) => setSettings({
                            ...settings,
                            faceColors: { ...settings.faceColors, [face]: e.target.value }
                          })}
                          className="w-12 h-10"
                        />
                        <input
                          type="text"
                          value={color}
                          onChange={(e) => setSettings({
                            ...settings,
                            faceColors: { ...settings.faceColors, [face]: e.target.value }
                          })}
                          className="input-dark flex-1 text-xs font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Auto Rotate */}
              <div className="p-4 bg-[var(--bg-secondary)] rounded-xl">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoRotate}
                    onChange={(e) => setSettings({ ...settings, autoRotate: e.target.checked })}
                    className="w-5 h-5 rounded accent-[var(--accent-blue)]"
                  />
                  <div>
                    <span className="text-sm font-medium">Rotation automatique</span>
                    <p className="text-xs text-[var(--text-muted)]">Rotation continue sur l'axe Y</p>
                  </div>
                </label>
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
            <CodePreview code={generateCSS()} title="3d-shapes.css" />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

