"use client"

import { Button } from "@/components/ui/button"
import { Bell, Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

interface DashboardScreenProps {
  userName: string
  userBalance: number
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 relative">
      <div
        className="absolute top-20 right-4 w-32 h-24 rounded-2xl opacity-20"
        style={{ backgroundColor: "#C154C1" }}
      ></div>

      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 text-sm overflow-hidden">
        <div className="animate-scroll whitespace-nowrap">
          Warning ⚠️ We are currently experiencing network delaying on Opay bank but we advise user to go ahead with
          other banks account and we'll update all our users when OPay bank network is restored with 300 seconds.
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-6">
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
              onClick={onLogout}
              variant="secondary"
              className="bg-purple-500 hover:bg-purple-400 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg">
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
            { name: "Buy PAY ID", icon: "💳", color: "bg-yellow-500", onClick: onBuyPayId },
            { name: "Watch", icon: "📺", color: "bg-blue-500", onClick: onWatch },
            { name: "Airtime", icon: "📊", color: "bg-green-500", onClick: onAirtime },
            { name: "Data", icon: "💾", color: "bg-purple-500", onClick: onData },
            { name: "Support", icon: "🎧", color: "bg-gray-700", onClick: onSupport },
            { name: "Group", icon: "🌐", color: "bg-blue-400", onClick: onGroup },
            { name: "Earn More", icon: "💰", color: "bg-yellow-600", onClick: onEarnMore },
            { name: "Profile", icon: "👤", color: "bg-gray-600", onClick: onProfile },
          ].map((service, index) => (
            <div key={index} className="text-center">
              <button
                onClick={service.onClick}
                className="bg-white rounded-2xl p-4 shadow-sm mb-2 w-full hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mx-auto text-white text-xl`}
                >
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

          {/* Winners Promotion Card */}
          <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl p-6 mb-4 relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-white text-2xl font-bold mb-2">Winners</h4>
              <p className="text-white text-lg mb-1">of K20 airtime</p>
              <div className="text-white text-sm space-y-1">
                <p>Patience Ng'andwe</p>
                <p>John</p>
              </div>
            </div>

            {/* Navigation arrows */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <Button variant="ghost" size="icon" className="bg-white/20 hover:bg-white/30 text-white rounded-full">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <Button variant="ghost" size="icon" className="bg-white/20 hover:bg-white/30 text-white rounded-full">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Winner image placeholder */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-t from-orange-400 to-transparent rounded-tl-full"></div>
          </div>

          {/* Transaction Promotion Card */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 relative overflow-hidden">
            <h4 className="text-white text-2xl font-bold">Transact</h4>
            <p className="text-gray-300 text-sm mt-2">More transactions, more rewards</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
