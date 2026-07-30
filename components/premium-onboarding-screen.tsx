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
    description: "Experience a smarter way to manage your finances. Secure payments, digital wallet, PAY ID activation, airtime, data, and much more in one powerful platform.",
    icon: "🎉",
  },
  {
    title: "Fast, Secure & Reliable",
    description: "Transfer money, manage your wallet, purchase services, and enjoy secure transactions with confidence anytime, anywhere.",
    icon: "🚀",
  },
  {
    title: "Activate Your PAY ID",
    description: "Purchase and activate your PAY ID to unlock exclusive features, rewards, promotions, and premium services on PAYgO LIMITED.",
    icon: "🎫",
  },
  {
    title: "Let's Get Started",
    description: "Your digital finance journey begins here. Access your dashboard and enjoy everything PAYgO LIMITED has to offer.",
    icon: "✨",
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
    <div className="w-full min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col">
      {/* Header with Skip Button */}
      <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-600 to-orange-500">
        <div className="w-8" />
        <h1 className="text-white font-bold text-lg">PAYgO LIMITED</h1>
        <button
          onClick={handleSkip}
          className="text-white text-sm font-medium hover:opacity-80 transition-opacity"
        >
          Skip
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Animated Icon */}
        <div className="text-6xl mb-8 animate-bounce">{screen.icon}</div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">{screen.title}</h2>

        {/* Description */}
        <p className="text-gray-600 text-center text-lg leading-relaxed mb-8 max-w-sm">
          {screen.description}
        </p>

        {/* Page Indicator */}
        <div className="flex gap-2 mb-12">
          {screens.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentScreen ? "w-8 bg-gradient-to-r from-purple-600 to-orange-500" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="px-6 py-6 bg-white border-t border-gray-200">
        <div className="flex gap-4 max-w-sm mx-auto">
          {currentScreen > 0 && (
            <button
              onClick={handleBack}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
          )}

          {isLastScreen ? (
            <button
              onClick={handleGetStarted}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Get Started
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
