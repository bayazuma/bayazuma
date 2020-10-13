import { useState, useEffect } from "react"

export default function Color({ id, name }) {
  const [color, setColor] = useState({ value: '#FFFFFF'})
  useEffect(() => {
    console.log(color.value)
  }, [ color ])

  return (
    <>
      <input type="color" id={id} name={name} value={color.value} onChange={(event) => setColor({value: event.target.value})}/>
    </>
  )
}
