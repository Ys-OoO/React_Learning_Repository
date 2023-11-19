import Demo from './components/Theme/CssVar/Demo';

function App() {
  return (
    <>
      <Demo />
      <button
        onClick={() => {
          const classList = document.documentElement.classList;
          if (classList.value) {
            document.documentElement.classList.remove('dark');
            return;
          }
          document.documentElement.classList.add('dark');
        }}
      >
        主题切换
      </button>
    </>
  );
}

export default App;
