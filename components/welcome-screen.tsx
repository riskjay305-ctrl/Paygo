"use client"

import { Button } from "@/components/ui/button"

interface WelcomeScreenProps {
  onContinueToDashboard: () => void
}

export default function WelcomeScreen({ onContinueToDashboard }: WelcomeScreenProps) {
  const handleJoinWhatsApp = () => {
    window.open("https://chat.whatsapp.com/EnzvsLOF4oFAfoFl1SbyPg", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-400 to-orange-400 relative">
      {/* Main content container */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
        {/* PAYGO Logo with animation */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl px-8 py-4 shadow-lg">
            <h1
              className="text-white text-2xl font-bold tracking-wide animate-pulse"
              style={{
                textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
                animation: "slideLeftRight 3s ease-in-out infinite",
              }}
            >
              PAYGO
            </h1>
          </div>
        </div>

        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-purple-500 mb-6">Welcome to PayGo!</h2>

          <div className="space-y-3 mb-6">
            <p className="text-gray-600 text-base leading-relaxed">
              As a new user, you'll receive a generous welcome bonus of
            </p>

            <div className="text-3xl font-bold text-purple-500 my-4">₦180,000</div>

            <p className="text-gray-600 text-base leading-relaxed">
              which can be withdrawn at any time. Yes, you read that right - it's yours to keep!
            </p>
          </div>

          {/* Continue Button */}
          <Button
            onClick={onContinueToDashboard}
            className="w-full h-12 bg-gradient-to-r from-purple-500 to-orange-400 hover:from-purple-600 hover:to-orange-500 text-white text-base font-medium rounded-xl"
          >
            Continue to Dashboard
          </Button>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <button
          onClick={handleJoinWhatsApp}
          className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg transition-all"
        >
          <img src="/images/images-20-2819-29.jpeg" alt="WhatsApp" className="h-6 w-6" />
          <span className="font-semibold">Join Group</span>
        </button>
      </div>

      <style jsx>{`
        @keyframes slideLeftRight {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  )
}
