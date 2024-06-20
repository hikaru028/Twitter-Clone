import { useQuery } from "@tanstack/react-query";
import SearchBox from '../utils/SearchBox'
import Premium from '../utils/Premium'
import News from '../utils/News'
import RecommendedUsers from '../user/RecommendedUsers'

const RightPanel = () => {
    return (
        <div className='hidden md:block my-4 mx-2 ml-8'>
            <div className=''>
                <SearchBox />
            </div>
            <div className=''>
                <Premium />
                <News />
                <RecommendedUsers />
            </div>
        </div>
    )
}

export default RightPanel;