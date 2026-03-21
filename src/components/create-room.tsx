"use client";

import { useState } from "react";

export default function CreateRoom() {
  const [hostId, setHostId] = useState("");
  const [result, setResult] = useState("");

  async function onCreate() {
    setResult("");
    const res = await fetch("/api/rooms/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostId }),
    });
    const data = (await res.json()) as { shareableLink?: string; error?: string };
    setResult(data.shareableLink ?? data.error ?? "Done");
  }

  return (
    <div className="rounded border p-4">
      <h3 className="mb-2 font-semibold">Create Room</h3>
      <input
        className="w-full rounded border p-2"
        placeholder="Host userId"
        value={hostId}
        onChange={(e) => setHostId(e.target.value)}
      />
      <button className="mt-3 rounded bg-black px-3 py-2 text-white" onClick={onCreate}>
        Create
      </button>
      {result ? <p className="mt-2 text-sm">{result}</p> : null}
    </div>
  );
}
