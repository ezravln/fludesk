export default function Home() {
  return (
    <section className="mx-auto flex min-h-[80vh] w-full max-w-7xl items-center px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl">
          Organize Your Work.
          <br className="hidden sm:block" />
          <span className="block">Focus on What Matters.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
          Fludesk combines kanban boards, notes, and scheduling into one
          beautiful workspace designed for everyday productivity.
        </p>
      </div>
    </section>
  )
}
