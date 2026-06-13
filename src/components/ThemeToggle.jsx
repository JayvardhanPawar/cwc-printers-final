import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false); // ✅ default light

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDarkDefault = savedTheme === 'dark'; // ✅ only dark if explicitly saved

    if (isDarkDefault) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-brand-secondary dark:hover:bg-brand-darkCard transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-brand-accent" />
      ) : (
        <Moon className="w-5 h-5 text-brand-text" />
      )}
    </button>
  );
}