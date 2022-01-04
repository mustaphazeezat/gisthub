import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import PostList from '../components/PostList'
import Layout from '../components/wrapppers/Layout'
import Wrapper from '../components/wrapppers/Wrapper'
import { usePosts } from '../context/PostsContext'

const MyGist = () => {
    const {myPosts} = usePosts()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [postLists, setPostLists] = useState([])
    useEffect(() => {
        const getPostLists = async () =>{
            try {
                setError(false)
                setLoading(true)
                const data = await myPosts()
                setPostLists(data)
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

export default MyGist
