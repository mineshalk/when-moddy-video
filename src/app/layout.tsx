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
      </body>
    </html>
  );
}
