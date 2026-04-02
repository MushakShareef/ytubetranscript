"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { checkLogin } from "../utils/checkLogin"

  type Prompt = {
      id: string
      name: string
      content: string
    }



export default function Page() {
  
  const [prompt, setPrompt] = useState("Loading...")


  const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)

      setTimeout(() => setCopied(false), 2000)
    }

  
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [selected, setSelected] = useState("")

  useEffect(() => {
    fetch("/api/get-prompt")
      .then(res => res.json())
      .then(res => {
        const list = res.data
        setPrompts(list)

        if (list.length > 0) {
          setSelected(list[0].name)
          setPrompt(list[0].content)
        }
      })
  }, [])

    const router = useRouter()
  
      useEffect(() => {
        checkLogin(router)
      }, [])


  return (
    <div style={{ padding: "20px" }}>
      <h1>Translation Prompt</h1>

      <select
        value={selected}
        onChange={(e) => {
          const name = e.target.value
          setSelected(name)

          const found = prompts.find((p: Prompt) => p.name === name)
          setPrompt(found?.content || "")
        }}
      >
        {prompts.map((p) => (
          <option key={p.id} value={p.name}>
            {p.name}
          </option>
        ))}
      </select>

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