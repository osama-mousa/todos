import Footer from "@/components/Footer";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'ToDos',
  description: 'Next.js Todo Application',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/favicon.ico' },
      { url: '/icons/todos.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/icons/todos.png',
  },
  themeColor: '#171717',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} dark:bg-neutral-900 dark:text-neutral-100 min-h-screen custom-scrollbar`}
      >
        <main className="p-4 min-h-screen flex flex-col items-center justify-start">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
