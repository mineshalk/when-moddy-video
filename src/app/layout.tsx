import ReactDOM from "react-dom";
import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from "next/script";
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
      <body className="antialiased">
        {children}
        <footer className="text-sm text-gray-300 dark:text-gray-600 text-center pt-8 mb-0 absolute bottom-8 w-full px-4">
          <div className="block md:inline">
            Все права на представленный контент принадлежат MoDDyChat
          </div>
          <div className="hidden md:inline px-1">⋅</div>
          <div className="block md:inline">
            Сделал{" "}
            <a
              href="https://t.me/karpled"
              className="text-blue-300 dark:text-blue-600"
            >
              KarPled
            </a>{" "}
            с любовью <span className="opacity-50">💙</span>
          </div>
        </footer>

        <GoogleAnalytics gaId="G-YREWNNXW2Q" />
        <Script type="text/javascript" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(103117456, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
          });`}
        </Script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/103117456"
              style={{ position: "absolute", left: "-9999px" } as React.CSSProperties}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
