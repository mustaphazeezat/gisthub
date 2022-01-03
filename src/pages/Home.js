import React, { useState } from 'react'
import Comments from '../components/Comments'
import GistLike from '../components/GistLike'
import NewPost from '../components/NewPost'
import Layout from '../components/wrapppers/Layout'
import Wrapper from '../components/wrapppers/Wrapper'

const Home = () => {
    const [posted, setPosted] = useState(false)
    return (
        <Layout>
            <Wrapper>
                <NewPost posted={posted} setPosted={setPosted} />
                <ul className='post-list'>
                    <li className='post-item'>
                        <div>
                            <h2>azi azi</h2>
                            <time>2d</time>
                        </div>
                        <p>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. 
                        </p>
                        <div>
                            <GistLike/>
                            <Comments/>
                        </div>
                    </li>
                </ul>
            </Wrapper>
        </Layout>
    )
}

export default Home
