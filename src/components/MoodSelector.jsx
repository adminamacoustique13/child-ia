import { moods } from '../data';

export default function MoodSelector({ selectedMood, onSelect, theme }) {
  return (
    <div className="flex flex-col gap-3">
      <p
        className={`text-sm font-semibold ${theme.font}`}
        style={{ color: theme.textLight }}
      >
        Comment tu te sens aujourd'hui ?
      </p>
      <div className="flex gap-3">
        {moods.map((mood) => {
          const isActive = selectedMood === mood.id;
          return (
            <button
              key={mood.id}
              onClick={() => onSelect(mood.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5
                transition-all duration-300 cursor-pointer
                border-2 ${theme.font} text-sm font-medium
                ${isActive ? 'shadow-lg scale-105' : 'hover:scale-102 hover:shadow-md'}
              `}
              style={{
                borderRadius: theme.buttonRadius,
                backgroundColor: isActive ? theme.primary : theme.cardBg,
                borderColor: isActive ? theme.primary : theme.cardBorder,
                color: isActive ? 'white' : theme.text,
              }}
            >
              <span className="text-xl">{mood.emoji}</span>
              <span className="hidden sm:inline">{mood.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
