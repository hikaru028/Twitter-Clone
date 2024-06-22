import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
// import { getDateUserJoined } from '../utils/dateGenerator'
import ProfileEditorModal from './ProfileEditorModal'
import useFollow from '../hooks/useFollow'
import useUpdateUserProfile from '../hooks/useUpdateUserProfile'
// Icons
import { RiLink } from "react-icons/ri"
import { GrLocation } from "react-icons/gr"
import { PiCalendarDots } from "react-icons/pi"

const ProfileMain = ({ user }) => {
    const { data: authUser } = useQuery({ queryKey: ['authUser'] });
    const [coverImg, setCoverImg] = useState(null);
	const [profileImg, setProfileImg] = useState(null);
	const { follow, isPending } = useFollow();
    const { isUpdatingProfile, updateProfile } = useUpdateUserProfile();
	const isMyProfile = authUser._id === user?._id;
	const amIFollowing = authUser?.following.includes(user?._id);

    return (
        <>
            {/* Cover image */}
            <div className='relative group/cover'>
                <img
                    src={coverImg || user?.coverImg || '../../../public/images/blank.jpg'}
                    className='w-full h-60 object-cover'
                    alt='cover image'
                />
                {/* User avatar image */}
                <div className='avatar absolute -bottom-20 left-8'>
                    <div className='rounded-full w-[140px] relative group/avatar border-4 border-black'>
                        <img src={profileImg || user?.profileImg || "../../../public/avatars/user-default.png"} />
                    </div>
                </div>
            </div>
            <div className='flex justify-end px-4 mt-5'>
                {isMyProfile && <ProfileEditorModal authUser={authUser} user={user} />}
                    {!isMyProfile && (
                    <button
                        className='btn btn-outline rounded-full btn-lg'
                        onClick={() => follow(user?._id)}
                    >
                        {isPending && "Loading..."}
                        {!isPending && amIFollowing && "Unfollow"}
                        {!isPending && !amIFollowing && "Follow"}
                    </button>
                )}
                {(coverImg || profileImg) && (
                    <button
                        className='btn btn-primary rounded-full btn-sm text-white px-4 ml-2'
                        onClick={async () => {
                            await updateProfile({ coverImg, profileImg });
                            setProfileImg(null);
                            setCoverImg(null);
                        }}
                    >
                        {isUpdatingProfile ? "Updating..." : "Update"}
                    </button>
                )}
            </div>

            <div className='flex flex-col gap-4 mt-12 px-4'>
                <div className='flex flex-col'>
                    {/* Full name */}
                    <span className='font-bold text-3xl'>{user?.fullName}</span>
                    {/* Username */}
                    <span className='text-xl text-slate-500'>@{user?.username}</span>
                    {/* Bio */}
                    <span className='text-xl my-1 text-white'>{user?.bio}</span>

                    <div className='flex items-center gap-3 flex-wrap text-gray-500 text-lg font-medium'>
                        {/* Location */}
                        <div className='flex gap-1 items-center'>
                            <GrLocation className='w-5 h-5' />
                            <span>New Zealand</span>
                        </div>
                        {/* Link */}
                        {user?.link && (
                            <div className='flex gap-1 items-center'>
                                <>
                                    <RiLink className='w-5 h-5' />
                                    <a
                                        href='https://hikarusuzuki.link/portfolio'
                                        target='_blank'
                                        rel='noreferrer'
                                        className='text-sm text-primary hover:underline'
                                    >
                                        {user?.link}
                                    </a>
                                </>
                            </div>
                        )}
                        {/* Joined date */}
                        <div className='flex gap-1 items-center'>
                            <PiCalendarDots className='w-5 h-5' />
                            <span>Joined March 2023</span>
                        </div>
                    </div>

                    <div className='flex gap-4 text-lg text-gray-500 my-4'>
                        {/* The number of followings */}
                        <div className='flex gap-1 items-center'>
                            <span className='font-extrabold text-white'>{user?.following.length}</span>
                            <span>Following</span>
                        </div>
                        {/* The number of followers */}
                        <div className='flex gap-1 items-center'>
                            <span className='font-extrabold text-white'>{user?.followers.length}</span>
                            <span>Followers</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileMain