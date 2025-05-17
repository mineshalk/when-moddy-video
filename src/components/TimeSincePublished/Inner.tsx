"use client";
import { useEffect, useState } from "react";
import plural from "../../utils/plural";

export default function Inner() {
  const [publishedAt, setPublishedAt] = useState<Date | null>(null);
  const [diff, setDiff] = useState<{days: number, hours: number, minutes: number, seconds: number}>({days: 0, hours: 0, minutes: 0, seconds: 0});
  const [loading, setLoading] = useState(true);

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
    const interval = setInterval(() => {
      const now = new Date();
      const diffMs = now.getTime() - publishedAt.getTime();
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const seconds = Math.floor((diffMs / 1000) % 60);
      setDiff({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, [publishedAt]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-4xl font-bold mb-2 text-center">С момента выхода последнего видео прошло:</div>
      <div className="text-6xl font-mono min-h-[60px] flex items-center text-center">
        {(loading || !publishedAt || (diff.days === 0 && diff.hours === 0 && diff.minutes === 0 && diff.seconds === 0))
          ? "Загрузка..."
          : <>
              {diff.days > 0 && `${diff.days} ${plural(diff.days, ["день", "дня", "дней"])} `}
              {diff.hours > 0 && `${diff.hours} ${plural(diff.hours, ["час", "часа", "часов"])} `}
              {diff.minutes > 0 && `${diff.minutes} ${plural(diff.minutes, ["минута", "минуты", "минут"])} `}
              {`${diff.seconds} ${plural(diff.seconds, ["секунда", "секунды", "секунд"])}`}
            </>}
      </div>
    </div>
  );
} 