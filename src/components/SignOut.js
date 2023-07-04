import React from 'react'

export default function SignOut({ auth }) {
    return (
        auth.currentUser && (
            <button className='primary-btn' onClick={() => auth.signOut()}>Sign Out</button>)
    )
}
