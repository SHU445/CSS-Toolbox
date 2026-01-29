'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log l'erreur mais ignore les erreurs MetaMask
    if (!error.message?.includes('MetaMask') && !error.message?.includes('chrome-extension')) {
      console.error('Error:', error);
    }
  }, [error]);

  // Si c'est une erreur MetaMask, ne rien afficher (l'app fonctionne quand même)
  if (error.message?.includes('MetaMask') || error.message?.includes('chrome-extension')) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[var(--bg-primary)]">
      <motion.div
        className="glass rounded-2xl p-8 max-w-lg w-full text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Une erreur s'est produite</h2>
        
        <p className="text-[var(--text-secondary)] mb-6">
          {error.message || 'Une erreur inattendue s\'est produite.'}
        </p>

        <button
          onClick={reset}
          className="btn-primary flex items-center gap-2 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Réessayer
        </button>
      </motion.div>
    </div>
  );
}

