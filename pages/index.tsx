import fetch from 'node-fetch'
import Works from '../components/works';
import { GetStaticProps } from 'next'
import { motion } from 'framer-motion';

export default function Home(data : {
  contents: any[]
  totalCount: number
  offset: number 
  limit: number 
}) {
  return (
    <>
    <div className='container'>
      <motion.div exit={{ opacity: 0 }}>
        <Works list={data.contents}/>
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

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://takabanana.microcms.io/api/v1/works", {
    headers: {
      "X-API-KEY": "8ea86fa9-0ae8-4571-a441-5f1f7bb938ff"
    }
  })
  const json = await res.json()
  // console.log(json)

  return {
    props: {
      ...json
    },
  }
}
