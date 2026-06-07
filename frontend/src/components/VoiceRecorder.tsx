import { Mic, Square } from 'lucide-react'

interface Props {
  onRecordingComplete: (blob: Blob) => void
  isRecording: boolean
  disabled: boolean
  onStart: () => void
  onStop: () => Promise<Blob>
}

export function VoiceRecorder({ onRecordingComplete, isRecording, disabled, onStart, onStop }: Props) {
  const handleClick = async () => {
    if (isRecording) { const blob = await onStop(); onRecordingComplete(blob) }
    else onStart()
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button onClick={handleClick} disabled={disabled} className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse scale-110' : disabled ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-blue-600 hover:bg-blue-500 hover:scale-105'}`}>
        {isRecording ? <Square className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-white" />}
      </button>
      <p className="text-gray-400 text-sm">{isRecording ? 'Click to stop' : disabled ? 'Please wait...' : 'Click to speak'}</p>
    </div>
  )
}
