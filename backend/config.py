from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    openai_api_key: str
    elevenlabs_api_key: str
    elevenlabs_voice_id: str = "21m00Tcm4TlvDq8ikWAM"
    gpt_model: str = "gpt-4o"
    whisper_model: str = "whisper-1"

    class Config:
        env_file = ".env"

settings = Settings()
