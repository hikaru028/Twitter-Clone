import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/(home)/HomePage'
import SignUpPage from './pages/(auth)/signup/SignUpPage'
import LoginPage from './pages/(auth)/login/LoginPage'
import Navigation from './components/side-bars/Navigation'
import RightPanel from './components/side-bars/RightPanel'

function App() {

  return (
    <div className='flex max-w-6xl mx-auto'>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
      <RightPanel />
    </div>
  )
}

export default App
