import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.fe5489eddb5f4e98be6dcc78d8288a10',
  appName: 'k9ineprivate',
  webDir: 'dist',
  server: {
    url: 'https://fe5489ed-db5f-4e98-be6d-cc78d8288a10.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;