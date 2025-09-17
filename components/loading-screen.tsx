"use client"

import { useEffect } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 6000) // 6 seconds

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-orange-100 flex items-center justify-center">
      <div className="text-center">
        {/* PAYGO Logo */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl px-8 py-4 shadow-lg inline-block">
            <h1
              className="text-white text-3xl font-bold tracking-wide"
              style={{
                textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
                animation: "slideRightToLeft 4s ease-in-out infinite",
              }}
            >
              PAYgO
            </h1>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center items-center space-x-2 mb-6">
          <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>

        {/* Loading Text */}
        <p className="text-purple-600 text-lg font-medium">Setting up your account...</p>

        {/* Progress Bar */}
        <div className="w-64 bg-gray-200 rounded-full h-2 mt-4 mx-auto">
          <div
            className="bg-gradient-to-r from-purple-600 to-orange-500 h-2 rounded-full animate-pulse"
            style={{
              width: "100%",
              animation: "loading 6s ease-in-out forwards",
            }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes slideRightToLeft {
          0% { transform: translateX(20px); }
          50% { transform: translateX(-20px); }
          100% { transform: translateX(20px); }
        }
      `}</style>
    </div>
  )
}
