"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const switcherRef = useRef(null);

  const changeLanguage = (lang) => {
    document.cookie = `NEXT_LOCALE=${lang}; path=/`;
    location.reload();
  };

  const languages = [
    { code: "en", label: "EN" },
    { code: "ar", label: "ع" },
    { code: "tr", label: "TR" },
    { code: "ru", label: "RU" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* الخلفية الضبابية */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* مبدل اللغة */}
      <div
        ref={switcherRef}
        className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-50 flex flex-col items-center"
      >
        <AnimatePresence>
          {open &&
            languages.map((lang, index) => (
              <motion.button
                key={lang.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => changeLanguage(lang.code)}
                className="mb-2 h-10 w-10 rounded-full bg-white text-black hover:bg-gray-200 transition text-sm font-semibold shadow"
              >
                {lang.label}
              </motion.button>
            ))}
        </AnimatePresence>

        {/* الزر الرئيسي */}
        <button
          onClick={() => setOpen(!open)}
          className="relative flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-full bg-neutral-500 opacity-10 hover:opacity-40 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white hover:text-gray-50"
          >
            <path d="m5 8 6 6" />
            <path d="m4 14 6-6 2-3" />
            <path d="M2 5h12" />
            <path d="M7 2h1" />
            <path d="m22 22-5-10-5 10" />
            <path d="M14 18h6" />
          </svg>
        </button>
      </div>
    </>
  );
}
