import React, { useEffect, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { useAuth } from '../context/AuthContext'
import { usePosts } from '../context/PostsContext'

const Comments = ({comments, post, allUsers}) => {
    const {currentUser} = useAuth()
    const { updatePost } = usePosts()
    const [open, setOpen] = useState(false)
    const [commentCount, setCommentCount] = useState(0)
    const [commentList, setCommentList] = useState([])
    const [comment, setComment] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
   
    useEffect(() => {
        setCommentList(comments)
        setCommentCount(comments.length)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const getUser = allUsers.find(item => item.id === currentUser?.uid)
        setName(getUser?.firstName +' ' + getUser?.lastName )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allUsers])
    
    const handleComment = async (e) =>{
        e.preventDefault()
        if (comment.length !== 0) {
            setError('')
            const update = [...commentList, {comment: comment, name: name}]
            try {
                setLoading(true)
                await updatePost(post.id, {comments: update})
                setLoading(false)
            } catch (error) {
                console.log(error)   
            } 
            setCommentList(update)
            setCommentCount(update.length)
            setComment('')
        }else{
            setError('Comment cannot be empty')
        }
    }
    return (
        <div className='comments'>
            <button className='comment-btn' onClick={() => setOpen(open=>!open)}>{commentCount} Comments</button>
            {
                open? 
                <ClickAwayListener onClickAway={()=>setOpen(false)}>
                <div className='comment-wrapper'>
                    {
                        currentUser?
                        <form className='comment-input' onSubmit={handleComment}>
                            <input type='text' value={comment} placeholder='Type your comment here' maxLength={100} onChange={(e)=>setComment(e.target.value)}/>
                            <button disabled={loading? true : false} type='submit'>{loading? 'commenting...': 'Add comment' }</button>
                        </form>:<p>Login to contribute to this gist</p>
                    }
                    {error.length > 0? <p className='error-msg'>{error}</p> : ''}
                    {
                        commentCount > 0?
                        
                            <ul className='comment-list'>
                                {
                                commentList.map((item, i) => <li className='comment-item' key={i}>
                                    <h4 className='name'>{item.name}</h4>
                                    <p className='comment'>{item.comment}</p>
                                </li>)  
                                }
                            </ul>
                        
                        :null
                    }
                </div></ClickAwayListener>: null
            }
        </div>
    )
}

export default Comments
