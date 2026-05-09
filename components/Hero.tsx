export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-7xl grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="hero-title text-5xl md:text-7xl font-bold leading-tight">
            Build Your Future With AI & Tech Skills
          </h1>

          <p className="mt-6 text-slate-300 text-lg">
            Learn ReactJS, Python, AI & Web Design with real projects.
          </p>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            alt="students"
            className="rounded-3xl"
          />
        </div>
      </div>
    </section>
  )
}
