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
    description: "Manage your finances securely with one powerful platform built for fast, simple, and reliable digital payments.",
    illustration: (
      <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-600">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 11h6M9 15h6" />
        </svg>
      </div>
    ),
  },
  {
    title: "Secure Wallet & Transfers",
    description: "Send money, receive payments, manage your wallet, and enjoy secure transactions with confidence.",
    illustration: (
      <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
        <svg className="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L15 10H23L17 15L19 23L12 18L5 23L7 15L1 10H9L12 2Z" />
        </svg>
      </div>
    ),
  },
  {
    title: "Buy & Activate PAY ID",
    description: "Purchase and activate your PAY ID to unlock premium features, exclusive rewards, and more services.",
    illustration: (
      <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center">
        <svg className="w-12 h-12 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      </div>
    ),
  },
  {
    title: "Everything is Ready",
    description: "Your PAYgO LIMITED account is ready. Tap Get Started to access your Dashboard and begin using all available services.",
    illustration: (
      <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
        <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
      {/* Content Area - Compact Layout */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-8 pb-32">
        {/* Illustration - Reduced size */}
        <div className="mb-6 animate-fade-in">
          {screen.illustration}
        </div>

        {/* Title - Reduced font size */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          {screen.title}
        </h2>

        {/* Description - Reduced font size and spacing */}
        <p className="text-sm text-gray-600 text-center leading-relaxed max-w-xs mb-6">
          {screen.description}
        </p>

        {/* Page Indicator - Moved closer */}
        <div className="flex gap-1.5 mb-6">
          {screens.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentScreen
                  ? "bg-gradient-to-r from-purple-600 to-orange-500 w-6"
                  : "bg-gray-300 w-1.5"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          {/* Back Button */}
          <button
            onClick={handleBack}
            disabled={currentScreen === 0}
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2"
          >
            Skip
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-orange-500 hover:shadow-lg transition-shadow"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Get Started Button - Last Screen */}
          {isLastScreen && (
            <button
              onClick={handleGetStarted}
              className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold py-2.5 rounded-lg hover:shadow-lg transition-shadow ml-2"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
