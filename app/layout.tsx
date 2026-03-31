import "./globals.css"
import Navbar from "./components/Navbar"
import fs from "fs"
import path from "path"

export default function RootLayout({ children }: any) {

  // Read months from folder
  const dir = path.join(process.cwd(), "app/data/2026")
  let months: string[] = []

  if (fs.existsSync(dir)) {
        const monthOrder = [
      "january", "february", "march", "april",
      "may", "june", "july", "august",
      "september", "october", "november", "december"
    ]

    if (fs.existsSync(dir)) {
      const folders = fs.readdirSync(dir)

      months = folders.sort(
        (a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)
      )
    }
  }

  return (
    <html>
      <link rel="manifest" href="/manifest.json" />
      <body>
        <Navbar months={months} />
        {children}
      </body>
    </html>
  )
}