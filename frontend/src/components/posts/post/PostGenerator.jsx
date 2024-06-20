import { Link } from 'react-router-dom'
import HeaderSection from './HeaderSection'
import BodySection from './BodySection'
import FooterSection from './FooterSection'
import avatarImg from '../../../../public/avatars/boy1.png';

const PostGenerator = ({ post }) => {
    const postOwner = post.user;

    return (
        <>
            <div className='flex  gap-2 items-start p-4 border-b border-gray-700'>
                {/* Avatar */}
                <div className='avatar'>
                    <Link to={`/profile/${postOwner.username}`} className='w-11 rounded-full overflow-0hidden'>
                        <img src={postOwner.profileImg || avatarImg} alt='' />
                    </Link>
                </div>

                <div className='flex flex-col flex-1'>
                    <HeaderSection postOwner={postOwner} />
                    <BodySection />
                    <FooterSection />
                </div>
            </div>
        </>
    )
}

export default PostGenerator