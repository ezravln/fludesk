import CalendarImage from "@/assets/Calendar.png"
import KanbanImage from "@/assets/Kanban.png"
import NotesImage from "@/assets/Notes.png"

const cards = [
  {
    title: "Kanban Boards",
    desc: "Plan projects visually with drag-and-drop boards that keep every task organized.",
    className: "md:col-span-12 min-h-[340px] md:h-[380px]",
    image: KanbanImage,
  },
  {
    title: "Quick Notes",
    desc: "Capture ideas, meeting notes, and important information in seconds.",
    className: "md:col-span-6 min-h-[320px]",
    image: NotesImage,
  },
  {
    title: "Smart Scheduling",
    desc: "Stay on top of your day with a clean and intuitive scheduling experience.",
    className: "md:col-span-6 min-h-[320px]",
    image: CalendarImage,
  },
]

export default function Features() {
  return (
    <section id='feature' className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-2">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-12">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`${card.className}
            group
            relative
            overflow-hidden
            rounded-[28px]
            border
            border-zinc-200/80
            bg-white
            p-6
            md:p-8
            shadow-lg
            shadow-zinc-950/5
            transition-all
            duration-500
            hover:-translate-y-1
            hover:shadow-2xl`}
          >
            {/* Content */}
            <div className="relative z-10 max-w-sm">
              <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">
                {card.title}
              </h3>

              <p className="mt-3 leading-7 text-zinc-600">
                {card.desc}
              </p>
            </div>

            {/* Screenshot */}
            <img
              src={card.image}
              alt={card.title}
              draggable={false}
              className="
                absolute
                -bottom-8
                md:-right-15
                w-full
                rounded-xl
                md:rounded-4xl
                shadow-2xl
                transition-all
                duration-700
                group-hover:translate-x-2
                group-hover:-translate-y-2
                group-hover:rotate-2
                group-hover:scale-105

                md:-bottom-10
                md:w-[68%]
              "
            />

          </div>
        ))}
      </div>
    </section>
  )
}
