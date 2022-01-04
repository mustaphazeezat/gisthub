import React from 'react'
import Post from './Post'

const PostList = ({posts}) => {
    
    return (
        <ul className='post-list'>
            {
                posts.map(item => <li key={item.id} className='post-item'><Post postItem={item} /> </li>)
            }   
        </ul>
    )
}

export default PostList
