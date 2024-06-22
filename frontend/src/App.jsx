import { Routes, Route } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Navigate } from 'react-router-dom'
import HomePage from './pages/(home)/HomePage'
import SignUpPage from './pages/(auth)/signup/SignUpPage'
import LoginPage from './pages/(auth)/login/LoginPage'
import NotificationPage from './pages/(notification)/NotificationPage'
import ProfilePage from './pages/(profile)/ProfilePage'
import Navigation from './components/side-bars/Navigation'
import RightPanel from './components/side-bars/RightPanel'
import LoadingSpinner from './components/loading/LoadingSpinner'

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data= await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error ||  'Something went wrong');
        }
        console.log(data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className='flex max-w-6xl m-auto'>
      {authUser && <Navigation /> }
       <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
        <Route path='/notification' element={authUser ? <NotificationPage /> : <Navigate to='/login' />} />
        <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
      </Routes>
      {authUser && <RightPanel /> }
    </div>
  )
}

export default App
