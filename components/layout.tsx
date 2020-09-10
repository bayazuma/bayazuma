import Head from 'next/head'
import styles from './layout.module.scss'
import Gnav from '../components/gnav'

export const siteTitle = 'bayazuma'

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  const wrapperClass = home ? `${styles.wrapper}` : `${styles.wrapper} ${styles.post}`
  return (
    <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Learn how to build a personal website using Next.js"
      />
      <meta
        property="og:image"
        content={`https://og-image.now.sh/${encodeURI(
          siteTitle
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
    <div className={wrapperClass}>
      <header className={styles.header}>
        <div className={styles.headerItem}><Gnav home={home} /></div>
      </header>
      <div className={styles.container}>
        <main>{children}</main>
      </div>
    </div>
    </>
  )
}
