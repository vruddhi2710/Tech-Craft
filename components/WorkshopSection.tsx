export default function WorkshopSection() {
  return (
    <section id="workshops" className="py-24 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-10">
          Upcoming Workshops
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl border border-white/10 bg-slate-950">
            <h3 className="text-2xl font-bold text-cyan-400">
              AI Workshop
            </h3>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-slate-950">
            <h3 className="text-2xl font-bold text-cyan-400">
              Website Workshop
            </h3>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-slate-950">
            <h3 className="text-2xl font-bold text-cyan-400">
              Canva Masterclass
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}
