"use client";
import { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import NoSSR from "react-no-ssr";

import { getTimeDiff } from "../../utils/time";
import { useMilestoneConfetti } from "../../hooks/useMilestoneConfetti";
import TimeDisplay from "./TimeDisplay";

export default function Inner() {
  const [publishedAt, setPublishedAt] = useState<Date | null>(null);
  const [diff, setDiff] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [loading, setLoading] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    fetch("/data/latest-video.json")
      .then((res) => res.json())
      .then((data) => {
        setPublishedAt(new Date(data.publishedAt));
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!publishedAt) return;
    const updateDiff = () => setDiff(getTimeDiff(publishedAt, new Date()));
    updateDiff();
    const interval = setInterval(updateDiff, 1000);
    return () => clearInterval(interval);
  }, [publishedAt]);

  const {runConfetti, showConfetti} = useMilestoneConfetti(diff.days);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-3xl font-bold mb-2 text-center">
        С момента выхода последнего видео MoDDyChat прошло:
      </div>
      <div className="text-6xl font-mono min-h-[60px] flex items-center text-center">
        <TimeDisplay diff={diff} loading={loading || !publishedAt} />
      </div>
      <NoSSR>
        {showConfetti && <Confetti
          run={true}
          width={width}
          height={height}
          recycle={runConfetti}
        /> }
      </NoSSR>
    </div>
  );
}
