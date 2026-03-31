import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  })
}

export async function POST(req: Request) {
  const { date, month, title, content } = await req.json()

  const { error } = await supabase.from("transcripts").insert([
    {
      date,
      month,
      title,
      content
    }
  ])

  if (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json(
    { success: true },
    {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }
  )
}