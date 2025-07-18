import { useEffect } from "react";

interface CoverScreenProps {
  onLoadingComplete: () => void;
}

export const CoverScreen = ({ onLoadingComplete }: CoverScreenProps) => {
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-400">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">
          Tamagotchi
        </h1>
        <div className="animate-pulse text-xl">
          Cargando...
        </div>
      </div>
    </div>
  );
};