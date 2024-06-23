import { getDatePosted } from '../../utils/dateGenerator'
import { Link } from 'react-router-dom'
import MoreButton from './MoreButton'

const HeaderSection = ({ post }) => {
    const postOwner = post.user;
    const postedDate = getDatePosted(post.createdAt);

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
                    <span>{postedDate}</span>
                </span>
            </div>

            {/* More button */}
            <MoreButton post={post} />
        </div>
    </>
  )
}

export default HeaderSection