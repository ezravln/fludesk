import { getUserNotes } from "@/services/notes"
import { useEffect, useState } from "react"
import type { Note } from "@/types/note"
import { Label } from "@/components/ui/label"
import { Calendar, ListTodo, StickyNote } from "lucide-react"

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    const getNotes = async () => {
      try {
        const res = await getUserNotes()
        setNotes(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    getNotes()
  }, [])

  return (
    <div className="grid grid-rows-2 pb-3 gap-4 w-full min-h-full">
      <div className="w-full min-h-70 md:h-auto md:min-h-0 bg-white p-4 shadow-md rounded-xl">
        <div className="flex gap-1 items-center text-zinc-600">
          <Calendar size={18} />
          <Label className="text-md">Schedule</Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full min-h-60 md:h-full md:min-h-0 bg-white p-4 shadow-md rounded-xl">
          <div className="flex gap-1 items-center text-zinc-600">
            <ListTodo size={18} />
            <Label className="text-md">Todo</Label>
          </div>
        </div>

        <div className="w-full min-h-60 md:h-full md:min-h-0 bg-white p-4 shadow-md rounded-xl">
          <div className="flex gap-1 items-center text-zinc-600">
            <StickyNote size={18} />
            <Label className="text-md">Notes</Label>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            {notes.map((note) => (
              <div
                key={note.id}
                className="group overflow-hidden cursor-pointer rounded-lg border border-zinc-100 bg-zinc-50/60 px-3 py-2.5 transition-colors hover:bg-zinc-100/70"
              >
                <h3 className="truncate text-sm font-medium text-zinc-800">
                  {note.title}
                </h3>

                <p className="mt-0.5 truncate text-xs leading-5 text-zinc-500">
                  {note.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  )
}
