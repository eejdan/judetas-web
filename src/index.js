

import App from './App'
import './index.css';
import './colors.css'

import { CookiesProvider } from 'react-cookie';
import { ErrorProvider } from './context/ErrorProvider';
import { ThemeProvider } from './context/ThemeProvider';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root')
const root = createRoot(container);
root.render(
    <ThemeProvider>
        <ErrorProvider>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </ErrorProvider>
    </ThemeProvider>
)