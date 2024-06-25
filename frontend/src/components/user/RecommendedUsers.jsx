import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import RightPanelSkeleton from '../skeletons/RightPanelSkeleton'
// import LoadingSpinner from '../loading/LoadingSpinner'
// import useFollow from '../../hooks/useFollow'
import avatarImg from '../../../public/avatars/user-default.png'

const RecommendedUsers = () => {
    const { data: suggestedUsers, isLoading } = useQuery({
        queryKey: ['suggestedUsers'],
        queryFn: async () => {
            try {
                const res = await fetch('/api/users/suggested');
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.meddage || 'Something went wrong');
                }

                return data;
            } catch (error) {
                throw new Error(error.message);
            }
        }
    });

    if (suggestedUsers?.length === 0) return <div className='md:w-0 w-64'></div>;
    return (
        <div className='border border-gray-700 rounded-[15px] mt-6 overflow-hidden'>
            <p className='text-2xl font-black p-4 pl-7'>Who to follow</p>
            <div>
                {/* Skeletons */}
                {isLoading && (
                    <div>
                        <RightPanelSkeleton />
                        <RightPanelSkeleton />
                        <RightPanelSkeleton />
                        <RightPanelSkeleton />
                    </div>
                )}

                {!isLoading && suggestedUsers?.map((user) => (
                    <Link
                        to={`/profile/${user.username}`}
                        key={user._id}
                        className='flex items-center justify-between py-3 pr-4 pl-7 cursor-pointer hover:bg-[#16181C] transition-all duration-200' 
                    >
                        {/* User info */}
                        <div className='flex gap-2 items-center'>
                            {/* User image */}
                            <div className='avatar'>
                                <div className='w-11 rounded-full'>
                                    <img src={user.profileImg || avatarImg} />
                                </div>
                            </div>
                            {/* User names */}
                            <div className='flex flex-col w-18 lg:w-[200px]'>
                                <span className='w-full text-lg font-bold tracking-tight truncate hover:underline cursor-pointer'>
                                    {user.fullName}
                                </span>
                                <span className='w-full text-lg text-gray-500'>
                                    @{user.username}
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
                ))}
            </div>
        </div>
    )
}

export default RecommendedUsers