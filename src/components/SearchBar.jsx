import React from 'react';
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = ({searchQuery,setSearchQuery, getData}) => {
    return (
        <div className='w-full sm:w-[14vw] h-fit bg-white relative flex 
        items-center px-[2vw] sm:px-[1vw] py-[1vh] rounded-lg shadow-md'>
            <input
                value={searchQuery}
                onChange={(e)=> setSearchQuery(e.target.value)}
                className='w-[80%] outline-none'
                placeholder='Search'
            />
            <IoSearchOutline onClick={getData}
            style={{color:"#878787",position:"absolute",right:"2vw",cursor:"pointer"}}/>
        </div>
    )
}

export default SearchBar