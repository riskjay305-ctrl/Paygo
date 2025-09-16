"use client"

import { ArrowLeft, Users, MessageSquare, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GroupScreenProps {
  onBack: () => void
}

export default function GroupScreen({ onBack }: GroupScreenProps) {
  const handleJoinTelegram = () => {
    window.open("https://t.me/PaygoLimited_service", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-orange-500 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/20">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-white">PAYGO Community</h1>
        <div className="w-10" />
      </div>

      {/* Group Card */}
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-10 w-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Join Our Community</h2>
          <p className="text-gray-600">Connect with other PAYGO users and stay updated</p>
        </div>

        {/* Telegram Group */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 mb-6">
          <div className="flex items-center mb-4">
            <MessageSquare className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h3 className="font-bold text-gray-800">Telegram Channel</h3>
              <p className="text-sm text-gray-600">Official PAYGO Community</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-2">What you'll get:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Latest PAYGO updates and announcements
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Tips and tricks from other users
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Direct support from our team
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Exclusive promotions and rewards
                </li>
              </ul>
            </div>

            <Button
              onClick={handleJoinTelegram}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Join Telegram Channel
            </Button>
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">Community Guidelines</h4>
          <ul className="space-y-1 text-xs text-gray-600">
            <li>• Be respectful to all community members</li>
            <li>• No spam or promotional content</li>
            <li>• Keep discussions PAYGO-related</li>
            <li>• Report any issues to administrators</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
