import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSS Toolbox | Générateurs CSS",
  description: "Suite d'outils CSS pour designers et développeurs - Flexbox, Grid, Gradients, Shadows, Animations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {/* Script pour gérer les erreurs des extensions navigateur */}
        <Script id="error-handler" strategy="beforeInteractive">
          {`
            // Capturer et ignorer les erreurs MetaMask et autres extensions
            window.addEventListener('error', function(e) {
              if (e.message && (e.message.includes('MetaMask') || 
                  e.message.includes('chrome-extension') || 
                  e.message.includes('moz-extension'))) {
                e.preventDefault();
                return false;
              }
            });
            
            // Ignorer les promesses rejetées par les extensions
            window.addEventListener('unhandledrejection', function(e) {
              if (e.reason && e.reason.message && 
                  (e.reason.message.includes('MetaMask') || 
                   e.reason.message.includes('chrome-extension') ||
                   e.reason.message.includes('moz-extension'))) {
                e.preventDefault();
                return false;
              }
            });
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
