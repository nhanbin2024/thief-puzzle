'use client'

import { BrowserProvider, Contract, Interface, isAddress } from 'ethers'
import { ritualChain } from './chains'

export const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT || '0x72f36b075d934AfF3e6e82B88622dD80b08b0257'

export const NFT_ABI = [
  'event Transfer(address indexed from,address indexed to,uint256 indexed tokenId)',
  'event BadgeMinted(address indexed player,uint256 indexed tokenId,uint256 level)',
  'function mintBadge(uint256 level,string uri) public returns (uint256)',
  'function mintBadge(address to,uint256 level,string uri) public returns (uint256)',
  'function tokenURI(uint256 tokenId) view returns (string)',
  'function ownerOf(uint256 tokenId) view returns (address)'
]

export type MintResult = {
  tokenId: string
  txHash: string
  contractAddress: string
  explorerUrl: string
}

export async function connectInjectedWallet(): Promise<string> {
  const eth = (window as any).ethereum
  if (!eth) throw new Error('MetaMask/OKX/Rabby wallet not found')
  const accounts = await eth.request({ method: 'eth_requestAccounts' })
  return accounts[0]
}

export async function switchToRitual() {
  const eth = (window as any).ethereum
  if (!eth) throw new Error('Wallet not found')
  try {
    await eth.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: ritualChain.chainId }] })
  } catch (err: any) {
    if (err?.code === 4902) {
      await eth.request({ method: 'wallet_addEthereumChain', params: [ritualChain] })
      return
    }
    throw err
  }
}

export async function getWalletAddress() {
  await switchToRitual()
  return connectInjectedWallet()
}

function buildTokenUri(level: number) {
  if (typeof window === 'undefined') return ''
  return `${window.location.origin}/api/metadata/${level}`
}

function readTokenIdFromReceipt(receipt: any, userAddress: string) {
  const iface = new Interface(NFT_ABI)
  const zero = '0x0000000000000000000000000000000000000000'
  const user = userAddress.toLowerCase()

  for (const log of receipt.logs || []) {
    try {
      const parsed = iface.parseLog(log)
      if (!parsed) continue

      if (parsed.name === 'BadgeMinted') {
        return parsed.args.tokenId.toString()
      }

      if (parsed.name === 'Transfer') {
        const from = String(parsed.args.from).toLowerCase()
        const to = String(parsed.args.to).toLowerCase()
        if (from === zero && to === user) return parsed.args.tokenId.toString()
      }
    } catch {
      // ignore unrelated logs
    }
  }

  throw new Error('Mint transaction succeeded, but tokenId was not found in events. Check contract events.')
}

export async function mintBadgeWithUserWallet(level: number): Promise<MintResult> {
  if (!isAddress(NFT_CONTRACT_ADDRESS)) throw new Error('Missing or invalid NEXT_PUBLIC_NFT_CONTRACT')

  await switchToRitual()
  const eth = (window as any).ethereum
  if (!eth) throw new Error('Wallet not found')

  const provider = new BrowserProvider(eth)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()
  const contract = new Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, signer)
  const tokenUri = buildTokenUri(level)

  let tx: any
  try {
    // Recommended public mint signature: mintBadge(uint256 level, string uri)
    tx = await contract['mintBadge(uint256,string)'](level, tokenUri)
  } catch (firstError: any) {
    // Fallback signature for contracts that require an explicit receiver address.
    // This still asks the connected user to sign the transaction.
    try {
      tx = await contract['mintBadge(address,uint256,string)'](address, level, tokenUri)
    } catch (secondError: any) {
      throw new Error(secondError?.shortMessage || firstError?.shortMessage || secondError?.message || firstError?.message || 'Mint failed')
    }
  }

  const receipt = await tx.wait()
  const tokenId = readTokenIdFromReceipt(receipt, address)
  const explorer = process.env.NEXT_PUBLIC_EXPLORER || 'https://explorer.ritualfoundation.org'

  return {
    tokenId,
    txHash: receipt.hash,
    contractAddress: NFT_CONTRACT_ADDRESS,
    explorerUrl: `${explorer.replace(/\/$/, '')}/tx/${receipt.hash}`
  }
}

export async function addMintedNftToWallet(tokenId: string) {
  const eth = (window as any).ethereum
  if (!eth) throw new Error('Wallet not found')

  await eth.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC721',
      options: {
        address: NFT_CONTRACT_ADDRESS,
        tokenId
      }
    }
  })
}
