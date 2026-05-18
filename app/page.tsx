import GameStage from '@/components/GameStage'
import LevelMap from '@/components/LevelMap'
import TopBar from '@/components/TopBar'
import { InventoryPanel, LeaderboardPanel, MissionsPanel, NFTPanel, SpinPanel } from '@/components/Panels'

export default function Home() {
  return (
    <main className="game-grid-bg min-h-screen p-4 text-white md:p-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <TopBar />
        <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <GameStage />
            <LevelMap />
          </div>
          <aside className="space-y-5">
            <MissionsPanel />
            <SpinPanel />
            <InventoryPanel />
            <NFTPanel />
            <LeaderboardPanel />
          </aside>
        </div>
      </div>
    </main>
  )
}
