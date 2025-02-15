import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    //forceSwcTransforms: true,
  },
  output: 'export', // Para generar contenido estático
  basePath: '/mi-clima',
  assetPrefix: '/mi-clima/',
};

export default nextConfig;
