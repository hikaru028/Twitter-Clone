// import React from 'react'
import { Link } from 'react-router-dom'
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
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
  return (
    <div className='md:flex flex-col justify-between w-[340px] max-w-[400px] h-full overflow-hidden '>
        <div className='sticky top-0 left-0 h-screen flex flex-col justify-between items-center border-r border-gray-700 w-[100px] md:w-full'>
            {/* Navi */}
            <ul className='flex flex-col gap-3 mt-1 mb-2'>
                {/* Logo */}
                <Link to='/' className='flex justify-center items-center max-w-fit hover:bg-stone-900 transition-all rounded-full duration-200 cursor-pointer'>
                    <img src={LogoWhite} className='w-[45px] h-[45px] m-3' />
                </Link>

                <li className='nav-list'>
                    <Link to='/' className='nav-link'>
                    <MdHomeFilled className='w-10 h-9' />
                    <span className='nav-text'>Home</span>
                    </Link>
                </li>
                <li className='nav-list'>
                    <Link to='/' className='nav-link'>
                    <PiMagnifyingGlass className='w-9 h-9' />
                    <span className='nav-text'>Explore</span>
                    </Link>
                </li>
                <li className='nav-list'>
                    <Link to='/' className='nav-link'>
                    <IoNotificationsOutline className='w-9 h-9' />
                    <span className='nav-text'>Notifications</span>
                    </Link>
                </li>
                <li className='nav-list'>
                    <Link to='/' className='nav-link'>
                    <MdOutlineMailOutline className='w-9 h-9' />
                    <span className='nav-text'>Messages</span>
                    </Link>
                </li>
                <li className='nav-list'>
                    <Link to='/' className='nav-link'>
                    <RiSlashCommands2 className='w-9 h-9' />
                    <span className='nav-text'>Grok</span>
                    </Link>
                </li>
                <li className='nav-list'>
                    <Link to='/' className='nav-link'>
                    <RiFileListLine className='w-9 h-9' />
                    <span className='nav-text'>Lists</span>
                    </Link>
                </li>
                <li className='nav-list'>
                    <Link to='/' className='nav-link'>
                    <IoBookmarkOutline className='w-9 h-9' />
                    <span className='nav-text'>Bookmarks</span>
                    </Link>
                </li>
                <li className='nav-list'>
                    <Link to='/' className='nav-link'>
                    <BsPeople className='w-9 h-9' />
                    <span className='nav-text'>Communities</span>
                    </Link>
                </li>
                <li className='nav-list'>
                    <Link to='/' className='nav-link'>
                    <img src={LogoWhite} className='min-w-[35px] min-h-[35px] max-w-[35px] max-h-[35px]' />
                    <span className='nav-text'>Premium</span>
                    </Link>
                </li>
                <li className='nav-list'>
                    <Link to='/' className='nav-link'>
                    <BsPerson className='w-9 h-9' />
                    <span className='nav-text'>Profile</span>
                    </Link>
                </li>
                <li className='nav-list'>
                    <Link to='/' className='nav-link'>
                    <CiCircleMore className='w-9 h-9' />
                    <span className='nav-text'>More</span>
                    </Link>
                </li>

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