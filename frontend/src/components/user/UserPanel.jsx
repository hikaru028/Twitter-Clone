import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
// Icon
import { RiMoreFill } from "react-icons/ri";

const UserPanel = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    const togglePopup = (e) => {
        e.preventDefault();
        const popup = document.getElementById('popup');
        
        if (popup.style.display === 'none' || popup.style.display === '') {
          popup.style.display = 'block';
        } else {
          popup.style.display = 'none';
        }
    };

    const renderLoginPage = () => {
        navigate('/login');
    };

    const { mutate: logout } = useMutation({
        mutationFc: async () => {
            try {
                const res = await fetch("/api/auth/logout", { method: "POST" });
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || 'Something went wrong');
                    }
            } catch (error) {
                throw new Error(error.message);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
        },
        onError: () => {
            toast.error('Logout failed');
        }
    });
                
    // const { data: authUser } = useQuery({ queryKey: ['authUser'] });
    const authUser = {
        username: 'hikaru',
        fullName: 'Hikaru Suzuki',
        profileImg: '../../../public/avatars/boy1.png'
    };

  return (
    <>
        {authUser && (
            <div className='relative inline-block mt-12 mb-4 '>
                {/* user section */}
                <div className='w-auto h-auto flex justify-center items-center hover:bg-stone-900 transition-all rounded-full duration-200 p-4  cursor-pointer z-0'>
                    <Link
                        onClick={togglePopup}
                        className='flex flex-row justify-between items-center md:w-[230px] '
                    >
                        <div className='avatar md:inline-flex'>
                            <div className='w-12 rounded-full'>
                                <img src={authUser?.profileImg || '../../../public/avatars/boy1.png'} />
                            </div>
                        </div>
                            <div className='hidden md:block mr-2'>
                                <p className='text-white font-bold text-xl max-w-[120px] truncate'>{authUser?.fullName}</p>
                                <p className='text-slate-500 text-xl'>@{authUser?.username}</p>
                            </div>
                            <RiMoreFill className='hidden md:block w-6 h-6 font-semibold cursor-pointer' />    
                    </Link>
                </div>
        
                {/* Popup */}
                <div id='popup' className='hidden absolute bottom-[90px] -left-11 z-20'>
                    <div className='relative w-[320px] h-[120px] bg-black flex flex-col justify-center rounded-[18px] z-10'>
                        <ul className=''>
                            <li 
                                onClick={renderLoginPage}
                                className='text-xl font-extrabold hover:bg-stone-900 transition-all duration-200 py-3 px-4 cursor-pointer'
                            >
                                Add an existing account
                            </li>
                            <li
                                onClick={(e) => {
									e.preventDefault();
									logout();
								}}
                                className='text-xl font-extrabold hover:bg-stone-900 transition-all duration-200 py-3 px-4 cursor-pointer'
                            >
                                Log out of @username
                            </li>
                        </ul>
                    </div>
                    <div className="absolute inset-[2px] rounded-[18px] blur-sm bg-gradient-to-br from-white via-white to-white z-0"></div>
                </div>
            </div>
        )}
    </>
  )
}

export default UserPanel