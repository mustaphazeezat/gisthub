import React, { useEffect, useState } from 'react'
import { usePosts } from '../context/PostsContext'
import Comments from './Comments'
import GistLike from './GistLike'

const Post = ({postItem}) => {
    
    const { allUsers } = usePosts()
    const {post, userId, like, comments  } = postItem
    const [allUser, setAllUser]  = useState([])
    const [name, setName] = useState('')
    useEffect(() => {
        const getPostLists = async () =>{
            try {
                const data = await allUsers()
                setAllUser(data)
            } catch (error) {
                console.log(error)
            }
            
        }
        getPostLists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (allUser?.length > 0) {
            const getUser = allUser.find(item => item.id === userId)
            setName(getUser?.firstName +' ' + getUser?.lastName )
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allUser])

    

    return (
        <React.Fragment>
            <div className='post-header'>
                <h3>{name} </h3>
                <p className='date'>{}</p>
            </div>
            <p className='post'>
                {post}
            </p>
            <div className='post-footer'>
                <Comments comments={comments} post={postItem} allUsers={allUser} />
                <GistLike likes={like} post={postItem} />
            </div>
        </React.Fragment>
    )
}

export default Post
