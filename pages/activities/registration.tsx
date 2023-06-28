import React, { useState, useEffect } from 'react'
import UnAuthenticated from 'components/UnAuthenticated'
import UnAuthorized from 'components/UnAuthorized'
import SessionInterface from 'interfaces/SessionInterface'
import { Grid } from '@mui/material'
import TablesList from 'components/backoffice/TablesList'
import RegistrationForm from 'components/forms/RegistrationForm'
import ls from 'localstorage-slim';
import BlockchainLoginDialog from 'components/forms/BlockchainLoginDialog'

export default function Registration({ session }: SessionInterface) {
    const [blockchainLoggedIn, setBlockchainLoggedIn] = useState(false)

    useEffect(() => {
        setBlockchainLoggedIn(ls.get('blockchainLoggedIn') || false)
    }, [])

    const handleBlockchainLoggedIn = (value: boolean) => {
        setBlockchainLoggedIn(value)
    }
    
    if (!session.user.permission) {
        return UnAuthenticated()
    }
    if (!['RESPONSABLE', 'MEMBER'].includes(session.user.permission)) return <UnAuthorized />

    return (
        <Grid container spacing={2} marginTop={0}>
            <Grid item xs={2}>
                <TablesList onChainRecords />
            </Grid>
            <Grid item xs={10}>
                {blockchainLoggedIn ? <RegistrationForm />
                    : <BlockchainLoginDialog handleLogin={handleBlockchainLoggedIn} />}

            </Grid>
        </Grid>
    )
}

