import React from 'react'

export default function SignOut({ auth }) {
    return (
        auth.currentUser && (
            <button onClick={() => auth.signOut()}>Sign Out</button>)
    )
}
