'use client'

import { useState } from 'react'
import { addMintedNftToWallet, mintBadgeWithUserWallet, type MintResult } from '@/lib/web3'
import { useGameStore } from '@/lib/store'

export default function NFTMintPanel() {
  const selectedLevel = useGameStore((s) => s.selectedLevel)
  const completed = useGameStore((s) => s.completed)
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<MintResult | null>(null)
  const [error, setError] = useState('')

  const canMint = completed.includes(selectedLevel)

  async function mint() {
    setError('')
    setResult(null)

    if (!canMint) {
      setError('Complete this level first, then mint its NFT badge.')
      return
    }

    try {
      setBusy(true)
      const r = await mintBadgeWithUserWallet(selectedLevel)
      setResult(r)
    } catch (e: any) {
      setError(e?.message || 'Mint failed')
    } finally {
      setBusy(false)
    }
  }

  async function addToWallet() {
    if (!result?.tokenId) return
    try {
      await addMintedNftToWallet(result.tokenId)
    } catch (e: any) {
      setError(e?.message || 'Add NFT to wallet failed')
    }
  }

  return (
    <section className="rounded-3xl border border-yellow-200/20 bg-slate-950/80 p-4 shadow-neon">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-yellow-200">NFT Mint</h2>
          <p className="text-xs font-bold text-slate-300">Level {selectedLevel} badge • user wallet signs transaction</p>
        </div>
        <div className="rounded-2xl bg-yellow-300 px-3 py-2 text-sm font-black text-slate-950">ERC721</div>
      </div>

      <div className="mt-4 rounded-3xl bg-gradient-to-br from-fuchsia-600 via-indigo-600 to-cyan-500 p-4 text-center shadow-gold">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-yellow-300 text-4xl shadow-neon">🏆</div>
        <div className="mt-3 text-lg font-black">Thief Puzzle Badge</div>
        <div className="text-sm font-bold text-white/90">Selected Level #{selectedLevel}</div>
      </div>

      <button
        onClick={mint}
        disabled={busy}
        className="mt-4 w-full rounded-2xl bg-yellow-300 px-5 py-3 font-black text-slate-950 transition hover:scale-[1.02] disabled:opacity-60"
      >
        {busy ? 'Open wallet and minting...' : canMint ? 'Mint NFT Badge' : 'Complete level to unlock mint'}
      </button>

      {result && (
        <div className="mt-4 space-y-2 rounded-2xl bg-emerald-950/80 p-3 text-sm font-bold text-emerald-100">
          <div>✅ Mint success</div>
          <div>Token ID: <span className="text-yellow-200">#{result.tokenId}</span></div>
          <div className="break-all">TX: {result.txHash}</div>
          <a className="block text-cyan-200 underline" href={result.explorerUrl} target="_blank">Open transaction explorer</a>
          <button onClick={addToWallet} className="w-full rounded-xl bg-emerald-300 px-4 py-2 font-black text-emerald-950">Add NFT to Wallet</button>
        </div>
      )}

      {error && <div className="mt-4 rounded-2xl bg-red-950/80 p-3 text-sm font-bold text-red-100">{error}</div>}
    </section>
  )
}
