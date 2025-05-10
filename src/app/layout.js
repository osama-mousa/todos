import Footer from "@/components/Footer";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import {getLocale} from 'next-intl/server';
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import DonateButton from "@/components/DonateButton";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ToDos",
  description: "Todo List Application",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/favicon.ico" },
      { url: "/icons/todos.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/todos.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "ToDos",
    statusBarStyle: "black-translucent",
  },
};

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  return (
    <html lang={locale} className="dark">
      <body
        className={`${inter.className} dark:bg-neutral-900 dark:text-neutral-100 custom-scrollbar`}
      >
        <NextIntlClientProvider>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1 p-4 flex flex-col items-center">
              {children}
              <LanguageSwitcher />
              <DonateButton />
              <Analytics />
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
