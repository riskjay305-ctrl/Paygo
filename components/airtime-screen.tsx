"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Phone } from "lucide-react"
import { useState } from "react"

interface AirtimeScreenProps {
  onBack: () => void
  onSuccess: (details: any) => void
}

export default function AirtimeScreen({ onBack, onSuccess }: AirtimeScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [network, setNetwork] = useState("")
  const [payIdCode, setPayIdCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [payIdError, setPayIdError] = useState("")

  const networks = ["MTN", "Airtel", "Glo", "9mobile"]

  const handleProceed = () => {
    if (phoneNumber && amount && network) {
      setShowCodeInput(true)
    }
  }

  const handlePayIdSubmit = () => {
    if (payIdCode === "PAY_ID_go@2025") {
      setIsProcessing(true)
      setPayIdError("")

      setTimeout(() => {
        setIsProcessing(false)
        onSuccess({
          type: "Airtime Purchase",
          phoneNumber,
          amount: Number.parseFloat(amount),
          network,
          transactionId: `TXN${Date.now()}`,
          status: "Successful",
        })
      }, 6000)
    } else {
      setPayIdError("Invalid code")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-6">
        <div className="flex items-center space-x-4 mb-4">
          <Button onClick={onBack} variant="ghost" size="icon" className="text-white hover:bg-blue-500">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-white text-xl font-semibold">Buy Airtime</h1>
        </div>
      </div>

      <div className="px-4 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md mx-auto">
          <div className="text-center mb-6">
            <Phone className="h-12 w-12 text-blue-600 mx-auto mb-2" />
            <h2 className="text-gray-800 text-lg font-semibold">Airtime Purchase</h2>
          </div>

          {!showCodeInput ? (
            <div className="space-y-4">
              <div>
                <label className="text-gray-600 text-sm font-medium">Select Network</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {networks.map((net) => (
                    <Button
                      key={net}
                      onClick={() => setNetwork(net)}
                      variant={network === net ? "default" : "outline"}
                      className={`${network === net ? "bg-blue-600 text-white" : "border-gray-300"}`}
                    >
                      {net}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-gray-600 text-sm font-medium">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="08012345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-medium">Amount</label>
                <Input
                  type="number"
                  placeholder="100"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button
                onClick={handleProceed}
                disabled={!phoneNumber || !amount || !network}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-semibold"
              >
                Proceed
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-blue-800 text-sm text-center">Enter your PAY ID CODE to complete the transaction</p>
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
                {payIdError && <p className="text-xs text-red-500 mt-1">{payIdError}</p>}
              </div>

              {isProcessing && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-blue-800 text-sm">Processing transaction...</span>
                  </div>
                </div>
              )}

              <Button
                onClick={handlePayIdSubmit}
                disabled={!payIdCode || isProcessing}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg font-semibold"
              >
                {isProcessing ? "Processing..." : "Complete Purchase"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
