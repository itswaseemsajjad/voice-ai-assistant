import tempfile
import os
from openai import AsyncOpenAI
from config import settings

client = AsyncOpenAI(api_key=settings.openai_api_key)

async def transcribe_audio(audio_bytes: bytes, filename: str = "audio.webm") -> str:
    with tempfile.NamedTemporaryFile(suffix=os.path.splitext(filename)[1], delete=False) as tmp:
        tmp.write(audio_bytes)
        tmp_path = tmp.name
    try:
        with open(tmp_path, "rb") as f:
            transcript = await client.audio.transcriptions.create(
                model=settings.whisper_model,
                file=(filename, f, "audio/webm"),
            )
        return transcript.text
    finally:
        os.unlink(tmp_path)
