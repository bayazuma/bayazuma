import fetch from 'node-fetch'
import Head from 'next/head'
import AboutComponent from '../components/about';
import { motion } from 'framer-motion';

export async function getStaticProps() {
  const res = await fetch("https://takabanana.microcms.io/api/v1/profile", {
    headers: {
      "X-API-KEY": "8ea86fa9-0ae8-4571-a441-5f1f7bb938ff",
    }
  })
  const json = await res.json()
  // console.log(json)
  return {
    props: json,
  }
}

export default function About(props) {
  return (
    <>
      <Head>
        <title>ABOUT</title>
      </Head>
      <div className='container'>
        <motion.div exit={{ opacity: 0 }}>
          <AboutComponent about={props} />
        </motion.div>
      </div>
      <style jsx>{`
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
    `}</style>
    </>
  )
}