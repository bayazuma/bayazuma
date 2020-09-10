import '../styles/reset.scss'
import '../styles/global.scss'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}