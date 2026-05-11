import { Bot, Palette, Wand2 } from 'lucide-react'

const workshops = [
  {
    title: 'AI Workshop',
    desc: 'Create useful AI workflows with prompts, tools, and real examples.',
    icon: Bot,
  },
  {
    title: 'Website Workshop',
    desc: 'Design and build a modern responsive page from scratch.',
    icon: Wand2,
  },
  {
    title: 'Canva Masterclass',
    desc: 'Make polished posters, social posts, and brand visuals faster.',
    icon: Palette,
  },
]

export default function WorkshopSection() {
  return (
    <section id="workshops" className="relative bg-zinc-50 px-6 py-24 text-zinc-950">
      <div className="relative mx-auto max-w-7xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
          Short Sessions
        </p>
        <h2 className="mt-4 text-4xl font-black sm:text-5xl">
          Upcoming Workshops
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
          Fast, focused workshops for students who want to learn by making.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {workshops.map((workshop) => {
            const Icon = workshop.icon

            return (
              <div
                key={workshop.title}
                className="group rounded-xl border border-zinc-200 bg-white p-8 text-left shadow-xl shadow-zinc-200/70 transition duration-300 hover:-translate-y-2 hover:border-blue-200"
              >
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition group-hover:rotate-3 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-black text-zinc-950">
                  {workshop.title}
                </h3>
                <p className="mt-4 leading-7 text-zinc-600">
                  {workshop.desc}
                </p>
                <div className="mt-6 inline-flex rounded-md bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-blue-600">
                  Live Batch
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
