import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query' 
import LoadingSpinner from '../../loading/LoadingSpinner'
import toast from 'react-hot-toast'
// Icons
import { RiCloseLine } from 'react-icons/ri'
import userDefaultImg from '../../../../public/avatars/user-default.png'

const CommentPostModal = ({ post }) => {
    const queryClient = useQueryClient();
    const [comment, setComment] = useState('');

    const { mutate: commentPost, isPending: isCommenting } = useMutation({
		mutationFn: async () => {
			try {
				const res = await fetch(`/api/posts/comment/${post._id}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ text: comment }),
				});
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			toast.success("Comment posted successfully");
			setComment("");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

    const handlePostComment = (e) => {
		e.preventDefault();
		if (isCommenting) return;
		commentPost();
	};

    return (
        <>
            <dialog id='something' className='modal border-none outline-none'>
                <div className='modal-box rounded border border-gray-600'>
                    <h3 className='font-bold text-lg mb-4'>COMMENTS</h3>
                    <div className='flex flex-col gap-3 max-h-60 overflow-auto'>
                        {post.comments.length === 0 && (
                            <p className='text-sm text-slate-500'>No comment yet</p>
                        )}
                        {post.comments.map((comment) => (
                            <div key={comment._id} className='flex-gap-2 items-start'>
                                {/* Avatar */}
                                <div className='avatar'>
                                    <div className='w-8 rounded-full'>
                                        <img src={comment.user.profileImg || userDefaultImg } />
                                    </div>
                                </div>
                                {/* User info */}
                                <div className='flex flex-col'>
                                    <div className='flex items-center gap-1'>
                                        <span className='font-bold'>{comment.user.fullName}</span>
                                        <span className='text-gray-700 text-sm'>@{comment.user.username}</span>
                                    </div>
                                    <div className='text-lg'>{comment.text}</div>
                                </div>                                
                            </div>
                        ))}
                    </div>
                    <form
                        onSubmit={handlePostComment}
                        className='flex gap-2 items-center mt-4 border-t border-gray-600 pt-2' 
                    >
                        <textarea
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            placeholder='Add a comment...' 
                            className='textarea w-full p-1 rounded text-md resize-none border focus:outline-none border-gray-800' 
                        />
                        <button className='btn btn-primary rounded-full btn-sm text-white px-4'>
                            {isCommenting ? <LoadingSpinner size='md' /> : 'Post'}
                        </button>
                    </form>
                </div>

                {/* Close button */}
                <form method='dialog' className='modal-backdrop'>
                    <button className='outline-none'>
                        <RiCloseLine />
                    </button>
                </form>
            </dialog>
        </>
    )
}

export default CommentPostModal