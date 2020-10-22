import { useState, useEffect } from "react"

export default function Color({ id, name, defaultValue, callback }) {
  const [color, setColor] = useState({ value: defaultValue })
  useEffect(() => {
    callback(color.value)
  }, [ color ])

  return (
    <>
      <input
        type="color"
        id={id}
        name={name}
        value={color.value}
        onChange={(event) => setColor({value: event.target.value})}/>
    </>
  )
}
