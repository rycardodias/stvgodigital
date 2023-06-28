import React from 'react'

import UnAuthenticated from 'components/UnAuthenticated'
import UnAuthorized from 'components/UnAuthorized'
import SessionInterface from 'interfaces/SessionInterface'
import useTranslation from 'next-translate/useTranslation'

import { Grid, } from '@mui/material'
import TablesList from 'components/backoffice/TablesList'
import ReceptionForm from 'components/forms/ReceptionForm'
import ls from 'localstorage-slim';
import BlockchainLoginDialog from 'components/forms/BlockchainLoginDialog'
export default function index({ session }: SessionInterface) {
    if (!session.user.permission) {
        return UnAuthenticated()
    }
    if (!['RESPONSABLE', 'MEMBER'].includes(session.user.permission)) return <UnAuthorized />

    const { t } = useTranslation('common')

    return (
        <Grid container spacing={2} marginTop={0}>
            <Grid item xs={2}>
                <TablesList onChainRecords />
            </Grid>
            <Grid item xs={10}>
                {ls.get('blockchainLoggedIn') ? <ReceptionForm />
                    : <BlockchainLoginDialog />}

            </Grid>
        </Grid>
    )
}

