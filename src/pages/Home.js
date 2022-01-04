import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import NewPost from '../components/NewPost'
import PostList from '../components/PostList'
import Layout from '../components/wrapppers/Layout'
import Wrapper from '../components/wrapppers/Wrapper'
import { usePosts } from '../context/PostsContext'
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Home = () => {
    const { posts } = usePosts()
    const [posted, setPosted] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [postLists, setPostLists] = useState([])
    const [postData, setPostData] = useState([])
    const postPerpage = 10

    useEffect(() => {
        const getPostLists = async () =>{
            try {
                setError(false)
                setLoading(true)
                const data = await posts()
                setPostData(data)
                setPostLists(data.slice(0, postPerpage))
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
                    setPostData(data)
                    setPostLists(data.slice(0, postPerpage))
                } catch (error) {
                    setError(true)
                }
                
            } 
            getPostLists()
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [posted])
    const onChangePage = (page) =>{
        const indexOfLastPost = page * postPerpage
        const indexOfFirstPost = indexOfLastPost - postPerpage
        const currentPosts = postData.slice(indexOfFirstPost, indexOfLastPost)
        setPostLists(currentPosts)
    }
    
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
                {
					postData && postData.length > 10 ?
					<div className='paginate-wrapper'>
                        <ReactPaginate
                            previousLabel={< FiChevronLeft />}
                            nextLabel={<  FiChevronRight />}
                            breakLabel={'...'}
                            onPageChange={page => onChangePage(page?.selected + 1)}
                            pageCount={Math.ceil(postData.length / 10)}
                            containerClassName={'pagination'}
                            pageClassName={'page'}
                            previousClassName={'page'}
                            nextClassName={'page'}
                            disabledClassName={'disabled'}
                            activeClassName={'active'}
                        />
                    </div>: null
				}
            </Wrapper>
        </Layout>
    )
}

export default Home
