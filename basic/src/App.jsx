import { Button } from 'antd';
import { useState } from 'react';
import Demo from './components/Context/Demo';
import ThemeContext from './components/Context/ThemeContext';

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <Demo />
      <Button
        onClick={() => {
          setTheme(theme === 'light' ? 'dark' : 'light');
        }}
      >
        主题切换
      </Button>
    </ThemeContext.Provider>
  );
}

export default App;
