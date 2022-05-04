

import App from './App'
import './index.css';
import './colors.css'

import { CookiesProvider } from 'react-cookie';

import { AuthProvider } from './context/AuthProvider';

import { createRoot } from 'react-dom/client';
import { ErrorProvider } from './context/ErrorProvider';
const container = document.getElementById('root')
const root = createRoot(container);
root.render(
    <AuthProvider>
        <ErrorProvider>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </ErrorProvider>
    </AuthProvider>
)