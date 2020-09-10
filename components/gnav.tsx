import styles from './gnav.module.scss'
import Link from 'next/link'

export default function Gnav({ home }) {
  const itemClass = home ? `${styles.item}` : `${styles.item} ${styles.post}`
  return (
    <ul className={styles.container}>
      <li className={itemClass}>
        <Link href="/"><a>Top</a></Link>
      </li>
      <li className={itemClass}>
        <Link href="/about"><a>About</a></Link>
      </li>
      {
        // <li className={gnav.item}>
        //   <Link href="/experiments"><a>Experiments</a></Link>
        // </li>
        // <li className={gnav.item}>
        //   <Link href="/oogiri"><a>Oogiri</a></Link>
        // </li>
      }
    </ul>
  )
}

// {!home && (
//   <div className={styles.backToHome}>
//     <Link href="/">
//       <a>← Back to home</a>
//     </Link>
//   </div>
// )}