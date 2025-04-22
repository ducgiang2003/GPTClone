"use client"
import { useEffect, useState } from "react"

export default function Preloader() {
  const [dots, setDots] = useState(".")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "." : prev + "."))
    }, 300) 
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <div className="text-3xl font-bold">
        👌 Loading{dots}
      </div>
    </div>
  )
}
