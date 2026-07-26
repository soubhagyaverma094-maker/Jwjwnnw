"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError(null);
    setVideoUrl(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate video");
      }

      setVideoUrl(data.videoUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-6 py-16">
      <div>
        <h1 className="text-2xl font-semibold">AI Video Generation Tool</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Describe a scene and generate a short video via Replicate.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A drone shot flying over a misty mountain range at sunrise"
          rows={4}
          maxLength={1000}
          className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm outline-none focus:border-zinc-500"
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="self-start rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Generating…" : "Generate video"}
        </button>
      </form>

      {loading && (
        <p className="text-sm text-zinc-400">
          This can take a minute or two depending on the model.
        </p>
      )}

      {error && (
        <p className="rounded-lg border border-red-900 bg-red-950 p-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {videoUrl && (
        <div className="flex flex-col gap-2">
          <video
            src={videoUrl}
            controls
            autoPlay
            loop
            className="w-full rounded-lg border border-zinc-800"
          />
          <a
            href={videoUrl}
            download
            className="text-sm text-zinc-400 underline underline-offset-2 hover:text-zinc-200"
          >
            Download video
          </a>
        </div>
      )}

      <a
        href="/coffee"
        className="mt-4 text-sm text-zinc-500 underline underline-offset-2 hover:text-zinc-300"
      >
        View the Ember &amp; Oak coffee brand site →
      </a>
    </main>
  );
}
