'use client'
import { useState } from 'react'
import { connectInjectedWallet, switchToRitual } from '@/lib/web3'

export default function WalletButton() {
  const [address, setAddress] = useState('')
  const [busy, setBusy] = useState(false)

  async function connect() {
    try {
      setBusy(true)
      await switchToRitual()
      const a = await connectInjectedWallet()
      setAddress(a)
    } catch (e: any) {
      alert(e?.message || 'Wallet connection failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <button onClick={connect} className="rounded-2xl bg-yellow-300 px-4 py-3 font-black text-slate-950 shadow-gold transition hover:scale-105">
      {busy ? 'Connecting...' : address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
    </button>
  )
}
