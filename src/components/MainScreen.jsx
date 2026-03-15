import { useState } from 'react';
import { BabyOtter, SchoolOtter, TeenOtter } from './OtterMascot';
import SubjectGrid from './SubjectGrid';
import MoodSelector from './MoodSelector';
import QuestionInput from './QuestionInput';
import HistoryCards from './HistoryCards';
import ResponseComparison from './ResponseComparison';
import { historyItems, demoResponses } from '../data';

const mascots = {
  '4-7': BabyOtter,
  '8-11': SchoolOtter,
  '12-15': TeenOtter,
};

export default function MainScreen({ ageGroup, theme, onBack }) {
  const [mood, setMood] = useState('normal');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showResponse, setShowResponse] = useState(false);

  const Mascot = mascots[ageGroup];
  const placeholder = theme.questionPlaceholders[mood];
  const history = historyItems[ageGroup];
  const responseData = demoResponses[ageGroup];

  const handleSubmit = () => {
    setShowResponse(true);
  };

  return (
    <div
      className="min-h-screen pb-8 relative"
      style={{ background: theme.bgGradient }}
    >
      {/* Decorative blobs */}
      {theme.decorations && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
            style={{ background: theme.primary }}
          />
          <div
            className="absolute top-1/3 -left-16 w-48 h-48 rounded-full opacity-8"
            style={{ background: theme.secondary }}
          />
          <div
            className="absolute bottom-20 right-10 w-32 h-32 rounded-full opacity-10"
            style={{ background: theme.accent }}
          />
        </div>
      )}

      {/* Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md border-b px-4 sm:px-6 py-3"
        style={{
          backgroundColor: `${theme.bg}E6`,
          borderColor: theme.cardBorder,
        }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer"
              style={{
                backgroundColor: `${theme.primary}15`,
                color: theme.primary,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-2.5">
              <Mascot size={36} />
              <div>
                <h1
                  className={`text-lg font-bold leading-tight ${theme.font}`}
                  style={{ color: theme.text }}
                >
                  {theme.mascotName}
                </h1>
                <p className="text-xs" style={{ color: theme.textLight }}>
                  {theme.label}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`px-3 py-1.5 text-xs font-semibold ${theme.font}`}
            style={{
              borderRadius: theme.buttonRadius,
              backgroundColor: `${theme.primary}15`,
              color: theme.primary,
            }}
          >
            {theme.tagline}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-8 relative z-10">

        {/* Mood selector */}
        <section className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <MoodSelector selectedMood={mood} onSelect={setMood} theme={theme} />
        </section>

        {/* Subject grid */}
        <section className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <p
            className={`text-sm font-semibold mb-3 ${theme.font}`}
            style={{ color: theme.textLight }}
          >
            Choisis un sujet qui t'intéresse
          </p>
          <SubjectGrid
            selectedSubject={selectedSubject}
            onSelect={setSelectedSubject}
            theme={theme}
          />
        </section>

        {/* Question input */}
        <section className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <p
            className={`text-sm font-semibold mb-3 ${theme.font}`}
            style={{ color: theme.textLight }}
          >
            Pose ta question
          </p>
          <QuestionInput
            placeholder={placeholder}
            theme={theme}
            onSubmit={handleSubmit}
          />
        </section>

        {/* Response comparison */}
        {showResponse && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1" style={{ backgroundColor: theme.cardBorder }} />
              <span
                className={`text-xs font-semibold px-3 py-1 ${theme.font}`}
                style={{
                  borderRadius: theme.buttonRadius,
                  backgroundColor: `${theme.accent}20`,
                  color: theme.accent,
                }}
              >
                Comparaison des réponses
              </span>
              <div className="h-px flex-1" style={{ backgroundColor: theme.cardBorder }} />
            </div>
            <ResponseComparison data={responseData} theme={theme} />
          </section>
        )}

        {/* Pre-filled demo button if response not shown */}
        {!showResponse && (
          <section className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <button
              onClick={handleSubmit}
              className={`
                w-full py-4 border-2 border-dashed
                transition-all duration-300 cursor-pointer
                hover:shadow-md hover:scale-[1.01] active:scale-[0.99]
                ${theme.font} text-sm font-medium
                flex items-center justify-center gap-2
              `}
              style={{
                borderRadius: theme.cardRadius,
                borderColor: `${theme.primary}40`,
                color: theme.primary,
                backgroundColor: `${theme.primary}05`,
              }}
            >
              <span>✨</span>
              Voir un exemple : « {responseData.question} »
              <span>✨</span>
            </button>
          </section>
        )}

        {/* History */}
        <section className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <HistoryCards items={history} theme={theme} />
        </section>
      </main>
    </div>
  );
}
