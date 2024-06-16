import Navigation from '../../components/home/Navigation'
import Middle from '../../components/home/Middle'
import RightPanel from '../../components/home/RightPanel'

const HomePage = () => {
  return (
    <div className='flex justify-between'>
      <Navigation />
      <Middle />
      <RightPanel />
    </div>
  )
}

export default HomePage