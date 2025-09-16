"use client"

import { useState } from "react"
import RegisterScreen from "@/components/register-screen"
import LoginScreen from "@/components/login-screen"
import WelcomeScreen from "@/components/welcome-screen"
import DashboardScreen from "@/components/dashboard-screen"
import BuyPayIdScreen from "@/components/buy-pay-id-screen"
import TransferScreen from "@/components/transfer-screen"
import AirtimeScreen from "@/components/airtime-screen"
import DataScreen from "@/components/data-screen"
import WatchScreen from "@/components/watch-screen"
import SuccessScreen from "@/components/success-screen"
import ProfileScreen from "@/components/profile-screen"
import SupportScreen from "@/components/support-screen"
import GroupScreen from "@/components/group-screen"
import EarnMoreScreen from "@/components/earn-more-screen"
import UpgradeScreen from "@/components/upgrade-screen"

export default function PaygoApp() {
  const [currentScreen, setCurrentScreen] = useState<
    | "register"
    | "login"
    | "welcome"
    | "dashboard"
    | "buyPayId"
    | "transfer"
    | "airtime"
    | "data"
    | "watch"
    | "success"
    | "profile"
    | "support"
    | "group"
    | "earnMore"
    | "upgrade"
  >("register")
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null)
  const [transactionDetails, setTransactionDetails] = useState<any>(null)
  const [userBalance, setUserBalance] = useState(180000)
  const [registeredEmails, setRegisteredEmails] = useState<string[]>([])
  const [withdrawalHistory, setWithdrawalHistory] = useState<
    Array<{
      id: string
      type: string
      amount: number
      recipient?: string
      phone?: string
      date: string
    }>
  >([])

  const handleSuccessfulRegistration = (name: string, email: string) => {
    setUserData({ name, email })
    setRegisteredEmails((prev) => [...prev, email])
    setCurrentScreen("welcome")
  }

  const handleContinueToDashboard = () => {
    setCurrentScreen("dashboard")
  }

  const handleLogout = () => {
    setCurrentScreen("register")
    setUserData(null)
  }

  const handleBuyPayId = () => {
    setCurrentScreen("buyPayId")
  }

  const handleTransfer = () => {
    setCurrentScreen("transfer")
  }

  const handleAirtime = () => {
    setCurrentScreen("airtime")
  }

  const handleData = () => {
    setCurrentScreen("data")
  }

  const handleWatch = () => {
    setCurrentScreen("watch")
  }

  const handleProfile = () => {
    setCurrentScreen("profile")
  }

  const handleSupport = () => {
    setCurrentScreen("support")
  }

  const handleGroup = () => {
    setCurrentScreen("group")
  }

  const handleEarnMore = () => {
    setCurrentScreen("earnMore")
  }

  const handleUpgrade = () => {
    setCurrentScreen("upgrade")
  }

  const handleLogin = () => {
    setCurrentScreen("dashboard")
  }

  const handleTransactionSuccess = (details: any) => {
    setTransactionDetails(details)

    // Add to withdrawal history
    const newTransaction = {
      id: Date.now().toString(),
      type: details.type || "Transfer",
      amount:
        typeof details.amount === "string" ? Number.parseFloat(details.amount.replace(/[₦,]/g, "")) : details.amount,
      recipient: details.recipient,
      phone: details.phone,
      date: new Date().toLocaleDateString(),
    }
    setWithdrawalHistory((prev) => [newTransaction, ...prev])

    if (details.amount && typeof details.amount === "string") {
      const numericAmount = Number.parseFloat(details.amount.replace(/[₦,]/g, ""))
      if (!isNaN(numericAmount)) {
        setUserBalance((prev) => Math.max(0, prev - numericAmount))
      }
    } else if (details.amount && typeof details.amount === "number") {
      setUserBalance((prev) => Math.max(0, prev - details.amount))
    }
    setCurrentScreen("success")
  }

  const handleUpdateBalance = (amount: number) => {
    setUserBalance((prev) => prev + amount)
  }

  const handleBackToDashboard = () => {
    setCurrentScreen("dashboard")
  }

  return (
    <div className="min-h-screen">
      {currentScreen === "register" ? (
        <RegisterScreen
          onSwitchToLogin={() => setCurrentScreen("login")}
          onSuccessfulRegistration={handleSuccessfulRegistration}
          registeredEmails={registeredEmails}
        />
      ) : currentScreen === "login" ? (
        <LoginScreen onSwitchToRegister={() => setCurrentScreen("register")} onLogin={handleLogin} />
      ) : currentScreen === "welcome" ? (
        <WelcomeScreen onContinueToDashboard={handleContinueToDashboard} />
      ) : currentScreen === "dashboard" ? (
        <DashboardScreen
          userName={userData?.name || "User"}
          userBalance={userBalance}
          withdrawalHistory={withdrawalHistory}
          onLogout={handleLogout}
          onBuyPayId={handleBuyPayId}
          onTransfer={handleTransfer}
          onAirtime={handleAirtime}
          onData={handleData}
          onWatch={handleWatch}
          onProfile={handleProfile}
          onSupport={handleSupport}
          onGroup={handleGroup}
          onEarnMore={handleEarnMore}
          onUpgrade={handleUpgrade}
        />
      ) : currentScreen === "buyPayId" ? (
        <BuyPayIdScreen
          userName={userData?.name || "User"}
          userEmail={userData?.email || ""}
          onBack={handleBackToDashboard}
        />
      ) : currentScreen === "transfer" ? (
        <TransferScreen onBack={handleBackToDashboard} onSuccess={handleTransactionSuccess} userBalance={userBalance} />
      ) : currentScreen === "airtime" ? (
        <AirtimeScreen onBack={handleBackToDashboard} onSuccess={handleTransactionSuccess} userBalance={userBalance} />
      ) : currentScreen === "data" ? (
        <DataScreen onBack={handleBackToDashboard} onSuccess={handleTransactionSuccess} />
      ) : currentScreen === "watch" ? (
        <WatchScreen onBack={handleBackToDashboard} />
      ) : currentScreen === "success" ? (
        <SuccessScreen transactionDetails={transactionDetails} onBackToDashboard={handleBackToDashboard} />
      ) : currentScreen === "profile" ? (
        <ProfileScreen
          userName={userData?.name || "User"}
          userEmail={userData?.email || ""}
          onBack={handleBackToDashboard}
        />
      ) : currentScreen === "support" ? (
        <SupportScreen onBack={handleBackToDashboard} />
      ) : currentScreen === "group" ? (
        <GroupScreen onBack={handleBackToDashboard} />
      ) : currentScreen === "earnMore" ? (
        <EarnMoreScreen
          onBack={handleBackToDashboard}
          onUpdateBalance={handleUpdateBalance}
          userBalance={userBalance}
        />
      ) : (
        <UpgradeScreen onBack={handleBackToDashboard} />
      )}
    </div>
  )
}
