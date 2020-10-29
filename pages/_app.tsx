import '../styles/reset.scss'
import '../styles/global.scss'
import { AnimatePresence } from 'framer-motion'
import { AppProps } from 'next/app'
import Meta from '../components/meta'
import Header from '../components/header'

export default function App({ Component, pageProps, router }: AppProps) {
  // return <Component {...pageProps} />
  return (
    <>
      <Meta />
      <Header home={router.pathname === '/graveyard' ? false : true} />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  )
}