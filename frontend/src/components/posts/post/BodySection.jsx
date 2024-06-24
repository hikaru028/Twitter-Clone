const BodySection = ({ post }) => {
  return (
    <div className='flex flex-col gap-3 overflow-hidden'>
        <span className='text-xl'>{post.text}</span>
        {post.img && (
            <img 
                src={post.img} 
                alt='' 
                className='h-80 object-contain rounded-lg border border-gray-700' 
            />
        )}
    </div>
  )
}

export default BodySection