import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/mainPage'

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <meta name="color-scheme" content="light only"></meta>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
