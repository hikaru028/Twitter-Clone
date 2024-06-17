import { Link } from 'react-router-dom'

const HeaderSection = () => {
  return (
    <>
        {/* User information */}
        <div className='flex gap-2 items-center'>
            <Link to={'/'} className='font-bold'>
                fullName
            </Link>
            <span className='text-gray-700 flex gap-1 text-sm'>
                <Link to={'/'}>@username</Link>
                <span>.</span>
                <span>postedDate</span>
            </span>
            {/* <span>
                <FaTrash onClick={} className='cursor-pointer hover:text-red-500' />
            </span> */}
        </div>

        {/* Text & Image */}
        <div className='flex flex-col gap-3 overflow-hidden'>
            <span>post text</span>
            {/* <img src='' alt='' className='h-80 object-contain rounded-lg border border-gray-700' /> */}
        </div>
    </>
  )
}

export default HeaderSection