import { getUserNotes } from "@/services/notes"
import { useEffect, useState } from "react"
import type { Note } from "@/types/note"
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ListTodo,
  StickyNote,
  Sparkles,
} from "lucide-react"
import type { Schedule } from "@/types/schedule"

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([])
  const [schedule, setSchedule] = useState<Schedule[]>([])

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

  const today = new Date()

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="w-full space-y-3 pb-3">

      {/* Stats */}
      <section className="flex gap-3 overflow-x-auto scrollbar-none">

        {/* Notes */}
        <div className="min-w-42.5 flex-1 rounded-xl bg-white p-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50">
              <StickyNote size={17} className="text-zinc-600" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-medium text-zinc-400">
                Notes
              </p>

              <p className="mt-0.5 text-xl font-semibold tracking-tight text-zinc-900">
                {notes.length}
              </p>
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="min-w-42.5 flex-1 rounded-xl bg-white p-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50">
              <ListTodo size={17} className="text-zinc-600" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-medium text-zinc-400">
                Completed
              </p>

              <p className="mt-0.5 text-xl font-semibold tracking-tight text-zinc-900">
                8
                <span className="ml-1 text-xs font-normal text-zinc-400">
                  / 12
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="min-w-42.5 flex-1 rounded-xl bg-white p-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50">
              <Calendar size={17} className="text-zinc-600" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-medium text-zinc-400">
                Upcoming
              </p>

              <p className="mt-0.5 text-xl font-semibold tracking-tight text-zinc-900">
                {schedule.length}
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* Main content */}
      <section className="grid grid-cols-1 gap-3 lg:grid-cols-5">

        {/* Notes */}
        <div className="rounded-xl bg-white p-5 lg:col-span-3">

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <StickyNote size={17} className="text-zinc-500" />
                <h2 className="text-sm font-semibold text-zinc-800">
                  Recent notes
                </h2>
              </div>

              <p className="mt-1 text-xs text-zinc-400">
                Your latest thoughts and ideas.
              </p>
            </div>

            <button className="flex items-center gap-1 text-xs font-medium text-zinc-500 transition hover:text-zinc-900">
              View all
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            {notes.length > 0 ? (
              notes.slice(0, 5).map((note) => (
                <div
                  key={note.id}
                  className="group cursor-pointer rounded-lg border border-zinc-100 bg-zinc-50/50 px-3.5 py-3 transition-all hover:border-zinc-200 hover:bg-zinc-50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="truncate text-sm font-medium text-zinc-800">
                      {note.title}
                    </h3>

                    <ChevronRight
                      size={14}
                      className="shrink-0 text-zinc-300 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-500"
                    />
                  </div>

                  <p className="mt-1 truncate text-xs leading-5 text-zinc-500">
                    {note.note}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex min-h-40 items-center justify-center rounded-lg border border-dashed border-zinc-200 bg-zinc-50/40">
                <div className="text-center">
                  <StickyNote
                    size={20}
                    className="mx-auto text-zinc-300"
                  />

                  <p className="mt-2 text-xs font-medium text-zinc-500">
                    No notes yet
                  </p>

                  <p className="mt-1 text-[11px] text-zinc-400">
                    Start writing something.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Schedule */}
        <div className="rounded-xl bg-white p-5 lg:col-span-2">

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Calendar size={17} className="text-zinc-500" />
                <h2 className="text-sm font-semibold text-zinc-800">
                  Schedule
                </h2>
              </div>

              <p className="mt-1 text-xs text-zinc-400">
                What is coming next.
              </p>
            </div>

            <button className="flex items-center gap-1 text-xs font-medium text-zinc-500 transition hover:text-zinc-900">
              Calendar
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="mt-5 space-y-2">

            <div className="flex gap-3 rounded-lg border border-zinc-100 bg-zinc-50/50 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white">
                <Clock3 size={15} className="text-zinc-500" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-zinc-700">
                  Team meeting
                </p>

                <p className="mt-1 text-[11px] text-zinc-400">
                  10:00 AM · Today
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-lg border border-zinc-100 bg-zinc-50/50 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white">
                <Clock3 size={15} className="text-zinc-500" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-zinc-700">
                  Finish project
                </p>

                <p className="mt-1 text-[11px] text-zinc-400">
                  02:30 PM · Today
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-lg border border-zinc-100 bg-zinc-50/50 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white">
                <Calendar size={15} className="text-zinc-500" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-zinc-700">
                  Project review
                </p>

                <p className="mt-1 text-[11px] text-zinc-400">
                  Tomorrow · 09:00 AM
                </p>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Bottom */}
      <section className="grid grid-cols-1 gap-3 md:grid-cols-2">

        {/* Progress */}
        <div className="rounded-xl bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-zinc-800">
                Today's progress
              </h2>

              <p className="mt-1 text-xs text-zinc-400">
                Keep going, you're almost there.
              </p>
            </div>

            <span className="text-sm font-semibold text-zinc-700">
              67%
            </span>
          </div>

          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-zinc-100">
            <div className="h-full w-[67%] rounded-full bg-zinc-800" />
          </div>

          <div className="mt-4 flex justify-between text-[11px] text-zinc-400">
            <span>8 completed</span>
            <span>4 remaining</span>
          </div>
        </div>

        {/* Focus */}
        <div className="rounded-xl bg-white p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-zinc-500" />
                <h2 className="text-sm font-semibold text-zinc-800">
                  Focus
                </h2>
              </div>

              <p className="mt-1 text-xs text-zinc-400">
                Your next priority.
              </p>
            </div>

            <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-[10px] font-medium text-zinc-500">
              Priority
            </span>
          </div>

          <div className="mt-5">
            <p className="text-base font-medium tracking-tight text-zinc-800">
              Finish the frontend dashboard
            </p>

            <p className="mt-1 text-xs leading-5 text-zinc-400">
              Continue working on the home experience and prepare it for
              review.
            </p>
          </div>
        </div>

      </section>
    </div>
  )
}
