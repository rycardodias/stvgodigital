import Link from 'next/link'
import React from 'react'

export default function UnAuthenticated() {
    return (
        <Link href="/login">Sign in</Link>
    )
}
