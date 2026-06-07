# Voice AI Assistant

A real-time AI voice assistant powered by OpenAI Whisper (STT), GPT-4o (LLM), and ElevenLabs (TTS).

## Features
- Voice recording with MediaRecorder API
- Real-time speech-to-text via OpenAI Whisper
- Conversational AI with GPT-4o (maintains context)
- Natural text-to-speech via ElevenLabs
- Chat history display
- FastAPI backend + React frontend

## Prerequisites
- Python 3.11+
- Node.js 18+
- OpenAI API key
- ElevenLabs API key

## Setup

### Backend
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your API keys
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Architecture
```
Browser -> React (Vite) -> FastAPI -> OpenAI Whisper (STT)
                                   -> GPT-4o (Chat)
                                   -> ElevenLabs (TTS)
```
