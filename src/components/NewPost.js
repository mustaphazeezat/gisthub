import { addDoc, collection, Timestamp } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'

const NewPost = ({posted, setPosted}) => {
    const {currentUser} = useAuth()
    const [post, setPost] = useState('')
    const [postCount, setPostCount] = useState(0)
    const [error, seterror] = useState('')
    const [postDetails, setPostDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const getPost = localStorage.getItem("post");
    const postCollectionRef = collection(db, 'posts')

    useEffect(() => {
        if (getPost) {
            setPost(getPost)
            localStorage.removeItem('post')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const data ={
            userId: currentUser?.uid,
            post: post,
            like: [],
            comments: [],
            createdAt: null
        }
        setPostDetails(data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])

    const handleChange = (e)=>{
        setPost(e.target.value) 
        setPostCount(post.length)
        if (postCount > 304) {
            seterror(`${304 - postCount}`)
        }else if(postCount <= 304 && postCount <= 294) {
            seterror('')
            setPostDetails({...postDetails, post: post})
        }else if(postCount <= 304){
            seterror(304 - postCount)
        }

    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault()

        if (postCount > 304) {
            seterror('maximum character exceeded')
        } else if(postCount < 3) {
            seterror('Post cannot be less than 3')
        } else if(!currentUser && postCount <= 304){
            alert('You are not logged in. Login to post your gist')
            localStorage.setItem("post", post)
        }else if(currentUser && postCount <= 304){
            setLoading(true)
            setPosted(false)
            const Postdetailswithtime = {...postDetails, createdAt: Timestamp.now()}
            await addDoc(postCollectionRef, Postdetailswithtime)
            setPost('')
            setLoading(false)
            setPosted(true)
        }
    }
    
    return (
        <form className='post-form' onSubmit={handleSubmit}>
            <textarea 
                rows="5" 
                value={post} 
                placeholder="What is the latest gist?" 
                onChange={e => handleChange(e)}
                ></textarea>
            <p className='error-message'>{error}</p>
            <div className='btn-wrapper'><button className='post-btn' type='submit'>{loading? 'posting..' : 'post gist'}</button></div>
        </form>
    )
}

export default NewPost
