"use client";
import { useState } from "react";

export default function LoveLetterGenerator() {
  const [herName, setherName] = useState("");
  const [yourName, setyourName] = useState("");
  const [mood, setMood] = useState("romantic");
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const generateLetter = async (e) => {
    e.preventDefault();
    if (!herName.trim()) {
      alert("Please enter her name");
      return;
    }
    if (!yourName.trim()) {
      alert("Please enter your name");
      return;
    }

    setLoading(true);
    setLetter("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ herName, mood, yourName }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate letter. Try again!");
      }

      const data = await res.json();
      console.log("API Response:", data);
      setLetter(data.letter);
    } catch (error) {
      console.error(error);
      setLetter("Oops! Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-black flex flex-col items-center justify-center bg-pink-100 p-6">
      <h1 className="text-3xl text-center font-bold text-red-500 mb-4">
        💌 AI Love Letter Generator
      </h1>
      <input
        type="text"
        placeholder="Enter Your Love's Name"
        value={herName}
        onChange={(e) => setherName(e.target.value)}
        className="p-2 border text-xl font-bold text-red-600 font-stretch-50% border-red-300 rounded-lg w-full max-w-md text-center mb-3"
      />
      <input
        type="text"
        placeholder="Enter Your Name"
        value={yourName}
        onChange={(e) => setyourName(e.target.value)}
        className="p-2 border text-xl font-bold text-red-600 font-stretch-50% border-red-300 rounded-lg w-full max-w-md text-center mb-3"
      />
      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="p-2 border border-red-300 rounded-lg mb-3"
      >
        <option value="romantic">Romantic ❤️</option>
        <option value="funny">Funny 😂</option>
        <option value="emotional">Emotional 😢</option>
      </select>
      <button
        onClick={generateLetter}
        className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4 disabled:bg-red-300"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Your Letter"}
      </button>
      {letter && (
        <div className="bg-pink-200 p-4 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl text-center mb-4 font-bold text-red-500">
            💖 Your Love Letter for <span className="font-bold text-pink-400">{herName}💗💭</span>
          </h2>
          <hr />
          <p className="text-zinc-700 mt-4 font-medium whitespace-pre-line">{letter}</p>
        </div>
      )}
    </div>
  );
}
