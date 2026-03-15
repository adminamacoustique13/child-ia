export function BabyOtter({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="100" cy="130" rx="55" ry="50" fill="#C4956A" />
      {/* Belly */}
      <ellipse cx="100" cy="135" rx="38" ry="35" fill="#F5DEB3" />
      {/* Head */}
      <circle cx="100" cy="75" r="45" fill="#C4956A" />
      {/* Face area */}
      <ellipse cx="100" cy="82" rx="32" ry="28" fill="#E8C99B" />
      {/* Ears */}
      <circle cx="65" cy="48" r="12" fill="#C4956A" />
      <circle cx="65" cy="48" r="7" fill="#E8A0BF" />
      <circle cx="135" cy="48" r="12" fill="#C4956A" />
      <circle cx="135" cy="48" r="7" fill="#E8A0BF" />
      {/* Eyes - big and sparkly */}
      <circle cx="82" cy="72" r="12" fill="#2D3436" />
      <circle cx="118" cy="72" r="12" fill="#2D3436" />
      <circle cx="86" cy="68" r="4" fill="white" />
      <circle cx="122" cy="68" r="4" fill="white" />
      <circle cx="80" cy="74" r="2" fill="white" />
      <circle cx="116" cy="74" r="2" fill="white" />
      {/* Nose */}
      <ellipse cx="100" cy="85" rx="6" ry="4" fill="#3D3D3D" />
      {/* Mouth - happy smile */}
      <path d="M90 92 Q100 100 110 92" stroke="#3D3D3D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Whiskers */}
      <line x1="60" y1="82" x2="78" y2="85" stroke="#A0845C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="58" y1="90" x2="78" y2="89" stroke="#A0845C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="122" y1="85" x2="140" y2="82" stroke="#A0845C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="122" y1="89" x2="142" y2="90" stroke="#A0845C" strokeWidth="1.5" strokeLinecap="round" />
      {/* Cheeks - blush */}
      <circle cx="72" cy="88" r="8" fill="#FFB3B3" opacity="0.5" />
      <circle cx="128" cy="88" r="8" fill="#FFB3B3" opacity="0.5" />
      {/* Little paws */}
      <ellipse cx="70" cy="168" rx="14" ry="8" fill="#A0845C" />
      <ellipse cx="130" cy="168" rx="14" ry="8" fill="#A0845C" />
      {/* Tail */}
      <path d="M145 150 Q170 140 165 160 Q160 175 148 165" fill="#A0845C" />
      {/* Stars around (decorative) */}
      <text x="35" y="35" fontSize="16" opacity="0.7">✨</text>
      <text x="155" y="30" fontSize="14" opacity="0.6">⭐</text>
    </svg>
  );
}

export function SchoolOtter({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Backpack straps */}
      <rect x="68" y="95" width="8" height="50" rx="4" fill="#7C5CFC" />
      <rect x="124" y="95" width="8" height="50" rx="4" fill="#7C5CFC" />
      {/* Backpack */}
      <rect x="60" y="120" width="80" height="55" rx="14" fill="#9775FA" />
      <rect x="75" y="130" width="50" height="20" rx="6" fill="#B197FC" />
      {/* Body */}
      <ellipse cx="100" cy="125" rx="48" ry="42" fill="#B8895A" />
      {/* Belly */}
      <ellipse cx="100" cy="130" rx="32" ry="28" fill="#F0D9B5" />
      {/* Head */}
      <circle cx="100" cy="68" r="42" fill="#B8895A" />
      {/* Face area */}
      <ellipse cx="100" cy="74" rx="30" ry="26" fill="#DEBB8C" />
      {/* Ears */}
      <circle cx="67" cy="42" r="11" fill="#B8895A" />
      <circle cx="67" cy="42" r="6" fill="#DDA0A0" />
      <circle cx="133" cy="42" r="11" fill="#B8895A" />
      <circle cx="133" cy="42" r="6" fill="#DDA0A0" />
      {/* Glasses */}
      <circle cx="82" cy="65" r="14" fill="none" stroke="#FFB347" strokeWidth="3" />
      <circle cx="118" cy="65" r="14" fill="none" stroke="#FFB347" strokeWidth="3" />
      <line x1="96" y1="65" x2="104" y2="65" stroke="#FFB347" strokeWidth="3" />
      <line x1="68" y1="62" x2="60" y2="55" stroke="#FFB347" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="132" y1="62" x2="140" y2="55" stroke="#FFB347" strokeWidth="2.5" strokeLinecap="round" />
      {/* Eyes behind glasses */}
      <circle cx="82" cy="65" r="7" fill="#2D3436" />
      <circle cx="118" cy="65" r="7" fill="#2D3436" />
      <circle cx="85" cy="62" r="2.5" fill="white" />
      <circle cx="121" cy="62" r="2.5" fill="white" />
      {/* Nose */}
      <ellipse cx="100" cy="78" rx="5" ry="3.5" fill="#3D3D3D" />
      {/* Smile */}
      <path d="M88 85 Q100 94 112 85" stroke="#3D3D3D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Whiskers */}
      <line x1="62" y1="76" x2="76" y2="78" stroke="#9A7850" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="60" y1="83" x2="76" y2="82" stroke="#9A7850" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="124" y1="78" x2="138" y2="76" stroke="#9A7850" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="124" y1="82" x2="140" y2="83" stroke="#9A7850" strokeWidth="1.5" strokeLinecap="round" />
      {/* Paws holding book */}
      <ellipse cx="72" cy="155" rx="12" ry="7" fill="#9A7850" />
      <ellipse cx="128" cy="155" rx="12" ry="7" fill="#9A7850" />
      {/* Tail */}
      <path d="M140 145 Q165 135 160 155 Q155 170 143 160" fill="#9A7850" />
      {/* Book */}
      <rect x="80" y="148" width="40" height="12" rx="2" fill="#20C997" />
      <line x1="100" y1="148" x2="100" y2="160" stroke="#1AAE85" strokeWidth="1" />
      {/* Sparkle */}
      <text x="150" y="30" fontSize="14" opacity="0.7">📚</text>
    </svg>
  );
}

