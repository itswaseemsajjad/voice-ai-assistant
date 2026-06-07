import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage'
import { Message } from '../types'

export function ChatHistory({ messages }: { messages: Message[] }) {
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="text-4xl mb-4">🎙️</p>
          <p className="text-lg font-medium mb-2">Hello! I'm your AI Assistant</p>
          <p className="text-sm">Press the microphone button to start talking</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      <div ref={bottomRef} />
    </div>
  )
}
