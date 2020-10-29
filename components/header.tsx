import css from 'styled-jsx/css'
// import styles from "./layout.module.scss";
import Link from "next/link";
import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion";

const easing = [0.52, 0.8, 0.19, 0.85];
const container = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren", // childrenの処理前に実行
      // delayChildren: 0.6,
      staggerChildren: 0.17,
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

const lineY = {
  hidden: {
    scaleY: 0,
  },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const lineX = {
  hidden: {
    scaleX: 0,
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

function getStyles() {
  return css.resolve`
  .borders {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    pointer-events: none;
  }
  .borderTop {
    border-top: 1px solid #343434;
    transform-origin: 0% 50%;

    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .borderRight {
    border-right: 1px solid #343434;
    transform-origin: 50% 0%;

    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .borderLeft {
    border-left: 1px solid #343434;
    transform-origin: 50% 0%;

    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .borderBottom {
    border-bottom: 1px solid #343434;
    transform-origin: 0% 50%;

    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .bg {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    height: 100vh;
    width: 100%;
  }
  `
}

export default function Header( { home }) {
  const controls = useAnimation()
  const { className, styles } = getStyles(); 
  
  useEffect(() => {
    if (home) {
      controls.start(i => ({
        backgroundColor: '#000',
      }))
    } else {
      controls.start(i => ({
        backgroundColor: '#fff',
      }))
    }
  }, [ home ])

  return (
    <>
      <motion.div
        animate={controls}
        className={`${className} bg`}
      />
      <header className="header">
        <div className="headerItem">
          <ul>
            <li>
              <Link href="/">
                <a>TOP</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a>ABOUT</a>
              </Link>
            </li>
            <li>
              <Link href="/graveyard">
                <a>GRAVEYARD</a>
              </Link>
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
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={`${className} borders`}
        >
          <motion.div variants={lineX} className={`${className} borderTop`}></motion.div>
          <motion.div variants={lineY} className={`${className} borderLeft`}></motion.div>
          <motion.div variants={lineY} className={`${className} borderRight`}></motion.div>
          <motion.div variants={lineX} className={`${className} borderBottom`}></motion.div>
        </motion.div>
      </header>
      <style jsx>{`
        .header {
          position: fixed;
          z-index: 1;
          top: 0;
          left: 0;
          width: 90%;
          height: 50px;
          padding: 0 50px;

          pointer-events: none;
          display: flex;
          align-items: center;
        }

        @media all and (min-width: 480px) {
          .header {
            height: 90px;
            padding: 0 90px;
          }
        }

        .headerItem {
          pointer-events: auto;
        }

        ul {
          display: flex;
        }

        li {
          margin-right: 20px;
        }

        li a {
          font-family: "Oswald", sans-serif;
          font-weight: 300;
          font-size: 16px;
          letter-spacing: 0.12em;
          color: ${ home ? '#fff' : '#000' };
        }
      `}</style>
      {styles}
    </>
  );
}
