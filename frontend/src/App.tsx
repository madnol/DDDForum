import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { MainPage } from './pages/mainPage'
import { RegisterPage } from './pages/registerPage'

import { UserProvider } from './contexts/userContext'

import './App.css'
import { SpinnerProvider } from './contexts/spinnerContext'

function App() {

  return (
    <SpinnerProvider>
      <UserProvider>
        <BrowserRouter>
          <meta name="color-scheme" content="light only"></meta>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/join" element={<RegisterPage />} />

          </Routes>
        </BrowserRouter>
      </UserProvider>
    </SpinnerProvider>
  )
}


export default App
