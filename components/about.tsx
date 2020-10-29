import { motion } from 'framer-motion'
import styles from './about.module.scss'

const easing = [.52,.8,.19,.85]

const container = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren", // childrenの処理前に実行
      // delayChildren: 0.5,
      staggerChildren: 0.09,
      // staggerDirection: -1, // staggerの開始位置を逆転
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren", // childrenの処理後に実行
    },
  },
}

const fadeInUp = {
  hidden: {
    y: 60,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: .8,
      ease: easing
    }
  }
}

const scaleInOut = {
  hidden: {
    scale: 1.6,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: easing
    }
  }
}

export default function About({ about }) {
  // console.log(about)
  return (
    <motion.div variants={container} initial="hidden" animate="visible" className={styles.container}>
      <section className={styles.section}>
        <div className={styles.photo}>
          <motion.img variants={scaleInOut} src={about.photo.url} alt="" />
        </div>
        <motion.div variants={fadeInUp} className={styles.name}>
          {about.name}
        </motion.div>
        <motion.div variants={fadeInUp} className={styles.text}>
          {about.outline}
        </motion.div>
      </section>
      {
        // <div className={styles.heading}>
        //   Awards
        // </div>
        // <ul className={styles.list}>
        //   {about.awards.map(text =><li>{text.text}</li>)}
        // </ul>
      }
      <section className={styles.section}>
        <motion.div variants={fadeInUp} className={styles.heading}>
          Capabilities
        </motion.div>
        <ul className={styles.capa}>
          {about.capabilities.map(capa =><motion.li variants={fadeInUp} key={capa.text}>{capa.text}</motion.li>)}
        </ul>
      </section>
      <section className={styles.section}>
        <motion.div variants={fadeInUp} className={styles.heading}>
          Say Hello
        </motion.div>
        <ul className={styles.contact}>
          {about.contact.map(item =><motion.li variants={fadeInUp} key={item.fieldId}><a href={item.url}>{item.name}</a></motion.li>)}
        </ul>
      </section>
    </motion.div>
  )
}
