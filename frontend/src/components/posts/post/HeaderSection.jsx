import { Link } from 'react-router-dom'
import { RiMoreFill } from 'react-icons/ri'
import { getDatePosted } from '../../utils/dateGenerator'

const HeaderSection = ({ postOwner }) => {
  return (
    <>
        <div className='flex justify-between items-center -mt-2 w-full'>
            {/* User information */}
            <div className='flex justify-start items-center gap-3'>
                <Link to={`/profile/${postOwner.username}`} className='text-xl font-bold hover:underline'>
                    {postOwner.fullName}
                </Link>
                <span className='text-gray-700 flex gap-1 text-xl'>
                    <Link to={`/profile/${postOwner.username}`} >@{postOwner.username}</Link>
                    <span>・</span>
                    <span>{getDatePosted}</span>
                </span>
            </div>

            {/* More button */}
            <div className='flex w-1/3 justify-end items-center group cursor-pointer'>
                <div className='w-12 h-12 -m-1 group-hover:bg-sky-400/15 flex justify-center items-center rounded-full'>
                    <RiMoreFill className='w-6 h-6 text-slate-500 group-hover:text-sky-400' />
                </div>
            </div>
        </div>
    </>
  )
}

export default HeaderSection