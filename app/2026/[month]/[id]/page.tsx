

import { supabase } from "@/lib/supabase"
import Link from "next/link"
import CopyBlock from "./CopyBlock"
import AuthGuard from "@/app/components/AuthGuard"



export default async function Page({ params }: any) {
  const { month,id } = await params

  const { data, error } = await supabase
    .from("transcripts")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !data) {
    return <h1>Content not found</h1>
  }





  return (
     <AuthGuard>
    <div style={{ padding: "20px" }}>

      <div style={{ marginBottom: "20px" }}>
        <Link href={`/2026/${month}`}>← Back</Link>
      </div>

      <h2>{data.title}</h2>

      
      {Array.isArray(data.content)
        ? data.content.map((para: string, i: number) => (
            <CopyBlock key={i} para={para} />
          ))
        : typeof data.content === "string"
        ? data.content
            .split(/\. |\n/)
            .filter(Boolean)
            .map((para: string, i: number) => (
              <CopyBlock key={i} para={para} />
            ))
      : null}

      <div style={{ marginBottom: "20px" }}>
        <Link href={`/2026/${month}`}>← Back</Link>
      </div>

    </div>
   </AuthGuard> 
  )
}