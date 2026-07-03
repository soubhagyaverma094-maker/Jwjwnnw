import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export const runtime = "nodejs";
export const maxDuration = 300;

const DEFAULT_MODEL = "minimax/video-01";
const MAX_PROMPT_LENGTH = 1000;

export async function POST(req: NextRequest) {
  const apiToken = process.env.REPLICATE_API_TOKEN;
  if (!apiToken) {
    return NextResponse.json(
      { error: "Server is missing REPLICATE_API_TOKEN" },
      { status: 500 }
    );
  }

  let body: { prompt?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }
  if (prompt.length > MAX_PROMPT_LENGTH) {
    return NextResponse.json(
      { error: `Prompt must be ${MAX_PROMPT_LENGTH} characters or fewer` },
      { status: 400 }
    );
  }

  const model = process.env.REPLICATE_MODEL || DEFAULT_MODEL;
  const replicate = new Replicate({ auth: apiToken });

  try {
    const output = await replicate.run(model as `${string}/${string}`, {
      input: { prompt },
    });

    const videoUrl = extractVideoUrl(output);
    if (!videoUrl) {
      return NextResponse.json(
        { error: "Model did not return a video URL" },
        { status: 502 }
      );
    }

    return NextResponse.json({ videoUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Video generation failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

function extractVideoUrl(output: unknown): string | null {
  if (typeof output === "string") return output;
  if (Array.isArray(output) && typeof output[0] === "string") return output[0];
  if (
    output &&
    typeof output === "object" &&
    "url" in output &&
    typeof (output as { url: unknown }).url === "function"
  ) {
    const result = (output as { url: () => URL }).url();
    return result.toString();
  }
  return null;
}
