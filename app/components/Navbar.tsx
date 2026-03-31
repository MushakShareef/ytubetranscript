"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

export default function Navbar({ months }: { months: string[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  const [user, setUser] = useState<any>(null)

    useEffect(() => {
      const checkUser = () => {
        const u = localStorage.getItem("user")

        if (u) {
          setUser(JSON.parse(u))   // ✅ FIX HERE
        } else {
          setUser(null)
        }
      }

      checkUser()

      return () => {}
    }, [])

    if (user === null) return null  // wait for load
    if (!user) return null         // not logged in

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 20px",
      borderBottom: "1px solid #ddd",
      background: "#f7f5f2"
    }}>

      {/* LEFT → LOGO */}
      <img
        src="/shivababa.png"
        alt="Logo"
        style={{ height: "40px", objectFit: "contain" }}
      />

      {/* RIGHT → MENU */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>

        {/* SIGN IN (placeholder for now) */}
        
        
        {user && (
          <span style={{ color: "#6b4f3b" }}>
            Welcome {user.name}
          </span>
        )}

        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            localStorage.removeItem("user")
            window.location.href = "/login"
          }}
        >
          Logout
        </span>

        <Link href="/prompt">Prompt</Link>

        <div ref={ref} style={{ position: "relative" }}>
          <span onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
            2026 ▼
          </span>

          {open && (
            <div style={{
              position: "absolute",
              top: "25px",
              left: "0",
              border: "1px solid #ccc",
              padding: "10px",
              background: "#fff"
            }}>
              {months.map((m) => (
                <div key={m}>
                  <Link href={`/2026/${m}`}>
                    {m.toUpperCase()}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}