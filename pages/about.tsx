import fetch from 'node-fetch'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import AboutComponent from '../components/about';

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
    <Layout home>
      <Head>
        <title>ABOUT</title>
      </Head>
      <AboutComponent about={props} />
    </Layout>
    )
}