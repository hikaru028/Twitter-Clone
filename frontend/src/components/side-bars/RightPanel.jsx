import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import RightPanelSkeleton from '../skeletons/RightPanelSkeleton'
// import LoadingSpinner from '../loading/LoadingSpinner'
// import useFollow from '../../hooks/useFollow'
import avatarImg from '../../../public/avatars/boy1.png'

const RightPanel = () => {
    return (
        <div className='hidden md:block my-4 mx-2 ml-4'>
            <div className='sticky top-2 border border-gray-700 rounded-[15px]'>
                <p className='text-2xl font-black p-4'>Who to follow</p>
                <div>
                    {/* Skeletons */}
                    {/* <div>
                        <RightPanelSkeleton />
                        <RightPanelSkeleton />
                        <RightPanelSkeleton />
                        <RightPanelSkeleton />
                    </div> */}

                    <Link
                        to={`/profile/user.username`}
                        key='user._id'
                        className='flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-[#16181C] transition-all duration-200' 
                    >
                        {/* User info */}
                        <div className='flex gap-2 items-center'>
                            {/* User image */}
                            <div className='avatar'>
                                <div className='w-11 rounded-full'>
                                    <img src={avatarImg || avatarImg} />
                                </div>
                            </div>
                            {/* User names */}
                            <div className='flex flex-col w-18 lg:w-[200px]'>
                                <span className='w-full text-lg font-bold tracking-tight truncate hover:underline cursor-pointer'>
                                    user.fullName
                                </span>
                                <span className='w-full text-lg text-gray-500'>
                                    @user.username
                                </span>
                            </div>
                        </div>

                        {/* Follow button */}
                        <div className='w-auto flex justify-center items-center bg-white py-1 px-2 rounded-full'>
                            <button
                                onClick={(e) => {e.preventDefault(); }}
                                className='btn btn-sm text-lg border-none bg-white text-black hover:bg-white hover:opacity-90 rounded-full cursor-pointer'
                            >
                                Follow
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RightPanel;