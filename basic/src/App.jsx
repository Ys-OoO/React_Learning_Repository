import { useContext, useRef, useState } from 'react';
import ThemeContext from './components/Theme/ThemeContext/ThemeContext';
import { crop, toCanvas } from './utils/canvasUtils';
function App() {
  const themeContext = useContext(ThemeContext);
  const [theme, setTheme] = useState(themeContext);
  const themeStyle =
    theme === 'light'
      ? { backgroundColor: '#fff', color: '#333' }
      : { backgroundColor: '#333', color: '#fff' };
  const parentRef = useRef();
  const targetRef = useRef();

  const toggleTheme = (e) => {
    toCanvas(targetRef.current).then((canvas) => {
      parentRef.current.appendChild(canvas);
      crop(canvas, e, { reverse: theme === 'dark' }).then((canvas) => {
        parentRef.current.removeChild(canvas);
      });
      setTheme(theme === 'light' ? 'dark' : 'light');
    });
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div ref={parentRef}>
        <div style={{ width: 200, height: 400, ...themeStyle }} ref={targetRef}>
          <button onClick={toggleTheme}>👻点赞+收藏👻</button>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
