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
                
    const { data: authUser } = useQuery({ queryKey: ['authUser'] });

  return (
    <>
        {authUser && (
            <div className='relative inline-block mt-12 mb-4 '>
                {/* user section */}
                <Link
                    onClick={togglePopup}
                    className='flex flex-row justify-start items-center w-[60px] md:w-[250px]  md:hover:bg-stone-900 transition-all rounded-full duration-200 md:py-4 md:px-4  cursor-pointer z-0'
                >
                    <div className='avatar md:inline-flex'>
                        <div className='w-16 rounded-full'>
                            <img src={authUser?.profileImg || '../../../public/avatars/boy1.png'} />
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-between ml-4'>
                        <div className='hidden md:block mr-2'>
                            <p className='text-white font-bold text-xl w-[120px] truncate'>{authUser?.fullName}</p>
                            <p className='text-slate-500 text-xl'>@{authUser?.username}</p>
                        </div>
                        <RiMoreFill className='hidden md:block w-7 h-7 font-semibold cursor-pointer' />
                    </div>
                </Link>
        
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