"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Share2 } from "lucide-react"

interface SuccessScreenProps {
  transactionDetails: {
    type: string
    phoneNumber?: string
    amount: string
    network?: string
    plan?: string
    transactionId: string
    status: string
  }
  onBackToDashboard: () => void
}

export default function SuccessScreen({ transactionDetails, onBackToDashboard }: SuccessScreenProps) {
  const handleDownloadReceipt = () => {
    const receiptContent = `
PAYGO Transaction Receipt
========================
Transaction Type: ${transactionDetails.type}
${transactionDetails.phoneNumber ? `Phone Number: ${transactionDetails.phoneNumber}` : ""}
${transactionDetails.network ? `Network: ${transactionDetails.network}` : ""}
${transactionDetails.plan ? `Plan: ${transactionDetails.plan}` : ""}
Amount: ${transactionDetails.amount}
Transaction ID: ${transactionDetails.transactionId}
Status: ${transactionDetails.status}
Date: ${new Date().toLocaleString()}
========================
Thank you for using PAYGO!
    `

    const blob = new Blob([receiptContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `PAYGO_Receipt_${transactionDetails.transactionId}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleShareReceipt = () => {
    if (navigator.share) {
      navigator.share({
        title: "PAYGO Transaction Receipt",
        text: `Transaction successful! ${transactionDetails.type} - ${transactionDetails.amount} - ID: ${transactionDetails.transactionId}`,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="px-4 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
          <div className="text-center mb-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Transaction Successful!</h1>
            <p className="text-gray-600">Your transaction has been completed successfully</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Transaction Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">{transactionDetails.type}</span>
              </div>
              {transactionDetails.phoneNumber && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{transactionDetails.phoneNumber}</span>
                </div>
              )}
              {transactionDetails.network && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Network:</span>
                  <span className="font-medium">{transactionDetails.network}</span>
                </div>
              )}
              {transactionDetails.plan && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-medium">{transactionDetails.plan}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium text-green-600">{transactionDetails.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-medium">{transactionDetails.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600">{transactionDetails.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mb-6">
            <Button
              onClick={handleDownloadReceipt}
              variant="outline"
              className="flex-1 flex items-center justify-center space-x-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
            <Button
              onClick={handleShareReceipt}
              variant="outline"
              className="flex-1 flex items-center justify-center space-x-2 bg-transparent"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>

          <Button
            onClick={onBackToDashboard}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
