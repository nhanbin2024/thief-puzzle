import levels from '@/data/levels.json'

export type LevelData = {
  id: number
  title: string
  scene: string
  objective: string
  target: string
  npc: string
  trap: string
  difficulty: 'easy' | 'normal' | 'hard' | 'boss'
  reward: number
}

export const gameLevels = levels as LevelData[]
export const getLevel = (id: number) => gameLevels.find((l) => l.id === id) || gameLevels[0]
