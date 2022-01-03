import React from 'react'
import { FaHeart } from 'react-icons/fa';

const GistLike = () => {
    return (
        <div className='gist-like'>
            <label className='like-check'>
                <input type='checkbox'/>
                <span><FaHeart /></span>
                
            </label>
        </div>
    )
}

export default GistLike
