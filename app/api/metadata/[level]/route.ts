import { NextResponse } from 'next/server'
import levels from '@/data/levels.json'

export async function GET(_: Request, { params }: { params: { level: string } }) {
  const levelId = Number(params.level)
  const level = (levels as any[]).find((l) => l.id === levelId)

  if (!level) {
    return NextResponse.json({ error: 'Level not found' }, { status: 404 })
  }

  return NextResponse.json({
    name: `Thief Puzzle Badge #${level.id}`,
    description: `NFT reward badge for completing Level ${level.id}: ${level.title}.`,
    image: '/nft/badge.svg',
    external_url: '/',
    attributes: [
      { trait_type: 'Level', value: level.id },
      { trait_type: 'Scene', value: level.scene },
      { trait_type: 'Difficulty', value: level.difficulty },
      { trait_type: 'Target', value: level.target },
      { trait_type: 'Reward', value: level.reward }
    ]
  })
}
