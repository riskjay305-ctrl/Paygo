"use client"

import { ArrowLeft, Phone, Mail, MessageCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SupportScreenProps {
  onBack: () => void
}

export default function SupportScreen({ onBack }: SupportScreenProps) {
  const handleCall = () => {
    window.open("tel:+2347078515833", "_self")
  }

  const handleSendEmail = () => {
    window.open("mailto:paygoservicelimited@gmail.com", "_self")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-orange-500 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/20">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-white">Customer Support</h1>
        <div className="w-10" />
      </div>

      {/* Support Card */}
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="h-10 w-10 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Need Help?</h2>
          <p className="text-gray-600">We're here to assist you with any PAYGO service inquiries</p>
        </div>

        {/* Contact Options */}
        <div className="space-y-4">
          {/* Phone Support */}
          <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center mb-3">
              <Phone className="h-6 w-6 text-green-600 mr-3" />
              <h3 className="font-semibold text-gray-800">Call Us</h3>
            </div>
            <p className="text-gray-600 mb-4">Speak directly with our support team</p>
            <p className="font-mono text-lg font-bold text-green-700 mb-4">+234 707 851 5833</p>
            <Button onClick={handleCall} className="w-full bg-green-600 hover:bg-green-700 text-white">
              Call Now
            </Button>
          </div>

          {/* Email Support */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center mb-3">
              <Mail className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="font-semibold text-gray-800">Email Us</h3>
            </div>
            <p className="text-gray-600 mb-4">Send us your questions and concerns</p>
            <p className="text-sm font-medium text-blue-700 mb-4 break-all">paygoservicelimited@gmail.com</p>
            <Button onClick={handleSendEmail} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              SEND EMAIL
            </Button>
          </div>

          {/* Support Hours */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center mb-3">
              <Clock className="h-6 w-6 text-gray-600 mr-3" />
              <h3 className="font-semibold text-gray-800">Support Hours</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span className="font-medium">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-medium">9:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-medium">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
