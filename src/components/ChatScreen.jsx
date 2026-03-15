import { useState, useRef, useEffect, useCallback } from 'react';
import { BabyOtter, SchoolOtter, TeenOtter } from './OtterMascot';

const mascots = {
  '4-7': BabyOtter,
  '8-11': SchoolOtter,
  '12-15': TeenOtter,
};

const ARTIFACT_MAP = { espace: 'space', corps: 'heart', guerre: 'war' };

/* ═══════════════════════════════════════════════════
   ARTEFACT ESPACE — Canvas interactif
   ═══════════════════════════════════════════════════ */
const PLANETS = [
  {
    name: 'Mercure', radius: 50, size: 5, color: '#B0BEC5', speed: 4.15,
    fact: 'Mercure est la planète la plus rapide : elle fait le tour du Soleil en seulement 88 jours. Mais une seule journée là-bas dure 59 jours terrestres !',
  },
  {
    name: 'Terre', radius: 85, size: 8, color: '#3B82F6', speed: 1,
    fact: 'La Terre met 365 jours pour faire le tour du Soleil. Mais elle tourne sur elle-même en 24h — c\'est pour ça qu\'on a le jour et la nuit.',
  },
  {
    name: 'Mars', radius: 115, size: 6, color: '#EF4444', speed: 0.53,
    fact: 'Une journée sur Mars dure presque comme sur Terre : 24h37. Mais une année martienne, c\'est 687 jours. Les saisons durent deux fois plus longtemps !',
  },
];

