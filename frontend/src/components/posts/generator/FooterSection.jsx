import LoadingSpinner from '../../loading/LoadingSpinner'
// import CommentInput from './CommentInput'
// import LikeInput from './LikeInput'
// Icons & Images
import { FaRegComment } from "react-icons/fa"
import { BiRepost } from "react-icons/bi"
import { FaRegHeart } from "react-icons/fa"
import { FaRegBookmark } from "react-icons/fa6"
// import { FaTrash } from "react-icons/fa"
import avatarImg from '../../../../public/avatars/boy1.png'

const FooterSection = () => {
    return (
        <div className='flex justify-between mt-3'>
            <div className='flex gap-4 justify-between items-center w-2/3'>
                            <div
                                // onClick={}
                                className='flex gap-1 items-center group cursor-pointer'
                            >
                                <FaRegComment className='w-4 h-4 text-slate-500 group-hover:text-sky-400' />
                                <span className='text-sm text-slate-500 group-hover:text-sky-400'>the number of comments</span>
                            </div>

                            {/* Use a modal component from DaisyUI */}
                            {/* Comment generator = (comments) as para */}
                            <dialog id='something' className='modal border-none outline-none'>
                                <div className='modal-box rounded border border-gray-600'>
                                    <h3 className='font-bold text-lg mb-4'>COMMENTS</h3>
                                    <div className='flex flex-col gap-3 max-h-60 overflow-auto'>
                                        <p className='text-sm text-slate-500'>No comment yet</p>
                                        <div className='flex-gap-2 items-start'>
                                            {/* Avatar */}
                                            <div className='avatar'>
                                                <div className='w-8 rounded-full'>
                                                    <img src="" alt="" />
                                                </div>
                                            </div>
                                            {/* User info */}
                                            <div className='flex flex-col'>
                                                <div className='flex items-center gap-1'>
                                                    <span className='font-bold'>comment fullName</span>
                                                    <span className='text-gray-700 text-sm'>@comment username</span>
                                                </div>
                                                <div>comment text</div>
                                            </div>                                
                                        </div>
                                    </div>
                                    <form
                                        className='flex gap-2 items-center mt-4 border-t border-gray-600 pt-2' 
                                    >
                                        <textarea 
                                            className='textarea w-full p-1 rounded text-md resize-none border focus:outline-none border-gray-800' 
                                        />
                                        <button className='btn btn-primary rounded-full btn-sm text-white px-4'>
                                            Post
                                        </button>
                                    </form>
                                </div>

                                {/* Close button */}
                                <form method='dialog' className='modal-backdrop'>
                                    <button className='outline-none'>close</button>
                                </form>
                            </dialog>

                            {/* Like and Unlike */}
                            <div>
                                <BiRepost />
                                <span></span>
                            </div>

                            <div>
                                <LoadingSpinner size='sm' />
                                <FaRegHeart className='w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500' />
                                <FaRegHeart className='w-4 h-4 cursor-pointer group-hover:text-pink-500' />

                                <span className='text-sm group-hover:text-pink-500 text-slate-500'>
                                    the number of likes
                                </span>
                            </div>
                        </div>
                        <div className='flex w-1/3 justify-end gap-2 items-center'>
                            <FaRegBookmark className='w-4 h-4 text-slate-500 cursor-pointer' />
                        </div>

        </div>
    )
}

export default FooterSection