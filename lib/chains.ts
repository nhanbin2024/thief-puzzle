export const RITUAL_CHAIN_ID = 1979
export const RITUAL_HEX_CHAIN_ID = '0x7BB'

export const ritualChain = {
  chainId: RITUAL_HEX_CHAIN_ID,
  chainName: 'Ritual Testnet',
  rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.ritualfoundation.org'],
  blockExplorerUrls: [process.env.NEXT_PUBLIC_EXPLORER || 'https://explorer.ritualfoundation.org'],
  nativeCurrency: {
    name: 'RITUAL',
    symbol: 'RITUAL',
    decimals: 18
  }
}
