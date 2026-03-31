"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { checkLogin } from "../utils/checkLogin"


export default function Page() {
  
  const [prompt, setPrompt] = useState("Loading...")


  const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)

      setTimeout(() => setCopied(false), 2000)
    }

  useEffect(() => {
    fetch("/api/get-prompt")
      .then(res => res.json())
      .then(data => {
        setPrompt(data.content)
      })
  }, [])

    const router = useRouter()
  
      useEffect(() => {
        checkLogin(router)
      }, [])
  
  




  return (
    <div style={{ padding: "20px" }}>
      <h1>Translation Prompt</h1>

      <textarea
        value={prompt}
        readOnly
        style={{ width: "100%", height: "200px" }}
      />

      <br /><br />

      
      <button onClick={handleCopy}>
        Copy Prompt
      </button>

      {copied && (
        <div style={{ color: "green", marginTop: "10px" }}>
          Copied!
        </div>
      )}

      <button
        onClick={() => router.push("/")}
        style={{ display: "block", marginTop: "20px" }}
      >
        ← Back
      </button>
    </div>
  )
}