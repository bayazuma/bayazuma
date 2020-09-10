import Layout from '../components/layout'
import fetch from 'node-fetch'
import Works from '../components/works';
import { GetStaticProps } from 'next'

export default function Home(data : {
  contents: any[]
  totalCount: number
  offset: number 
  limit: number 
}) {
  return (
    <Layout home>
      <Works list={data.contents}/>
    </Layout>
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
