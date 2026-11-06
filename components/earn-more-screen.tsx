"use client"

import { ArrowLeft, Gift, Clock, CheckCircle, Coins, Star, Users, Share2, Copy, Check } from "lucide-react"
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
      reward: 4500, // Updated price from 45000 to 4500
      icon: CheckCircle,
      completed: false,
      timeLeft: "23:45:12",
    },
    {
      id: "2",
      title: "Watch Tutorial Video",
      description: "Watch a PAYGO tutorial video",
      reward: 4500, // Updated price from 45000 to 4500
      icon: Star,
      completed: false,
    },
    {
      id: "3",
      title: "Invite a Friend",
      description: "Share PAYGO with friends",
      reward: 4500, // Updated price from 45000 to 4500
      icon: Users,
      completed: false,
    },
    {
      id: "4",
      title: "Share on Social Media",
      description: "Share PAYGO on your social media",
      reward: 4500, // Updated price from 45000 to 4500
      icon: Share2,
      completed: false,
    },
    {
      id: "5",
      title: "Complete Profile",
      description: "Fill out your complete profile",
      reward: 4500, // Updated price from 45000 to 4500
      icon: Gift,
      completed: false,
    },
  ])

  const [completingTask, setCompletingTask] = useState<string | null>(null)
  const [referralCopied, setReferralCopied] = useState(false)

  const handleCopyReferral = async () => {
    const referralLink = `${window.location.origin}/?ref=PAYGO`
    await navigator.clipboard.writeText(referralLink)
    setReferralCopied(true)
    window.setTimeout(() => setReferralCopied(false), 2200)
  }

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
    <div className="min-h-screen bg-[radial-gradient(circle_at_80%_0%,rgba(50,190,255,0.35),transparent_35%),linear-gradient(145deg,#071956,#123fc1_55%,#5422ce)] p-4">
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

      <section className="mb-5 rounded-3xl border border-white/15 bg-white/10 p-4 text-white shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">Referral rewards</p>
            <h2 className="mt-1 text-lg font-bold">Invite a new member</h2>
            <p className="mt-1 text-xs text-blue-100">Share your PAYgO link so a new member can create an account.</p>
          </div>
          <Users className="h-9 w-9 shrink-0 text-cyan-200" />
        </div>
        <button onClick={handleCopyReferral} className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-white font-bold text-blue-800 shadow-lg transition-transform hover:bg-blue-50 active:scale-[0.98]">
          {referralCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {referralCopied ? "Referral link copied" : "Copy referral link"}
        </button>
      </section>

      {/* Tasks List */}
      <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_18px_50px_rgba(33,60,130,0.14)]">
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
