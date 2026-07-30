"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PremiumOnboardingScreenProps {
  onSkip: () => void
  onGetStarted: () => void
}

const screens = [
  {
    title: "Welcome to PAYgO LIMITED",
    description: "Manage your finances securely with fast, simple digital payments.",
    illustration: (
      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
        <svg className="w-8 h-8 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 11h6M9 15h6" />
        </svg>
      </div>
    ),
  },
  {
    title: "Secure Wallet & Transfers",
    description: "Send money, manage wallet, and enjoy secure transactions.",
    illustration: (
      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
        <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L15 10H23L17 15L19 23L12 18L5 23L7 15L1 10H9L12 2Z" />
        </svg>
      </div>
    ),
  },
  {
    title: "Buy & Activate PAY ID",
    description: "Unlock premium features, rewards, and exclusive services.",
    illustration: (
      <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
        <svg className="w-8 h-8 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      </div>
    ),
  },
  {
    title: "Everything is Ready",
    description: "Your account is ready. Tap Get Started to access your Dashboard.",
    illustration: (
      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
        <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    ),
  },
]

export default function PremiumOnboardingScreen({ onSkip, onGetStarted }: PremiumOnboardingScreenProps) {
  const [currentScreen, setCurrentScreen] = useState(0)

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1)
    } else {
      onGetStarted()
    }
  }

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1)
    }
  }

  const handleSkip = () => {
    onSkip()
  }

  const handleGetStarted = () => {
    onGetStarted()
  }

  const screen = screens[currentScreen]
  const isLastScreen = currentScreen === screens.length - 1

  return (
    <div className="w-full h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col">
      {/* Content Area - Ultra Compact Layout */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pt-6 pb-28">
        {/* Illustration - Small size */}
        <div className="mb-3 animate-fade-in">
          {screen.illustration}
        </div>

        {/* Title - Compact font size */}
        <h2 className="text-lg font-bold text-gray-900 text-center mb-2">
          {screen.title}
        </h2>

        {/* Description - Small font with tight spacing */}
        <p className="text-xs text-gray-600 text-center leading-tight max-w-xs mb-4">
          {screen.description}
        </p>

        {/* Page Indicator - Tight spacing */}
        <div className="flex gap-1 mb-4">
          {screens.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentScreen
                  ? "bg-gradient-to-r from-purple-600 to-orange-500 w-5"
                  : "bg-gray-300 w-1"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Fixed Bottom Navigation - Compact */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-3">
        <div className="flex items-center justify-between gap-2">
          {/* Back Button */}
          <button
            onClick={handleBack}
            disabled={currentScreen === 0}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors px-2 py-1.5"
          >
            Skip
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-orange-500 hover:shadow-lg transition-shadow"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>

          {/* Get Started Button - Last Screen */}
          {isLastScreen && (
            <button
              onClick={handleGetStarted}
              className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold text-sm py-2 rounded-lg hover:shadow-lg transition-shadow ml-2"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
