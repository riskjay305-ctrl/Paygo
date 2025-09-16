"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

interface TransferScreenProps {
  onBack: () => void
  onSuccess?: (details: any) => void
  userBalance?: number
}

export default function TransferScreen({ onBack, onSuccess, userBalance = 180000 }: TransferScreenProps) {
  const [selectedBank, setSelectedBank] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [accountName, setAccountName] = useState("")
  const [amount, setAmount] = useState("")
  const [payIdCode, setPayIdCode] = useState("")
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [payIdError, setPayIdError] = useState("")

  const nigerianBanks = [
    "Access Bank",
    "First Bank",
    "GTBank",
    "Zenith Bank",
    "Sterling Bank",
    "Unity Bank",
    "Kuda",
    "Sparkle",
    "Moniepoint",
    "Palmpay",
    "OPay",
  ]

  const handleSubmit = () => {
    if (selectedBank && accountNumber && accountName && amount) {
      setShowCodeInput(true)
    }
  }

  const handlePayIdSubmit = () => {
    if (payIdCode === "PAYSCDO60") {
      setIsProcessing(true)
      setPayIdError("")

      setTimeout(() => {
        setIsProcessing(false)
        if (onSuccess) {
          onSuccess({
            type: "Bank Transfer",
            bank: selectedBank,
            accountNumber,
            accountName,
            amount: Number.parseFloat(amount),
            transactionId: `TXN${Date.now()}`,
            status: "Successful",
          })
        }
      }, 6000)
    } else {
      setPayIdError("Invalid code")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-6">
        <div className="flex items-center space-x-4 mb-4">
          <Button onClick={onBack} variant="ghost" size="icon" className="text-white hover:bg-purple-500">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-white text-xl font-semibold">Transfer</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md mx-auto">
          <h2 className="text-gray-800 text-lg font-semibold mb-6 text-center">
            {showCodeInput ? "Verify Transfer" : "Bank Transfer Details"}
          </h2>

          {!showCodeInput ? (
            <div className="space-y-6">
              {/* Bank Selection */}
              <div>
                <label className="text-gray-600 text-sm font-medium">Select Bank</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Choose your bank</option>
                  {nigerianBanks.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>

              {/* Account Number */}
              <div>
                <label className="text-gray-600 text-sm font-medium">Account Number</label>
                <Input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Enter account number"
                  className="mt-1"
                />
              </div>

              {/* Account Name */}
              <div>
                <label className="text-gray-600 text-sm font-medium">Account Name</label>
                <Input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="Enter account name"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-medium">Amount</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="mt-1"
                />
              </div>

              {/* Available Balance Display */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-purple-600 text-sm font-medium">Available Balance</p>
                <p className="text-purple-800 text-xl font-bold">₦{userBalance.toLocaleString()}.00</p>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!selectedBank || !accountNumber || !accountName || !amount}
                className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white py-3 rounded-lg font-semibold"
              >
                PROCEED
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Transfer Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank:</span>
                    <span className="font-medium">{selectedBank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account:</span>
                    <span className="font-medium">{accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{accountName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium text-purple-600">₦{amount}</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <p className="text-purple-800 text-sm text-center">Enter your PAY ID CODE to complete the transfer</p>
              </div>

              <div>
                <label className="text-gray-600 text-sm font-medium">PAY ID CODE</label>
                <Input
                  type="password"
                  placeholder="Enter PAY ID CODE"
                  value={payIdCode}
                  onChange={(e) => {
                    setPayIdCode(e.target.value)
                    setPayIdError("")
                  }}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Hidden from public view</p>
                {payIdError && <p className="text-xs text-red-500 mt-1">{payIdError}</p>}
              </div>

              {isProcessing && (
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                    <span className="text-purple-800 text-sm">Processing transfer...</span>
                  </div>
                </div>
              )}

              <Button
                onClick={handlePayIdSubmit}
                disabled={!payIdCode || isProcessing}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg font-semibold"
              >
                {isProcessing ? "Processing..." : "Complete Transfer"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
