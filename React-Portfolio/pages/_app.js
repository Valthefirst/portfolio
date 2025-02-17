import { useEffect, useState } from 'react';
import "@/styles/globals.css";
import { I18nextProvider } from 'react-i18next';
import i18n from '../outside-components/languageConfig.jsx';

export default function App({ Component, pageProps }) {

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') ?? 'light';
    setTheme(storedTheme);
    document.documentElement.classList.add(storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove(theme); // Remove the current theme class
    document.documentElement.classList.add(newTheme); // Add the new theme class
  };

  return (
    <I18nextProvider i18n={i18n}>
      <Component {...pageProps} toggleTheme={toggleTheme}/>
    </I18nextProvider>
  );
}
