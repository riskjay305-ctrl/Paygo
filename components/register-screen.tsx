"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface RegisterScreenProps {
  onSwitchToLogin: () => void
  onSuccessfulRegistration: (name: string, email: string) => void
  registeredEmails: string[]
}

export default function RegisterScreen({
  onSwitchToLogin,
  onSuccessfulRegistration,
  registeredEmails,
}: RegisterScreenProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")

  const handleRegister = () => {
    if (name && email && password) {
      if (registeredEmails.includes(email)) {
        setEmailError("Email registered, kindly choose LOGIN option")
        return
      }
      setEmailError("")
      onSuccessfulRegistration(name, email)
    }
  }

  const handleNeedHelp = () => {
    const whatsappNumber = "+2347078515833" // WhatsApp number from support section
    const message = "Hello, I need help with registration on PayGo app"
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace("+", "")}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-orange-100 relative">
      <div className="absolute top-2 right-6">
        <button onClick={handleNeedHelp} className="text-purple-500 text-lg font-medium hover:text-purple-600">
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
                animation: "slideRightToLeft 4s ease-in-out infinite",
              }}
            >
              PAYgO
            </h1>
          </div>
        </div>

        <div className="w-full max-w-xs bg-white rounded-xl shadow-xl p-5">
          <h2 className="text-lg font-bold text-black text-center mb-5">Register to continue</h2>

          <div className="space-y-3">
            {/* Name Input */}
            <Input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 text-sm bg-gray-100 border-0 rounded-lg placeholder:text-gray-500 focus:ring-0 focus:outline-none"
            />

            {/* Email Input */}
            <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (emailError) setEmailError("")
              }}
              className="h-10 text-sm bg-gray-100 border-0 rounded-lg placeholder:text-gray-500 focus:ring-0 focus:outline-none"
            />

            {emailError && <p className="text-red-500 text-xs mt-1">Email registered, kindly choose LOGIN option</p>}

            {emailError && (
              <div className="text-center">
                <button onClick={onSwitchToLogin} className="text-purple-500 text-xs font-medium hover:text-purple-600">
                  Go to LOGIN page
                </button>
              </div>
            )}

            {/* Password Input */}
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 text-sm bg-gray-100 border-0 rounded-lg placeholder:text-gray-500 focus:ring-0 focus:outline-none"
            />

            {/* Register Button */}
            <Button
              onClick={handleRegister}
              className="w-full h-10 bg-black hover:bg-gray-800 text-white text-sm font-medium rounded-lg mt-4"
            >
              Register
            </Button>

            <div className="text-center mt-3">
              <button onClick={onSwitchToLogin} className="text-purple-500 text-xs font-medium hover:text-purple-600">
                Already have an account? Login
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideRightToLeft {
          0% { transform: translateX(20px); }
          50% { transform: translateX(-20px); }
          100% { transform: translateX(20px); }
        }
      `}</style>
    </div>
  )
}
