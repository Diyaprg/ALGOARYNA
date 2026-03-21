"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  roomCode: string;
}

interface QuestionDetails {
  title?: string;
  description?: string;
  difficulty?: string;
  likes?: number;
  dislikes?: number;
  examples?: Array<{ input?: string; output?: string; explanation?: string }>;
  constraints?: string[];
  codeSnippets?: Array<{ language?: string; code?: string }>;
}

const DIFFICULTY_COLORS = {
  Easy: "text-emerald-400 bg-emerald-500/20",
  Medium: "text-yellow-400 bg-yellow-500/20",
  Hard: "text-red-400 bg-red-500/20",
};

export default function PlayClient({ roomCode }: Props) {
  const searchParams = useSearchParams();
  const titleSlugParam = searchParams.get("titleSlug") ?? "";

  const [language, setLanguage] = useState("cpp");
  const [timeLeft, setTimeLeft] = useState(5400); // 1.5 hours
  const [hasStarted, setHasStarted] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [question, setQuestion] = useState<QuestionDetails>({});
  const [titleSlug, setTitleSlug] = useState(titleSlugParam);

  // Fetch question details - this is the main effect
  useEffect(() => {
    async function fetchAndLoadQuestion() {
      setLoading(true);
      setError("");

      try {
        let slug = titleSlugParam;

        // If no titleSlug in URL, fetch from room's selected question
        if (!slug) {
          console.log(
            `🏠 PlayClient - Fetching question from room ${roomCode}`,
          );
          const roomRes = await fetch(`/api/rooms/${roomCode}/questions`);

          if (!roomRes.ok) {
            console.warn(`⚠️ PlayClient - Room has no selected questions yet`);
            setError(
              "No questions selected yet. Please go back and select questions.",
            );
            setLoading(false);
            return;
          }

          const roomQuestion = await roomRes.json();
          console.log(
            `✅ PlayClient - Got titleSlug from room: ${roomQuestion.titleSlug}`,
          );
          slug = roomQuestion.titleSlug;
          setTitleSlug(slug);
        }

        // Now fetch the question details
        if (!slug) {
          setError("Could not determine question to load");
          setLoading(false);
          return;
        }

        console.log(`❓ PlayClient - Fetching details for: ${slug}`);
        const detailRes = await fetch(
          `/api/questions/details?titleSlug=${encodeURIComponent(slug)}`,
        );

        if (!detailRes.ok) {
          throw new Error("Failed to fetch question details");
        }

        const data = await detailRes.json();
        console.log(`✅ PlayClient - Loaded question: ${data.title}`);
        setQuestion(data);

        // Set initial code snippet if available
        if (data.codeSnippets && data.codeSnippets.length > 0) {
          const snippet =
            data.codeSnippets.find((s: any) => s.language === "cpp") ||
            data.codeSnippets[0];
          setCode(snippet?.code || "");
        }

        setLoading(false);
      } catch (err) {
        console.error("❌ PlayClient - Error loading question:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load question";
        setError(errorMessage);
        toast.error(errorMessage);
        setLoading(false);
      }
    }

    fetchAndLoadQuestion();
  }, [roomCode, titleSlugParam]);

  // Timer
  useEffect(() => {
    if (!hasStarted) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [hasStarted]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-purple-950 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-slate-300">Loading question details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-purple-950 flex items-center justify-center text-white p-8">
        <div className="text-center max-w-md">
          <p className="text-2xl font-bold text-red-400 mb-4">⚠️ Error</p>
          <p className="text-slate-300 mb-6">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-linear-to-r from-purple-600 to-indigo-600 hover:opacity-90 rounded-lg font-semibold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-purple-950 text-slate-200">
      {/* Navbar */}
      <div className="border-b border-indigo-900/40 px-8 py-4 flex items-center justify-between bg-black/40 backdrop-blur-md">
        <span className="text-xl font-bold tracking-tight text-white">
          AlgoAryna
        </span>

        <div className="flex items-center gap-8">
          {/* Select Language */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-black border border-indigo-500/50 text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-white"
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>

          {/* Timer */}
          {!hasStarted ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => setHasStarted(true)}
                className="px-4 py-2 bg-linear-to-r from-orange-500 to-red-600 rounded-md text-sm hover:opacity-90 transition shadow-md font-semibold"
              >
                Start Contest
              </button>
            </div>
          ) : (
            <div
              className={`text-sm font-semibold ${
                timeLeft < 600 ? "text-red-400" : "text-purple-400"
              }`}
            >
              ⏳ {formatTime(timeLeft)}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button className="px-5 py-2 bg-slate-800 hover:bg-slate-700 transition rounded-md text-sm font-semibold">
            Run
          </button>
          <button className="px-5 py-2 bg-linear-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition rounded-md text-sm font-semibold shadow-md">
            Submit
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="px-8 py-6 flex gap-6 h-[calc(100vh-80px)]">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 bg-black/40 border border-blue-600/20 rounded-xl p-6 overflow-y-auto shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-purple-300">
                {question?.title || "Loading..."}
              </h2>
            </div>
            {question?.difficulty && (
              <span
                className={`ml-4 px-3 py-1 text-xs rounded-md font-semibold ${
                  DIFFICULTY_COLORS[
                    question.difficulty as keyof typeof DIFFICULTY_COLORS
                  ] || "text-slate-400 bg-slate-600/20"
                }`}
              >
                {question.difficulty}
              </span>
            )}
          </div>

          {/* Description */}
          {question?.description && (
            <div className="mb-6">
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {question.description}
              </p>
            </div>
          )}

          {/* Examples */}
          {question?.examples && question.examples.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-indigo-300 mb-3 text-sm">
                Examples
              </h3>
              <div className="space-y-3">
                {question.examples.map((example, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900/50 rounded p-4 border border-slate-700/50"
                  >
                    <p className="text-xs font-semibold text-slate-400 mb-1">
                      Example {idx + 1}
                    </p>
                    {example.input && (
                      <div className="mb-2">
                        <p className="text-xs text-slate-400 font-semibold">
                          Input:
                        </p>
                        <code className="text-xs text-slate-200 bg-black/50 p-2 rounded block mt-1">
                          {example.input}
                        </code>
                      </div>
                    )}
                    {example.output && (
                      <div className="mb-2">
                        <p className="text-xs text-slate-400 font-semibold">
                          Output:
                        </p>
                        <code className="text-xs text-slate-200 bg-black/50 p-2 rounded block mt-1">
                          {example.output}
                        </code>
                      </div>
                    )}
                    {example.explanation && (
                      <div>
                        <p className="text-xs text-slate-400 font-semibold">
                          Explanation:
                        </p>
                        <p className="text-xs text-slate-300 mt-1">
                          {example.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Constraints */}
          {question?.constraints && question.constraints.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-indigo-300 mb-3 text-sm">
                Constraints
              </h3>
              <ul className="space-y-1">
                {question.constraints.map((constraint, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-slate-300 flex items-start gap-2"
                  >
                    <span className="text-purple-400 mt-1">•</span>
                    <span>{constraint}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Engagement */}
          {(question?.likes || question?.dislikes) && (
            <div className="flex gap-4 text-xs text-slate-400">
              <span>👍 {question.likes || 0} Likes</span>
              <span>👎 {question.dislikes || 0} Dislikes</span>
            </div>
          )}
        </div>

        {/* Right Panel - Code Editor & Standings */}
        <div className="w-1/2 flex flex-col gap-6">
          {/* Code Editor */}
          <div className="bg-black/50 border border-blue-600/20 rounded-xl p-6 flex flex-col h-[70%] shadow-lg">
            <h2 className="font-semibold mb-4 text-indigo-300">Code Editor</h2>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={!hasStarted}
              className="flex-1 bg-black border border-purple-900/50 rounded-lg p-4 text-sm font-mono outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed text-slate-200"
              placeholder="// Write your code here..."
            />
          </div>

          {/* Live Standings */}
          <div className="bg-black/40 border border-blue-600/20 rounded-xl p-4 h-[30%] shadow-lg">
            <h2 className="font-semibold mb-3 text-purple-300 text-sm">
              Live Standings
            </h2>
            <div className="text-sm">
              <div className="grid grid-cols-3 text-slate-400 border-b border-indigo-900/30 pb-2 mb-3">
                <span>Rank</span>
                <span>User</span>
                <span className="text-right">Score</span>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                <div className="grid grid-cols-3">
                  <span className="text-purple-400">1</span>
                  <span>You</span>
                  <span className="text-right text-white">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
