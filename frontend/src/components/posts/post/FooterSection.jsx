import LoadingSpinner from '../../loading/LoadingSpinner'
// import CommentInput from './CommentInput'
// import LikeInput from './LikeInput'
// Icons & Images
import { FaRegComment } from "react-icons/fa"
import { BiRepost } from "react-icons/bi"
import { FaRegHeart } from "react-icons/fa"
import { IoIosStats } from "react-icons/io"
import { FaRegBookmark } from "react-icons/fa6"
import { RiShare2Fill } from "react-icons/ri"
// import { FaTrash } from "react-icons/fa"

const FooterSection = () => {
    return (
        <div className='flex justify-between mt-3'>
            <div className='flex gap-4 justify-between items-center w-full'>
                {/* Comment */}
                <div
                    // onClick={}
                    className='flex w-1/3 justify-start items-center group cursor-pointer'
                >
                    <div className='w-12 h-12 -m-1 group-hover:bg-sky-400/15 flex justify-center items-center rounded-full'>
                        <FaRegComment className='w-6 h-6 text-slate-500 group-hover:text-sky-400' />
                    </div>
                    <span className='text-lg text-slate-500 group-hover:text-sky-400'>
                        137
                    </span>
                </div>

                {/* Comment input popup using a modal component from DaisyUI */}
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

                {/* Repost */}
                <div className='flex w-1/3 justify-start group items-center'>
                    <div className='w-12 h-12 -m-1 group-hover:bg-green-500/15 flex justify-center items-center rounded-full'>
                        <BiRepost className='w-7 h-7 cursor-pointer text-slate-500 group-hover:text-green-500' />
                    </div>
                    <span className='text-lg text-slate-500 group-hover:text-green-500'>
                        85
                    </span>
                </div>

                {/* Like and Unlike */}
                <div className='flex w-1/3 justify-start group items-center'>
                    {/* <LoadingSpinner size='sm' /> */}
                    <div className='w-12 h-12 -m-1 group-hover:bg-pink-500/15 flex justify-center items-center rounded-full'>
                        {/* <FaRegHeart className='w-5 h-5 cursor-pointer text-slate-500 group-hover:text-pink-500' /> */}
                        <FaRegHeart className='w-5 h-5 cursor-pointer text-slate-500 group-hover:text-pink-500' />
                    </div>
                    <span className='text-lg text-slate-500 group-hover:text-pink-500'>
                        452
                    </span>
                </div>

                {/* Stats */}
                <div className='flex w-1/3 justify-start items-center group cursor-pointer'>
                    <div className='w-12 h-12 -m-1 group-hover:bg-sky-400/15 flex justify-center items-center rounded-full'>
                        <IoIosStats className='w-6 h-6 text-slate-500 group-hover:text-sky-400' />
                    </div>
                    <span className='text-lg text-slate-500 group-hover:text-sky-400'>
                        6K
                    </span>
                </div>

                {/* Bookmark & Share*/}
                <div className='flex w-1/5 justify-end items-center'>
                    <div className='flex w-1/3 justify-end items-center group'>
                        <div className='w-12 h-12 group-hover:bg-sky-400/15 flex justify-center items-center rounded-full'>
                            <FaRegBookmark className='w-5 h-5 text-slate-500 group-hover:text-sky-400 cursor-pointer' />
                        </div>
                    </div>
                    <div className='flex w-1/3 justify-end items-center group'>
                        <div className='w-12 h-12 group-hover:bg-sky-400/15 flex justify-center items-center rounded-full'>
                            <RiShare2Fill className='w-6 h-6 text-slate-500 hover:text-sky-400 cursor-pointer' />
                        </div>
                    </div>
                </div>         
            </div>
        </div>
    )
}

export default FooterSection