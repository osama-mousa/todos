import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App",
  description: "Advanced Todo Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} dark:bg-neutral-900 dark:text-neutral-100 min-h-screen`}
      >
        <main className="p-4 min-h-screen flex flex-col items-center justify-start">
          {children}
        </main>
      </body>
    </html>
  );
}
