"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Clock, Star } from "lucide-react"

interface WatchScreenProps {
  onBack: () => void
}

export default function WatchScreen({ onBack }: WatchScreenProps) {
  const tutorials = [
    {
      title: "How to Use PAYGO",
      duration: "5:30",
      thumbnail: "/paygo-tutorial.jpg",
      description: "Learn the basics of using PAYGO platform",
    },
    {
      title: "Making Payments Safely",
      duration: "3:45",
      thumbnail: "/payment-security.png",
      description: "Best practices for secure transactions",
    },
    {
      title: "Understanding PAY ID",
      duration: "4:20",
      thumbnail: "/pay-id-explanation.jpg",
      description: "Everything you need to know about PAY ID",
    },
    {
      title: "Transfer Money Guide",
      duration: "6:15",
      thumbnail: "/money-transfer-guide.jpg",
      description: "Step-by-step money transfer tutorial",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-6">
        <div className="flex items-center space-x-4 mb-4">
          <Button onClick={onBack} variant="ghost" size="icon" className="text-white hover:bg-purple-500">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-white text-xl font-semibold">Watch Tutorials</h1>
        </div>
      </div>

      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-gray-800 text-xl font-semibold mb-6 text-center">PAYGO Video Tutorials</h2>

          <div className="space-y-4">
            {tutorials.map((tutorial, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="flex space-x-4">
                  <div className="relative">
                    <img
                      src={tutorial.thumbnail || "/placeholder.svg"}
                      alt={tutorial.title}
                      className="w-32 h-20 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black bg-opacity-50 rounded-full p-2">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-gray-800 font-semibold mb-1">{tutorial.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{tutorial.description}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{tutorial.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>4.8</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white">
                  Watch Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
