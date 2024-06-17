// import { useState } from 'react'
import { Link } from 'react-router-dom'
// import { useMutation, useQuery, userQueryClient } from '@transtack/react-query'
// import { toast } from 'react-hot-toast'
// import { getDatePosted } from '../../utils/dateGenerator'
import HeaderSection from './HeaderSection'
import BodySection from './BodySection'
import FooterSection from './FooterSection'
import avatarImg from '../../../../public/avatars/boy1.png';

const PostGenerator = () => {
    // const [comment, setComment] = useState('');
    // const { data: authUser } = useQuery({ queryKey: ['authUser'] });
    // const queryClient = useQueryClient();
    // const postOwner =post.user;
    // const isLiked = post.likes.includes(auther._id);
    // const isMyPost = authUser._id === post.user._id;
    // const postedDate = getDatePosted(post.createdAt);

    return (
        <>
            <div className='flex  gap-2 items-start p-4 border-b border-gray-700'>
                {/* Avatar */}
                <div className='avatar'>
                    <Link to={'/'} className='w-8 rounded-full overflow-0hidden'>
                        <img src={avatarImg} alt='' />
                    </Link>
                </div>

                <div className='flex flex-col flex-1'>
                    <HeaderSection />
                    <BodySection />
                    <FooterSection />
                </div>
            </div>
        </>
    )
}

export default PostGenerator