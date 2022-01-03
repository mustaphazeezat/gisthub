import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextInput from '../../components/inputs/TextInput'
import AuthWrapper from '../../components/wrapppers/AuthWrapper'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
    const {logIn} = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    
    const handleSubmit = async (e) => {
        e.preventDefault() 
        
        try {
            setError(null)
            setLoading(true)
            await logIn(email, password)
            navigate("/")
        } catch (error) {
            setError('Failed to Login up')
            setLoading(false)
        } 
     }
    return (
        <AuthWrapper>
            <h2>
                Log in
            </h2>
            {
                error? <p className='error'>{error}</p>: null
            }
            <form onSubmit={handleSubmit}>
                <TextInput
                    label='E-mail'
                    type='email'
                    value={email}
                    onChange={val => setEmail(val)}
                />
                <TextInput
                    label='password'
                    type='password'
                    value={password}
                    onChange={val => setPassword(val)}
                />
                <button className='submit-btn'>
                {loading? 'Logging in...' : 'Log in'}
                </button>
            </form>
            <p>
                Don't have an account? <Link to='/signup'>Sign up</Link> 
            </p>
            <p>
                Forgot password? Click <Link to='/forgot-password'>here</Link> to reset password.
            </p>
        </AuthWrapper>
    )
}

export default Login
