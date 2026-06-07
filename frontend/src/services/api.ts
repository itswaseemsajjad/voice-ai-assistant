import axios from 'axios'
import { ChatHistoryItem } from '../types'

const api = axios.create({ baseURL: '' })

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const formData = new FormData()
  formData.append('audio', audioBlob, 'audio.webm')
  const response = await api.post('/api/transcribe', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data.transcript
}

export async function chatWithAI(
  message: string,
  history: ChatHistoryItem[]
): Promise<{ reply: string; history: ChatHistoryItem[] }> {
  const response = await api.post('/api/chat', { message, history })
  return response.data
}

export async function synthesizeSpeech(text: string): Promise<Blob> {
  const response = await api.post('/api/synthesize', { text }, { responseType: 'blob' })
  return response.data
}
