import React, { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa';
import { usePosts } from '../context/PostsContext';
import { useAuth } from '../context/AuthContext'

const GistLike = ({likes, post}) => {
    const {currentUser} = useAuth()
    const { updatePost } = usePosts()
    const [like, setLike] = useState(false)
    const [liked, setLiked] = useState('')
    const [likeCount, setlikeCount] = useState(0)

    useEffect(() => {
        const getlike = post.like.find(item => item.likerId === currentUser?.uid)
        setLiked(getlike?.likerId)
        setlikeCount(likes.length)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const handleChecked = async (e) =>{
       
        setLike(!like)
        if (!like) {
            const update =[...post.like, {likerId: currentUser.uid}]
            if (likeCount >= 0) {
                setlikeCount(likeCount + 1)
                setLiked(currentUser.uid)
            }
            try {
                await updatePost(post.id, {like: update})
            } catch (error) {
                console.log(error)   
            } 
            
        } else {
            const update = post.like.filter(item => item.likerId !== currentUser.uid)
            if (likeCount > 0) {
                setlikeCount(likeCount - 1)
                setLiked(undefined)
            }
            try {
                await updatePost(post.id, {like: update})
            } catch (error) {
                console.log(error)   
            } 
            
        }
        e.preventDefault()
    }
    return (
        <div className='gist-like'>
            {currentUser? 
                <label className='like-check'>
                    <input onChange={handleChecked} type='checkbox'/>
                    <span className={`label ${liked === currentUser.uid ? 'liked' : ''}`}><FaHeart /><span>{likeCount}</span></span> 
                </label>:
                <div className='like-check'>
                    <span className='label'><FaHeart /><span>{likeCount}</span></span> 
                </div>
               } 
           
        </div>
    )
}

export default GistLike
