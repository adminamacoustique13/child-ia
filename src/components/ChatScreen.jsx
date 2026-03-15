import { useState, useRef, useEffect } from 'react';
import { BabyOtter, SchoolOtter, TeenOtter } from './OtterMascot';
import { subjects } from '../data';

const mascots = {
  '4-7': BabyOtter,
  '8-11': SchoolOtter,
  '12-15': TeenOtter,
};

/* ── Artifact detection ── */
function detectArtifact(question) {
  const q = question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (/coeur|sang|corps|poumon|muscle|os|squelette|cerveau|digestion|estomac|respir/.test(q)) return 'heart';
  if (/espace|planete|soleil|lune|etoile|mars|jupiter|terre|satellite|orbite|tourne|galaxie|cosmos|astronaute|fusee|ciel|venus|saturne|neptune/.test(q)) return 'space';
  if (/guerre|hitler|mort|soldat|armee|bombe|combat|conflit|arme|violence|nazi/.test(q)) return 'war';
  return null;
}

/* ── Split last sentence as aporia ── */
function splitAporia(text) {
  const trimmed = text.trim();
  const re = /([^.!?]*[.!?]+)\s*/g;
  const sentences = [];
  let m;
  while ((m = re.exec(trimmed)) !== null) sentences.push(m[1].trim());
  if (sentences.length === 0) return { body: '', aporia: trimmed };
  if (sentences.length === 1) return { body: '', aporia: sentences[0] };
  const aporia = sentences.pop();
  return { body: sentences.join(' '), aporia };
}

/* ── Heart SVG ── */
function HeartArtifact() {
  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 120 120" width="90" height="90" className="animate-pulse-soft">
        <defs>
          <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="100%" stopColor="#EE5A24" />
          </linearGradient>
        </defs>
        <path d="M60 100 C30 75 5 55 5 35 C5 18 18 5 33 5 C43 5 52 11 60 22 C68 11 77 5 87 5 C102 5 115 18 115 35 C115 55 90 75 60 100Z" fill="url(#hg)" />
        <path d="M45 45 L55 35 L60 50 L65 30 L75 45" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      </svg>
      <p className="text-xs text-gray-500 font-semibold text-center">
        Le coeur bat environ <strong className="text-red-500">100 000 fois par jour</strong> et pompe
        assez de sang pour remplir un camion-citerne chaque semaine.
      </p>
    </div>
  );
}

/* ── Solar System SVG ── */
function SpaceArtifact() {
  const orbitStyle = (radius, duration) => ({
    animation: `spin ${duration}s linear infinite`,
    transformOrigin: '110px 110px',
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <style>{`
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        .orbit-a { animation: spin 3s linear infinite; transform-origin: 110px 110px; }
        .orbit-b { animation: spin 5s linear infinite; transform-origin: 110px 110px; }
        .orbit-c { animation: spin 8s linear infinite; transform-origin: 110px 110px; }
      `}</style>
      <svg viewBox="0 0 220 220" width="180" height="180">
        <circle cx="110" cy="110" r="40" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="110" cy="110" r="65" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="110" cy="110" r="90" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="110" cy="110" r="16" fill="#FFD93D" />
        <circle cx="110" cy="110" r="10" fill="#FFA500" />
        <g className="orbit-a"><circle cx="150" cy="110" r="5" fill="#B0BEC5" /></g>
        <g className="orbit-b"><circle cx="175" cy="110" r="7" fill="#3B82F6" /></g>
        <g className="orbit-c"><circle cx="200" cy="110" r="6" fill="#EF4444" /></g>
      </svg>
      <p className="text-xs text-gray-500 font-semibold text-center">
        La lumiere du Soleil met <strong className="text-amber-500">8 minutes</strong> pour arriver
        sur Terre — tu regardes toujours le soleil du passe.
      </p>
    </div>
  );
}

/* ── War context card ── */
function WarArtifact() {
  return (
    <div className="flex gap-3 items-start">
      <div className="text-2xl mt-0.5">🕊️</div>
      <div>
        <p className="text-sm text-gray-700 leading-relaxed">
          La guerre, c'est quand des pays n'arrivent plus a se parler et utilisent
          des armees a la place des mots. Au XXe siecle, les deux guerres
          mondiales ont cause la mort de <strong className="text-orange-600">plus de 80 millions de personnes</strong>.
        </p>
        <p className="text-xs text-gray-400 mt-2 italic">
          Aujourd'hui, des organisations comme l'ONU essaient d'aider les pays a resoudre
          leurs problemes sans violence.
        </p>
      </div>
    </div>
  );
}

/* ── Artifact Card ── */
function ArtifactCard({ type }) {
  const labels = {
    heart: { icon: '🫀', title: 'Le corps humain' },
    space: { icon: '🚀', title: "L'Espace" },
    war: { icon: '🕊️', title: 'Artefact contextuel' },
  };
  const components = { heart: HeartArtifact, space: SpaceArtifact, war: WarArtifact };
  const info = labels[type];
  const Comp = components[type];

  return (
    <div
      className="mt-3 p-4 border-2 border-dashed animate-fade-in-up"
      style={{ borderRadius: '16px', borderColor: '#D8B4FE', backgroundColor: '#FAF5FF' }}
    >
      <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: '1px solid #EDE9FE' }}>
        <span>{info.icon}</span>
        <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">
          Artefact — {info.title}
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

/* ── Main ChatScreen ── */
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

      const artifact = detectArtifact(question);
      setMessages((prev) => [...prev, { role: 'ai', text: data.text, artifact }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Send initial question on mount
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

          const { body, aporia } = splitAporia(msg.text);
          return (
            <div key={i} className="flex justify-start mb-4 animate-fade-in-up">
              <div className="max-w-[85%]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-xs">🦦</div>
                  <span className={`text-xs font-bold ${theme.font}`} style={{ color: theme.textLight }}>{theme.mascotName}</span>
                </div>
                <div className="bg-white px-5 py-4 rounded-2xl rounded-tl-md shadow-sm border border-gray-100">
                  {body && <p className={`text-sm text-gray-700 leading-relaxed mb-3 ${theme.font}`}>{body}</p>}
                  <div
                    className="px-4 py-2.5 rounded-lg"
                    style={{
                      background: `linear-gradient(135deg, ${theme.highlight}20, ${theme.accent}15)`,
                      borderLeft: `3px solid ${theme.highlight}`,
                    }}
                  >
                    <p className={`text-sm italic font-semibold leading-relaxed ${theme.font}`} style={{ color: theme.text }}>
                      🌀 {aporia}
                    </p>
                  </div>
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
