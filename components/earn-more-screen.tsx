"use client"

import { ArrowLeft, Gift, Clock, CheckCircle, Coins, Star, Users, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { LucideIcon } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  reward: number
  icon: LucideIcon
  completed: boolean
  timeLeft?: string
}

interface EarnMoreScreenProps {
  onBack: () => void
  onUpdateBalance: (amount: number) => void
  userBalance: number
}

export default function EarnMoreScreen({ onBack, onUpdateBalance, userBalance }: EarnMoreScreenProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Daily Check-in",
      description: "Open the app and check in daily",
      reward: 45000,
      icon: CheckCircle,
      completed: false,
      timeLeft: "23:45:12",
    },
    {
      id: "2",
      title: "Watch Tutorial Video",
      description: "Watch a PAYGO tutorial video",
      reward: 45000,
      icon: Star,
      completed: false,
    },
    {
      id: "3",
      title: "Invite a Friend",
      description: "Share PAYGO with friends",
      reward: 45000,
      icon: Users,
      completed: false,
    },
    {
      id: "4",
      title: "Share on Social Media",
      description: "Share PAYGO on your social media",
      reward: 45000,
      icon: Share2,
      completed: false,
    },
    {
      id: "5",
      title: "Complete Profile",
      description: "Fill out your complete profile",
      reward: 45000,
      icon: Gift,
      completed: false,
    },
  ])

  const [completingTask, setCompletingTask] = useState<string | null>(null)

  const handleCompleteTask = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (!task || task.completed) return

    setCompletingTask(taskId)

    // 6 second animation
    setTimeout(() => {
      setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t)))
      onUpdateBalance(task.reward)
      setCompletingTask(null)
    }, 6000)
  }

  const totalEarned = tasks.filter((t) => t.completed).reduce((sum, t) => sum + t.reward, 0)
  const availableTasks = tasks.filter((t) => !t.completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-orange-500 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/20">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-white">Earn More</h1>
        <div className="w-10" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
          <Coins className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
          <p className="text-white/80 text-sm">Today's Earnings</p>
          <p className="text-white font-bold text-xl">₦{totalEarned.toLocaleString()}</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
          <Gift className="h-8 w-8 text-green-300 mx-auto mb-2" />
          <p className="text-white/80 text-sm">Available Tasks</p>
          <p className="text-white font-bold text-xl">{availableTasks}</p>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-3xl p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Daily Tasks</h2>

        <div className="space-y-4">
          {tasks.map((task) => {
            const IconComponent = task.icon
            const isCompleting = completingTask === task.id

            return (
              <div
                key={task.id}
                className={`border rounded-2xl p-4 transition-all ${
                  task.completed
                    ? "bg-green-50 border-green-200"
                    : isCompleting
                      ? "bg-purple-50 border-purple-200"
                      : "bg-gray-50 border-gray-200 hover:border-purple-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        task.completed ? "bg-green-100" : isCompleting ? "bg-purple-100" : "bg-gray-100"
                      }`}
                    >
                      <IconComponent
                        className={`h-6 w-6 ${
                          task.completed ? "text-green-600" : isCompleting ? "text-purple-600" : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{task.title}</h3>
                      <p className="text-sm text-gray-600">{task.description}</p>
                      {task.timeLeft && !task.completed && (
                        <p className="text-xs text-orange-600 mt-1">
                          <Clock className="h-3 w-3 inline mr-1" />
                          Resets in {task.timeLeft}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-green-600 mb-2">+₦{task.reward.toLocaleString()}</p>
                    {task.completed ? (
                      <div className="flex items-center text-green-600 text-sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Completed
                      </div>
                    ) : isCompleting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleCompleteTask(task.id)}
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-6 bg-gradient-to-r from-purple-100 to-orange-100 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">Daily Progress</h3>
              <p className="text-sm text-gray-600">
                {tasks.filter((t) => t.completed).length} of {tasks.length} tasks completed
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-600">₦{totalEarned.toLocaleString()}</p>
              <p className="text-sm text-gray-600">earned today</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 bg-white rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(tasks.filter((t) => t.completed).length / tasks.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
