"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginScreenProps {
  onSwitchToRegister: () => void
  onLogin: () => void
}

export default function LoginScreen({ onSwitchToRegister, onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPaygoInfo, setShowPaygoInfo] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [updateProgress, setUpdateProgress] = useState(0)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [loginError, setLoginError] = useState("")

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            setIsLoading(false)
            setShowForgotPassword(false)
            setShowNewPasswordForm(true)
            return 0
          }
          return prev + 100 / 60
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isLoading])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isUpdatingPassword) {
      interval = setInterval(() => {
        setUpdateProgress((prev) => {
          if (prev >= 100) {
            setIsUpdatingPassword(false)
            setShowNewPasswordForm(false)
            setShowSuccessMessage(true)
            setTimeout(() => {
              setShowSuccessMessage(false)
              setNewPassword("")
              setConfirmPassword("")
              setResetEmail("")
            }, 3000)
            return 0
          }
          return prev + 100 / 60
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isUpdatingPassword])

  const handleNeedHelp = () => {
    setShowPaygoInfo(!showPaygoInfo)
  }

  const handleLogin = () => {
    setLoginError("")

    if (email && password) {
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const existingUser = registeredUsers.find((user: any) => user.email === email && user.password === password)

      if (existingUser) {
        console.log("[v0] User found, logging in immediately")
        onLogin()
      } else {
        const userWithEmail = registeredUsers.find((user: any) => user.email === email)
        if (userWithEmail) {
          setLoginError("Incorrect password")
        } else {
          setLoginError("Invalid email or password")
        }
      }
    }
  }

  const handleForgotPassword = () => {
    setShowForgotPassword(true)
    setResetEmail("")
    setLoadingProgress(0)
  }

  const handleResetPassword = () => {
    if (resetEmail) {
      setIsLoading(true)
      setLoadingProgress(0)
    }
  }

  const handleCreateNewPassword = () => {
    setEmailError("")
    setPasswordError("")

    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
        const userIndex = registeredUsers.findIndex((user: any) => user.email === resetEmail)

        if (userIndex !== -1) {
          setIsUpdatingPassword(true)
          setUpdateProgress(0)

          setTimeout(() => {
            registeredUsers[userIndex].password = newPassword
            localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers))
          }, 6000)
        } else {
          setEmailError("email not found")
        }
      } else {
        setPasswordError("re-enter password")
      }
    } else {
      if (!newPassword) setPasswordError("re-enter password")
      if (!confirmPassword) setPasswordError("re-enter password")
    }
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (loginError) {
      setLoginError("")
    }
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    if (loginError) {
      setLoginError("")
    }
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

      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-xl p-6 w-80 mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Reset Password</h3>
              <button
                onClick={() => {
                  setShowForgotPassword(false)
                  setIsLoading(false)
                  setLoadingProgress(0)
                }}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            {!isLoading ? (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="h-10 text-sm bg-gray-100 border-0 rounded-lg placeholder:text-gray-500 focus:ring-0 focus:outline-none mb-4"
                />
                <div className="flex space-x-3">
                  <Button
                    onClick={() => setShowForgotPassword(false)}
                    className="flex-1 h-10 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm font-medium rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleResetPassword}
                    className="flex-1 h-10 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg"
                  >
                    Send Reset Link
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                </div>
                <p className="text-sm text-gray-600 mb-2">Sending reset link...</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-100"
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{Math.round(loadingProgress)}%</p>
              </div>
            )}
          </div>
        </div>
      )}

      {showNewPasswordForm && !isUpdatingPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-xl p-6 w-80 mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Create New Password</h3>
              <button
                onClick={() => {
                  setShowNewPasswordForm(false)
                  setEmailError("")
                  setPasswordError("")
                }}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Creating new password for: <span className="font-semibold text-purple-600">{resetEmail}</span>
              </p>
              {emailError && (
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-xs text-red-500">{emailError}</span>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-10 text-sm bg-gray-100 border-0 rounded-lg placeholder:text-gray-500 focus:ring-0 focus:outline-none"
              />
              <div>
                <Input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-10 text-sm bg-gray-100 border-0 rounded-lg placeholder:text-gray-500 focus:ring-0 focus:outline-none"
                />
                {passwordError && (
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-xs text-red-500">{passwordError}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <Button
                onClick={() => {
                  setShowNewPasswordForm(false)
                  setEmailError("")
                  setPasswordError("")
                }}
                className="flex-1 h-10 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm font-medium rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateNewPassword}
                className="flex-1 h-10 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg"
              >
                Update Password
              </Button>
            </div>
          </div>
        </div>
      )}

      {isUpdatingPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-xl p-6 w-80 mx-4">
            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Updating Password</h3>
              <p className="text-sm text-gray-600 mb-4">Please wait while we securely update your password...</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-100"
                  style={{ width: `${updateProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{Math.round(updateProgress)}%</p>
            </div>
          </div>
        </div>
      )}

      {showSuccessMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-xl p-6 w-80 mx-4">
            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-green-600 mb-2">Password Changed Successfully!</h3>
              <p className="text-sm text-gray-600 mb-4">
                Your password has been updated successfully. You can now login with your new password.
              </p>
              <p className="text-xs text-gray-500">
                Your old password is no longer valid and cannot be used for login.
              </p>
            </div>
          </div>
        </div>
      )}

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
          <h2 className="text-lg font-bold text-black text-center mb-5">Login to continue</h2>

          <div className="space-y-3">
            <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              className="h-10 text-sm bg-gray-100 border-0 rounded-lg placeholder:text-gray-500 focus:ring-0 focus:outline-none"
            />

            <div>
              <Input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                className="h-10 text-sm bg-gray-100 border-0 rounded-lg placeholder:text-gray-500 focus:ring-0 focus:outline-none"
              />
              {loginError && (
                <div className="mt-1">
                  <span className="text-xs text-red-500">{loginError}</span>
                </div>
              )}
            </div>

            <div className="text-right">
              <button
                onClick={handleForgotPassword}
                className="text-purple-500 text-xs font-medium hover:text-purple-600"
              >
                Forgot Password?
              </button>
            </div>

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
        @keyframes slideRightToLeft {
          0% { transform: translateX(20px); }
          50% { transform: translateX(-20px); }
          100% { transform: translateX(20px); }
        }
      `}</style>
    </div>
  )
}
