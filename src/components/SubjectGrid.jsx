import { subjects } from '../data';

export default function SubjectGrid({ selectedSubject, onSelect, theme }) {
  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-4">
      {subjects.map((subject, i) => {
        const isActive = selectedSubject === subject.id;
        return (
          <button
            key={subject.id}
            onClick={() => onSelect(subject.id)}
            className={`
              flex flex-col items-center gap-2 p-3 sm:p-4
              transition-all duration-300 cursor-pointer
              border-2 group animate-fade-in-up
              ${isActive ? 'shadow-lg scale-105 ring-2' : 'hover:shadow-md hover:scale-105'}
            `}
            style={{
              borderRadius: theme.cardRadius,
              backgroundColor: isActive ? `${subject.color}18` : theme.cardBg,
              borderColor: isActive ? subject.color : theme.cardBorder,
              animationDelay: `${i * 60}ms`,
              ringColor: isActive ? subject.color : undefined,
            }}
          >
            <span
              className="text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110"
            >
              {subject.emoji}
            </span>
            <span
              className={`text-xs sm:text-sm font-medium text-center leading-tight ${theme.font}`}
              style={{ color: isActive ? subject.color : theme.text }}
            >
              {subject.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
