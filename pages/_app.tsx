import { CartContextProvider } from '@/components/contexts/CartContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (<CartContextProvider>
    <Component {...pageProps} />
  </CartContextProvider>);
}