function SpaceArtifact() {
  const canvasRef = useRef(null);
  const [speed, setSpeed] = useState(1);
  const [selected, setSelected] = useState(null);
  const anglesRef = useRef(PLANETS.map(() => Math.random() * Math.PI * 2));
  const animRef = useRef(null);
  const lastTimeRef = useRef(null);

  const W = 280, H = 280, CX = W / 2, CY = H / 2;

  const draw = useCallback((timestamp) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const dt = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    ctx.clearRect(0, 0, W, H);

    // Orbits
    PLANETS.forEach((p) => {
      ctx.beginPath();
      ctx.arc(CX, CY, p.radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Sun glow
    const grad = ctx.createRadialGradient(CX, CY, 4, CX, CY, 22);
    grad.addColorStop(0, '#FFA500');
    grad.addColorStop(0.6, '#FFD93D');
    grad.addColorStop(1, 'rgba(255,217,61,0)');
    ctx.beginPath();
    ctx.arc(CX, CY, 22, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    // Sun core
    ctx.beginPath();
    ctx.arc(CX, CY, 12, 0, Math.PI * 2);
    ctx.fillStyle = '#FFA500';
    ctx.fill();

    // Planets
    PLANETS.forEach((p, i) => {
      anglesRef.current[i] += p.speed * speed * dt * 0.5;
      const a = anglesRef.current[i];
      const x = CX + Math.cos(a) * p.radius;
      const y = CY + Math.sin(a) * p.radius;

      // Shadow
      ctx.beginPath();
      ctx.arc(x + 1, y + 1, p.size + 1, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fill();

      // Planet
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Highlight on selected
      if (selected === i) {
        ctx.beginPath();
        ctx.arc(x, y, p.size + 4, 0, Math.PI * 2);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Earth continents hint
      if (p.name === 'Terre') {
        ctx.beginPath();
        ctx.arc(x + 2, y - 1, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#22C55E';
        ctx.fill();
      }

      // Label
      ctx.font = '500 10px Quicksand, sans-serif';
      ctx.fillStyle = '#9CA3AF';
      ctx.textAlign = 'center';
      ctx.fillText(p.name, x, y - p.size - 6);
    });

    animRef.current = requestAnimationFrame(draw);
  }, [speed, selected]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (W / rect.width);
    const my = (e.clientY - rect.top) * (H / rect.height);

    let clicked = null;
    PLANETS.forEach((p, i) => {
      const a = anglesRef.current[i];
      const x = CX + Math.cos(a) * p.radius;
      const y = CY + Math.sin(a) * p.radius;
      const dist = Math.sqrt((mx - x) ** 2 + (my - y) ** 2);
      if (dist < p.size + 10) clicked = i;
    });
    setSelected(clicked);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onClick={handleClick}
        className="cursor-pointer"
        style={{ width: '100%', maxWidth: 280, aspectRatio: '1' }}
      />

      {/* Speed slider */}
      <div className="flex items-center gap-3 w-full max-w-[250px]">
        <span className="text-xs text-gray-400">🐢</span>
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="flex-1 h-1.5 rounded-full appearance-none bg-gray-200 accent-blue-500 cursor-pointer"
        />
        <span className="text-xs text-gray-400">🚀</span>
        <span className="text-[10px] font-bold text-gray-400 w-8 text-right">x{speed.toFixed(1)}</span>
      </div>

      {/* Planet info card */}
      {selected !== null && (
        <div
          className="w-full p-3 rounded-xl border text-sm leading-relaxed animate-fade-in-up"
          style={{
            backgroundColor: `${PLANETS[selected].color}10`,
            borderColor: `${PLANETS[selected].color}30`,
            color: '#374151',
          }}
        >
          <span className="font-bold" style={{ color: PLANETS[selected].color }}>
            {PLANETS[selected].name}
          </span>
          {' — '}
          {PLANETS[selected].fact}
        </div>
      )}

      {selected === null && (
        <p className="text-xs text-gray-400 italic">Clique sur une planète pour en savoir plus</p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ARTEFACT CORPS — Cœur interactif avec BPM
   ═══════════════════════════════════════════════════ */
function HeartArtifact() {
  const [mode, setMode] = useState('avant'); // 'avant' | 'apres'
  const bpm = mode === 'avant' ? 75 : 150;
  const duration = 60 / bpm; // seconds per beat

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Heart SVG */}
      <div className="relative">
        <svg
          viewBox="0 0 120 120"
          width="100"
          height="100"
          style={{ animation: `heartbeat ${duration}s ease-in-out infinite` }}
        >
          <defs>
            <linearGradient id="heart-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={mode === 'avant' ? '#FF6B6B' : '#FF0000'} />
              <stop offset="100%" stopColor={mode === 'avant' ? '#EE5A24' : '#CC0000'} />
            </linearGradient>
          </defs>
          <path
            d="M60 100 C30 75 5 55 5 35 C5 18 18 5 33 5 C43 5 52 11 60 22 C68 11 77 5 87 5 C102 5 115 18 115 35 C115 55 90 75 60 100Z"
            fill="url(#heart-grad)"
          />
          <path
            d="M40 45 L50 35 L57 50 L63 28 L70 45 L80 45"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          />
        </svg>
        <style>{`
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            15% { transform: scale(${mode === 'avant' ? 1.08 : 1.18}); }
            30% { transform: scale(1); }
            45% { transform: scale(${mode === 'avant' ? 1.05 : 1.12}); }
          }
        `}</style>
      </div>

      {/* BPM display */}
      <div className="flex items-baseline gap-1.5">
        <span
          className="text-3xl font-bold tabular-nums transition-all duration-500"
          style={{ color: mode === 'avant' ? '#EF4444' : '#DC2626' }}
        >
          {bpm}
        </span>
        <span className="text-xs font-semibold text-gray-400">BPM</span>
      </div>

      {/* Toggle buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode('avant')}
          className={`px-4 py-2 text-xs font-bold rounded-xl border-2 transition-all duration-300 cursor-pointer ${
            mode === 'avant'
              ? 'bg-red-50 border-red-300 text-red-600 shadow-sm'
              : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'
          }`}
        >
          😌 Avant effort
        </button>
        <button
          onClick={() => setMode('apres')}
          className={`px-4 py-2 text-xs font-bold rounded-xl border-2 transition-all duration-300 cursor-pointer ${
            mode === 'apres'
              ? 'bg-red-50 border-red-300 text-red-600 shadow-sm'
              : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'
          }`}
        >
          🏃 Après effort
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center max-w-[260px] leading-relaxed">
        {mode === 'avant'
          ? 'Au repos, ton cœur bat environ 75 fois par minute. Il envoie 5 litres de sang dans tout ton corps chaque minute.'
          : 'Après un sprint, ton cœur peut monter à 150 BPM ! Il pompe maintenant 20 litres par minute pour envoyer plus d\'oxygène à tes muscles.'}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ARTEFACT GUERRE — Card éditoriale statique
   ═══════════════════════════════════════════════════ */
function WarArtifact() {
  return (
    <div className="flex flex-col gap-4">
      {/* Main text */}
      <div className="flex gap-3 items-start">
        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
          <span className="text-xl">🕊️</span>
        </div>
        <div>
          <p className="text-sm text-gray-700 leading-relaxed">
            La guerre, c'est quand des pays n'arrivent plus à se parler et utilisent
            des armées à la place des mots. Au XX<sup>e</sup> siècle, les deux guerres
            mondiales ont causé la mort de <strong className="text-orange-600">plus de 80 millions de personnes</strong>.
          </p>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            Aujourd'hui, des organisations comme l'ONU et des traités internationaux
            essaient d'aider les pays à résoudre leurs conflits sans violence.
          </p>
        </div>
      </div>

      {/* Citation */}
      <div
        className="px-4 py-3 rounded-xl"
        style={{
          background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A40 100%)',
          borderLeft: '3px solid #F59E0B',
        }}
      >
        <p className="text-sm italic text-amber-800 leading-relaxed">
          « La paix n'est pas l'absence de guerre, c'est une vertu, un état d'esprit,
          une volonté de bienveillance, de confiance, de justice. »
        </p>
        <p className="text-xs text-amber-600 mt-1.5 font-semibold">
          — Baruch Spinoza, philosophe (1632–1677)
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ARTIFACT CARD — Wrapper avec label "Explorer"
   ═══════════════════════════════════════════════════ */
function ArtifactCard({ type }) {
  const labels = {
    heart: { icon: '🫀', title: 'Le corps humain' },
    space: { icon: '🚀', title: "L'Espace" },
    war: { icon: '🕊️', title: 'Comprendre le monde' },
  };
  const components = { heart: HeartArtifact, space: SpaceArtifact, war: WarArtifact };
  const info = labels[type];
  const Comp = components[type];

  return (
    <div
      className="mt-3 p-5 border-2 animate-fade-in-up overflow-hidden"
      style={{
        borderRadius: '16px',
        borderColor: '#D8B4FE',
        backgroundColor: '#FEFCFF',
        boxShadow: '0 2px 12px rgba(168, 85, 247, 0.08)',
      }}
    >
      <div className="flex items-center gap-2 mb-4 pb-2.5" style={{ borderBottom: '1px solid #F3E8FF' }}>
        <span>{info.icon}</span>
        <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">
          Explorer — {info.title}
        </span>
      </div>
      <Comp />
    </div>
  );
}

/* ── Typing dots ── */
function TypingDots() {
  return (
    <div className="flex justify-start mb-4 animate-fade-in-up">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-xs">🦦</div>
        <div className="bg-white px-5 py-3 rounded-2xl rounded-tl-md shadow-sm border border-gray-100 flex items-center gap-1.5">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="block w-2 h-2 rounded-full bg-purple-300"
              style={{
                animation: 'bounce-dot 1.2s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
          <style>{`
            @keyframes bounce-dot {
              0%, 60%, 100% { transform: translateY(0); }
              30% { transform: translateY(-6px); }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN CHAT SCREEN
   ═══════════════════════════════════════════════════ */
export default function ChatScreen({ ageGroup, theme, onBack, initialQuestion }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatRef = useRef(null);
  const sentInitial = useRef(false);
  const Mascot = mascots[ageGroup];

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendQuestion = async (question) => {
    if (!question.trim()) return;

    setError('');
    setMessages((prev) => [...prev, { role: 'user', text: question }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, ageGroup }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Erreur ${res.status}`);
      }

      const artifact = data.artefact ? ARTIFACT_MAP[data.artefact] || null : null;
      setMessages((prev) => [...prev, {
        role: 'ai',
        body: data.reponse || '',
        aporia: data.aporie || '',
        artifact,
      }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuestion && !sentInitial.current) {
      sentInitial.current = true;
      sendQuestion(initialQuestion);
    }
  }, []);

  const handleSubmit = () => {
    sendQuestion(input);
  };

  return (
    <div className="h-screen flex flex-col" style={{ background: theme.bgGradient }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md border-b px-4 py-3 flex-shrink-0"
        style={{ backgroundColor: `${theme.bg}E6`, borderColor: theme.cardBorder }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer"
              style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-2.5">
              <Mascot size={36} />
              <div>
                <h1 className={`text-lg font-bold leading-tight ${theme.font}`} style={{ color: theme.text }}>
                  Discuter avec {theme.mascotName}
                </h1>
                <p className="text-xs" style={{ color: theme.textLight }}>{theme.label}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat */}
      <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-6 max-w-2xl mx-auto w-full">
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4 opacity-50">
            <Mascot size={80} />
            <p className={`text-sm font-semibold ${theme.font}`} style={{ color: theme.textLight }}>
              Pose-moi une question !
            </p>
          </div>
        )}

        {messages.map((msg, i) => {
          if (msg.role === 'user') {
            return (
              <div key={i} className="flex justify-end mb-4 animate-fade-in-up">
                <div
                  className="max-w-[75%] text-white px-5 py-3 rounded-2xl rounded-br-md shadow-md"
                  style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})` }}
                >
                  <p className={`text-sm leading-relaxed ${theme.font}`}>{msg.text}</p>
                </div>
              </div>
            );
          }

          return (
            <div key={i} className="flex justify-start mb-4 animate-fade-in-up">
              <div className="max-w-[85%]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-xs">🦦</div>
                  <span className={`text-xs font-bold ${theme.font}`} style={{ color: theme.textLight }}>{theme.mascotName}</span>
                </div>
                <div className="bg-white px-5 py-4 rounded-2xl rounded-tl-md shadow-sm border border-gray-100">
                  {msg.body && <p className={`text-sm text-gray-700 leading-relaxed mb-3 ${theme.font}`}>{msg.body}</p>}
                  {msg.aporia && (
                    <div
                      className="px-4 py-2.5 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${theme.highlight}20, ${theme.accent}15)`,
                        borderLeft: `3px solid ${theme.highlight}`,
                      }}
                    >
                      <p className={`text-sm italic font-semibold leading-relaxed ${theme.font}`} style={{ color: theme.text }}>
                        🌀 {msg.aporia}
                      </p>
                    </div>
                  )}
                </div>
                {msg.artifact && <ArtifactCard type={msg.artifact} />}
              </div>
            </div>
          );
        })}

        {loading && <TypingDots />}

        {error && (
          <div className="flex justify-center animate-fade-in-up">
            <div className="bg-red-50 text-red-500 text-xs px-4 py-2 rounded-xl border border-red-100 max-w-sm text-center">
              {error}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div
        className="flex-shrink-0 border-t px-4 py-3 backdrop-blur-md"
        style={{ backgroundColor: `${theme.bg}E6`, borderColor: theme.cardBorder }}
      >
        <div className="max-w-2xl mx-auto flex gap-2 items-end">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
            placeholder={theme.questionPlaceholders.curious}
            disabled={loading}
            className={`flex-1 text-sm px-4 py-3 rounded-2xl border-2 outline-none transition-all disabled:opacity-50 ${theme.font}`}
            style={{
              borderColor: theme.cardBorder,
              backgroundColor: theme.cardBg,
              color: theme.text,
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || loading}
            className="p-3 rounded-2xl text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
            style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})` }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
