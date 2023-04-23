import React from 'react'
import UnAuthenticated from 'components/UnAuthenticated'
import SessionInterface from 'interfaces/SessionInterface'
import useTranslation from 'next-translate/useTranslation'
import { Grid } from '@mui/material'
import TablesList from 'components/backoffice/TablesList'
import TransportationForm from 'components/forms/TransportationForm'
import ls from 'localstorage-slim';
import BlockchainLoginDialog from 'components/forms/BlockchainLoginDialog'
export default function index({ session }: SessionInterface) {
    if (!session.user.permission) {
        return UnAuthenticated()
    }

    const { t, lang } = useTranslation('common')

    return (
        <Grid container spacing={2} marginTop={0}>
            <Grid item xs={2}>
                <TablesList onChainRecords />
            </Grid>
            <Grid item xs={10}>
                {ls.get('blockchainLoggedIn') ? <TransportationForm />
                    : <BlockchainLoginDialog />}

            </Grid>
        </Grid>
    )
}

