

import App from './App'
import './index.css';
import './colors.css'

import { CookiesProvider } from 'react-cookie';
import { ErrorProvider } from './context/ErrorProvider';
import { ThemeProvider } from './context/ThemeProvider';
import { AuthProvider } from './context/AuthContext';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root')
const root = createRoot(container);
root.render(
    <AuthProvider>
        <ThemeProvider>
            <ErrorProvider>
                <CookiesProvider>
                    <App />
                </CookiesProvider>
            </ErrorProvider>
        </ThemeProvider>
    </AuthProvider>
)