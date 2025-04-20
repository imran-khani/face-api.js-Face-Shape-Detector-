import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import '../app/globals.css';

// Dynamically import ThemeProvider with loading fallback
const ThemeProvider = dynamic(
  () => import('../components/theme-provider').then(mod => ({ default: mod.ThemeProvider })),
  { ssr: true }
);

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Load non-critical scripts after page load
    const loadNonCriticalScripts = () => {
      // Example: Analytics or other non-critical scripts
      const script = document.createElement('script');
      script.src = '/scripts/non-critical.js';
      script.async = true;
      document.body.appendChild(script);
    };

    if (window.requestIdleCallback) {
      window.requestIdleCallback(loadNonCriticalScripts);
    } else {
      window.setTimeout(loadNonCriticalScripts, 1000);
    }
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}