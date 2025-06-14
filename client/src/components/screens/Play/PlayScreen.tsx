import { useState } from "react";
import { motion } from "framer-motion";
import { TamagotchiTopBar } from "../../layout/TopBar";
import { NavBar } from "../../layout/NavBar";
import type { Screen } from "../../types/screens";
import MagicalSparkleParticles from "../../shared/MagicalSparkleParticles";
import { DropdownMenu } from "../Home/DropDownMenu";
import { PlayerInfoModal } from "../Home/PlayerInfoModal";

import bannerImg from "../../../assets/banners/banner-dragon.png";
import treeOfLifeIcon from "../../../assets/icons/age/icon-age-tree-of-life.webp";
import babyWorlfBeast from "../../../assets/beasts/baby-wolf.png";
import playBackground from "../../../assets/backgrounds/bg-play.png";
import flappyGameIcon from "../../../assets/icons/games/flappy.png";
import platformGameIcon from "../../../assets/icons/games/platform.png";

interface PlayScreenProps {
  onNavigation: (screen: Screen) => void;
  playerAddress: string;
}

// Mini-games data
const miniGames = [
  {
    id: "flappy",
    title: "Flappy Beast",
    icon: flappyGameIcon,
    route: "/play/flappy"
  },
  {
    id: "platform",
    title: "Platform Jump",
    icon: platformGameIcon,
    route: "/play/platform"
  }
];

export const PlayScreen = ({ onNavigation, playerAddress }: PlayScreenProps) => {
  const [age] = useState(1);
  const playerName = "0xluis";
  const [isPlayerInfoModalOpen, setIsPlayerInfoModalOpen] = useState(false);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  // Beast data for sharing - hardcoded values for now
  const beastData = {
    age: 3, // days
    energy: 85,
    hunger: 40,
    happiness: 92,
    cleanliness: 68,
  };

  // Player data for the info modal
  const playerData = {
    username: playerName,
    points: 5800,
    currentStreak: 4,
    banner: "dragon",
  };

  const handleProfileClick = () => {
    console.log("Profile clicked:", playerAddress);
    setIsPlayerInfoModalOpen(true);
  };

  const handleNavigateLogin = () => {
    console.log("Navigating to login");
    onNavigation("login");
  };

  const handleMiniGameSelect = (gameId: string) => {
    console.log(`Selected mini-game: ${gameId}`);
    // For now, just log - you can implement mini-game navigation later
    // navigate(miniGames.find(game => game.id === gameId)?.route || "/play");
  };

  const nextGame = () => {
    setCurrentGameIndex((prev) => (prev + 1) % miniGames.length);
  };

  const prevGame = () => {
    setCurrentGameIndex((prev) => (prev - 1 + miniGames.length) % miniGames.length);
  };

  const buttonInteractionProps = {
    whileHover: { scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 15 } },
    whileTap: { scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 20 } },
  };

  const beastAnimation = {
    initial: { scale: 0.3, opacity: 0, rotate: -15 },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.6,
        scale: { delay: 0.6, duration: 0.5 },
        opacity: { delay: 0.6, duration: 0.4 },
      },
    },
    whileHover: { scale: 1.03, rotate: 2 },
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center overflow-hidden font-rubik"
      style={{
        backgroundImage: `url(${playBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Magical Sparkle Particles */}
      <MagicalSparkleParticles />
       
      {/* Top Bar with Coins, Gems, and Status */}
      <TamagotchiTopBar
        coins={12345}
        gems={678}
        status={{ energy: 85, hunger: 60, happiness: 75, hygiene: 90 }}
      />

      <div className="w-full px-4 md:px-6 lg:px-8 flex justify-between items-start mt-3 md:mt-4 z-10">
        {/* Left: Banner & Player Name */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.5, ease: "easeOut" } }}
          className="flex flex-col items-center space-y-1 md:space-y-1.5"
        >
          <motion.button
            onClick={handleProfileClick}
            {...buttonInteractionProps}
            className="focus:outline-none active:scale-95"
            aria-label="Player Profile"
          >
            <img src={bannerImg} alt="Profile Banner" className="h-16 sm:h-20 md:h-24 w-auto" />
          </motion.button>
          <p className="text-sm md:text-base font-rubik text-cream font-semibold select-none drop-shadow-sm">
            {playerName}
          </p>
        </motion.div>

        {/* Right: Age, Trophy & Dropdown */}
        <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-5 pt-1">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.5, ease: "easeOut" } }}
            className="flex items-center space-x-1 md:space-x-1.5"
          >
            <img src={treeOfLifeIcon} alt="Tree of Life" className="h-10 w-10 lg:h-12 lg:w-12" />
            <span className="text-xl md:text-2xl lg:text-3xl font-luckiest text-cream select-none">
              {age}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.35, duration: 0.5, ease: "easeOut" } }}
            className="z-50"
          >
            <DropdownMenu 
              onNavigateLogin={handleNavigateLogin}
              selectedBeast={beastData}
            />
          </motion.div>
        </div>
      </div>

      {/* Center: Beast */}
      <div className="flex-1 flex items-center justify-center w-full pointer-events-none select-none z-0 relative">
        <motion.img
          src={babyWorlfBeast}
          alt="Tamagotchi Beast"
          className="h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-[280px] lg:w-[280px] object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)] pointer-events-auto"
          initial={beastAnimation.initial}
          animate={beastAnimation.animate}
          whileHover={beastAnimation.whileHover}
        />
      </div>

      {/* Mini-Games Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.6, ease: "easeOut" } }}
        className="w-full max-w-sm px-4 pb-24 z-10"
      >
        <div className="relative">
          {/* Game Cards */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentGameIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {miniGames.map((game) => (
                <div key={game.id} className="w-full flex-shrink-0 px-2">
                  <div
                    onClick={() => handleMiniGameSelect(game.id)}
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg mb-3">
                      <img 
                        src={game.icon} 
                        alt={game.title}
                        className="w-16 h-16 md:w-20 md:h-20 object-contain"
                      />
                    </div>
                    <p className="text-sm md:text-base font-rubik font-semibold text-cream text-center drop-shadow-sm">
                      {game.title}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          {miniGames.length > 1 && (
            <>
              <button
                onClick={prevGame}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 bg-gray-900/70 backdrop-blur-sm rounded-full p-3 shadow-lg z-10 hover:bg-gray-900/80 transition-colors duration-200"
                aria-label="Previous Game"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextGame}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 bg-gray-900/70 backdrop-blur-sm rounded-full p-3 shadow-lg z-10 hover:bg-gray-900/80 transition-colors duration-200"
                aria-label="Next Game"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Navigation Bar */}
      <NavBar onNavigation={onNavigation} activeTab="play" />

      {/* Player Info Modal */}
      <PlayerInfoModal
        isOpen={isPlayerInfoModalOpen}
        onClose={() => setIsPlayerInfoModalOpen(false)}
        playerData={playerData}
      />
    </div>
  );
};