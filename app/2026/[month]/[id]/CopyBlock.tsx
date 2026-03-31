"use client"

import { useState } from "react"

export default function CopyBlock({ para }: { para: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(para)
    setCopied(true)

    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <p>{para}</p>

      <button onClick={handleCopy}>
        {copied ? "Copied ✓" : "Copy"}
      </button>
    </div>
  )
}