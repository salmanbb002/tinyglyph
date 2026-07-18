import { InferenceClient } from "@huggingface/inference";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const allowedTones = new Set(["confident", "playful", "minimal", "dreamy"]);
const requestLog = new Map<string, number[]>();

function isRateLimited(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const key = forwarded?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const recent = (requestLog.get(key) ?? []).filter((time) => now - time < 60_000);
  recent.push(now);
  requestLog.set(key, recent);
  return recent.length > 8;
}

export async function POST(request: Request) {
  if (isRateLimited(request)) {
    return NextResponse.json({ error: "A few too many ideas at once. Try again in a minute." }, { status: 429 });
  }

  const token = process.env.HF_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "The AI starter needs an HF_TOKEN on the server. The Unicode generator is still fully available." },
      { status: 503 },
    );
  }

  let body: { topic?: unknown; tone?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Please send a valid request." }, { status: 400 });
  }

  const topic = typeof body.topic === "string" ? body.topic.trim().slice(0, 160) : "";
  const tone = typeof body.tone === "string" && allowedTones.has(body.tone) ? body.tone : "confident";

  if (topic.length < 2) {
    return NextResponse.json({ error: "Add a short topic first." }, { status: 400 });
  }

  const client = new InferenceClient(token);
  const model = process.env.HF_MODEL ?? "Qwen/Qwen3-0.6B";

  try {
    const result = await client.chatCompletion({
      model,
      messages: [
        {
          role: "system",
          content: "Write one original social caption. Use plain text, 12 words maximum, no hashtags, no quotation marks, and no preamble.",
        },
        { role: "user", content: `Topic: ${topic}\nTone: ${tone}` },
      ],
      max_tokens: 48,
      temperature: 0.75,
    });

    const content = result.choices[0]?.message?.content;
    const idea = typeof content === "string"
      ? content.replace(/^['\"]|['\"]$/g, "").replace(/\s+/g, " ").trim().slice(0, 220)
      : "";

    if (!idea) throw new Error("The model returned an empty response.");
    return NextResponse.json({ idea, model });
  } catch (error) {
    console.error("Hugging Face inference failed", error);
    return NextResponse.json(
      { error: "The AI starter is resting right now. Please try again in a moment." },
      { status: 502 },
    );
  }
}
