"use client"

import { Button } from "@/components/ui/button"
import { Bell, Eye, EyeOff } from "lucide-react"
import { useState, useEffect } from "react"

interface DashboardScreenProps {
  userName: string
  userBalance: number
  withdrawalHistory: Array<{
    id: string
    type: string
    amount: number
    recipient?: string
    phone?: string
    date: string
  }>
  onLogout: () => void
  onBuyPayId: () => void
  onTransfer: () => void
  onAirtime: () => void
  onData: () => void
  onWatch: () => void
  onProfile: () => void
  onSupport: () => void
  onGroup: () => void
  onEarnMore: () => void
  onUpgrade: () => void
}

export default function DashboardScreen({
  userName,
  userBalance,
  withdrawalHistory,
  onLogout,
  onBuyPayId,
  onTransfer,
  onAirtime,
  onData,
  onWatch,
  onProfile,
  onSupport,
  onGroup,
  onEarnMore,
  onUpgrade,
}: DashboardScreenProps) {
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [showPaymentWarning, setShowPaymentWarning] = useState(true)

  const promoImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%2837%29-cFFExaGXK4TPfm9OGZVpgC2yZfjTs4.jpeg", // Mobile payment banner
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%288%29-18i79PONNGcSuekOcXM6M1laNewTiA.jpeg", // PaygO card
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%2844%29-if7DUaB2uiNxPVVnrY8I8avjw3MFI0.jpeg", // Traveling Abroad banner
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%289%29-k2wzZIT86jEFilylZwUBvNCoMPRq5r.jpeg", // Purple PaygO card
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FB_IMG_1758090621579.jpg-1FA6TjpcxzU6GDLcBIbN82wP3Kw0Ct.jpeg", // Person with PAY WITH card
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%2834%29-oEviSEP6dnE2ATExy8gCb8NMbPDFD7.jpeg", // Get Virtual Card banner
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%287%29-ZhCkPba47EeH6a05kEpbsjru0GjYzB.jpeg", // Mobile device
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%282%29.jpg-rbCivw69A0yhyjcOvYZLeqC6ZReUHc.jpeg", // Orange POS terminal
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FB_IMG_1758090764459.jpg-HRW19pvckGpr4urSXszmcJBNuxkpfK.jpeg", // PaygO receipt
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%2835%29-xIlGozykrIYIWBQMuhwnZgxjzkemPp.jpeg", // GO CASHLESS banner
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoIndex((prev) => (prev + 1) % promoImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [promoImages.length])

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true)
  }

  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(false)
    onLogout()
  }

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-orange-100 relative">
      <div className="absolute top-20 right-4 w-32 h-24 rounded-2xl opacity-20 bg-gradient-to-r from-purple-600 to-orange-500"></div>

      {showPaymentWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 mx-4 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Payment Warning</h3>
            <p className="text-gray-600 text-center mb-6">
              Please ensure you complete your payment within the specified time limit to avoid transaction failure.
            </p>
            <Button
              onClick={() => setShowPaymentWarning(false)}
              className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white"
            >
              I understand
            </Button>
          </div>
        </div>
      )}

      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 text-sm overflow-hidden">
        <div className="animate-scroll whitespace-nowrap">
          Warning ⚠️ We are currently experiencing network delaying on Opay bank but we advise user to go ahead with
          other banks account and we'll update all our users when OPay bank network is restored with 300 seconds.
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-orange-500 px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-lg">{userName.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h1 className="text-white text-sm font-medium">Hi, {userName} 👋</h1>
              <p className="text-purple-200 text-sm">Welcome back!</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="text-white hover:bg-purple-500">
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleLogoutClick}
              variant="secondary"
              className="bg-purple-500 hover:bg-purple-400 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-purple-500 to-orange-400 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-purple-200 text-sm mb-1">Available Balance</p>
              <h2 className="text-white text-3xl font-bold">
                {balanceVisible ? `₦${userBalance.toLocaleString()}.00` : "₦***,***.00"}
              </h2>
              <p className="text-purple-200 text-sm mt-1">Weekly Rewards: ₦180,000.00</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setBalanceVisible(!balanceVisible)}
              className="text-purple-200 hover:bg-purple-400"
            >
              {balanceVisible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </Button>
          </div>

          <div className="flex space-x-3">
            <Button onClick={onUpgrade} className="flex-1 bg-white text-purple-600 hover:bg-gray-100 rounded-full py-3">
              <span className="mr-2">✓</span>
              Upgrade
            </Button>
            <Button
              onClick={onTransfer}
              className="flex-1 bg-white text-purple-600 hover:bg-gray-100 rounded-full py-3"
            >
              <span className="mr-2">↑</span>
              Transfer
            </Button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { name: "Buy PAY ID", icon: "💳", onClick: onBuyPayId },
            { name: "Watch", icon: "📺", onClick: onWatch },
            { name: "Airtime", icon: "📊", onClick: onAirtime },
            { name: "Data", icon: "💾", onClick: onData },
            { name: "Support", icon: "🎧", onClick: onSupport },
            { name: "Group", icon: "🌐", onClick: onGroup },
            { name: "Earn More", icon: "💰", onClick: onEarnMore },
            { name: "Profile", icon: "👤", onClick: onProfile },
          ].map((service, index) => (
            <div key={index} className="text-center">
              <button
                onClick={service.onClick}
                className="bg-white rounded-2xl p-4 shadow-sm mb-2 w-full hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-orange-500 rounded-xl flex items-center justify-center mx-auto text-white text-xl">
                  {service.icon}
                </div>
              </button>
              <p className="text-gray-600 text-xs">{service.name}</p>
            </div>
          ))}
        </div>

        {/* Current Promotions */}
        <div className="mb-6">
          <h3 className="text-gray-800 text-lg font-semibold mb-4">Current Promotions</h3>

          <div className="relative mb-4 h-48 rounded-2xl overflow-hidden">
            {promoImages.map((image, index) => {
              const animationClass = [
                "fadeInOut",
                "slideFromTop",
                "slideFromBottom",
                "rotateIn",
                "scaleIn",
                "bounceIn",
                "slideLeft",
                "flipIn",
                "zoomRotate",
                "pulseGlow",
              ][index % 10]

              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ${
                    index === currentPromoIndex
                      ? `opacity-100 transform translate-x-0 ${animationClass}`
                      : "opacity-0 transform translate-x-full"
                  }`}
                  style={{
                    animation: index === currentPromoIndex ? `${animationClass} 4s ease-in-out` : undefined,
                  }}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Promotion ${index + 1}`}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              )
            })}

            {/* Navigation dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {promoImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPromoIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentPromoIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Withdrawal History */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 relative overflow-hidden">
            <h4 className="text-white text-2xl font-bold mb-4">Withdrawal History</h4>
            <div className="space-y-3 max-h-32 overflow-y-auto">
              {withdrawalHistory.length > 0 ? (
                withdrawalHistory.slice(0, 3).map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center text-sm">
                    <div>
                      <p className="text-white font-medium">{transaction.type}</p>
                      <p className="text-gray-300 text-xs">
                        {transaction.recipient || transaction.phone} • {transaction.date}
                      </p>
                    </div>
                    <p className="text-red-400 font-medium">-₦{transaction.amount.toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-300 text-sm">No withdrawal history yet</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 mx-4 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Log Out</h3>
            <p className="text-gray-600 text-center mb-6">Are you sure you want to log out?</p>
            <div className="flex space-x-3">
              <Button
                onClick={handleLogoutCancel}
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
              >
                NO
              </Button>
              <Button onClick={handleLogoutConfirm} className="flex-1 bg-red-500 hover:bg-red-600 text-white">
                YES
              </Button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        /* Added multiple beautiful animation effects for promotion banners */
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        
        @keyframes slideFromTop {
          0% { transform: translateY(-100px) scale(0.9); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        
        @keyframes slideFromBottom {
          0% { transform: translateY(100px) scale(0.9); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        
        @keyframes rotateIn {
          0% { transform: rotate(-180deg) scale(0.5); opacity: 0; }
          100% { transform: rotate(0deg) scale(1); opacity: 1; }
        }
        
        @keyframes scaleIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes bounceIn {
          0% { transform: scale(0.3) translateY(-50px); opacity: 0; }
          50% { transform: scale(1.05) translateY(10px); opacity: 0.8; }
          70% { transform: scale(0.95) translateY(-5px); opacity: 0.9; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        
        @keyframes slideLeft {
          0% { transform: translateX(-100px) rotate(-10deg); opacity: 0; }
          100% { transform: translateX(0) rotate(0deg); opacity: 1; }
        }
        
        @keyframes flipIn {
          0% { transform: perspective(400px) rotateY(90deg); opacity: 0; }
          40% { transform: perspective(400px) rotateY(-10deg); opacity: 0.8; }
          70% { transform: perspective(400px) rotateY(10deg); opacity: 0.9; }
          100% { transform: perspective(400px) rotateY(0deg); opacity: 1; }
        }
        
        @keyframes zoomRotate {
          0% { transform: scale(0.1) rotate(180deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(90deg); opacity: 0.7; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes pulseGlow {
          0%, 100% { 
            transform: scale(1); 
            opacity: 1; 
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
          }
          50% { 
            transform: scale(1.05); 
            opacity: 0.9; 
            box-shadow: 0 0 40px rgba(147, 51, 234, 0.6);
          }
        }
      `}</style>
    </div>
  )
}
