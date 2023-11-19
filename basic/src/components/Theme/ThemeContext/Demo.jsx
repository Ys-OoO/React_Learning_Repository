import { useContext } from 'react';
import ThemeContext from './ThemeContext';
import './style.css';

export default function Demo() {
  const theme = useContext(ThemeContext);
  return <div className={`box ${theme}`}>Context Demo</div>;
}
