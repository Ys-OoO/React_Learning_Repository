import { createContext } from 'react';

const defaultTheme = 'light';
const ThemeContext = createContext(defaultTheme);
export default ThemeContext;
