'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { 
  LayoutGrid, 
  Palette, 
  Square, 
  Sparkles, 
  Layers,
  Box,
  ArrowRight,
  Zap,
  Boxes,
  RectangleHorizontal
} from 'lucide-react';

const tools = [
  {
    name: 'Flexbox & Grid',
    description: 'Créez des layouts complexes avec Flexbox et CSS Grid de manière visuelle',
    href: '/flexbox-grid',
    icon: LayoutGrid,
    color: 'from-blue-500 to-cyan-500',
    shadowColor: 'rgba(59, 130, 246, 0.3)',
  },
  {
    name: 'Gradients',
    description: 'Générez des dégradés CSS linéaires et radiaux personnalisés',
    href: '/gradients',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
    shadowColor: 'rgba(139, 92, 246, 0.3)',
  },
  {
    name: 'Box Shadow',
    description: 'Créez des ombres CSS complexes avec plusieurs couches',
    href: '/box-shadow',
    icon: Square,
    color: 'from-emerald-500 to-teal-500',
    shadowColor: 'rgba(16, 185, 129, 0.3)',
  },
  {
    name: 'Animations',
    description: 'Générez des keyframes CSS pour des animations fluides',
    href: '/animations',
    icon: Sparkles,
    color: 'from-orange-500 to-red-500',
    shadowColor: 'rgba(249, 115, 22, 0.3)',
  },
  {
    name: 'Layouts',
    description: 'Templates de layouts prédéfinis pour vos projets',
    href: '/layouts',
    icon: Layers,
    color: 'from-pink-500 to-rose-500',
    shadowColor: 'rgba(236, 72, 153, 0.3)',
  },
  {
    name: '3D Transform',
    description: 'Explorez les transformations CSS 3D et la perspective',
    href: '/transform-3d',
    icon: Box,
    color: 'from-indigo-500 to-purple-500',
    shadowColor: 'rgba(99, 102, 241, 0.3)',
  },
  {
    name: '3D Shapes',
    description: 'Créez des formes 3D en CSS (cubes, pyramides, sphères...)',
    href: '/3d-shapes',
    icon: Boxes,
    color: 'from-cyan-500 to-blue-500',
    shadowColor: 'rgba(6, 182, 212, 0.3)',
  },
  {
    name: 'Card Maker',
    description: 'Générez des cartes UI/UX modernes (glassmorphism, neumorphism...)',
    href: '/card-maker',
    icon: RectangleHorizontal,
    color: 'from-violet-500 to-fuchsia-500',
    shadowColor: 'rgba(139, 92, 246, 0.3)',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      
      <main className="flex-1 ml-72 p-8 grid-pattern">
        {/* Hero Section */}
        <motion.div 
          className="max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] text-sm font-medium mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Zap className="w-4 h-4" />
              <span>Suite d'outils CSS complète</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Tous vos outils CSS
              <br />
              <span className="gradient-text">au même endroit</span>
            </h1>
            
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
              Créez des layouts, gradients, shadows et animations CSS en quelques clics. 
              Copiez le code généré directement dans vos projets.
            </p>

            <div className="flex justify-center gap-4">
              <Link href="/flexbox-grid">
                <motion.button
                  className="btn-primary flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Commencer
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.div key={tool.href} variants={itemVariants}>
                <Link href={tool.href}>
                  <motion.div
                    className="tool-card p-6 h-full cursor-pointer group"
                    whileHover={{ 
                      y: -8,
                      boxShadow: `0 25px 50px rgba(0, 0, 0, 0.4), 0 0 40px ${tool.shadowColor}` 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors">
                      {tool.name}
                    </h3>
                    
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      {tool.description}
                    </p>
                    
                    <div className="mt-4 flex items-center gap-2 text-[var(--accent-blue)] opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-medium">Ouvrir l'outil</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Background decoration */}
        <div className="fixed top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-30">
          <div className="absolute top-20 right-20 w-72 h-72 bg-[var(--accent-blue)] rounded-full filter blur-[128px]" />
          <div className="absolute top-40 right-60 w-64 h-64 bg-[var(--accent-purple)] rounded-full filter blur-[128px]" />
        </div>
      </main>
    </div>
  );
}
