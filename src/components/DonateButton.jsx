"use client";

export default function DonateButton() {
  return (
    <a
      href="https://www.buymeacoffee.com/mousa"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 group"
    >
      <div
        className="relative flex items-center justify-center 
                      h-12 w-12 md:h-14 md:w-14 rounded-full bg-transparent"
      >
        <div
          className="absolute inset-0 rounded-full bg-neutral-500 
                        opacity-10 group-hover:opacity-40 
                        transition-opacity duration-300 z-[-1]"
        />

        <img
          src="/coffee.svg"
          alt="Buy Me A Coffee"
          className="h-7 w-7 md:h-8 md:w-8 opacity-50 group-hover:opacity-100 transition-opacity duration-300 select-none"
          onContextMenu={(e) => e.preventDefault()}
          draggable="false"
        />
      </div>
    </a>
  );
}
