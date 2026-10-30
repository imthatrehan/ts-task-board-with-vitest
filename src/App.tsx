import { Route, Routes } from 'react-router-dom'
import './App.css'
import DataPage from './pages/DataPage'
import MainPage from './pages/MainPage'
import ViewTabs from './components/ViewTabs'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="mt-4 flex justify-center">
        <ViewTabs />
      </nav>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/data-page" element={<DataPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App