import React, { useEffect, useRef } from 'react'

function ChatWindow({ messages, onSend }) {
  const inputRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = inputRef.current?.value?.trim()
    if (!value) return
    onSend(value)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <section className="relative bg-white/90 backdrop-blur border border-black/5 shadow-sm rounded-2xl p-4 md:p-6">
      <div
        ref={listRef}
        className="h-[360px] md:h-[420px] overflow-y-auto space-y-3 pr-1"
      >
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm">
            Say something like “What can you do?” or click the mic to talk.
          </div>
        )}
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm md:text-[15px] leading-relaxed shadow-sm ${
                m.role === 'user' ? 'bg-black text-white rounded-br-sm' : 'bg-gray-100 text-gray-900 rounded-bl-sm'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message..."
          className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
        />
        <button
          type="submit"
          className="rounded-full bg-black text-white px-5 py-3 text-sm font-semibold hover:bg-black/90"
        >
          Send
        </button>
      </form>
    </section>
  )
}

export default ChatWindow
