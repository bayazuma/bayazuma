import { motion } from 'framer-motion'
import styles from './works.module.scss'
import Link from 'next/link'

const listMo = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
}

const itemMo = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'circOut',
      duration: 0.6,
    }
  },
  hidden: { opacity: 0, y: 50 },
}

export default function Works({list}) {
  // console.log(list)
  return (
    <motion.ul variants={listMo} initial="hidden" animate="visible" className={styles.container}>
      {list.map((item) => (
        <motion.li variants={itemMo} key={item.id} className={styles.item}>
          <Link href={`/works/${item.id}`}><a>{item.title}</a></Link>
          </motion.li>
      ))}
    </motion.ul>
  )
}
