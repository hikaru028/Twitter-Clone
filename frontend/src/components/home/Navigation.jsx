import { Link } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import UserPanel from '../user/UserPanel'

// Icons
import { MdHomeFilled, MdOutlineMailOutline } from 'react-icons/md'
import { PiMagnifyingGlass } from "react-icons/pi"
import { IoNotificationsOutline, IoBookmarkOutline } from "react-icons/io5";
import { RiFileListLine, RiSlashCommands2, RiQuillPenFill } from "react-icons/ri";
import { CiCircleMore } from "react-icons/ci";
import { BsPerson, BsPeople } from "react-icons/bs";
import LogoWhite from '../../../public/images/logo-white.png';

const Navigation = () => {
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });

    const naviList = [
        { icon: MdHomeFilled, path: '/', text: 'Home' },
        { icon: PiMagnifyingGlass, path: '/', text: 'Explore' },
        { icon: IoNotificationsOutline, path: '/', text: 'Notifications' },
        { icon: MdOutlineMailOutline, path: '/', text: 'Messages' },
        { icon: RiSlashCommands2, path: '/', text: 'Grok' },
        { icon: RiFileListLine, path: '/', text: 'Lists' },
        { icon: IoBookmarkOutline, path: '/', text: 'Bookmarks' },
        { icon: BsPeople, path: '/', text: 'Communities' },
        { icon: LogoWhite, path: '/', text: 'Premium', isImage: true },
        { icon: BsPerson, path: `/profile/${authUser?.username}`, text: 'Profile' },
        { icon: CiCircleMore, path: '/', text: 'More' },
    ];

  return (
    <div className='md:flex-[2_2_0] justify-between w-18 max-w-52 overflow-hidden '>
        <div className='sticky top-0 left-0 h-screen flex flex-col justify-between items-center border-r border-gray-700 w-[100px] md:w-full'>
            <ul className='flex flex-col gap-3 mt-1 mb-2'>
                {/* Logo */}
                <Link to='/' className='flex justify-center items-center max-w-fit hover:bg-stone-900 transition-all rounded-full duration-200 cursor-pointer'>
                    <img src={LogoWhite} className='w-[45px] h-[45px] m-3' />
                </Link>

                {/* Navi */}
                {naviList.map((item, index) => (
                    <li key={index} className='nav-list'>
                        <Link to={item.path} className='nav-link'>
                            {item.isImage ? (
                                <img src={item.icon} className='min-w-[35px] min-h-[35px] max-w-[35px] max-h-[35px]' alt='Logo' />
                            ) : (
                                <item.icon className='w-7 h-7' />
                            )}
                            <span className='nav-text'>{item.text}</span>
                        </Link>
                    </li>
                ))}
    
                {/* Post button */}
                <li className='flex justify-center items-center w-[60px] md:w-[250px] h-[60px] btn rounded-full btn-primary text-white'>
                    <p className='hidden md:block md:text-2xl md:font-bold'>Post</p>
                    <RiQuillPenFill className='w-9 h-9 md:hidden' />
                </li>  
            </ul>
            {/* User panel */}
            <UserPanel />
        </div>
    </div>
  )
}

export default Navigation