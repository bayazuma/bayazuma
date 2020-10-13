import { useState, useEffect } from "react"

export default function Button({ name, onClick }) {
  return (
    <>
      <button onClick={onClick}>{name}</button>
      <style jsx>{`
        button {
          background: white;
          border: 1px solid gray;
          border-radius: 6px;
          padding: 0 12px;
          font-size: 12px;
        }
      `}</style>
    </>
  )
}
