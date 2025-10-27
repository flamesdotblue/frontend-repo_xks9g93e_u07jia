import React, { useEffect, useRef, useState } from 'react'

function VoiceControls({ onTranscript, onFinalTranscript, isSpeaking }) {
  const [listening, setListening] = useState(false)
  const [supported, setSupported] = useState(true)
  const recognizerRef = useRef(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setSupported(false)
      return
    }
    const rec = new SpeechRecognition()
    rec.continuous = true
    rec.interimResults = true
    rec.lang = 'en-US'

    rec.onresult = (event) => {
      let interim = ''
      let finalText = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalText += transcript
        } else {
          interim += transcript
        }
      }
      if (interim) onTranscript?.(interim)
      if (finalText) onFinalTranscript?.(finalText)
    }

    rec.onend = () => setListening(false)
    recognizerRef.current = rec
  }, [onTranscript, onFinalTranscript])

  const toggle = () => {
    if (!recognizerRef.current) return
    if (listening) {
      recognizerRef.current.stop()
      setListening(false)
    } else {
      try {
        recognizerRef.current.start()
        setListening(true)
      } catch (e) {
        // Ignore double-start errors
      }
    }
  }

  if (!supported) {
    return (
      <div className="w-full text-center text-sm text-gray-600">
        Voice recognition is not supported in this browser. Try Chrome on desktop.
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={toggle}
        className={`h-14 w-14 rounded-full flex items-center justify-center transition shadow-sm border ${
          listening ? 'bg-red-500 text-white border-red-500' : 'bg-white text-black border-gray-200'
        }`}
        title={listening ? 'Stop listening' : 'Start listening'}
      >
        <span className={`relative inline-block h-3 w-3 rounded-full ${listening ? 'bg-white' : 'bg-red-500'}`} />
      </button>
      <div className="text-sm text-gray-600">
        {listening ? 'Listening…' : isSpeaking ? 'Speaking…' : 'Tap the mic and talk'}
      </div>
    </div>
  )
}

export default VoiceControls
