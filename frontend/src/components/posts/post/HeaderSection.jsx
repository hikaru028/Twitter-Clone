import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query' 
import LoadingSpinner from '../../loading/LoadingSpinner'
import { getDatePosted } from '../../utils/dateGenerator'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { RiMoreFill } from 'react-icons/ri'
import { FaTrash } from 'react-icons/fa'

const HeaderSection = ({ post }) => {
    const { data: authUser } = useQuery({ queryKey: ['authUser'] });
    const postOwner = post.user;
    const queryClient = useQueryClient();
    const isMyPost = authUser._id === post.user.id;
    const postedDate = getDatePosted(post.createdAt);

    const { mutate: deletePost, isPending: isDeleting } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/posts/${post._id}`, {
                    method: 'DELETE',
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Something went wrong');
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            toast.success('Post deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['posts']});
        }
    });
    
    const handleDeletePost = () => {
		deletePost();
	};

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
            <div className='flex w-1/3 justify-end items-center group cursor-pointer'>
                <div className='w-12 h-12 -m-1 group-hover:bg-sky-400/15 flex justify-center items-center rounded-full'>
                    <RiMoreFill className='w-6 h-6 text-slate-500 group-hover:text-sky-400' />
                </div>
                {isMyPost && (
                    <span className='flex justify-end flex-1'>
                        {!isDeleting && (
                            <FaTrash className='cursor-pointer hover:text-red-500' onClick={handleDeletePost} />
                        )}

                        {isDeleting && <LoadingSpinner size='sm' />}
                    </span>
                )}
            </div>
        </div>
    </>
  )
}

export default HeaderSection