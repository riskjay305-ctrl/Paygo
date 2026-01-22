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
  const [showPaygoInfo, setShowPaygoInfo] = useState(false)

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
    setShowPaygoInfo(!showPaygoInfo)
  }

  const handleJoinGroup = () => {
    window.open("https://chat.whatsapp.com/JKI1SxG2d7r8Vw4AHLqP2B", "_blank")
  }

  const paygoExplanations = [
    "PAYgO is Nigeria's leading digital payment platform that revolutionizes how you handle money transactions.",
    "With PAYgO, you can send and receive money instantly across Nigeria using just your mobile phone.",
    "PAYgO offers secure virtual cards for online shopping and international transactions without traditional bank requirements.",
    "Our platform provides affordable data and airtime purchases with instant delivery to any network in Nigeria.",
    "PAYgO enables seamless bill payments including electricity, water, cable TV, and internet subscriptions.",
    "You can earn money through our referral program by inviting friends and family to join the PAYgO community.",
    "PAYgO supports QR code payments for quick and contactless transactions at participating merchants nationwide.",
    "Our mobile POS system allows small businesses to accept digital payments and grow their customer base.",
    "PAYgO provides real-time transaction notifications and detailed spending analytics to help you manage finances better.",
    "With PAYgO, you get 24/7 customer support and bank-level security to protect all your financial transactions.",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-orange-100 relative">
      <div className="absolute top-2 right-6">
        <button onClick={handleNeedHelp} className="text-purple-500 text-lg font-medium hover:text-purple-600">
          Need Help?
        </button>
      </div>

      {showPaygoInfo && (
        <div className="absolute top-12 right-6 w-80 bg-white rounded-xl shadow-xl p-4 z-10 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-purple-600">About PAYgO</h3>
            <button onClick={() => setShowPaygoInfo(false)} className="text-gray-500 hover:text-gray-700 text-xl">
              ×
            </button>
          </div>
          <div className="space-y-3">
            {paygoExplanations.map((explanation, index) => (
              <div key={index} className="text-sm text-gray-700 p-2 bg-gray-50 rounded-lg">
                <span className="font-semibold text-purple-600">{index + 1}. </span>
                {explanation}
              </div>
            ))}
          </div>
        </div>
      )}

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

        {/* Join Group Button */}
        <button
          onClick={handleJoinGroup}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg shadow-lg transition-all duration-300"
        >
          <img src="/images/images-20-2819-29.jpeg" alt="WhatsApp" className="w-5 h-5" />
          Join Group
        </button>
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
