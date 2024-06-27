import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import AllNotifications from '../../components/notifications/AllNotifications'
import VerifiedNotifications from '../../components/notifications/VerifiedNotifications'
import Mentions from '../../components/notifications/Mentions'
import SettingButton from '../../components/notifications/SettingButton'

const NotificationPage = () => {
    const [notification, setNotification] = useState('all');

    const renderPosts = () => {
        switch (notification) {
            case 'all':
                return <AllNotifications />
            case 'verified':
                return <VerifiedNotifications />
            case 'mentions':
                return <Mentions />
            default:
                return <AllNotifications />
        }
    };
    
  return (
        <div className='flex-[4_4_0] mr-auto border-r border-gray-700 lg:min-w-[600px] min-h-screen'>
            <div className='sticky top-0 left-0 flex flex-col w-full bg-black/60 backdrop-blur-md z-20'>
                {/* Header */}
                <div className='w-full flex justify-between items-center p-4'>
                    <span className='text-[21px] font-bold'>Notifications</span>
                    <SettingButton />
                </div>
                <div className='flex w-full h-16 items-center border-b border-gray-700'>
                    <div
                    className={`flex justify-center flex-1 p-5 hover:bg-secondary transition duration-300 cursor-pointer relative text-lg ${notification === "all" ? 'font-black text-white' : 'font-semibold text-gray-700'}`}
                    onClick={() => setNotification("all")}
                    >
                    All
                    {notification === "all" && (
                        <div className='absolute bottom-0 w-[70px] h-[4px] rounded-full bg-primary'></div>
                    )}
                    </div>
                    <div
                    className={`flex justify-center flex-1 p-5 hover:bg-secondary transition duration-300 cursor-pointer relative text-lg ${notification === "verified" ? 'font-black text-white' : 'font-semibold text-gray-700'}`}
                    onClick={() => setNotification("verified")}
                    >
                    Verified
                    {notification === "verified" && (
                        <div className='absolute bottom-0 w-[70px]  h-[4px] rounded-full bg-primary'></div>
                    )}
                    </div>
                    <div
                    className={`flex justify-center flex-1 p-5 hover:bg-secondary transition duration-300 cursor-pointer relative text-lg ${notification === "mentions" ? 'font-black text-white' : 'font-semibold text-gray-700'}`}
                    onClick={() => setNotification("mentions")}
                    >
                    Mentions
                    {notification === "mentions" && (
                        <div className='absolute bottom-0 w-[70px]  h-[4px] rounded-full bg-primary'></div>
                    )}
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div>
                {renderPosts()}
            </div>
        </div>
    )
}

export default NotificationPage