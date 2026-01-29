'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import CodePreview from '@/components/CodePreview';
import { RotateCcw, RectangleHorizontal, User, TrendingUp, ShoppingBag, Star, Heart, MessageCircle } from 'lucide-react';

type CardStyle = 'glassmorphism' | 'neumorphism' | 'gradient' | 'flat' | 'outlined' | 'elevated';
type CardType = 'product' | 'profile' | 'stats' | 'blog' | 'pricing' | 'testimonial';

interface CardSettings {
  style: CardStyle;
  type: CardType;
  width: number;
  padding: number;
  borderRadius: number;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  borderWidth: number;
  borderColor: string;
  shadowIntensity: number;
  blurAmount: number;
  hasHoverEffect: boolean;
  hasImage: boolean;
}

const stylePresets = [
  { name: 'Glassmorphism', style: 'glassmorphism' as CardStyle, bg: 'rgba(255, 255, 255, 0.1)', blur: 12 },
  { name: 'Neumorphism', style: 'neumorphism' as CardStyle, bg: '#e0e5ec', blur: 0 },
  { name: 'Gradient', style: 'gradient' as CardStyle, bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', blur: 0 },
  { name: 'Flat', style: 'flat' as CardStyle, bg: '#ffffff', blur: 0 },
  { name: 'Outlined', style: 'outlined' as CardStyle, bg: 'transparent', blur: 0 },
  { name: 'Elevated', style: 'elevated' as CardStyle, bg: '#ffffff', blur: 0 },
];

const cardTypes = [
  { name: 'Product', type: 'product' as CardType, icon: ShoppingBag },
  { name: 'Profile', type: 'profile' as CardType, icon: User },
  { name: 'Stats', type: 'stats' as CardType, icon: TrendingUp },
  { name: 'Blog', type: 'blog' as CardType, icon: MessageCircle },
  { name: 'Pricing', type: 'pricing' as CardType, icon: Star },
  { name: 'Testimonial', type: 'testimonial' as CardType, icon: Heart },
];

export default function CardMakerPage() {
  const [settings, setSettings] = useState<CardSettings>({
    style: 'glassmorphism',
    type: 'product',
    width: 320,
    padding: 24,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    textColor: '#ffffff',
    accentColor: '#3b82f6',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowIntensity: 20,
    blurAmount: 12,
    hasHoverEffect: true,
    hasImage: true,
  });

  const resetSettings = () => {
    setSettings({
      style: 'glassmorphism',
      type: 'product',
      width: 320,
      padding: 24,
      borderRadius: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      textColor: '#ffffff',
      accentColor: '#3b82f6',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      shadowIntensity: 20,
      blurAmount: 12,
      hasHoverEffect: true,
      hasImage: true,
    });
  };

  const applyStylePreset = (preset: typeof stylePresets[0]) => {
    setSettings({
      ...settings,
      style: preset.style,
      backgroundColor: preset.bg,
      blurAmount: preset.blur,
      borderColor: preset.style === 'outlined' ? '#3b82f6' : 'rgba(255, 255, 255, 0.2)',
      borderWidth: preset.style === 'outlined' ? 2 : 1,
    });
  };

  const getCardStyle = (): React.CSSProperties => {
    let baseStyle: React.CSSProperties = {
      width: settings.width,
      padding: settings.padding,
      borderRadius: settings.borderRadius,
      border: `${settings.borderWidth}px solid ${settings.borderColor}`,
      color: settings.textColor,
      transition: 'all 0.3s ease',
    };

    switch (settings.style) {
      case 'glassmorphism':
        return {
          ...baseStyle,
          background: settings.backgroundColor,
          backdropFilter: `blur(${settings.blurAmount}px)`,
          WebkitBackdropFilter: `blur(${settings.blurAmount}px)`,
          boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.37)`,
        };
      
      case 'neumorphism':
        return {
          ...baseStyle,
          background: settings.backgroundColor,
          boxShadow: `${settings.shadowIntensity}px ${settings.shadowIntensity}px ${settings.shadowIntensity * 2}px #bebebe, -${settings.shadowIntensity}px -${settings.shadowIntensity}px ${settings.shadowIntensity * 2}px #ffffff`,
        };
      
      case 'gradient':
        return {
          ...baseStyle,
          background: settings.backgroundColor,
          boxShadow: `0 ${settings.shadowIntensity}px ${settings.shadowIntensity * 2}px rgba(0, 0, 0, 0.2)`,
        };
      
      case 'flat':
        return {
          ...baseStyle,
          background: settings.backgroundColor,
          boxShadow: 'none',
        };
      
      case 'outlined':
        return {
          ...baseStyle,
          background: settings.backgroundColor,
          borderWidth: settings.borderWidth,
          boxShadow: 'none',
        };
      
      case 'elevated':
        return {
          ...baseStyle,
          background: settings.backgroundColor,
          boxShadow: `0 ${settings.shadowIntensity}px ${settings.shadowIntensity * 3}px rgba(0, 0, 0, 0.15)`,
        };
      
      default:
        return baseStyle;
    }
  };

  const renderCardContent = () => {
    switch (settings.type) {
      case 'product':
        return (
          <div className="space-y-4">
            {settings.hasImage && (
              <div className="w-full h-48 rounded-lg bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center">
                <ShoppingBag className="w-16 h-16 text-white/50" />
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold mb-2" style={{ color: settings.textColor }}>
                Nom du Produit
              </h3>
              <p className="text-sm opacity-70" style={{ color: settings.textColor }}>
                Description courte du produit avec ses caractéristiques principales.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold" style={{ color: settings.accentColor }}>
                49.99€
              </span>
              <button
                className="px-4 py-2 rounded-lg font-medium"
                style={{ 
                  background: settings.accentColor, 
                  color: 'white',
                }}
              >
                Acheter
              </button>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-4 text-center">
            {settings.hasImage && (
              <div 
                className="w-24 h-24 rounded-full mx-auto flex items-center justify-center"
                style={{ background: settings.accentColor }}
              >
                <User className="w-12 h-12 text-white" />
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold mb-1" style={{ color: settings.textColor }}>
                John Doe
              </h3>
              <p className="text-sm opacity-70" style={{ color: settings.textColor }}>
                UI/UX Designer
              </p>
            </div>
            <div className="flex justify-center gap-6 pt-2">
              <div>
                <div className="text-2xl font-bold" style={{ color: settings.accentColor }}>
                  1.2K
                </div>
                <div className="text-xs opacity-70" style={{ color: settings.textColor }}>
                  Followers
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: settings.accentColor }}>
                  456
                </div>
                <div className="text-xs opacity-70" style={{ color: settings.textColor }}>
                  Following
                </div>
              </div>
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ background: `${settings.accentColor}20` }}
              >
                <TrendingUp className="w-6 h-6" style={{ color: settings.accentColor }} />
              </div>
              <div>
                <p className="text-sm opacity-70" style={{ color: settings.textColor }}>
                  Total Revenue
                </p>
                <h3 className="text-2xl font-bold" style={{ color: settings.textColor }}>
                  $45,231
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span 
                className="text-sm font-medium px-2 py-1 rounded"
                style={{ 
                  background: `${settings.accentColor}20`,
                  color: settings.accentColor 
                }}
              >
                +20.1%
              </span>
              <span className="text-sm opacity-70" style={{ color: settings.textColor }}>
                from last month
              </span>
            </div>
          </div>
        );

      case 'blog':
        return (
          <div className="space-y-4">
            {settings.hasImage && (
              <div className="w-full h-40 rounded-lg bg-gradient-to-r from-[var(--accent-orange)] to-[var(--accent-pink)] flex items-center justify-center">
                <MessageCircle className="w-12 h-12 text-white/50" />
              </div>
            )}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span 
                  className="text-xs font-medium px-2 py-1 rounded"
                  style={{ 
                    background: `${settings.accentColor}20`,
                    color: settings.accentColor 
                  }}
                >
                  Design
                </span>
                <span className="text-xs opacity-50" style={{ color: settings.textColor }}>
                  5 min read
                </span>
              </div>
              <h3 className="text-lg font-bold" style={{ color: settings.textColor }}>
                Guide complet du design moderne
              </h3>
              <p className="text-sm opacity-70" style={{ color: settings.textColor }}>
                Découvrez les dernières tendances en matière de design UI/UX...
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <div 
                className="w-8 h-8 rounded-full"
                style={{ background: settings.accentColor }}
              />
              <div>
                <p className="text-sm font-medium" style={{ color: settings.textColor }}>
                  Marie Dubois
                </p>
                <p className="text-xs opacity-50" style={{ color: settings.textColor }}>
                  Dec 12, 2024
                </p>
              </div>
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className="space-y-6 text-center">
            <div>
              <h3 className="text-sm font-medium opacity-70 mb-2" style={{ color: settings.textColor }}>
                PRO
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold" style={{ color: settings.textColor }}>
                  29€
                </span>
                <span className="text-sm opacity-70" style={{ color: settings.textColor }}>
                  /mois
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Star className="w-4 h-4" style={{ color: settings.accentColor }} />
                  <span className="text-sm" style={{ color: settings.textColor }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
            <button
              className="w-full py-3 rounded-lg font-medium"
              style={{ 
                background: settings.accentColor, 
                color: 'white',
              }}
            >
              Commencer
            </button>
          </div>
        );

      case 'testimonial':
        return (
          <div className="space-y-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className="w-5 h-5 fill-current"
                  style={{ color: settings.accentColor }}
                />
              ))}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: settings.textColor }}>
              "Cette application a complètement transformé ma façon de travailler. 
              L'interface est intuitive et les fonctionnalités sont exactement ce dont j'avais besoin."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: settings.accentColor }}
              >
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium" style={{ color: settings.textColor }}>
                  Sophie Martin
                </p>
                <p className="text-sm opacity-70" style={{ color: settings.textColor }}>
                  CEO, TechStart
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const generateCSS = () => {
    let css = `.card {
  width: ${settings.width}px;
  padding: ${settings.padding}px;
  border-radius: ${settings.borderRadius}px;
  border: ${settings.borderWidth}px solid ${settings.borderColor};
  color: ${settings.textColor};
  transition: all 0.3s ease;
`;

    switch (settings.style) {
      case 'glassmorphism':
        css += `  background: ${settings.backgroundColor};
  backdrop-filter: blur(${settings.blurAmount}px);
  -webkit-backdrop-filter: blur(${settings.blurAmount}px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;
        break;

      case 'neumorphism':
        css += `  background: ${settings.backgroundColor};
  box-shadow: ${settings.shadowIntensity}px ${settings.shadowIntensity}px ${settings.shadowIntensity * 2}px #bebebe,
              -${settings.shadowIntensity}px -${settings.shadowIntensity}px ${settings.shadowIntensity * 2}px #ffffff;
`;
        break;

      case 'gradient':
        css += `  background: ${settings.backgroundColor};
  box-shadow: 0 ${settings.shadowIntensity}px ${settings.shadowIntensity * 2}px rgba(0, 0, 0, 0.2);
`;
        break;

      case 'flat':
        css += `  background: ${settings.backgroundColor};
  box-shadow: none;
`;
        break;

      case 'outlined':
        css += `  background: ${settings.backgroundColor};
  box-shadow: none;
`;
        break;

      case 'elevated':
        css += `  background: ${settings.backgroundColor};
  box-shadow: 0 ${settings.shadowIntensity}px ${settings.shadowIntensity * 3}px rgba(0, 0, 0, 0.15);
`;
        break;
    }

    css += `}

.card-accent {
  color: ${settings.accentColor};
}

.card-button {
  background: ${settings.accentColor};
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.card-button:hover {
  transform: translateY(-2px);
}`;

    if (settings.hasHoverEffect) {
      css += `

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 ${settings.shadowIntensity + 10}px ${settings.shadowIntensity * 4}px rgba(0, 0, 0, 0.2);
}`;
    }

    return css;
  };

  const generateHTML = () => {
    const contentMap = {
      product: `  <div class="card">
    <img src="product.jpg" alt="Product" class="card-image">
    <h3>Nom du Produit</h3>
    <p>Description du produit...</p>
    <div class="card-footer">
      <span class="card-accent">49.99€</span>
      <button class="card-button">Acheter</button>
    </div>
  </div>`,
      profile: `  <div class="card">
    <img src="avatar.jpg" alt="Profile" class="card-avatar">
    <h3>John Doe</h3>
    <p>UI/UX Designer</p>
    <div class="card-stats">
      <div><strong class="card-accent">1.2K</strong> Followers</div>
      <div><strong class="card-accent">456</strong> Following</div>
    </div>
  </div>`,
      stats: `  <div class="card">
    <div class="card-icon">📈</div>
    <p>Total Revenue</p>
    <h3>$45,231</h3>
    <span class="card-accent">+20.1% from last month</span>
  </div>`,
      blog: `  <div class="card">
    <img src="blog-cover.jpg" alt="Blog" class="card-image">
    <span class="card-tag">Design</span>
    <h3>Guide complet du design moderne</h3>
    <p>Découvrez les dernières tendances...</p>
    <div class="card-author">
      <img src="author.jpg" alt="Author">
      <div>
        <strong>Marie Dubois</strong>
        <span>Dec 12, 2024</span>
      </div>
    </div>
  </div>`,
      pricing: `  <div class="card">
    <h4>PRO</h4>
    <h2><span class="card-accent">29€</span>/mois</h2>
    <ul>
      <li>✓ Feature 1</li>
      <li>✓ Feature 2</li>
      <li>✓ Feature 3</li>
      <li>✓ Feature 4</li>
    </ul>
    <button class="card-button">Commencer</button>
  </div>`,
      testimonial: `  <div class="card">
    <div class="card-stars">⭐⭐⭐⭐⭐</div>
    <p>"Cette application a complètement transformé ma façon de travailler..."</p>
    <div class="card-author">
      <img src="avatar.jpg" alt="Sophie">
      <div>
        <strong>Sophie Martin</strong>
        <span>CEO, TechStart</span>
      </div>
    </div>
  </div>`,
    };

    return contentMap[settings.type];
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
            <h1 className="text-4xl font-bold mb-2">Card Maker</h1>
            <p className="text-[var(--text-secondary)]">
              Générez des cartes UI/UX modernes avec différents styles
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
                  <RectangleHorizontal className="w-5 h-5" />
                  Aperçu
                </h2>
                <button
                  onClick={resetSettings}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] transition-colors text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              <div className="min-h-[500px] flex items-center justify-center p-8">
                <motion.div
                  style={getCardStyle()}
                  whileHover={settings.hasHoverEffect ? { y: -8 } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {renderCardContent()}
                </motion.div>
              </div>

              {/* Style Presets */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">Styles prédéfinis</h3>
                <div className="grid grid-cols-3 gap-2">
                  {stylePresets.map((preset) => (
                    <motion.button
                      key={preset.name}
                      onClick={() => applyStylePreset(preset)}
                      className={`p-3 rounded-lg border transition-all text-sm ${
                        settings.style === preset.style
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

              {/* Card Types */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">Types de carte</h3>
                <div className="grid grid-cols-3 gap-2">
                  {cardTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <motion.button
                        key={type.name}
                        onClick={() => setSettings({ ...settings, type: type.type })}
                        className={`p-3 rounded-lg border transition-all text-sm flex items-center gap-2 ${
                          settings.type === type.type
                            ? 'bg-[var(--accent-purple)] text-white border-[var(--accent-purple)]'
                            : 'bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-[var(--accent-purple)]'
                        }`}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-4 h-4" />
                        {type.name}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Controls Panel */}
            <motion.div 
              className="glass rounded-2xl p-6 max-h-[900px] overflow-y-auto"
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
                      Largeur: {settings.width}px
                    </label>
                    <input
                      type="range"
                      min="200"
                      max="500"
                      value={settings.width}
                      onChange={(e) => setSettings({ ...settings, width: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Padding: {settings.padding}px
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="48"
                      value={settings.padding}
                      onChange={(e) => setSettings({ ...settings, padding: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Border Radius: {settings.borderRadius}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="32"
                      value={settings.borderRadius}
                      onChange={(e) => setSettings({ ...settings, borderRadius: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6 p-4 bg-[var(--bg-secondary)] rounded-xl">
                <h3 className="text-sm font-medium text-[var(--accent-purple)] mb-4">Couleurs</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Background
                    </label>
                    <input
                      type="text"
                      value={settings.backgroundColor}
                      onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                      className="input-dark w-full text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Text Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.textColor}
                        onChange={(e) => setSettings({ ...settings, textColor: e.target.value })}
                        className="w-12 h-10"
                      />
                      <input
                        type="text"
                        value={settings.textColor}
                        onChange={(e) => setSettings({ ...settings, textColor: e.target.value })}
                        className="input-dark flex-1 text-sm font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Accent Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.accentColor}
                        onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                        className="w-12 h-10"
                      />
                      <input
                        type="text"
                        value={settings.accentColor}
                        onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                        className="input-dark flex-1 text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Border */}
              <div className="mb-6 p-4 bg-[var(--bg-secondary)] rounded-xl">
                <h3 className="text-sm font-medium text-[var(--accent-emerald)] mb-4">Bordure</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Border Width: {settings.borderWidth}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="8"
                      value={settings.borderWidth}
                      onChange={(e) => setSettings({ ...settings, borderWidth: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Border Color
                    </label>
                    <input
                      type="text"
                      value={settings.borderColor}
                      onChange={(e) => setSettings({ ...settings, borderColor: e.target.value })}
                      className="input-dark w-full text-sm font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Effects */}
              <div className="mb-6 p-4 bg-[var(--bg-secondary)] rounded-xl">
                <h3 className="text-sm font-medium text-[var(--accent-orange)] mb-4">Effets</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-[var(--text-muted)] mb-1">
                      Shadow Intensity: {settings.shadowIntensity}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={settings.shadowIntensity}
                      onChange={(e) => setSettings({ ...settings, shadowIntensity: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  {settings.style === 'glassmorphism' && (
                    <div>
                      <label className="block text-xs text-[var(--text-muted)] mb-1">
                        Blur Amount: {settings.blurAmount}px
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="24"
                        value={settings.blurAmount}
                        onChange={(e) => setSettings({ ...settings, blurAmount: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="p-4 bg-[var(--bg-secondary)] rounded-xl space-y-3">
                <h3 className="text-sm font-medium text-[var(--accent-pink)] mb-4">Options</h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.hasHoverEffect}
                    onChange={(e) => setSettings({ ...settings, hasHoverEffect: e.target.checked })}
                    className="w-5 h-5 rounded accent-[var(--accent-blue)]"
                  />
                  <span className="text-sm">Effet au survol</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.hasImage}
                    onChange={(e) => setSettings({ ...settings, hasImage: e.target.checked })}
                    className="w-5 h-5 rounded accent-[var(--accent-blue)]"
                  />
                  <span className="text-sm">Afficher l'image/avatar</span>
                </label>
              </div>
            </motion.div>
          </div>

          {/* Code Output */}
          <motion.div 
            className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CodePreview code={generateHTML()} language="html" title="card.html" />
            <CodePreview code={generateCSS()} title="card.css" />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

