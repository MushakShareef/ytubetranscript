"use client"

export default function DeleteButton({ month, file }: any) {

  const handleDelete = async () => {

      const confirmDelete = confirm("Are you sure you want to delete this file?")

      if (!confirmDelete) return

      await fetch("/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ month, file })
      })

      location.reload()
    }

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  )
}