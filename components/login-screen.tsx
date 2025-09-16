"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginScreenProps {
  onSwitchToRegister: () => void
  onLogin: () => void
}

export default function LoginScreen({ onSwitchToRegister, onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleNeedHelp = () => {
    const whatsappNumber = "+2347078515833" // Updated WhatsApp number to +2347078515833
    const message = "Hello, I need help with login on PayGo app"
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace("+", "")}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleLogin = () => {
    if (email && password) {
      onLogin()
    }
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

      {/* Main content container */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
        <div className="mb-10">
          <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl px-8 py-4 shadow-lg">
            <h1
              className="text-white text-2xl font-bold tracking-wide"
              style={{
                textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
                animation: "slideLeftRight 3s ease-in-out infinite",
              }}
            >
              PAYGO
            </h1>
          </div>
        </div>

        <div className="w-full max-w-xs bg-white rounded-xl shadow-xl p-5">
          <h2 className="text-lg font-bold text-black text-center mb-5">Login to continue</h2>

          <div className="space-y-3">
            {/* Email Input */}
            <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 text-sm bg-gray-100 border-0 rounded-lg placeholder:text-gray-500 focus:ring-0 focus:outline-none"
            />

            {/* Password Input */}
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 text-sm bg-gray-100 border-0 rounded-lg placeholder:text-gray-500 focus:ring-0 focus:outline-none"
            />

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              className="w-full h-10 bg-black hover:bg-gray-800 text-white text-sm font-medium rounded-lg mt-4"
            >
              Login
            </Button>

            <div className="text-center mt-3">
              <button
                onClick={onSwitchToRegister}
                className="text-purple-500 text-xs font-medium hover:text-purple-600"
              >
                {"Don't have an account? Register"}
              </button>
            </div>
          </div>
        </div>
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
