import { useState } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
}

interface Props {
  messages: Message[]
}

export function ExportButton({ messages }: Props) {
  const [exported, setExported] = useState(false)

  function exportConversation() {
    const text = messages
      .map((m) => `[${m.role.toUpperCase()}]: ${m.content}`)
      .join('\n\n')

    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `conversation-${new Date().toISOString().slice(0, 10)}.txt`
    a.click()
    URL.revokeObjectURL(url)

    setExported(true)
    setTimeout(() => setExported(false), 2000)
  }

  if (messages.length === 0) return null

  return (
    <button
      onClick={exportConversation}
      className="text-xs text-gray-500 hover:text-gray-700 underline"
    >
      {exported ? '✓ Exported' : 'Export conversation'}
    </button>
  )
}
