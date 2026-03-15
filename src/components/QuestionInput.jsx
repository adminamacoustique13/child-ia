import { useState } from 'react';

export default function QuestionInput({ placeholder, theme, onSubmit }) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit?.(value.trim());
    }
  };

  return (
    <div className="relative">
      <div
        className="flex items-center gap-3 border-2 transition-all duration-300 focus-within:shadow-lg"
        style={{
          borderRadius: theme.inputRadius,
          borderColor: theme.cardBorder,
          backgroundColor: theme.cardBg,
        }}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={`
            flex-1 px-5 py-4 bg-transparent outline-none
            text-base ${theme.font} placeholder:opacity-60
          `}
          style={{ color: theme.text }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
        />
        <button
          onClick={handleSubmit}
          className="mr-3 p-2.5 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          style={{ backgroundColor: theme.primary }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
