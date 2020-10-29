import Link from 'next/link'
import { motion } from 'framer-motion'
import css from 'styled-jsx/css'

function getStyles() {
  return css.resolve`
  .container {
    margin-top: 90px;
    padding: 0 16px;
    overflow: hidden;
  }
  @media all and (min-width: 480px) {
    .container {
      margin-top: 180px;
      padding: 0 90px;
    }
  }
  .bg {
    position: 'fixed';
    z-index: -1;
    top: 0;
    left:0;
    width: '100%';
    height: '100vh';
  }
  h1 {
    font-family: "Nico Moji", "M PLUS Rounded 1c", sans-serif;
    font-size: 11vw;
    font-weight: 600;
    text-align: center;
  }
  p {
    font-family: "Nico Moji", "M PLUS Rounded 1c", sans-serif;
    font-weight: 100;
    font-size: 7vw;
    font-weight: 300;
    margin-bottom: 50px;
  }
  `
}


const easing = [0.52, 0.8, 0.19, 0.85];
const container = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren", // childrenの処理前に実行
      // delayChildren: 0.6,
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
};

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  hidden: {
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

export default function Graveyard() {
  const { className, styles } = getStyles(); 

  return (
    <>
    <motion.div
      variants={container}
      initial="initial"
      animate="visible"
      exit="hidden"
      className={`${className} container`}
    >
      <motion.h1 className={`${className}`} variants={fadeInUp}>「ボ地。」</motion.h1>
      <motion.p className={`${className}`} variants={fadeInUp}>
      諸事情により採用されなかったボツアイデアのお墓です。
      </motion.p>
      <ul>
        <motion.li className={`${className}`} variants={fadeInUp}>
          <Link href="/graveyard/transition-rotate"><a>回転トランジション</a></Link>
        </motion.li>
        <motion.li className={`${className}`} variants={fadeInUp}>
          <Link href="/graveyard/daily-calendar"><a>日めくりカレンダー</a></Link>
        </motion.li>
        <motion.li className={`${className}`} variants={fadeInUp}>
          <Link href="/graveyard/cold-air"><a>冷気パーティクル</a></Link>
        </motion.li>
        <motion.li className={`${className}`} variants={fadeInUp}>
          <Link href="/graveyard/freezer"><a>イメージ冷凍</a></Link>
        </motion.li>
        <motion.li className={`${className}`} variants={fadeInUp}>
          <Link href="/graveyard/bg-water"><a>ハーフ水</a></Link>
        </motion.li>
      </ul>

      <style jsx>{`
        a {
          font-family: "Nico Moji", "M PLUS Rounded 1c", sans-serif;
          font-weight: 100;
          font-size: 7vw;
          color: #828282;
        }
      `}</style>
      {styles}
    </motion.div>
  </>
  )
}