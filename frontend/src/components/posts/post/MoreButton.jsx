import { useState, useEffect, useRef } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query' 
import toast from 'react-hot-toast'
//icons
import { RiMoreFill, RiCodeSSlashFill, RiFlag2Line } from 'react-icons/ri'
import { FaTrash } from 'react-icons/fa'
import { FaUserXmark } from 'react-icons/fa6'
import { MdOutlinePostAdd, MdBlock } from 'react-icons/md'
import { BiVolumeMute } from 'react-icons/bi'
import { IoIosStats } from "react-icons/io"

const MoreButton = ({ post }) => {
    const { data: authUser } = useQuery({ queryKey: ['authUser'] });
    const queryClient = useQueryClient();
    const isMyPost = authUser._id === post.user.id;
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const popupRef = useRef(null);

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

    const handleDeletePost = (e) => {
        e.preventDefault();
		deletePost();
	};

    const togglePopup = (e) => {
        e.preventDefault();
        setIsPopupVisible(!isPopupVisible);
    };

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setIsPopupVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className='relative flex w-1/3 justify-end items-center group cursor-pointer'>
                <div 
                    onClick={togglePopup}
                    className='w-12 h-12 -m-1 group-hover:bg-sky-400/15 flex justify-center items-center rounded-full'
                >
                    <RiMoreFill className='w-6 h-6 text-slate-500 group-hover:text-sky-400' />
                </div>
                {/* Popup */}
                {isPopupVisible && (
                    <div id='post-popup' ref={popupRef} className='absolute top-0 -right-1 z-20'>
                        <div className='relative min-w-[350px] h-auto bg-black flex flex-col justify-center rounded-[15px] z-10'>
                            <ul className=''>
                                {isMyPost && !isDeleting && (
                                    <li
                                    onClick={handleDeletePost}
                                    className='post-popup-list'
                                    >
                                        <FaTrash className='post-popup-icon' />
                                    </li>
                                )}
                                <li className='post-popup-list'>
                                    <FaUserXmark className='post-popup-icon' />
                                    Unfollow @username
                                </li>
                                <li className='post-popup-list'>
                                    <MdOutlinePostAdd className='post-popup-icon' />
                                    Add/remove @username from Lists
                                </li>
                                <li className='post-popup-list'>
                                    <BiVolumeMute className='post-popup-icon' />
                                    Mute @username
                                </li>
                                <li className='post-popup-list'>
                                    <MdBlock className='post-popup-icon' />
                                    Block @username
                                </li>
                                <li className='post-popup-list'>
                                    <IoIosStats className='post-popup-icon' />
                                    View post engagements
                                </li>
                                <li className='post-popup-list'>
                                    <RiCodeSSlashFill className='post-popup-icon' />
                                    Embed post
                                </li>
                                <li className='post-popup-list'>
                                    <RiFlag2Line className='post-popup-icon' />
                                    Report post
                                </li>
                            </ul>
                        </div>
                        <div className="absolute inset-[2px] rounded-[14px] blur-sm bg-gradient-to-br from-white via-white to-white z-0"></div>
                    </div>
                )}
            </div>
        </>
    )
}

export default MoreButton