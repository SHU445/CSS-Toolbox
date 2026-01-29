import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Configuration vide pour Turbopack (évite l'erreur)
  turbopack: {},
};

export default nextConfig;
