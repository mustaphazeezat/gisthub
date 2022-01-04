import React,{createContext, useContext} from 'react'
import { db } from '../firebase'
import { getDocs, collection, doc, updateDoc, query, orderBy, where} from "firebase/firestore"; 
import { useAuth } from './AuthContext';

const PostsContext = createContext()

export function usePosts () {
    return useContext(PostsContext)
}


export const PostsProvider = ({children}) => {
    const {currentUser} = useAuth()
    const postsRef = collection(db, 'posts')
    const allusersRef = collection(db, 'users')

    async function posts() {
        const q = query(postsRef, orderBy("createdAt", "desc"));
        const data = await getDocs(q)
        return data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    }
    async function allUsers() {
        const data = await getDocs(allusersRef)
        return data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    }
    async function updatePost(id, item) {
        const postDoc = doc(db, 'posts', id )
        return await updateDoc(postDoc, item)
    }
    async function myPosts() {
        const q = query(postsRef, where("userId", "==", currentUser.uid), orderBy("createdAt", "desc"));
        const data = await getDocs(q)
        return data.docs.map((doc) => ({...doc.data(), id: doc.id}))

    }
    

    const value ={
        posts, 
        allUsers,
        updatePost,
        myPosts
    }
    return (
        <PostsContext.Provider value={value}>
            {children}
        </PostsContext.Provider>
    )
}