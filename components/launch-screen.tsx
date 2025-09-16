"use client"

import { Button } from "@/components/ui/button"

interface LaunchScreenProps {
  onGetStarted: () => void
}

export default function LaunchScreen({ onGetStarted }: LaunchScreenProps) {
  const handleNeedHelp = () => {
    window.open("https://wa.me/2347078515833", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-orange-100 relative">
      <div className="absolute top-2 right-6">
        <button
          onClick={handleNeedHelp}
          className="text-purple-500 text-lg font-medium hover:text-purple-600 underline"
        >
          Need Help?
        </button>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
        <div className="mb-10">
          <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl px-8 py-4 shadow-lg">
            <h1
              className="text-white text-3xl font-bold tracking-wide"
              style={{
                textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
                animation: "slideLeftRight 3s ease-in-out infinite",
              }}
            >
              PAYGO
            </h1>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to PAYGO</h2>
          <p className="text-gray-600 text-lg">Your one-stop solution for all payment needs</p>
        </div>

        <Button
          onClick={onGetStarted}
          className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg"
        >
          Get Started
        </Button>
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
