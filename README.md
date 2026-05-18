# Thief Puzzle Clean New

A lightweight 20-level cartoon puzzle game built with Next.js, TailwindCSS, Zustand, Framer Motion, and ethers.

## What is included

- 20 playable level data entries
- Cartoon SVG assets in `public/`
- Level map, game stage, missions, spin, inventory, leaderboard
- Wallet connect for MetaMask / OKX / Rabby
- Ritual Testnet add/switch chain
- User-signed NFT mint flow
- Token ID detection from `Transfer` or `BadgeMinted` events
- Add minted ERC721 to wallet via `wallet_watchAsset`
- NFT metadata endpoint at `/api/metadata/[level]`
- Vercel-safe: no `node_modules`, no `.git`, no server private key required

## Important NFT contract requirement

The frontend supports these mint signatures:

```solidity
function mintBadge(uint256 level, string memory uri) public returns (uint256);
```

Fallback:

```solidity
function mintBadge(address to, uint256 level, string memory uri) public returns (uint256);
```

The contract must emit ERC721 `Transfer` event or custom:

```solidity
event BadgeMinted(address indexed player, uint256 indexed tokenId, uint256 level);
```

Without one of these events, the UI cannot reliably show tokenId.

## Vercel environment variables

```env
NEXT_PUBLIC_CHAIN_ID=1979
NEXT_PUBLIC_RPC_URL=https://rpc.ritualfoundation.org
NEXT_PUBLIC_EXPLORER=https://explorer.ritualfoundation.org
NEXT_PUBLIC_NFT_CONTRACT=0x72f36b075d934AfF3e6e82B88622dD80b08b0257
```

## Local run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Push clean project

Do not commit `node_modules`.

```bash
git init
git add .
git commit -m "clean thief puzzle user wallet mint"
git branch -M main
git remote add origin https://github.com/nhanbin2024/thief-puzzle.git
git push -u origin main --force
```
