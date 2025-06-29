import type { Metadata, Viewport } from "next";
import { MetrikaCounter } from "react-metrika";
import ReactDOM from "react-dom";
import "./globals.css";

export const metadata: Metadata = {
  title: "Модди, когда видео?",
  description: "Счётчик с последнего видео MoDDyChat на YouTube",
  authors: [{ name: "KarPled", url: "https://t.me/karpled" }],
  manifest: "/site.webmanifest",
  icons: {
    icon: "/android-chrome-192x192.png",
    shortcut: "/android-chrome-192x192.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  ReactDOM.preload("/data/latest-video.json", { as: "fetch" });

  return (
    <html lang="ru">
      <body className={`antialiased`}>
        {children}
        <footer className="text-sm text-gray-300 dark:text-gray-600 text-center pt-8 mb-0 absolute bottom-4 w-full px-4">
          <div className="block md:inline">
            Все права на представленный контент принадлежат MoDDyChat
          </div>
          <div className="hidden md:inline px-1">⋅</div>
          <div className="block md:inline">
            Сделано{" "}
            <a
              href="https://t.me/karpled"
              className="text-blue-300 dark:text-blue-600"
            >
              KarPled
            </a>{" "}
            с любовью <span className="opacity-50">💙</span>
          </div>
        </footer>
        <MetrikaCounter id={103117456} />
      </body>
    </html>
  );
}
