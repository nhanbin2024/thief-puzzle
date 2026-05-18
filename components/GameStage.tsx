'use client'
import { useMemo, useState } from 'react'
import { getLevel } from '@/lib/levels'
import { useGameStore } from '@/lib/store'
import { ItemAsset, NpcAsset, SceneAsset, ThiefAsset } from './Assets'

export default function GameStage() {
  const { selectedLevel, completeLevel, spendEnergy } = useGameStore()
  const [message, setMessage] = useState('Drag the thief arm to the target, then press PLAY.')
  const [won, setWon] = useState(false)
  const level = getLevel(selectedLevel)
  const arm = useMemo(() => 110 + (selectedLevel % 6) * 22, [selectedLevel])

  function play() {
    if (!spendEnergy()) {
      setMessage('Not enough energy. Use spin or wait for refill.')
      return
    }
    const chance = level.difficulty === 'boss' ? 0.58 : level.difficulty === 'hard' ? 0.7 : level.difficulty === 'normal' ? 0.82 : 0.9
    const success = Math.random() < chance
    if (success) {
      completeLevel(level.id, level.reward)
      setWon(true)
      setMessage(`Level cleared! +${level.reward} coins. NFT progress updated.`)
    } else {
      setWon(false)
      setMessage(`Caught by ${level.trap}! Try a cleaner route.`)
    }
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-slate-950 shadow-neon">
      <div className="relative h-[420px] w-full">
        <SceneAsset scene={level.scene} className="absolute inset-0 h-full w-full" />
        <div className="absolute left-5 top-5 rounded-2xl bg-slate-950/75 p-4 backdrop-blur">
          <div className="text-sm font-bold text-cyan-200">LEVEL {level.id}</div>
          <div className="text-2xl font-black text-yellow-300">{level.title}</div>
          <div className="max-w-xs text-sm text-slate-200">{level.objective}</div>
        </div>
        <ThiefAsset className="asset-glow absolute bottom-8 left-12 w-36" />
        <div className="absolute bottom-44 left-36 h-4 origin-left rounded-full bg-yellow-300 shadow-gold" style={{ width: arm, transform: `rotate(${selectedLevel % 2 ? -8 : 8}deg)` }} />
        <ItemAsset type={level.target} className="asset-glow absolute bottom-36 right-36 w-24 animate-pulse" />
        <NpcAsset type={level.npc === 'boss' ? 'boss' : level.npc.includes('police') || level.npc.includes('guard') ? 'police' : level.npc.includes('old') ? 'old-lady' : 'civilian'} className="absolute bottom-8 right-12 w-32" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-red-300/50 bg-red-500/20 px-4 py-2 text-sm font-black text-red-100">TRAP: {level.trap}</div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-slate-900 p-4">
        <div className={`rounded-2xl px-4 py-3 font-bold ${won ? 'bg-emerald-500/20 text-emerald-100' : 'bg-slate-800 text-cyan-100'}`}>{message}</div>
        <button onClick={play} className="rounded-2xl bg-yellow-300 px-8 py-4 text-lg font-black text-slate-950 shadow-gold transition hover:scale-105">PLAY</button>
      </div>
    </section>
  )
}
