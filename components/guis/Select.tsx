import { useState, useEffect } from "react"

export default function Select({ id, name, children }) {
  const [select, setSelect] = useState({ value: ''})
  useEffect(() => {
    console.log(select.value)
  }, [ select ])

  return (
    <>
      <select
        id={id}
        name={name}
        onChange={(event) => setSelect({ value: event.target.value })}
      >
        {children}
      </select>
    </>
  )
}
