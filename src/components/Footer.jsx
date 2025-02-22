export default function Footer() {
    return (
      <footer className="w-full mt-16 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative responsive-container text-center">
            {/* الخط الفاصل المركزي */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-32 border-t border-neutral-800" />
  
            <p className="text-neutral-400 text-sm">
              Developed by
              <a
                href="https://example.com"
                className="text-zinc-400 hover:text-zinc-300 mx-1.5 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Osama Mousa
              </a>
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    );
  }
  