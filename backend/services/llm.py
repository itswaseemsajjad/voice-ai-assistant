from openai import AsyncOpenAI
from config import settings
from typing import List, Dict

client = AsyncOpenAI(api_key=settings.openai_api_key)

SYSTEM_PROMPT = """You are a helpful, conversational AI voice assistant.
Keep responses concise and natural for voice output — 1-3 sentences max.
Avoid markdown, bullet points, or special formatting."""

async def chat(message: str, history: List[Dict]) -> tuple[str, List[Dict]]:
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages.extend(history[-18:])
    messages.append({"role": "user", "content": message})

    response = await client.chat.completions.create(
        model=settings.gpt_model,
        messages=messages,
        max_tokens=300,
        temperature=0.7,
    )

    reply = response.choices[0].message.content
    history = history + [
        {"role": "user", "content": message},
        {"role": "assistant", "content": reply},
    ]
    if len(history) > 20:
        history = history[-20:]

    return reply, history
