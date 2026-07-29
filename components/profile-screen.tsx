"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, User, Mail, Phone, Calendar, Edit3, Save } from "lucide-react"
import { useState } from "react"

interface ProfileScreenProps {
  userName: string
  userEmail: string
  onBack: () => void
}

export default function ProfileScreen({ userName, userEmail, onBack }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(userName)
  const [editedPhone, setEditedPhone] = useState("08012345678")
  const [joinDate] = useState("January 2024")

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-6">
        <div className="flex items-center space-x-4 mb-4">
          <Button onClick={onBack} variant="ghost" size="icon" className="text-white hover:bg-purple-500">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-white text-xl font-semibold">Profile</h1>
        </div>
      </div>

      <div className="px-4 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{editedName}</h2>
            <p className="text-gray-600">PAYGO User</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-gray-600 text-sm font-medium mb-2">
                <User className="h-4 w-4" />
                <span>Full Name</span>
              </label>
              {isEditing ? (
                <Input value={editedName} onChange={(e) => setEditedName(e.target.value)} className="w-full" />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <span className="text-gray-800">{editedName}</span>
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center space-x-2 text-gray-600 text-sm font-medium mb-2">
                <Mail className="h-4 w-4" />
                <span>Email Address</span>
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <span className="text-gray-800">{userEmail}</span>
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2 text-gray-600 text-sm font-medium mb-2">
                <Phone className="h-4 w-4" />
                <span>Phone Number</span>
              </label>
              {isEditing ? (
                <Input value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} className="w-full" />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <span className="text-gray-800">{editedPhone}</span>
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center space-x-2 text-gray-600 text-sm font-medium mb-2">
                <Calendar className="h-4 w-4" />
                <span>Member Since</span>
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <span className="text-gray-800">{joinDate}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {isEditing ? (
              <div className="flex space-x-3">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white flex items-center justify-center space-x-2"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </Button>
            )}

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">Account Statistics</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-600">Total Transactions:</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-600">Current Balance:</span>
                  <span className="font-medium">₦180,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-600">Account Status:</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
