import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  "https://jrfwklfbxafanrnvpaox.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyZndrbGZieGFmYW5ybnZwYW94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2ODg2NjYsImV4cCI6MjA5MDI2NDY2Nn0.6z1-uN1ZwBjpuG6zy0VjDFDV1jSSFFJZPv-qanc4iXA"
)