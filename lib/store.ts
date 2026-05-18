'use client'
import { create } from 'zustand'

type GameStore = {
  level: number
  coins: number
  energy: number
  gems: number
  completed: number[]
  selectedLevel: number
  setSelectedLevel: (level: number) => void
  completeLevel: (level: number, reward: number) => void
  spendEnergy: () => boolean
  addEnergy: (amount: number) => void
}

export const useGameStore = create<GameStore>((set, get) => ({
  level: 1,
  coins: 1200,
  energy: 8,
  gems: 25,
  completed: [],
  selectedLevel: 1,
  setSelectedLevel: (level) => set({ selectedLevel: level }),
  spendEnergy: () => {
    const s = get()
    if (s.energy <= 0) return false
    set({ energy: s.energy - 1 })
    return true
  },
  addEnergy: (amount) => set((s) => ({ energy: s.energy + amount })),
  completeLevel: (level, reward) => set((s) => {
    const done = s.completed.includes(level) ? s.completed : [...s.completed, level]
    return {
      completed: done,
      level: Math.max(s.level, level + 1),
      coins: s.coins + reward,
      gems: s.gems + (level % 5 === 0 ? 3 : 1)
    }
  })
}))
