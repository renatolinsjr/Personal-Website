"use client";

import { useTheme } from "next-themes";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Languages, Sun, Moon } from "lucide-react";

export function HeaderControls() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = currentLocale === "pt-BR" ? "en-US" : "pt-BR";
    // Construct new path by replacing the locale prefix
    const pathSegments = pathname.split("/");
    pathSegments[1] = nextLocale;
    const newPath = pathSegments.join("/");
    router.push(newPath || "/");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-surface-bright/50 animate-pulse"></div>
        <div className="w-10 h-10 rounded-full bg-surface-bright/50 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <button 
        onClick={toggleLanguage}
        className="p-2 rounded-full hover:bg-surface-bright transition-all duration-300 active:scale-95 text-on-surface-variant flex items-center justify-center font-label text-xs uppercase font-bold"
        aria-label="Toggle language"
        title={currentLocale === "pt-BR" ? "Switch to English" : "Mudar para Português"}
      >
        <Languages className="mr-1 w-5 h-5" />
        {currentLocale.split("-")[0]}
      </button>
      
      <button 
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-surface-bright transition-all duration-300 active:scale-95 text-on-surface-variant flex items-center justify-center"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </div>
  );
}
