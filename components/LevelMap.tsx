'use client'
import { gameLevels } from '@/lib/levels'
import { useGameStore } from '@/lib/store'

export default function LevelMap() {
  const { selectedLevel, setSelectedLevel, completed } = useGameStore()
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-neon">
      <h2 className="mb-3 text-xl font-black text-cyan-200">Level Map</h2>
      <div className="grid grid-cols-5 gap-2">
        {gameLevels.map((l) => {
          const done = completed.includes(l.id)
          const active = selectedLevel === l.id
          return (
            <button key={l.id} onClick={() => setSelectedLevel(l.id)} className={`h-14 rounded-2xl border-2 font-black transition hover:scale-105 ${active ? 'border-yellow-300 bg-yellow-300 text-slate-950' : done ? 'border-emerald-300 bg-emerald-500/30 text-white' : 'border-cyan-300/30 bg-slate-800 text-cyan-100'}`}>
              {done ? '✓' : l.id}
            </button>
          )
        })}
      </div>
    </section>
  )
}
