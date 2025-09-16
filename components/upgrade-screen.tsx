"use client"

import { ArrowLeft, Crown, Star, Zap, Shield, CheckCircle, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { LucideIcon } from "lucide-react"

interface VIPTier {
  id: string
  name: string
  price: number
  duration: string
  features: string[]
  color: string
  icon: LucideIcon // Fixed type from any to LucideIcon
  popular?: boolean
}

interface UpgradeScreenProps {
  onBack: () => void
}

export default function UpgradeScreen({ onBack }: UpgradeScreenProps) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const vipTiers: VIPTier[] = [
    {
      id: "bronze",
      name: "VIP Bronze",
      price: 2500,
      duration: "30 days",
      features: [
        "Priority customer support",
        "Reduced transaction fees",
        "Daily bonus rewards",
        "Access to exclusive promotions",
      ],
      color: "from-amber-400 to-amber-600",
      icon: Star,
    },
    {
      id: "silver",
      name: "VIP Silver",
      price: 5000,
      duration: "60 days",
      features: [
        "All Bronze benefits",
        "Higher transaction limits",
        "Weekly bonus multiplier",
        "Priority transaction processing",
        "Access to VIP group chat",
      ],
      color: "from-gray-400 to-gray-600",
      icon: Shield,
      popular: true,
    },
    {
      id: "gold",
      name: "VIP Gold",
      price: 10000,
      duration: "90 days",
      features: [
        "All Silver benefits",
        "Maximum transaction limits",
        "Daily bonus multiplier x2",
        "Instant transaction processing",
        "Personal account manager",
        "Early access to new features",
      ],
      color: "from-yellow-400 to-yellow-600",
      icon: Crown,
    },
    {
      id: "platinum",
      name: "VIP Platinum",
      price: 20000,
      duration: "180 days",
      features: [
        "All Gold benefits",
        "Unlimited transactions",
        "Daily bonus multiplier x3",
        "Zero transaction fees",
        "Dedicated support line",
        "Beta feature access",
        "Monthly cashback rewards",
      ],
      color: "from-purple-400 to-purple-600",
      icon: Zap,
    },
  ]

  const paymentDetails = {
    bankName: "PALMPAY",
    accountNumber: "8998790636",
    accountName: "ELOM CYNTHIA OBIANUJU",
  }

  const handleSelectTier = (tierId: string) => {
    setSelectedTier(tierId)
    setShowPayment(true)
  }

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const selectedTierData = vipTiers.find((tier) => tier.id === selectedTier)

  if (showPayment && selectedTierData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-orange-500 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowPayment(false)}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold text-white">VIP Payment</h1>
          <div className="w-10" />
        </div>

        {/* Payment Card */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-md mx-auto">
          {/* Selected Tier */}
          <div className={`bg-gradient-to-r ${selectedTierData.color} rounded-2xl p-4 text-white mb-6`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{selectedTierData.name}</h3>
                <p className="text-white/80">{selectedTierData.duration}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">₦{selectedTierData.price.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-4">Payment Instructions</h3>
            <p className="text-sm text-gray-600 mb-4">
              Transfer the exact amount to the account details below to activate your VIP subscription.
            </p>
          </div>

          {/* Account Details */}
          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Bank Name</p>
                  <p className="font-bold text-gray-800">{paymentDetails.bankName}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(paymentDetails.bankName, "bank")}
                  className="text-purple-600 hover:bg-purple-50"
                >
                  {copiedField === "bank" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Account Number</p>
                  <p className="font-bold text-gray-800 font-mono">{paymentDetails.accountNumber}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(paymentDetails.accountNumber, "account")}
                  className="text-purple-600 hover:bg-purple-50"
                >
                  {copiedField === "account" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Account Name</p>
                  <p className="font-bold text-gray-800">{paymentDetails.accountName}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(paymentDetails.accountName, "name")}
                  className="text-purple-600 hover:bg-purple-50"
                >
                  {copiedField === "name" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600">Amount to Pay</p>
                  <p className="font-bold text-purple-800 text-xl">₦{selectedTierData.price.toLocaleString()}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(selectedTierData.price.toString(), "amount")}
                  className="text-purple-600 hover:bg-purple-100"
                >
                  {copiedField === "amount" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-orange-50 rounded-2xl p-4 border border-orange-200 mb-6">
            <h4 className="font-semibold text-orange-800 mb-2">Important:</h4>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Transfer the exact amount shown above</li>
              <li>• VIP activation takes 5-10 minutes after payment</li>
              <li>• Contact support if payment is not reflected within 30 minutes</li>
              <li>• Keep your payment receipt for reference</li>
            </ul>
          </div>

          <Button onClick={onBack} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-orange-500 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/20">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-white">Upgrade Account</h1>
        <div className="w-10" />
      </div>

      {/* VIP Tiers */}
      <div className="space-y-4 max-w-md mx-auto">
        {vipTiers.map((tier) => {
          const IconComponent = tier.icon
          return (
            <div key={tier.id} className="bg-white rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-orange-500 text-white px-4 py-1 rounded-bl-2xl text-sm font-bold">
                  POPULAR
                </div>
              )}

              {/* Tier Header */}
              <div className={`bg-gradient-to-r ${tier.color} rounded-2xl p-4 text-white mb-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="h-8 w-8" />
                    <div>
                      <h3 className="text-xl font-bold">{tier.name}</h3>
                      <p className="text-white/80">{tier.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">₦{tier.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Select Button */}
              <Button
                onClick={() => handleSelectTier(tier.id)}
                className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90 text-white font-semibold`}
              >
                Select {tier.name}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
