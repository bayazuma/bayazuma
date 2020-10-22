import Link from 'next/link'
import Layout from '../../components/layout'

export default function Graveyard() {
  return (
    <Layout>
      <h1>「ボ地。」</h1>
      <p>諸事情により採用されなかったボツアイデアのお墓です。</p>
      <ul>
        <li>
          <Link href="/graveyard/transition-rotate"><a>回転トランジション</a></Link>
        </li>
        <li>
          <Link href="/graveyard/daily-calendar"><a>日めくりカレンダー</a></Link>
        </li>
        <li>
          <Link href="/graveyard/cold-air"><a>冷気パーティクル</a></Link>
        </li>
        <li>
          <Link href="/graveyard/freezer"><a>イメージ冷凍</a></Link>
        </li>
        <li>
          <Link href="/graveyard/bg-water"><a>ハーフ水</a></Link>
        </li>
      </ul>
      <style jsx>{`
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
        ul {

        }
        li a {
          font-family: "Nico Moji", "M PLUS Rounded 1c", sans-serif;
          font-weight: 100;
          font-size: 7vw;
          color: #828282;
        }
      `}</style>
    </Layout>
    )
}