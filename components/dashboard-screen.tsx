"use client"

import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  ChevronRight,
  Coins,
  Eye,
  EyeOff,
  Gift,
  Headphones,
  History,
  Home,
  MoreVertical,
  ShieldCheck,
  Smartphone,
  Users,
  UserRound,
  WalletCards,
} from "lucide-react"
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
  onHistory: () => void
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
  onHistory,
}: DashboardScreenProps) {
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [showPaymentWarning, setShowPaymentWarning] = useState(true)
  const [showSettingsMenu, setShowSettingsMenu] = useState(false)
  const [currentTheme, setCurrentTheme] = useState("default")

  const promoImages = [
    "/images/images-20-2837-29.jpeg", // Mobile payment banner
    "/images/download-20-288-29.jpeg", // PaygO card
    "/images/images-20-2844-29.jpeg", // Traveling Abroad banner
    "/images/download-20-289-29.jpeg", // Purple PaygO card
    "/images/fb-img-1758090621579.jpeg", // Person with PAY WITH card
    "/images/images-20-2834-29.jpeg", // Get Virtual Card banner
    "/images/download-20-287-29.jpeg", // Mobile device
    "/images/images-20-282-29.jpeg", // Orange POS terminal
    "/images/fb-img-1758090764459.jpeg", // PaygO receipt
    "/images/images-20-2835-29.jpeg", // GO CASHLESS banner
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoIndex((prev) => (prev + 1) % promoImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [promoImages.length])

  useEffect(() => {
    const savedTheme = localStorage.getItem("paygo-theme") || "default"
    setCurrentTheme(savedTheme)
    document.documentElement.setAttribute("data-theme", savedTheme)
  }, [])

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

  const handleSettingsClick = () => {
    setShowSettingsMenu(true)
  }

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme)
    localStorage.setItem("paygo-theme", theme)
    // Apply theme changes to document root for global theming
    document.documentElement.setAttribute("data-theme", theme)
  }

  const handleJoinWhatsApp = () => {
    window.open("https://chat.whatsapp.com/BeaxPL8AzFFEmfl5HsiWH9?s=cl&p=a&mlu=4&ilr=4&iam=2", "_blank")
  }

  return (
    <div id="top" className="min-h-screen bg-[#f4f7ff] text-slate-900 relative overflow-x-hidden pb-28">
      <div className="absolute inset-x-0 top-0 h-[430px] bg-[radial-gradient(circle_at_85%_5%,rgba(104,77,255,0.95),transparent_38%),linear-gradient(145deg,#071a62_0%,#0735b9_48%,#1b0c72_100%)]" />
      <div className="absolute -right-20 top-32 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

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

      <div className="relative z-20 border-b border-red-200 bg-red-50 px-3 py-1.5 text-[10px] font-medium text-red-700 overflow-hidden">
        <div className="animate-scroll whitespace-nowrap">
          Warning: We are currently experiencing network delays on OPay, but we advise users to continue with
          other banks account and we'll update all our users when OPay bank network is restored with 300 seconds.
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 pb-5 pt-5 sm:px-6 lg:mx-auto lg:max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-lg shadow-blue-950/20">
              <span className="text-xl font-black italic text-blue-700">P</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-200">PAYgO</p>
              <p className="text-xs font-semibold text-white/80">LIMITED</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="Notifications" className="relative rounded-2xl border border-white/15 bg-white/10 p-3 text-white backdrop-blur-md">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-400 text-[9px] font-bold text-white">2</span>
            </button>
            <button onClick={handleSettingsClick} aria-label="Open profile settings" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 to-blue-500 text-white shadow-lg">
              <span className="text-base font-bold">{userName.charAt(0).toUpperCase()}</span>
            </button>
          </div>
        </div>

        <div className="mb-5">
          <p className="text-sm font-medium text-blue-100">Welcome back</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white">Hi, {userName}</h1>
        </div>

        <div className="relative overflow-hidden rounded-[24px] border border-white/20 bg-gradient-to-br from-cyan-400 via-blue-600 to-violet-700 p-4 shadow-2xl shadow-blue-950/30 sm:p-7">
          <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
          <WalletCards className="absolute -bottom-8 -right-3 h-36 w-36 rotate-12 text-white/10" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-blue-50"><WalletCards className="h-5 w-5" /> Available Balance</div>
              <button onClick={() => setBalanceVisible(!balanceVisible)} aria-label={balanceVisible ? "Hide balance" : "Show balance"} className="rounded-full bg-white/15 p-2 text-white">{balanceVisible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}</button>
            </div>
            <p className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">{balanceVisible ? `₦${userBalance.toLocaleString()}.00` : "₦••••••••"}</p>
            <div className="mt-3 flex items-center justify-between rounded-2xl bg-white/15 px-3 py-2.5 text-xs text-white backdrop-blur-sm">
              <span className="flex items-center gap-2"><Gift className="h-4 w-4 text-yellow-300" /> Weekly Rewards</span>
              <span className="flex items-center gap-1 font-bold">View rewards <ChevronRight className="h-4 w-4" /></span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button onClick={onUpgrade} className="h-11 rounded-2xl bg-white font-bold text-blue-700 hover:bg-blue-50"><ShieldCheck className="mr-2 h-4 w-4" />Upgrade</Button>
              <Button onClick={onTransfer} className="h-11 rounded-2xl border border-white/25 bg-blue-950/25 font-bold text-white hover:bg-blue-950/40"><ArrowUpRight className="mr-2 h-4 w-4" />Transfer</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:py-5">
        <div className="mb-5 grid grid-cols-4 gap-1.5 rounded-[24px] bg-white/90 p-2.5 shadow-[0_16px_40px_rgba(44,66,140,0.12)] backdrop-blur sm:gap-4 sm:p-5">
          {[
            { name: "Buy PAY ID", icon: WalletCards, tone: "from-cyan-400 to-blue-600", onClick: onBuyPayId },
            { name: "Watch", icon: Smartphone, tone: "from-violet-500 to-purple-700", onClick: onWatch },
            { name: "Airtime", icon: BarChart3, tone: "from-orange-400 to-amber-500", onClick: onAirtime },
            { name: "Data", icon: Coins, tone: "from-emerald-400 to-green-600", onClick: onData },
            { name: "Support", icon: Headphones, tone: "from-blue-400 to-indigo-600", onClick: onSupport },
            { name: "Group", icon: Users, tone: "from-violet-500 to-fuchsia-600", onClick: onGroup },
            { name: "Earn More", icon: Coins, tone: "from-green-400 to-emerald-600", onClick: onEarnMore },
            { name: "Profile", icon: UserRound, tone: "from-sky-400 to-blue-600", onClick: onProfile },
          ].map((service) => {
            const Icon = service.icon
            return (
              <div key={service.name} className="text-center">
                <button onClick={service.onClick} className="group w-full rounded-2xl border border-slate-100 bg-white p-1.5 shadow-[0_8px_24px_rgba(33,60,130,0.08)] transition-all hover:-translate-y-1 hover:shadow-lg active:scale-95 sm:p-4">
                  <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${service.tone} text-white shadow-lg shadow-blue-900/10 sm:h-14 sm:w-14`}><Icon className="h-6 w-6 sm:h-7 sm:w-7" /></div>
                </button>
                <p className="mt-1 text-[10px] font-semibold text-slate-600 sm:text-xs">{service.name}</p>
              </div>
            )
          })}
        </div>

        <section className="relative mb-5 overflow-hidden rounded-[22px] bg-gradient-to-r from-[#0a38b7] via-[#1627d5] to-[#6b18df] px-4 py-4 text-white shadow-lg shadow-blue-900/15 sm:px-6">
          <div className="relative z-10 max-w-[68%]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200">PAYgO LIMITED</p>
            <h2 className="mt-1 text-lg font-black leading-tight sm:text-2xl">Grow Your Earnings</h2>
            <p className="text-sm font-bold leading-tight sm:text-base">with <span className="text-yellow-300">PAYgO LIMITED</span></p>
            <p className="mt-1 text-[11px] text-blue-100">More Services. More Rewards.</p>
            <button onClick={onEarnMore} className="mt-3 inline-flex items-center gap-1 rounded-full bg-yellow-300 px-3 py-1.5 text-[11px] font-black text-blue-950 shadow-md hover:bg-yellow-200">Learn More <ArrowUpRight className="h-3.5 w-3.5" /></button>
          </div>
          <div className="absolute -right-4 -top-8 h-40 w-40 rounded-full bg-cyan-300/20 blur-2xl" />
          <div className="absolute bottom-0 right-3 flex items-end gap-1 text-yellow-300" aria-hidden="true">
            <div className="h-8 w-8 rounded-full border-4 border-yellow-200/70 bg-yellow-400 text-center text-lg font-black leading-6">₦</div>
            <div className="h-12 w-10 rounded-t-lg bg-gradient-to-t from-yellow-500 to-yellow-200" />
            <div className="h-16 w-10 rounded-t-lg bg-gradient-to-t from-orange-500 to-yellow-200" />
          </div>
          <Smartphone className="absolute bottom-3 right-20 h-20 w-11 rotate-12 rounded-lg border-2 border-white/70 bg-white/90 p-1 text-blue-700" aria-hidden="true" />
        </section>

        {/* Current Promotions */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight text-[#0b1b59]">Current Promotions</h3>
            <span className="flex items-center gap-1 text-sm font-bold text-violet-700">View All <ChevronRight className="h-4 w-4" /></span>
          </div>

          <div className="relative mb-4 h-32 overflow-hidden rounded-2xl sm:h-40">
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

          <section id="history" className="rounded-[24px] border border-slate-100 bg-white p-4 shadow-[0_12px_32px_rgba(33,60,130,0.1)]">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-600">Activity</p>
                <h4 className="text-lg font-black text-slate-900">Recent transactions</h4>
              </div>
              <button onClick={onHistory} className="text-xs font-bold text-violet-700">View All</button>
            </div>
            <div className="space-y-2">
              {withdrawalHistory.length > 0 ? (
                withdrawalHistory.slice(0, 3).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2.5 text-sm">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-800">{transaction.type}</p>
                      <p className="truncate text-[11px] text-slate-500">{transaction.recipient || transaction.phone || "PAYgO wallet"} · {transaction.date}</p>
                    </div>
                    <div className="ml-3 text-right">
                      <p className="font-bold text-slate-900">-₦{transaction.amount.toLocaleString()}</p>
                      <p className="text-[10px] font-semibold text-emerald-600">Successful</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-5 text-center">
                  <History className="mx-auto h-6 w-6 text-slate-300" />
                  <p className="mt-1 text-xs font-medium text-slate-500">Your latest activity will appear here</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Settings Menu Modal */}
      {showSettingsMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-purple-200 via-pink-100 to-orange-100 rounded-2xl p-6 mx-4 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Settings & More</h3>
              <Button
                onClick={() => setShowSettingsMenu(false)}
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:bg-gray-200"
              >
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              {/* Theme Selection */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-3">🎨 Choose Theme</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Default", value: "default", colors: "from-purple-600 to-orange-500" },
                    { name: "Ocean Blue", value: "ocean", colors: "from-blue-600 to-cyan-500" },
                    { name: "Forest Green", value: "forest", colors: "from-green-600 to-emerald-500" },
                    { name: "Sunset Red", value: "sunset", colors: "from-red-600 to-pink-500" },
                    { name: "Royal Purple", value: "royal", colors: "from-purple-800 to-indigo-600" },
                    { name: "Golden Yellow", value: "golden", colors: "from-yellow-500 to-orange-400" },
                  ].map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => handleThemeChange(theme.value)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        currentTheme === theme.value
                          ? "border-purple-500 bg-purple-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className={`w-full h-8 rounded bg-gradient-to-r ${theme.colors} mb-2`}></div>
                      <p className="text-sm font-medium text-gray-700">{theme.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-3">⚡ Quick Actions</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 rounded-lg bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:from-purple-700 hover:to-orange-600 transition-all">
                    <div className="text-2xl mb-1">💳</div>
                    <p className="text-sm font-medium">Cards</p>
                  </button>
                  <button className="p-3 rounded-lg bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:from-purple-700 hover:to-orange-600 transition-all">
                    <div className="text-2xl mb-1">📊</div>
                    <p className="text-sm font-medium">Analytics</p>
                  </button>
                  <button className="p-3 rounded-lg bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:from-purple-700 hover:to-orange-600 transition-all">
                    <div className="text-2xl mb-1">🎁</div>
                    <p className="text-sm font-medium">Rewards</p>
                  </button>
                  <button className="p-3 rounded-lg bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:from-purple-700 hover:to-orange-600 transition-all">
                    <div className="text-2xl mb-1">📱</div>
                    <p className="text-sm font-medium">QR Code</p>
                  </button>
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-3">👤 Account</h4>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-700">Account Information</span>
                    <span className="text-gray-400">→</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-700">Security Settings</span>
                    <span className="text-gray-400">→</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-700">Privacy Settings</span>
                    <span className="text-gray-400">→</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-700">Linked Accounts</span>
                    <span className="text-gray-400">→</span>
                  </button>
                </div>
              </div>

              {/* App Settings */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-3">⚙️ App Settings</h4>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-700">Notifications</span>
                    <span className="text-gray-400">→</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-700">Language & Region</span>
                    <span className="text-gray-400">→</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-700">Currency Settings</span>
                    <span className="text-gray-400">→</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-700">Biometric Login</span>
                    <span className="text-gray-400">→</span>
                  </button>
                </div>
              </div>

              {/* Financial Tools */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-3">💰 Financial Tools</h4>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-700">Budget Tracker</span>
                    <span className="text-gray-400">→</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-700">Savings Goals</span>
                    <span className="text-gray-400">→</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-700">Investment Options</span>
                    <span className="text-gray-400">→</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-700">Loan Calculator</span>
                    <span className="text-gray-400">→</span>
                  </button>
                </div>
              </div>

              {/* Support & Help */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-3">🎧 Support & Help</h4>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-700">Help Center</span>
                    <span className="text-gray-400">→</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-700">Contact Support</span>
                    <span className="text-gray-400">→</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-700">Report Issue</span>
                    <span className="text-gray-400">→</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-700">Live Chat</span>
                    <span className="text-green-500">●</span>
                  </button>
                </div>
              </div>

              {/* About */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-3">ℹ️ About</h4>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-700">Terms of Service</span>
                    <span className="text-gray-400">→</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-700">Privacy Policy</span>
                    <span className="text-gray-400">→</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-700">App Version</span>
                    <span className="text-gray-400">v2.1.0</span>
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                    <span className="text-gray-700">Rate App</span>
                    <span className="text-yellow-500">⭐</span>
                  </button>
                </div>
              </div>

              {/* Logout Button */}
              <div className="pt-4">
                <Button
                  onClick={() => {
                    setShowSettingsMenu(false)
                    setShowLogoutConfirm(true)
                  }}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-xl"
                >
                  🚪 Logout
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">PAYgO Financial Limited</p>
            </div>
          </div>
        </div>
      )}

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

      <div className="fixed inset-x-3 bottom-4 z-40 mx-auto max-w-lg rounded-3xl border border-slate-200 bg-white/95 p-2 shadow-[0_16px_40px_rgba(16,38,103,0.2)] backdrop-blur-md sm:inset-x-auto sm:w-[440px]">
        <div className="grid grid-cols-4 items-center gap-1">
          <a href="#top" className="flex flex-col items-center gap-1 rounded-2xl bg-blue-50 py-2 text-blue-700"><Home className="h-5 w-5" /><span className="text-[10px] font-bold">Home</span></a>
          <button onClick={onHistory} className="flex flex-col items-center gap-1 rounded-2xl py-2 text-slate-500 hover:bg-slate-50"><History className="h-5 w-5" /><span className="text-[10px] font-semibold">History</span></button>
          <button onClick={onTransfer} className="flex flex-col items-center gap-1 rounded-2xl py-2 text-slate-500 hover:bg-slate-50"><ArrowUpRight className="h-5 w-5" /><span className="text-[10px] font-semibold">Withdraw</span></button>
          <button onClick={onSupport} className="flex flex-col items-center gap-1 rounded-2xl py-2 text-slate-500 hover:bg-slate-50"><Headphones className="h-5 w-5" /><span className="text-[10px] font-semibold">Support</span></button>
        </div>
      </div>
      <button onClick={handleJoinWhatsApp} aria-label="Join PAYgO WhatsApp group" className="fixed bottom-24 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 shadow-lg transition-transform hover:scale-105 sm:right-6">
        <img src="/images/images-20-2819-29.jpeg" alt="WhatsApp" className="h-7 w-7 rounded-full" />
      </button>

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

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  )
}
