import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/(home)/HomePage'
import SignUpPage from './pages/(auth)/signup/SignUpPage'
import LoginPage from './pages/(auth)/login/LoginPage'

function App() {

  return (
    <div className='mx-auto'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
    </div>
  )
}

export default App
