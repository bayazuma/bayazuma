import { useRef, Children } from "react"

export default function Gui(props) {
  const container = useRef<HTMLDivElement>(null)
  const handleDragStart = (event) => {
    window.addEventListener('mousemove', onMouseMove)
  }
  const handleDragEnd = (event) => {
    window.removeEventListener('mousemove', onMouseMove)
  }
  const onMouseMove = (event) => {
    container.current.style.left = `${event.clientX}px`
    container.current.style.top = `${event.clientY}px`
  }

  return (
    <div className="container" ref={container}>
      <div className="corner" onMouseDown={handleDragStart} onMouseUp={handleDragEnd}>
      </div>
      {Children.map(props.children, (child) => {
          console.log(child)
          return (
            <div className="item">
              <label htmlFor={child.props.id}>{child.props.name}</label>
              {child}
            </div>
          )
        }
      )}
      <style jsx>{`
        .container {
          position: fixed;
          display: inline-block;
          background-color: black;
        }
        .corner {
          background: gray;
          height: 12px;
          width: 100%;
          cursor: grab;
        }
        .item {
          padding: 6px 12px;
          border-bottom: 1px solid white;
        }
        label {
          color: white;
          margin-right: 12px;
          font-size: 11px;
        }
      `}</style>
    </div>
  )
}

// 例
// import Gui from '../../components/guis/Gui';
// <Gui>
//   <Color id='cr' name='cr' />
//   <Checkbox id='ck' name='ck'/>
//   <Range id='rg' name='rg' min="0.0" max="1.0" step="0.1" />
//   <Select id='slc' name='lc'>
//     <option value={1}>1</option>
//     <option value={2}>2</option>
//     <option value={3}>3</option>
//   </Select>
// </Gui>