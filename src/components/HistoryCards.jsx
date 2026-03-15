import { subjects } from '../data';

export default function HistoryCards({ items, theme }) {
  const getSubject = (id) => subjects.find((s) => s.id === id);

  return (
    <div className="flex flex-col gap-3">
      <p
        className={`text-sm font-semibold ${theme.font}`}
        style={{ color: theme.textLight }}
      >
        Tes dernières questions
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
        {items.map((item, i) => {
          const subject = getSubject(item.subject);
          return (
            <div
              key={i}
              className={`
                flex-shrink-0 flex items-center gap-2.5
                px-4 py-3 border-2 cursor-pointer
                transition-all duration-300 hover:shadow-md hover:scale-105
                animate-fade-in-up
              `}
              style={{
                borderRadius: theme.buttonRadius,
                backgroundColor: `${subject?.color}10`,
                borderColor: `${subject?.color}30`,
                animationDelay: `${i * 100}ms`,
              }}
            >
              <span className="text-lg">{subject?.emoji}</span>
              <span
                className={`text-sm font-medium whitespace-nowrap ${theme.font}`}
                style={{ color: theme.text }}
              >
                {item.keyword}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
