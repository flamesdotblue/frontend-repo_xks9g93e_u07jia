import React from 'react'
import { Sparkles, Mic, MessageSquare, Smile } from 'lucide-react'

function Features() {
  const items = [
    {
      icon: <Mic className="h-5 w-5" />,
      title: 'Hands‑free voice',
      desc: 'Start and stop with a tap. Dictate naturally with live transcription.',
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: 'Chat that feels human',
      desc: 'Friendly tone, short and clear replies, and gentle confirmations.',
    },
    {
      icon: <Smile className="h-5 w-5" />,
      title: 'Personality',
      desc: 'A warm, playful style with subtle humor to keep things delightful.',
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: 'No setup required',
      desc: 'Works in your browser using built‑in speech tech. No keys needed.',
    },
  ]

  return (
    <section id="features" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 text-center">
          Built for natural conversations
        </h2>
        <p className="mt-3 text-gray-600 text-center max-w-2xl mx-auto">
          Speak or type — your assistant answers in a friendly, helpful way.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((it, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                {it.icon}
              </div>
              <h3 className="mt-4 font-semibold text-lg">{it.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
