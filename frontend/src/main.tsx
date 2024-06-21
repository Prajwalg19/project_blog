import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from 'react-redux'
import {persistor, store} from "@/redux/store";
import {PersistGate} from 'redux-persist/integration/react'
import ThemeProvider from './components/themeProvider.tsx'

const root = document.getElementById("root")!
const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(
    <React.StrictMode>
        <PersistGate persistor={persistor} loading={null}>
            <Provider store={store}>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </Provider>
        </PersistGate>
    </React.StrictMode>,

)
