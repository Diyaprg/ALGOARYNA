import { NextResponse } from "next/server";

const BASE_URL = "https://alfa-leetcode-api.onrender.com";
const VALID_DIFFICULTIES = new Set(["EASY", "MEDIUM", "HARD"]);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = searchParams.get("limit") ?? "10";
    const skip = searchParams.get("skip") ?? "0";
    const tags = searchParams.get("tags") ?? "";
    const difficultyParam = searchParams.get("difficulty") ?? "";
    const difficulty = difficultyParam.toUpperCase();

    const upstreamParams = new URLSearchParams();
    upstreamParams.set("limit", limit);
    upstreamParams.set("skip", skip);

    if (difficulty && VALID_DIFFICULTIES.has(difficulty)) {
      upstreamParams.set("difficulty", difficulty);
    }

    if (tags.trim()) {
      upstreamParams.set("tags", tags.trim());
    }

    const upstreamUrl = `${BASE_URL}/problems?${upstreamParams.toString()}`;
    const response = await fetch(upstreamUrl, { cache: "no-store" });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch questions from upstream API" },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json({ questions: data });
  } catch (error) {
    console.error("Questions fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error while fetching questions" },
      { status: 500 }
    );
  }
}
