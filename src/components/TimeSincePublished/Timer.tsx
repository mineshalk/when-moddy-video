"use client";
import { Suspense } from "react";
import Inner from "./Inner";

export default function TimeSincePublished() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center">
        <div className="text-2xl font-bold mb-2">С момента выхода последнего видео MoDDyChat прошло:</div>
        <div className="text-2xl font-mono min-h-[60px] flex items-center">Загрузка...</div>
      </div>
    }>
      <Inner />
    </Suspense>
  );
} 