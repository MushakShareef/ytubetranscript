"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [mobile, setMobile] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  // ✅ HARD CODED NUMBERS
  const allowedUsers = [
    { mobile: "7010239825", name: "BK Ameer", role: "user" },
    { mobile: "9865689156", name: "BK Mushak Shareef", role: "admin" },
    { mobile: "7200676464", name: "BK Sugguna", role: "user" },
    { mobile: "9952060058", name: "BK Chithra", role: "user" },
  ]

  const handleLogin = () => {
    const user = allowedUsers.find(u => u.mobile === mobile)
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
      window.location.href = "/"
    } else {
      setError("Access denied")
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f7f5f2"
    }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ color: "#6b4f3b", marginBottom: "10px" }}>
          Enter Mobile Number
        </h2>

        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Enter mobile number"
          style={{
            padding: "12px",
            marginTop: "15px",
            width: "250px",
            border: "1px solid #999",
            borderRadius: "6px",
            fontSize: "14px",
            color: "#000",
            background: "#fff"
          }}
        />

        <br /><br />

        <button
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            background: "#4a7c59",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Login
        </button>

        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>
            {error}
          </div>
        )}
      </div>
    </div>
  )
}