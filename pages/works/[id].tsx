import Meta from '../../components/meta'
import fetch from 'node-fetch'
import WorkComponent from '../../components/work';
import { GetStaticProps, GetStaticPaths } from 'next'

export default function Work(data: {
  id: string
  body: any[]
  title: string
  website: string
  createdAt: string
  publishedAt: string
  updatedAt: string
}) {
  // console.log(data)
  return (
    <>
      <Meta />
      <WorkComponent work={data} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible value for id
  const res = await fetch("https://takabanana.microcms.io/api/v1/works?fields=id", {
    headers: {
      "X-API-KEY": "8ea86fa9-0ae8-4571-a441-5f1f7bb938ff"
    }
  })
  const json = await res.json()
  const paths = json.contents.map((item: { id: string }) => {
    return {
      params: {
        id: item.id
      }
    }
  })
  // paths: [
  //   {
  //     params: {
  //       id: 'ifmtr6nim'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'xbdte5h4w'
  //     }
  //   },
  // ]

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // console.log(params)
  const res = await fetch(`https://takabanana.microcms.io/api/v1/works/${params.id}`, {
    headers: {
      "X-API-KEY": "8ea86fa9-0ae8-4571-a441-5f1f7bb938ff"
    }
  })
  const json = await res.json()
  return {
    props: {
      ...json
    },
  }
}