import Link from 'next/link'
import Layout from '../../components/layout'

export default function Experiments() {
  return (
    <Layout>
      <h1>Experiments</h1>
      <ul>
        <li>
          <Link href="/experiments/markdown"><a>markdown</a></Link>
        </li>
        <li>
          <Link href="/experiments/react-three-fiber"><a>react three fiber</a></Link>
        </li>
        <li>
          <Link href="/experiments/react-three-fiber-shader"><a>react three fiber shader</a></Link>
        </li>
      </ul>
    </Layout>
    )
}