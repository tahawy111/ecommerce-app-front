import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tahawy.ecommercefront',
  appName: 'ecommerce-app-front',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: "https://ecommerce-app-front.vercel.app/",
    cleartext: true
  }
};

export default config;
