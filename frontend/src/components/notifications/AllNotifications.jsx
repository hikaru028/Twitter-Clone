import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../components/loading/LoadingSpinner'
// Icons
import { BsPersonFill } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa6'
// import { PiStarFourFill } from 'react-icons/pi' // when a new post is posted by a following user 

const AllNotifications = () => {
    const { data: notifications, isLoading } = useQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            try {
                const res = await fetch("/api/notifications");
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Something went wrong');
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
    });

    return (
        <>
            {/* Loading */}
            {isLoading && (
                <div className='flex justify-center h-full items-center'>
                    <LoadingSpinner size='lg' />
                </div>
            )}

            {/* Notifications */}
            <div className='flex justify-between items-center py-2 px-4 border-b border-gray-700 hover:bg-secondary/50 cursor-pointer'>
                {notifications?.length === 0 && 
                <div className='text-center p-4 font-bold'>No notifications</div>}
                    {notifications?.map((notification) => (
                    <div className='' key={notification._id}>
                        <div className='flex gap-3 p-4'>
                            {notification.type === "follow" && <BsPersonFill className='w-10 h-10 text-primary' />}
                            {notification.type === "like" && <FaHeart className='w-10 h-10 text-red-500' />}
                            <Link to={`/profile/${notification.from.username}`}>
                                <div className='avatar'>
                                    <div className='w-10 rounded-full'>
                                        <img src={notification.from.profileImg || "/avatar-placeholder.png"} />
                                    </div>
                                </div>
                                <div className='flex gap-1 text-lg font-medium mt-2'>
                                    <p className='font-bold'>{notification.from.fullName}</p>
                                    {notification.type === "follow" ? "followed you" : "liked your post"}
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default AllNotifications