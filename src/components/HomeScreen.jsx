import { BabyOtter, SchoolOtter, TeenOtter } from './OtterMascot';
import { themes } from '../themes';
import { questionsOfTheDay } from '../data';

const ageGroups = [
  {
    id: '4-7',
    Mascot: BabyOtter,
    decorEmojis: ['🌈', '⭐', '🌸'],
  },
  {
    id: '8-11',
    Mascot: SchoolOtter,
    decorEmojis: ['🔭', '📖', '🧪'],
  },
  {
    id: '12-15',
    Mascot: TeenOtter,
    decorEmojis: ['💡', '🎧', '🌍'],
  },
];

export default function HomeScreen({ onSelectAge }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFF8F0 0%, #F0F4FF 50%, #F5F6F8 100%)',
      }}
    >
      {/* Decorative background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-20"
          style={{ background: '#FF6B6B' }} />
        <div className="absolute top-20 right-20 w-24 h-24 rounded-full opacity-15"
          style={{ background: '#7C5CFC' }} />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full opacity-10"
          style={{ background: '#3B82F6' }} />
        <div className="absolute bottom-10 right-10 w-28 h-28 rounded-full opacity-15"
          style={{ background: '#FFD93D' }} />
        <div className="absolute top-1/3 right-1/3 w-20 h-20 rounded-full opacity-10"
          style={{ background: '#51CF66' }} />
      </div>

      {/* Logo & Title */}
      <div className="text-center mb-12 animate-fade-in-up relative z-10">
        <h1 className="text-5xl sm:text-6xl font-bold font-petits mb-3"
          style={{
            background: 'linear-gradient(135deg, #FF6B6B, #7C5CFC, #3B82F6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Child-IA
        </h1>
        <p className="text-lg sm:text-xl text-gray-500 font-moyens font-medium">
          L'IA qui grandit avec toi 🦦
        </p>
      </div>

      {/* Age group cards */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-12 relative z-10">
        {ageGroups.map((group, i) => {
          const theme = themes[group.id];
          const qotd = questionsOfTheDay[group.id];
          return (
            <button
              key={group.id}
              onClick={() => onSelectAge(group.id)}
              className="group relative flex flex-col items-center cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Card */}
              <div
                className="relative flex flex-col items-center px-8 py-8 border-3 transition-all duration-500 hover:shadow-2xl hover:scale-105 active:scale-98 w-56"
                style={{
                  borderRadius: theme.cardRadius,
                  background: theme.bgGradient,
                  borderColor: theme.cardBorder,
                  borderWidth: '2px',
                }}
              >
                {/* Decorative emojis */}
                <div className="absolute -top-3 -right-2 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {group.decorEmojis[0]}
                </div>
                <div className="absolute top-1/4 -left-3 text-sm opacity-0 group-hover:opacity-80 transition-opacity duration-500">
                  {group.decorEmojis[1]}
                </div>
                <div className="absolute -bottom-2 right-4 text-base opacity-0 group-hover:opacity-90 transition-opacity duration-400">
                  {group.decorEmojis[2]}
                </div>

                {/* Mascot */}
                <div className="mb-4 transition-transform duration-500 group-hover:animate-float">
                  <group.Mascot size={110} />
                </div>

                {/* Name & age */}
                <h2
                  className={`text-xl font-bold mb-1 ${theme.font}`}
                  style={{ color: theme.primary }}
                >
                  {theme.mascotName}
                </h2>
                <p
                  className={`text-sm font-semibold mb-1 ${theme.font}`}
                  style={{ color: theme.text }}
                >
                  {theme.label}
                </p>
                <p
                  className={`text-xs italic ${theme.font}`}
                  style={{ color: theme.textLight }}
                >
                  {theme.tagline}
                </p>

                {/* Question du jour */}
                <div
                  className="mt-4 pt-3 w-full text-center"
                  style={{ borderTop: `1px dashed ${theme.primary}40` }}
                >
                  <p className="text-xs font-semibold mb-1.5" style={{ color: theme.primary }}>
                    💡 Question du jour
                  </p>
                  <p
                    className={`text-xs italic leading-relaxed ${theme.font}`}
                    style={{ color: theme.textLight }}
                  >
                    « {qotd.question} »
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-400 font-moyens relative z-10">
        Choisis ta tranche d'âge pour commencer l'aventure !
      </p>
    </div>
  );
}
