import React from 'react'
import { useState, useEffect } from 'react'

import sendRequest from "../../lib/requests"
import UnAuthenticated from 'components/UnAuthenticated'

export default function index() {
    // if (status !== "authenticated") {
    //     return UnAuthenticated()
    // }

    sendRequest('/companies', 'GET').then(response => console.log(response))

    return <p>{JSON.stringify({})}</p>

    // return <p>Signed in as {session?.user?.name}</p>
}
