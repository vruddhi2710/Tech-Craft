import { Clock, MapPin, Phone, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-gradient-to-br from-slate-950 via-slate-900 to-[#041e57] text-white py-16"
    >
      <div className="w-[98%] max-w-[1800px] mx-auto px-4 md:px-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.8)] backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-200 mb-4">Quick Links</h3>
              <div className="space-y-3">
                {['Home', 'About Us', 'Services', 'Training', 'Contact'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    </div>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm font-medium text-slate-200 transition hover:text-cyan-300"
                    >
                      {item}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-200 mb-4">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-300">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="leading-5 text-sm text-slate-200">
                    Ajramar House, 7 Shivalik Plaza, IIM Road, Polytechnic,
                    <br /> Opp. Ahmedabad Management Association (AMA),
                    <br /> Ahmedabad, Gujarat – 380015
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                    <Phone className="h-4 w-4" />
                  </div>
                  <a href="tel:8849870596" className="text-sm font-medium text-white transition hover:text-cyan-300">
                    8849870596
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-300">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <a href="mailto:techcraft1999@gmail.com" className="text-sm font-medium text-white transition hover:text-cyan-300">
                    techcraft1999@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-200 mb-4">Services</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-300">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <a
                    href="https://g.co/kgs/ZUPBRbh"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-slate-200 transition hover:text-cyan-300"
                  >
                    View on Google Maps
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                    <Phone className="h-4 w-4" />
                  </div>
                  <a
                    href="tel:8849870596"
                    className="text-sm font-medium text-slate-200 transition hover:text-cyan-300"
                  >
                    Call Us Today
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-300">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="leading-5 text-sm text-slate-200">
                    <p className="font-medium">10.30 AM - 06.30 PM</p>
                    <p className="text-slate-400">
                      Monday - Saturday
                      <br /> 24/7 Support Available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 text-center text-slate-300 sm:mt-16">
            Tech-Craft | Copyright © 2026. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
