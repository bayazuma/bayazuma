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
      </ul>
    </Layout>
    )
}