import React from 'react'
import Spline from '@splinetool/react-spline'

function Hero({ onPrimaryAction }) {
  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/AeAqaKLmGsS-FPBN/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs md:text-sm backdrop-blur">
          <span className="inline-block h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
          Live voice + chat assistant
        </div>
        <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
          Meet your friendly AI voice companion
        </h1>
        <p className="mt-4 md:mt-6 text-base md:text-lg text-white/80 max-w-2xl mx-auto">
          A playful, human-like assistant that talks, listens, and helps you get things done. Try speaking to it — it feels natural.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={onPrimaryAction}
            className="rounded-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 md:px-8 md:py-3.5 font-semibold shadow-lg shadow-orange-500/20 transition"
          >
            Start talking
          </button>
          <a
            href="#features"
            className="rounded-full bg-white/10 hover:bg-white/20 text-white px-6 py-3 md:px-8 md:py-3.5 font-semibold transition"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
