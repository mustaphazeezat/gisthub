import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import PostList from '../components/PostList'
import Layout from '../components/wrapppers/Layout'
import Wrapper from '../components/wrapppers/Wrapper'
import { useAuth } from '../context/AuthContext'
import { usePosts } from '../context/PostsContext'
import { IoIosHeartEmpty } from 'react-icons/io';
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const LikedGist = () => {
    const {posts} = usePosts()
    const {currentUser} = useAuth()
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
                const newData = data.filter(item => item.like.find(i => i.likerId === currentUser.uid))
                setPostData(newData)
                setPostLists(newData.slice(0, postPerpage))
                setLoading(false)
            } catch (error) {
                setError(true)
            }
            
        }
        getPostLists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
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
                        {
                            postLists.length > 0? <PostList posts={postLists} />: <p className='empty-state'><IoIosHeartEmpty/> <span>You are yet to like any post</span></p>
                        }
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


export default LikedGist
