import { useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ChatHistory } from './components/ChatHistory'
import { VoiceRecorder } from './components/VoiceRecorder'
import { StatusIndicator } from './components/StatusIndicator'
import { transcribeAudio, chatWithAI, synthesizeSpeech } from './services/api'
import { useVoiceRecorder } from './hooks/useVoiceRecorder'
import { useAudioPlayer } from './hooks/useAudioPlayer'
import { Message, Status, ChatHistoryItem } from './types'
import { Mic } from 'lucide-react'

export default function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const { isRecording, startRecording, stopRecording } = useVoiceRecorder()
  const { play } = useAudioPlayer()

  const addMessage = useCallback((role: 'user' | 'assistant', content: string) => {
    setMessages((prev) => [...prev, { id: uuidv4(), role, content, timestamp: new Date() }])
  }, [])

  const handleRecordingComplete = useCallback(async (audioBlob: Blob) => {
    try {
      setStatus('processing')
      const transcript = await transcribeAudio(audioBlob)
      if (!transcript.trim()) { setStatus('idle'); return }
      addMessage('user', transcript)
      const { reply, history: newHistory } = await chatWithAI(transcript, chatHistory)
      setChatHistory(newHistory)
      addMessage('assistant', reply)
      setStatus('speaking')
      const speechBlob = await synthesizeSpeech(reply)
      play(speechBlob)
      setTimeout(() => setStatus('idle'), 2000)
    } catch (err) {
      console.error('Error:', err)
      addMessage('assistant', 'Sorry, something went wrong. Please try again.')
      setStatus('idle')
    }
  }, [chatHistory, addMessage, play])

  const isDisabled = status === 'processing' || status === 'speaking'

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg"><Mic className="w-5 h-5" /></div>
          <div>
            <h1 className="text-lg font-bold">Voice AI Assistant</h1>
            <p className="text-gray-400 text-xs">Powered by GPT-4o + ElevenLabs TTS</p>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col max-w-2xl mx-auto w-full overflow-hidden">
        <ChatHistory messages={messages} />
        <div className="bg-gray-800 border-t border-gray-700 p-6">
          <div className="flex flex-col items-center gap-4">
            <StatusIndicator status={isRecording ? 'recording' : status} />
            <VoiceRecorder onRecordingComplete={handleRecordingComplete} isRecording={isRecording} disabled={isDisabled} onStart={startRecording} onStop={stopRecording} />
          </div>
        </div>
      </main>
    </div>
  )
}
