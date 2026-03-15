import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import MainScreen from './components/MainScreen';
import ChatScreen from './components/ChatScreen';
import { themes } from './themes';

export default function App() {
  const [ageGroup, setAgeGroup] = useState(null);
  const [screen, setScreen] = useState('home'); // 'home' | 'main' | 'chat'
  const [initialQuestion, setInitialQuestion] = useState('');

  const handleSelectAge = (age) => {
    setAgeGroup(age);
    setScreen('main');
  };

  const handleStartChat = (question) => {
    setInitialQuestion(question || '');
    setScreen('chat');
  };

  const handleBack = () => {
    if (screen === 'chat') {
      setScreen('main');
      setInitialQuestion('');
    } else {
      setAgeGroup(null);
      setScreen('home');
    }
  };

  if (screen === 'home' || !ageGroup) {
    return <HomeScreen onSelectAge={handleSelectAge} />;
  }

  const theme = themes[ageGroup];

  if (screen === 'chat') {
    return (
      <ChatScreen
        ageGroup={ageGroup}
        theme={theme}
        onBack={handleBack}
        initialQuestion={initialQuestion}
      />
    );
  }

  return (
    <MainScreen
      ageGroup={ageGroup}
      theme={theme}
      onBack={handleBack}
      onStartChat={handleStartChat}
    />
  );
}
