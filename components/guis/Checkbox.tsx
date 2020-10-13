import { useState, useEffect } from "react"

export default function Checkbox({ id, name, defaultValue = false, callback }) {
  const [check, setCheck] = useState({ value: defaultValue })
  useEffect(() => {
    callback(check.value)
  }, [ check ])

  return (
    <>
      <input type="checkbox" id={id} name={name} value={1} checked={check.value} onChange={(event) => setCheck({value: event.target.checked })}/>
    </>
  )
}
