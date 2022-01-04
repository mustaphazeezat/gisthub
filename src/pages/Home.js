import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import NewPost from '../components/NewPost'
import PostList from '../components/PostList'
import Layout from '../components/wrapppers/Layout'
import Wrapper from '../components/wrapppers/Wrapper'
import { usePosts } from '../context/PostsContext'

const Home = () => {
    const { posts } = usePosts()
    const [posted, setPosted] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [postLists, setPostLists] = useState([])
    useEffect(() => {
        const getPostLists = async () =>{
            try {
                setError(false)
                setLoading(true)
                const data = await posts()
                setPostLists(data)
                setLoading(false)
            } catch (error) {
                setError(true)
            }
            
        }
        getPostLists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (posted) {
            const getPostLists = async () =>{
                try {
                    setError(false)
                    const data = await posts()
                    setPostLists(data)
                } catch (error) {
                    setError(true)
                }
                
            } 
            getPostLists()
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [posted])
    
    
    return (
        <Layout>
            <Wrapper>
                {!loading? (
                    <React.Fragment>
                        <NewPost posted={posted} setPosted={setPosted} />
                        <PostList posts={postLists} />
                            
                    </React.Fragment>
                    ): <Loader/>
                }
            </Wrapper>
        </Layout>
    )
}

export default Home
