"use client"

export default function DeleteButton({ month, file }: any) {

  const user = JSON.parse(localStorage.getItem("user") || "null")

  if (!user || user.role !== "admin") return null

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure?")
    if (!confirmDelete) return

    await fetch("/api/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file })
    })

    location.reload()
  }

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  )
}