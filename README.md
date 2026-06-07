# Voice AI Assistant

A real-time AI voice assistant powered by OpenAI Whisper (speech-to-text), GPT-4o (conversation), and ElevenLabs (text-to-speech).

## Features
- 🎙️ Voice recording via MediaRecorder API
- 📝 Real-time transcription with OpenAI Whisper
- 🤖 Intelligent conversation with GPT-4o (maintains full context)
- 🔊 Natural-sounding voice responses via ElevenLabs TTS
- 💬 Visual chat history display
- ⚡ FastAPI backend + React + Vite frontend

## Architecture
```
Browser (React) → FastAPI → OpenAI Whisper API (STT)
                          → OpenAI GPT-4o (Chat)
                          → ElevenLabs API (TTS)
```

## Prerequisites
- Python 3.11+
- Node.js 18+
- OpenAI API key (https://platform.openai.com)
- ElevenLabs API key (https://elevenlabs.io)

## Backend Setup
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your API keys

uvicorn main:app --reload --port 8000
```

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Usage
1. Allow microphone access when prompted
2. Click the blue microphone button and speak
3. Click again to stop recording
4. The AI will transcribe, think, and respond with voice
