'use client'
import WalletButton from './WalletButton'
import { useGameStore } from '@/lib/store'

export default function TopBar() {
  const { coins, energy, gems } = useGameStore()
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-cyan-300/20 bg-slate-950/70 p-4 shadow-neon backdrop-blur">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-yellow-300 md:text-5xl">THIEF PUZZLE</h1>
        <p className="text-sm text-cyan-100/80">20-level lightweight Ritual NFT game</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
        <div className="rounded-2xl bg-slate-800 px-4 py-2">🪙 {coins}</div>
        <div className="rounded-2xl bg-slate-800 px-4 py-2">⚡ {energy}</div>
        <div className="rounded-2xl bg-slate-800 px-4 py-2">💎 {gems}</div>
        <WalletButton />
      </div>
    </header>
  )
}
