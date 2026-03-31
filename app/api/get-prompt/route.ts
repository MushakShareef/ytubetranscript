import { supabase } from "@/lib/supabase"

export async function GET() {
  const { data } = await supabase
    .from("prompts")
    .select("*")
    .eq("name", "translation")
    .single()

  return Response.json(data)
}