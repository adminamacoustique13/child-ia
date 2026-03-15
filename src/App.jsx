import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import MainScreen from './components/MainScreen';
import { themes } from './themes';

export default function App() {
  const [ageGroup, setAgeGroup] = useState(null);

  if (!ageGroup) {
    return <HomeScreen onSelectAge={setAgeGroup} />;
  }

  const theme = themes[ageGroup];

  return (
    <MainScreen
      ageGroup={ageGroup}
      theme={theme}
      onBack={() => setAgeGroup(null)}
    />
  );
}
