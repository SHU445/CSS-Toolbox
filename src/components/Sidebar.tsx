'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutGrid, 
  Palette, 
  Square, 
  Sparkles, 
  Layers,
  Home,
  Box,
  Wand2,
  Boxes,
  RectangleHorizontal
} from 'lucide-react';

const tools = [
  { name: 'Accueil', href: '/', icon: Home },
  { name: 'Flexbox & Grid', href: '/flexbox-grid', icon: LayoutGrid },
  { name: 'Gradients', href: '/gradients', icon: Palette },
  { name: 'Box Shadow', href: '/box-shadow', icon: Square },
  { name: 'Animations', href: '/animations', icon: Sparkles },
  { name: 'Layouts', href: '/layouts', icon: Layers },
  { name: '3D Transform', href: '/transform-3d', icon: Box },
  { name: '3D Shapes', href: '/3d-shapes', icon: Boxes },
  { name: 'Card Maker', href: '/card-maker', icon: RectangleHorizontal },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-[var(--border-color)]">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[var(--text-primary)]">CSS Toolbox</h1>
            <p className="text-xs text-[var(--text-muted)]">Outils de design</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {tools.map((tool) => {
          const isActive = pathname === tool.href;
          const Icon = tool.icon;
          
          return (
            <Link key={tool.href} href={tool.href}>
              <motion.div
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[var(--accent-blue)] rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`w-5 h-5 ${isActive ? 'text-[var(--accent-blue)]' : ''}`} />
                <span className="font-medium">{tool.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--border-color)]">
        <div className="glass rounded-xl p-4">
          <p className="text-xs text-[var(--text-muted)] mb-2">Version 1.0</p>
          <p className="text-xs text-[var(--text-secondary)]">
            Tous les outils CSS dont vous avez besoin, centralisés.
          </p>
        </div>
      </div>
    </aside>
  );
}

