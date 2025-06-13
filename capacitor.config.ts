
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.2141c30f65cb40bf8a1cb60a26401373',
  appName: 'taco-time-turbo',
  webDir: 'dist',
  server: {
    url: 'https://2141c30f-65cb-40bf-8a1c-b60a26401373.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ea580c',
      showSpinner: false
    }
  }
};

export default config;
