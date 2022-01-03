import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextInput from '../../components/inputs/TextInput'
import AuthWrapper from '../../components/wrapppers/AuthWrapper'
import { useAuth } from '../../context/AuthContext'
import { firestore } from '../../firebase'

const Signup = () => {
    const {signUp, currentUser} = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    useEffect(() => {
        if (currentUser !== null) {
            firestore.collection('users').doc(currentUser.uid).set({
                firstName: firstName,
                lastName: lastName,
              }); 
        } else {
            return null
        } 
    }, [currentUser])

    const passwordVeri = () =>{
       if (password.length < 6) {
            setError('Password cannot be less than 6 characters')
       }
    }

    const handleSubmit = async (e) => {
        e.preventDefault() 
        if (password !== confirmPassword) {
            return setError('Passwords do not match')
        }
        try {
            setError(null)
            setLoading(true)
            await signUp(email, password)
            navigate("/")
        } catch (error) {
            setError('Failed to sign up')
            setLoading(false)
        } 
    }

    return (
        <AuthWrapper>
            <h2>
                Sign up
            </h2>
            {
                error? <p className='error'>{error}</p>: null
            }
            <form onSubmit={handleSubmit}>
                <div className='width-1-2'>
                    <TextInput
                        label='first name'
                        type='text'
                        value={firstName}
                        onChange={val => setFirstName(val)}
                    />
                    <TextInput
                        label='last name'
                        type='text'
                        value={lastName}
                        onChange={val => setLastName(val)}
                    />
                </div>
                <TextInput
                    label='E-mail'
                    type='email'
                    value={email}
                    onChange={val => setEmail(val)}
                />
                <div className='width-1-2'>
                    <TextInput
                        label='password'
                        type='password'
                        value={password}
                        onChange={val => setPassword(val)}
                        onMouseDown={passwordVeri}
                    />
                    <TextInput
                        label='confirm password'
                        type='password'
                        value={confirmPassword}
                        onChange={val => setConfirmPassword(val)}
                    />
                </div>
                <button className='submit-btn' type='submit'>
                    {loading? 'Loading...' : 'Sign up'}
                </button>
            </form>
            <p>
                Already have an account? <Link to='/login'>Log in</Link>
            </p>
        </AuthWrapper>
    )
}

export default Signup
