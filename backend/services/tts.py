from elevenlabs.client import AsyncElevenLabs
from elevenlabs import VoiceSettings
from config import settings

client = AsyncElevenLabs(api_key=settings.elevenlabs_api_key)

async def synthesize(text: str) -> bytes:
    audio_generator = await client.text_to_speech.convert(
        voice_id=settings.elevenlabs_voice_id,
        text=text,
        model_id="eleven_monolingual_v1",
        voice_settings=VoiceSettings(
            stability=0.5,
            similarity_boost=0.75,
            style=0.0,
            use_speaker_boost=True,
        ),
    )
    chunks = []
    async for chunk in audio_generator:
        chunks.append(chunk)
    return b"".join(chunks)
