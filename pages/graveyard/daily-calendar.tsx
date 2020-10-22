import { useState, useEffect } from "react"
import DailyCalendar from "../../lib/controller/DailyCalendar"
import ImageLoader from "../../lib/loaders/ImageLoader"
import Gui from "../../components/guis/Gui"
import Range from '../../components/guis/Range'
import Checkbox from '../../components/guis/Checkbox';
import Button from '../../components/guis/Button';

let anim: DailyCalendar

export default function DailyCalendarPage() {
  // didmount
  useEffect(() => {
    const el = document.querySelector('[data-scene="DailyCalendar"]') as HTMLCanvasElement
    anim = new DailyCalendar(el)
  }, [])

  const play10 = () => {
    anim.play10(() => {
      console.log('10');
    })
  }
  const play20 = () => {
    anim.play20(() => {
      console.log('20');
    })
  }
  const play25 = () => {
    anim.play25(() => {
      console.log('25');
    })
  }
  const play30 = () => {
    anim.play30()
  }
  const reverse30 = () => {
    anim.reverse30()
  }
  const reverse25 = () => {
    anim.reverse25()
  }
  const reverse20 = () => {
    anim.reverse20()
  }
  const reverse10 = () => {
    anim.reverse10()
  }

  return (
    <>
      <Gui>
        <Button name='play10' onClick={play10} />
        <Button name='play20' onClick={play20} />
        <Button name='play25' onClick={play25} />
        <Button name='play30' onClick={play30} />
        <Button name='reverse30' onClick={reverse30} />
        <Button name='reverse25' onClick={reverse25} />
        <Button name='reverse20' onClick={reverse20} />
        <Button name='reverse10' onClick={reverse10} />
      </Gui>
      <div className="wrap" data-scene="DailyCalendar">
        <div className="container">
          <div className="heading">
            日めくり
          </div>
          <div className="body js-body">
            <div className="day js-day30">
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day30</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day29</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day28</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day27</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day26</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day25</div>
              </div>
            </div>
            <div className="day js-day25">
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day24</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day23</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day22</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day21</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day20</div>
              </div>
            </div>
            <div className="day js-day20">
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day19</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day18</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day17</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day16</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day15</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day14</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day13</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day12</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day11</div>
              </div>
            </div>
            <div className="day js-day10">
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day9</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day8</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day7</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day6</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day5</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day4</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day3</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day2</div>
              </div>
              <div className="page">
                <img src="/images/profile.jpg" />
                <div className="label">Day1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
          .wrap {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
          }
          .container {
            width: 40%;
          }
          .heading {
            font-family: "Nico Moji", "M PLUS Rounded 1c", sans-serif;
            width: 100%;          
            padding: 1.5vh 0;
            text-align: center;
            font-size: 4vh;
            font-weight: bold;
            background-color: #d55260;
            color: white;
          }
          .body {
            position: relative;
          }
          .page {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
            width: 100%;
          }
          .label {
            font-family: "Nico Moji", "M PLUS Rounded 1c", sans-serif;
            position: absolute;
            z-index: 10;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 10vh;
            color: #d55260;
            font-weight: bold;
          }
          img {
            display: block;
            width: 100%;
          }
        `}</style>
    </>
  )
}
