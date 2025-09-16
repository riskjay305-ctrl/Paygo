"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface OnboardingScreenProps {
  userName: string
  onComplete: () => void
}

export default function OnboardingScreen({ userName, onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(1)

  const onboardingSteps = [
    {
      step: 1,
      title: "Welcome Bonus",
      icon: "🎁",
      iconColor: "text-purple-500",
      content: `You've received a welcome bonus of ₦180,000! This amount is already in your account and can be withdrawn after purchasing a PAY ID.`,
    },
    {
      step: 2,
      title: "Get Your PAY ID",
      icon: "💳",
      iconColor: "text-blue-500",
      content: `To withdraw funds, you'll need to purchase a PAY ID for ₦8,500.00. This is a one-time purchase that unlocks all features of the app.`,
    },
    {
      step: 3,
      title: "Airtime & Data",
      icon: "📞",
      iconColor: "text-green-500",
      content: `You can purchase airtime and data for all major networks directly from the app. Simply select the service, enter the phone number, choose your plan, and complete your purchase.`,
    },
    {
      step: 4,
      title: "Withdrawal Process",
      icon: "💰",
      iconColor: "text-red-500",
      content: `To withdraw your funds, tap the "Withdraw" button on your dashboard, enter your bank details and PAY ID, and submit your request. Withdrawals are processed within 24 hours.`,
    },
    {
      step: 5,
      title: "Ready to Start",
      icon: "⚡",
      iconColor: "text-orange-500",
      content: `You're all set! Explore the dashboard, manage your balance, make transfers, buy services, and enjoy all the features PayGo has to offer.`,
    },
  ]

  const currentStepData = onboardingSteps[currentStep - 1]

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-orange-100 relative">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Modal */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 relative">
            <button
              onClick={onComplete}
              className="absolute top-4 right-4 text-white hover:bg-purple-500 rounded-full p-1"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-white text-xl font-bold mb-2">Welcome to PayGo, {userName} !</h2>

            <p className="text-purple-200 text-sm mb-4">Step {currentStep} of 5</p>

            {/* Progress bar */}
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`h-1 flex-1 rounded-full ${step <= currentStep ? "bg-white" : "bg-purple-400"}`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 text-center">
            <div className={`text-6xl mb-4 ${currentStepData.iconColor}`}>{currentStepData.icon}</div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">{currentStepData.title}</h3>

            <p className="text-gray-600 text-sm leading-relaxed mb-8">{currentStepData.content}</p>

            <Button
              onClick={handleNext}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium"
            >
              {currentStep === 5 ? "Continue to Dashboard →" : "Next →"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
