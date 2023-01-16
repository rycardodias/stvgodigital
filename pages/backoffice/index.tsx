import React from 'react'
import { useSession } from "next-auth/react"

export default function index() {
    const { data: session, status } = useSession()

    if (status !== "authenticated") {
        return <a href="/api/auth/signin">Sign in</a>
    }

    return <p>Signed in as {session?.user?.name}</p>

}
