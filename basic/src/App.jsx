import { Button, Form } from 'antd';
import { useContext, useRef, useState } from 'react';
import ColorSelect from './components/Control/ColorSelect';
import Counter from './components/Counter/Counter';
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

  const onFinish = (values) => {
    console.log(values);
  };
  const onValuesChange = (a, b, c) => {
    console.log(a, b, c);
  };
  return (
    <ThemeContext.Provider value={theme}>
      <div ref={parentRef}>
        <div style={{ width: 200, height: 400, ...themeStyle }} ref={targetRef}>
          <button onClick={toggleTheme}>👻点赞+收藏👻</button>
        </div>
      </div>
      <Counter />

      <Form onFinish={onFinish} onValuesChange={onValuesChange}>
        <Form.Item name="sele" initialValue={'green'}>
          <ColorSelect></ColorSelect>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </ThemeContext.Provider>
  );
}

export default App;
