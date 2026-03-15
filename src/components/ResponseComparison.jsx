export default function ResponseComparison({ data, theme }) {
  if (!data) return null;

  return (
    <div className="flex flex-col gap-4 animate-fade-in-up">
      <div className="flex items-center gap-2">
        <span className="text-lg">💬</span>
        <p
          className={`text-base font-bold ${theme.font}`}
          style={{ color: theme.text }}
        >
          « {data.question} »
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cold response */}
        <div
          className="p-5 border-2 flex flex-col gap-3"
          style={{
            borderRadius: theme.cardRadius,
            backgroundColor: '#F3F4F6',
            borderColor: '#E5E7EB',
          }}
        >
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />
            <span className="text-sm font-bold text-gray-500 font-sans tracking-wide uppercase">
              Réponse standard
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line font-sans">
            {data.cold}
          </p>
        </div>

        {/* Warm response (Child-IA) */}
        <div
          className="p-5 border-2 flex flex-col gap-3 relative overflow-hidden"
          style={{
            borderRadius: theme.cardRadius,
            backgroundColor: `${theme.primary}08`,
            borderColor: `${theme.primary}30`,
          }}
        >
          {/* Decorative gradient */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary}, ${theme.accent})`,
            }}
          />

          <div className="flex items-center gap-2 pb-2" style={{ borderBottom: `1px solid ${theme.primary}20` }}>
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: theme.primary }}
            />
            <span
              className={`text-sm font-bold tracking-wide uppercase ${theme.font}`}
              style={{ color: theme.primary }}
            >
              Child-IA
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${theme.accent}20`, color: theme.accent }}>
              pédagogique
            </span>
          </div>

          <p
            className={`text-sm leading-relaxed whitespace-pre-line ${theme.font}`}
            style={{ color: theme.text }}
          >
            {data.warm}
          </p>

          {/* Aporia - the provocative ending question */}
          <div
            className="mt-2 p-3 rounded-xl relative"
            style={{
              backgroundColor: `${theme.highlight}25`,
              borderLeft: `3px solid ${theme.highlight}`,
            }}
          >
            <div className="flex items-start gap-2">
              <span className="text-base mt-0.5">🌀</span>
              <p
                className={`text-sm font-semibold italic leading-relaxed highlight-aporia ${theme.font}`}
                style={{
                  color: theme.text,
                  '--highlight-color': `${theme.highlight}40`,
                }}
              >
                {data.aporia}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
