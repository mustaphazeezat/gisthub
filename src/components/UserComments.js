import React from 'react'

const UserComments = ({comments}) => {
    return (
        <ul className='comment-list'>
            {
            comments.map((item, i) => <li className='comment-item' key={i}>
                <h4 className='name'>{item.name}</h4>
                <p className='comment'>{item.comment}</p>
            </li>)  
            }
        </ul>
    )
}

export default UserComments
