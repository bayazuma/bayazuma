import { useState, useEffect } from "react"

export default function Range({ id, name, min, max, step, defaultValue = '0', callback }) {
  const [range, setRange] = useState({ value: defaultValue })
  useEffect(() => {
    callback(Number(range.value))
  }, [ range ])
  return (
    <>
      <input
        type="range"
        id={id}
        name={name}
        min={min}
        max={max}
        step={step}
        value={range.value}
        onChange={(event) => setRange({value: event.target.value})}
      />
      <style jsx>{`
        input {
          border: 1px solid #0076fe;
        }
      `}</style>
    </>
  )
}
