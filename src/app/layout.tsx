import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ModdyCounter",
  description: "Счётчик с последнего видео ModdyChat на YouTube",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`antialiased`}>
        {children}
        <footer className="text-sm text-gray-300 dark:text-gray-600 text-center pt-8 mb-0 absolute bottom-4 w-full px-4">
          <div className="block sm:inline">Все права принадлежат MoDDyChat</div>
          <div className="hidden sm:inline"> ⋅ </div>
          <div className="block sm:inline">
            Сделано{" "}
            <a href="https://t.me/karpled" className="text-blue-300 dark:text-blue-600">KarPled</a>{" "}
            с любовью <span className="opacity-50">💙</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
