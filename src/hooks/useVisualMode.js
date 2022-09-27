import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  console.log("this is mode", mode, "this is history", history);

  function transition(newMode, replace = false) {
    setMode(newMode);

    if (replace) setHistory((prev) => [...prev, newMode]);
  }

  function back() {
    if (history.length >= 1) {
      setHistory((prev) => {
        const newHistory = [...prev.slice(0, -1)]
        setMode(newHistory[newHistory.length -1])
        return newHistory;
      });
    }
  }

  return { mode, transition, back };
}
