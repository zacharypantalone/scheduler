import { useState } from "react";

export default function useVisualMode(initial) {
  
  const [history, setHistory] = useState([initial]);

  

  function transition(newMode, replace = false) {
    setHistory(prev => replace ? [...prev.slice(0,-1), newMode] : [...prev, newMode])
  }
    
  function back() {
    if (history.length >= 1) {
      setHistory((prev) => {
        const newHistory = [...prev.slice(0, -1)]
        
        return newHistory;
      });
    }
  }

  return { mode: history[history.length - 1], transition, back };
}