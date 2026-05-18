export function ThiefAsset({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 180" role="img" aria-label="thief">
      <defs>
        <linearGradient id="thiefBody" x1="0" x2="1"><stop stopColor="#fde047"/><stop offset="1" stopColor="#fb923c"/></linearGradient>
      </defs>
      <ellipse cx="80" cy="168" rx="46" ry="8" fill="#020617" opacity=".35" />
      <path d="M52 78 C35 96 36 123 57 141 C74 157 107 151 119 129 C132 104 119 79 95 70 Z" fill="url(#thiefBody)" stroke="#050505" strokeWidth="7" />
      <circle cx="80" cy="48" r="34" fill="#f8fafc" stroke="#050505" strokeWidth="7" />
      <path d="M44 45 C48 20 68 10 91 15 C112 19 124 33 122 52 C101 39 75 39 44 45Z" fill="#111827" stroke="#050505" strokeWidth="7" />
      <rect x="52" y="44" width="56" height="20" rx="10" fill="#111827" />
      <circle cx="67" cy="54" r="5" fill="#fff"/><circle cx="95" cy="54" r="5" fill="#fff"/>
      <path d="M68 72 Q82 82 98 70" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
      <path d="M56 95 C28 90 20 108 17 129" fill="none" stroke="#050505" strokeWidth="12" strokeLinecap="round" />
      <path d="M106 92 C137 86 142 113 140 136" fill="none" stroke="#050505" strokeWidth="12" strokeLinecap="round" />
      <path d="M64 139 L54 168" stroke="#050505" strokeWidth="12" strokeLinecap="round" />
      <path d="M98 139 L111 168" stroke="#050505" strokeWidth="12" strokeLinecap="round" />
      <rect x="102" y="113" width="36" height="36" rx="10" fill="#22c55e" stroke="#050505" strokeWidth="6" />
      <path d="M111 113 C112 96 130 96 130 113" fill="none" stroke="#050505" strokeWidth="5" />
    </svg>
  )
}

export function NpcAsset({ type = 'police', className = '' }: { type?: string; className?: string }) {
  const color = type === 'boss' ? '#ef4444' : type === 'old-lady' ? '#a78bfa' : type === 'police' || type === 'guard' ? '#38bdf8' : '#f472b6'
  return (
    <svg className={className} viewBox="0 0 150 180" role="img" aria-label={type}>
      <ellipse cx="76" cy="168" rx="42" ry="8" fill="#020617" opacity=".35" />
      <circle cx="75" cy="48" r="33" fill="#fde68a" stroke="#050505" strokeWidth="7" />
      <path d="M47 44 C53 16 100 16 105 45Z" fill={color} stroke="#050505" strokeWidth="7" />
      <circle cx="63" cy="52" r="5" fill="#111827"/><circle cx="88" cy="52" r="5" fill="#111827"/>
      <path d="M63 72 Q75 64 90 72" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
      <rect x="46" y="83" width="58" height="62" rx="18" fill={color} stroke="#050505" strokeWidth="7" />
      <path d="M48 100 L24 129" stroke="#050505" strokeWidth="12" strokeLinecap="round" />
      <path d="M101 100 L128 128" stroke="#050505" strokeWidth="12" strokeLinecap="round" />
      <path d="M62 144 L52 168" stroke="#050505" strokeWidth="12" strokeLinecap="round" />
      <path d="M88 144 L99 168" stroke="#050505" strokeWidth="12" strokeLinecap="round" />
      {type === 'boss' && <path d="M43 29 L34 11 M76 15 L77 0 M108 28 L122 10" stroke="#fde047" strokeWidth="7" strokeLinecap="round" />}
    </svg>
  )
}

export function ItemAsset({ type = 'diamond', className = '' }: { type?: string; className?: string }) {
  const isBag = ['bag','cash','briefcase','case'].includes(type)
  const isNft = type.includes('nft')
  return (
    <svg className={className} viewBox="0 0 120 120" role="img" aria-label={type}>
      <defs><linearGradient id="itemGrad" x1="0" x2="1"><stop stopColor="#67e8f9"/><stop offset="1" stopColor="#a78bfa"/></linearGradient></defs>
      {isBag ? (
        <><rect x="23" y="42" width="74" height="55" rx="15" fill="#f59e0b" stroke="#111827" strokeWidth="7"/><path d="M42 43 C44 20 76 20 79 43" fill="none" stroke="#111827" strokeWidth="7"/><circle cx="60" cy="68" r="10" fill="#fde047"/></>
      ) : isNft ? (
        <><rect x="24" y="18" width="72" height="84" rx="16" fill="url(#itemGrad)" stroke="#111827" strokeWidth="7"/><text x="60" y="68" textAnchor="middle" fontSize="26" fontWeight="900" fill="#fff">NFT</text></>
      ) : (
        <><path d="M24 46 L43 22 H78 L98 46 L60 101Z" fill="url(#itemGrad)" stroke="#111827" strokeWidth="7"/><path d="M24 46 H98 M43 22 L60 101 M78 22 L60 101" stroke="#fff" strokeWidth="4" opacity=".65"/></>
      )}
    </svg>
  )
}

export function SceneAsset({ scene = 'subway', className = '' }: { scene?: string; className?: string }) {
  const colors: Record<string, string> = { subway:'#2563eb', street:'#16a34a', mall:'#db2777', museum:'#7c3aed', bank:'#ca8a04', rooftop:'#0891b2', airport:'#64748b', casino:'#9333ea', train:'#0f766e', vault:'#f59e0b', market:'#ea580c', office:'#475569', lab:'#06b6d4', party:'#c026d3', tunnel:'#44403c', prison:'#334155', cyber:'#4f46e5', yacht:'#0284c7', temple:'#854d0e', boss:'#dc2626' }
  const c = colors[scene] || '#2563eb'
  return (
    <svg className={className} viewBox="0 0 900 420" preserveAspectRatio="none" aria-label={scene}>
      <rect width="900" height="420" fill="#020617" />
      <rect width="900" height="420" fill={c} opacity=".32" />
      <circle cx="760" cy="70" r="120" fill="#fde047" opacity=".14" />
      <circle cx="150" cy="90" r="90" fill="#22d3ee" opacity=".12" />
      <rect x="0" y="310" width="900" height="110" fill="#0f172a" />
      <rect x="0" y="300" width="900" height="18" fill="#38bdf8" opacity=".6" />
      {[80,220,360,500,640,780].map((x) => <rect key={x} x={x} y="95" width="80" height="145" rx="10" fill="#e0f2fe" opacity=".18" stroke="#67e8f9" strokeWidth="4" />)}
      <path d="M0 350 H900" stroke="#facc15" strokeWidth="5" strokeDasharray="34 22" opacity=".7" />
      <text x="40" y="55" fill="#fff" fontSize="28" fontWeight="900" opacity=".7">{scene.toUpperCase()}</text>
    </svg>
  )
}
