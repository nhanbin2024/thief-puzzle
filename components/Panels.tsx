'use client'
import { useState } from 'react'
import { useGameStore } from '@/lib/store'
import NFTMintPanel from './NFTMintPanel'

export function MissionsPanel() {
  return <Panel title="Missions" items={['Clear 3 levels', 'Mint first NFT badge', 'Collect 2000 coins', 'Beat Boss Level 20']} />
}
export function InventoryPanel() {
  return <Panel title="Inventory" items={['Starter Mask', 'Golden Rope', 'Diamond Fragment', 'Ritual Badge']} />
}
export function LeaderboardPanel() {
  return <Panel title="Leaderboard" items={['1. ShadowFox — 9999', '2. NeonThief — 8200', '3. RitualCat — 6500', '4. You — keep playing']} />
}
export function NFTPanel() {
  return <NFTMintPanel />
}

export function SpinPanel() {
  const [reward, setReward] = useState('Ready')
  const addEnergy = useGameStore((s) => s.addEnergy)
  function spin() {
    const rewards = ['+100 coins', '+1 energy', '+3 gems', 'NFT fragment']
    const r = rewards[Math.floor(Math.random() * rewards.length)]
    setReward(r)
    if (r.includes('energy')) addEnergy(1)
  }
  return (
    <div className="rounded-3xl border border-purple-300/20 bg-purple-950/60 p-4 shadow-neon">
      <h2 className="text-xl font-black text-purple-100">Spin Wheel</h2>
      <div className="mx-auto my-4 flex h-32 w-32 items-center justify-center rounded-full border-8 border-yellow-300 bg-gradient-to-br from-pink-500 to-cyan-400 text-center text-sm font-black text-white shadow-gold">{reward}</div>
      <button onClick={spin} className="w-full rounded-2xl bg-yellow-300 px-5 py-3 font-black text-slate-950">SPIN</button>
    </div>
  )
}

function Panel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-neon">
      <h2 className="mb-3 text-xl font-black text-yellow-200">{title}</h2>
      <div className="space-y-2">
        {items.map((it) => <div key={it} className="rounded-2xl bg-slate-800/90 px-4 py-3 text-sm font-bold text-slate-100">{it}</div>)}
      </div>
    </section>
  )
}
