import fs from "fs"
import path from "path"
import Link from "next/link"

export default async function Page({ params }: any) {
  const { month } = await params

  const dir = path.join(
    process.cwd(),
    "app/data/2026",
    month
  )

  if (!fs.existsSync(dir)) {
    return <h1>No data for this month</h1>
  }

  const files = fs.readdirSync(dir)

  return (
    <div style={{ padding: "20px" }}>
      <h1>{month.toUpperCase()} 2026</h1>

      {files.map((file) => (
        <div key={file}>
          <Link href={`/2026/${month}/${file.replace(".json", "")}`}>
            {file}
          </Link>
        </div>
      ))}
    </div>
  )
}