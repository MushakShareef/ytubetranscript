

import { supabase } from "@/lib/supabase"
import Link from "next/link"
import DeleteButton from "@/app/components/DeleteButton"
import AuthGuard from "@/app/components/AuthGuard"



export default async function Page({ params }: any) {
  const { month } = await params

  const formattedMonth =
    month.charAt(0).toUpperCase() + month.slice(1)

  const { data, error } = await supabase
    .from("transcripts")
    .select("*")
    .ilike("month", formattedMonth)
    .order("created_at", { ascending: true })

  if (error) {
    return <h1>Error loading data</h1>
  }



  return (
    <AuthGuard>
    <div style={{ padding: "20px" }}>

      {/* BACK BUTTON */}
      <div style={{ marginBottom: "20px" }}>
        <Link href="/">← Back</Link>
      </div>

      {/* HEADING */}
      <h1>{formattedMonth.toUpperCase()} 2026</h1>

      {/* LIST */}
      {data?.map((item: any, index: number) => {
        const date = new Date(item.created_at).toLocaleDateString("en-GB")

        return (
          <div
            key={item.id}
            style={{
              borderBottom: "1px solid #ddd",
              padding: "10px 0"
            }}
          >
            {/* Serial + Date */}
            <div style={{ fontSize: "14px", color: "gray" }}>
              {index + 1}. {date}
            </div>

            {/* Title */}
            <Link href={`/2026/${month}/${item.id}`}>
              {item.title}
            </Link>

            {/* Delete */}
            <div>
              <DeleteButton month={month} file={item.id} />
            </div>
          </div>
        )
      })}
    </div>
    </AuthGuard>
  )
}