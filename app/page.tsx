"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"


export default function Page() {

  const router = useRouter()

useEffect(() => {
  const user = localStorage.getItem("user")
  if (!user) {
    router.push("/login")
  }
}, [])




useEffect(() => {
  const user = localStorage.getItem("user")

  if (!user) {
    router.push("/login")
    return
  }

  const checkIdle = () => {
    const last = localStorage.getItem("lastActive")
    const now = Date.now()

    if (last && now - Number(last) > 5 * 60 * 1000) {
      // 5 minutes
      localStorage.removeItem("user")
      router.push("/login")
    }
  }

  const updateActivity = () => {
    localStorage.setItem("lastActive", Date.now().toString())
  }

  // track activity
  window.addEventListener("click", updateActivity)
  window.addEventListener("keydown", updateActivity)

  // check every 10 seconds
  const interval = setInterval(checkIdle, 10000)

  // initial set
  updateActivity()

  return () => {
    clearInterval(interval)
    window.removeEventListener("click", updateActivity)
    window.removeEventListener("keydown", updateActivity)
  }
}, [])

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f7f5f2", // soft warm background
        textAlign: "center",
        padding: "20px"
      }}
    >
      {/* Welcome */}
      <h1
        style={{
          fontSize: "28px",
          color: "#6b4f3b",
          marginBottom: "10px",
          letterSpacing: "1px"
        }}
      >
        Welcome
      </h1>

      {/* Om Shanthi */}
      <h2
        style={{
          fontSize: "22px",
          color: "#8b6f47",
          marginBottom: "20px",
          fontWeight: "400"
        }}
      >
        Om Shanthi
      </h2>

      {/* Description */}
      <p
        style={{
          maxWidth: "400px",
          color: "#555",
          lineHeight: "1.6",
          fontSize: "14px"
        }}
      >
        This space is created to gently translate spiritual wisdom.
        Move slowly. Read with awareness. Translate with clarity.
      </p>
    </div>
  )
}