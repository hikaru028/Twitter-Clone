import { useState } from 'react'
import CreateNewPost from '../../components/posts/CreateNewPost';
import PostsSection from '../../components/posts/PostsSection'

const HomePage = () => {
    const [feedType, setFeedType] = useState('for You');

    return (
        <div className='flex-[4_4_0] mr-auto border-r border-gray-700 lg:min-w-[600px] min-h-screen'>
              {/* Header */}
              <div className='flex w-full h-16 items-center border-b border-secondary '>
                  <div
                    className={`flex justify-center flex-1 p-5 hover:bg-secondary transition duration-300 cursor-pointer relative text-xl ${feedType === "for You" ? 'font-black' : 'font-semibold'}`}
                    onClick={() => setFeedType("for You")}
                  >
                    For you
                    {feedType === "for You" && (
                      <div className='absolute bottom-0 w-[60px] h-[4px] rounded-full bg-primary'></div>
                    )}
                  </div>
                  <div
                    className={`flex justify-center flex-1 p-5 hover:bg-secondary transition duration-300 cursor-pointer relative text-xl ${feedType === "following" ? 'font-black' : 'font-semibold'}`}
                    onClick={() => setFeedType("following")}
                  >
                    Following
                    {feedType === "following" && (
                      <div className='absolute bottom-0 w-[82px]  h-[4px] rounded-full bg-primary'></div>
                    )}
                  </div>
              </div>

              {/* Create a post */}
              <CreateNewPost />

              {/* All Posts */}
              <PostsSection feedType={feedType} />
        </div>
    )
}

export default HomePage