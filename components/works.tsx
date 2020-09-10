import styles from './works.module.scss'
import Link from 'next/link'

export default function Works({list}) {
  // console.log(list)
  return (
    <ul className={styles.container}>
      {list.map((item) => (
        <li key={item.id} className={styles.item}>
          <Link href={`/works/${item.id}`}><a>{item.title}</a></Link>
        </li>
      ))}
    </ul>
  )
}
