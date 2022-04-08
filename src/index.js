import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import './index.css'
import App from './App'
import i18n from './i18n'

const container = document.getElementById('root')

const root = ReactDOMClient.createRoot(container)

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