export function TeenOtter({ size = 120 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body - slightly taller */}
      <ellipse cx="100" cy="135" rx="44" ry="48" fill="#A6845A" />
      {/* Belly */}
      <ellipse cx="100" cy="140" rx="30" ry="32" fill="#E0C9A0" />
      {/* Head */}
      <ellipse cx="100" cy="72" rx="40" ry="38" fill="#A6845A" />
      {/* Face area */}
      <ellipse cx="100" cy="78" rx="28" ry="24" fill="#CFAE7A" />
      {/* Ears (partially hidden by headphones) */}
      <circle cx="68" cy="50" r="9" fill="#A6845A" />
      <circle cx="132" cy="50" r="9" fill="#A6845A" />
      {/* Headphones band */}
      <path d="M58 55 Q100 20 142 55" stroke="#3B82F6" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Headphone cups */}
      <rect x="48" y="48" width="20" height="24" rx="8" fill="#3B82F6" />
      <rect x="132" y="48" width="20" height="24" rx="8" fill="#3B82F6" />
      <rect x="51" y="52" width="14" height="16" rx="5" fill="#60A5FA" />
      <rect x="135" y="52" width="14" height="16" rx="5" fill="#60A5FA" />
      {/* Eyes - half-closed, cool look */}
      <ellipse cx="84" cy="72" rx="8" ry="5" fill="#2D3436" />
      <ellipse cx="116" cy="72" rx="8" ry="5" fill="#2D3436" />
      <circle cx="86" cy="71" r="2" fill="white" />
      <circle cx="118" cy="71" r="2" fill="white" />
      {/* Eyebrows - slightly raised */}
      <line x1="76" y1="63" x2="90" y2="65" stroke="#7A6840" strokeWidth="2" strokeLinecap="round" />
      <line x1="124" y1="65" x2="110" y2="63" stroke="#7A6840" strokeWidth="2" strokeLinecap="round" />
      {/* Nose */}
      <ellipse cx="100" cy="80" rx="4.5" ry="3" fill="#3D3D3D" />
      {/* Slight smirk */}
      <path d="M92 87 Q100 91 112 86" stroke="#3D3D3D" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Whiskers */}
      <line x1="65" y1="78" x2="80" y2="80" stroke="#8A7050" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="63" y1="85" x2="80" y2="84" stroke="#8A7050" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="120" y1="80" x2="135" y2="78" stroke="#8A7050" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="120" y1="84" x2="137" y2="85" stroke="#8A7050" strokeWidth="1.5" strokeLinecap="round" />
      {/* Paws - relaxed pose */}
      <ellipse cx="68" cy="172" rx="13" ry="7" fill="#8A7050" />
      <ellipse cx="132" cy="172" rx="13" ry="7" fill="#8A7050" />
      {/* Arms crossed / relaxed */}
      <path d="M60 130 Q55 145 65 155" stroke="#A6845A" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M140 130 Q145 145 135 155" stroke="#A6845A" strokeWidth="12" fill="none" strokeLinecap="round" />
      {/* Tail */}
      <path d="M138 155 Q162 145 158 165 Q154 180 142 168" fill="#8A7050" />
      {/* Music note */}
      <text x="155" y="35" fontSize="16" opacity="0.6">🎵</text>
    </svg>
  );
}
