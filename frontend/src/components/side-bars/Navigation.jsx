import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import UserPanel from '../user/UserPanel'
import CreatePostModal from '../posts/CreatePostModal'
// Icons
import { GoHome, GoHomeFill } from "react-icons/go"
import { TbMail, TbMailFilled } from "react-icons/tb"
import { PiMagnifyingGlass, PiMagnifyingGlassBold } from "react-icons/pi"
import { IoNotificationsOutline, IoNotifications, IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { BsSlashSquare, BsSlashSquareFill } from "react-icons/bs";
import { RiFileListLine, RiFileListFill } from "react-icons/ri";
import { CiCircleMore } from "react-icons/ci";
import { CgMoreO } from "react-icons/cg";
import { BsPerson, BsPersonFill, BsPeople, BsPeopleFill } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";

const Navigation = () => {
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    const [selectedItem, setSelectedItem] = useState('/');

    const navList = [
        { icon: GoHome, icon2: GoHomeFill, path: '/', text: 'Home' },
        { icon: PiMagnifyingGlass, icon2: PiMagnifyingGlassBold, path: '/explore', text: 'Explore' },
        { icon: IoNotificationsOutline, icon2: IoNotifications, path: '/notification', text: 'Notifications' },
        { icon: TbMail, icon2:TbMailFilled, path: '/messages', text: 'Messages' },
        { icon: BsSlashSquare, icon2: BsSlashSquareFill, path: '/grok', text: 'Grok' },
        { icon: RiFileListLine, icon2: RiFileListFill, path: '/lists', text: 'Lists' },
        { icon: IoBookmarkOutline, icon2: IoBookmark, path: '/bookmarks', text: 'Bookmarks' },
        { icon: BsPeople, icon2: BsPeopleFill, path: '/communities', text: 'Communities' },
        { icon: FaXTwitter, icon2: FaXTwitter, path: 'https://twitter.com/i/premium_sign_up', text: 'Premium' },
        { icon: BsPerson, icon2: BsPersonFill, path: `/profile/${authUser?.username}`, text: 'Profile' },
        { icon: CiCircleMore, icon2: CgMoreO, path: '/more', text: 'More' },
    ];

    const handleClick = (path) => {
        setSelectedItem(path);
    }

  return (
    <div className='flex md:flex-[2_2_0] w-18 max-w-52'>
        <div className='sticky top-0 left-0 h-screen flex flex-col justify-between items-center border-r border-gray-700 w-[100px] md:w-full pr-36'>
            <ul className='flex flex-col gap-3 mt-1 mb-2'>
                {/* Logo */}
                <Link to='/' className='flex justify-center items-center max-w-fit hover:bg-stone-900 transition-all rounded-full duration-200 cursor-pointer'>
                    <FaXTwitter className='w-9 h-9 m-3' />
                </Link>

                {/* Navigation */}
                {navList.map((item, index) => (
                    <li key={index} onClick={() => handleClick(item.path)} className='nav-list'>
                        <Link to={item.path} className='nav-link'>
                            {selectedItem === item.path ? <item.icon2 className='w-9 h-9' /> : <item.icon className='w-9 h-9' />}
                            <span className={`nav-text ${selectedItem === item.path ? 'font-extrabold' : 'font-medium'}`}>{item.text}</span>
                        </Link>
                    </li>
                ))}
    
                {/* Post button */}
                <CreatePostModal />
            </ul>
            {/* User panel */}
            <UserPanel />
        </div>
    </div>
  )
}

export default Navigation