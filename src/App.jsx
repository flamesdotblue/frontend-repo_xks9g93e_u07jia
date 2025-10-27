import React, { useCallback, useMemo, useRef, useState } from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import ChatWindow from './components/ChatWindow'
import VoiceControls from './components/VoiceControls'

function App() {
  const [messages, setMessages] = useState([])
  const [interim, setInterim] = useState('')
  const [speaking, setSpeaking] = useState(false)
  const synthRef = useRef(null)

  const ensureSynth = () => {
    if (typeof window === 'undefined') return null
    if (!('speechSynthesis' in window)) return null
    if (!synthRef.current) synthRef.current = window.speechSynthesis
    return synthRef.current
  }

  const speak = useCallback((text) => {
    const synth = ensureSynth()
    if (!synth || !text) return
    try {
      if (synth.speaking) synth.cancel()
      const utter = new SpeechSynthesisUtterance(text)
      utter.rate = 1
      utter.pitch = 1.05
      utter.volume = 1
      utter.onstart = () => setSpeaking(true)
      utter.onend = () => setSpeaking(false)
      synth.speak(utter)
    } catch (_) {
      // Ignore TTS errors
    }
  }, [])

  const generateAssistantReply = useCallback((userText) => {
    const timeOfDay = (() => {
      const h = new Date().getHours()
      if (h < 12) return 'morning'
      if (h < 18) return 'afternoon'
      return 'evening'
    })()

    const lower = userText.toLowerCase()
    if (lower.includes('hello') || lower.includes('hi')) {
      return `Hey there! Hope your ${timeOfDay} is going well. How can I help?`
    }
    if (lower.includes('name')) {
      return "I'm your friendly voice companion. I listen, think, and reply like a human."
    }
    if (lower.includes('time')) {
      const now = new Date().toLocaleTimeString()
      return `Right now it's ${now}. Anything you'd like to plan or do?`
    }
    if (lower.includes('joke')) {
      return "Here’s a tiny joke: Why did the developer go broke? Because they used up all their cache."
    }
    if (lower.endsWith('?')) {
      return "Good question! Here’s my quick take: I’d keep it simple and focus on the next small step. Want me to break it down?"
    }
    return "Got it. I’m here and listening. Tell me more, or ask me anything."
  }, [])

  const handleSend = useCallback((text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const next = [...messages, { role: 'user', content: trimmed }]
    const reply = generateAssistantReply(trimmed)
    const withReply = [...next, { role: 'assistant', content: reply }]
    setMessages(withReply)
    speak(reply)
    setInterim('')
  }, [messages, generateAssistantReply, speak])

  const handleTranscript = useCallback((partial) => setInterim(partial), [])
  const handleFinalTranscript = useCallback((finalText) => {
    if (finalText && finalText.trim()) handleSend(finalText)
  }, [handleSend])

  const primaryAction = useCallback(() => {
    // Focus the chat by adding a friendly nudge message if empty
    if (messages.length === 0) {
      const msg = 'Try asking me anything — for example: “Plan a 2‑day Tokyo trip.”'
      setMessages((m) => [...m, { role: 'assistant', content: msg }])
      speak(msg)
    }
    const el = document.getElementById('chat-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, speak])

  const composedMessages = useMemo(() => {
    return interim
      ? [...messages, { role: 'user', content: interim + ' …' }]
      : messages
  }, [messages, interim])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Hero onPrimaryAction={primaryAction} />

      <main className="container mx-auto px-6 -mt-16 md:-mt-24 relative z-10">
        <section id="chat-section" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChatWindow messages={composedMessages} onSend={handleSend} />
            <div className="mt-4">
              <VoiceControls
                onTranscript={handleTranscript}
                onFinalTranscript={handleFinalTranscript}
                isSpeaking={speaking}
              />
            </div>
          </div>
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-gray-200 p-6 sticky top-6">
              <h3 className="font-semibold text-lg">Tips</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc pl-4">
                <li>Speak clearly and at a natural pace.</li>
                <li>Ask follow‑ups like you would with a person.</li>
                <li>Say “tell me a joke” for a quick smile.</li>
                <li>Type if you prefer — it works both ways.</li>
              </ul>
            </div>
          </aside>
        </section>
      </main>

      <Features />

      <footer className="py-10 text-center text-sm text-gray-500">
        Made with care — a minimal, friendly voice assistant experience.
      </footer>
    </div>
  )
}

export default App
