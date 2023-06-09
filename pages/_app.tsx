import { CartContextProvider } from '@/components/contexts/CartContext';
import { GlobalContextProvider } from '@/components/contexts/GlobalContext';
import '@/styles/globals.css';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <GlobalContextProvider>
      <CartContextProvider>
        <SessionProvider session={session}>
          <Toaster />
          <Component {...pageProps} />
        </SessionProvider>
      </CartContextProvider>
    </GlobalContextProvider>
  );
}
