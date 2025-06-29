import { useEffect, useRef, useState } from "react";

export function useMilestoneConfetti(days: number, milestone: number = 500) {
  const prevDaysRef = useRef(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [runConfetti, setRunConfetti] = useState(false);

  useEffect(() => {
    const prev = prevDaysRef.current;
    const isMilestone = days > 0 && days % milestone === 0;
    const wasMilestone = prev > 0 && prev % milestone === 0;
    if (isMilestone && !wasMilestone && prevDaysRef.current !== 0) {
      setShowConfetti(true);
      setRunConfetti(true);
    }
    prevDaysRef.current = days;
  }, [days, milestone]);

  useEffect(() => {
    if (!showConfetti) return;
    const timeout = setTimeout(() => setShowConfetti(false), 10000);
    return () => clearTimeout(timeout);
  }, [showConfetti]);

  useEffect(() => {
    if (!runConfetti) return;
    const timeout = setTimeout(() => setRunConfetti(false), 5000);
    return () => clearTimeout(timeout);
  }, [runConfetti]);

  return { showConfetti, runConfetti };
} 