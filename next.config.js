/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable production compression
  compress: true,
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  // Configure webpack
  webpack: (config, { dev, isServer }) => {
    // Only run in production client-side builds
    if (!dev && !isServer) {
      // Split chunks more aggressively for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test(module) {
              return (
                module.size() > 80000 &&
                /node_modules[/\\]/.test(module.identifier())
              )
            },
            name(module) {
              const rawRequest = module.rawRequest || '';
              const packageName = rawRequest
                .match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)?.[1]
                ?.replace('@', '')
                ?.replace(/[\\/]/, '_') || 'lib';
              return `npm.${packageName}`;
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
        },
      };
    }
    return config;
  },
}

// Only add the bundle analyzer if it's installed
let config = nextConfig;
try {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
  config = withBundleAnalyzer(nextConfig);
} catch (e) {
  console.warn('Bundle analyzer not found, skipping...');
}

module.exports = config;