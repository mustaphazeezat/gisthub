import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TextInput from '../../components/inputs/TextInput'
import AuthWrapper from '../../components/wrapppers/AuthWrapper'
import { useAuth } from '../../context/AuthContext'

const ForgetPassword = () => {
    const {resetPassword} = useAuth()
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault() 
        
        try {
            setError(null)
            setLoading(true)
            await resetPassword(email)
            setMessage('A link has been sent to your email to reset your password.')
        } catch (error) {
            setLoading(false)
            setMessage('')
            setError('There is no user with this E-mail')
        } 
     }
    return (
        <AuthWrapper>
            <h2>
                Forgot password
            </h2>
            {
                error? <p className='error'>{error}</p>: null
            }
            {
                message.length > 2?
                <p className='success'>{message}</p>:
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label='E-mail'
                        type='email'
                        value={email}
                        onChange={val => setEmail(val)}
                    />
                    <button className='submit-btn'>
                        {loading? 'Sending email...' : 'reset password'}
                    </button>
                </form>

            }
            <p>
                 <Link to='/login'>Back to Login</Link> 
            </p>
        </AuthWrapper>
    )
}

export default ForgetPassword
