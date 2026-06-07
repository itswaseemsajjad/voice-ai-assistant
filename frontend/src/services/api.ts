import axios from 'axios';
import { ChatHistory } from '../types';

const api = axios.create({ baseURL: '' });

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'audio.webm');
  const response = await api.post('/api/transcribe', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.transcript;
}

export async function chatWithAI(
  message: string,
  history: ChatHistory[]
): Promise<{ reply: string; history: ChatHistory[] }> {
  const response = await api.post('/api/chat', { message, history });
  return response.data;
}

export async function synthesizeSpeech(text: string): Promise<Blob> {
  const response = await api.post('/api/synthesize', { text }, { responseType: 'blob' });
  return response.data;
}
