import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import PostList from '../components/PostList'
import Layout from '../components/wrapppers/Layout'
import Wrapper from '../components/wrapppers/Wrapper'
import { useAuth } from '../context/AuthContext'
import { usePosts } from '../context/PostsContext'


const LikedGist = () => {
    const {posts} = usePosts()
    const {currentUser} = useAuth()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [postLists, setPostLists] = useState([])
    useEffect(() => {
        const getPostLists = async () =>{
            try {
                setError(false)
                setLoading(true)
                const data = await posts()
                const newData = data.filter(item => item.like.find(i => i.likerId === currentUser.uid))
                setPostLists(newData)
                setLoading(false)
            } catch (error) {
                setError(true)
            }
            
        }
        getPostLists()
    }, [])
    return (
        <Layout>
            <Wrapper>
                {!loading? (
                    <React.Fragment>
                        <PostList posts={postLists} />
                    </React.Fragment>
                    ): <Loader/>
                }
            </Wrapper>
        </Layout>
    )
}


export default LikedGist
