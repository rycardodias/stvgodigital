import React from 'react'
import useSWR from 'swr'

import sendRequest from "../../lib/requests"
import UnAuthenticated from 'components/UnAuthenticated'
import UnAuthorized from 'components/UnAuthorized'
import SessionInterface from 'interfaces/SessionInterface'
import useTranslation from 'next-translate/useTranslation'
import ls from 'localstorage-slim';
import BlockchainLoginDialog from 'components/forms/BlockchainLoginDialog'

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import TablesList from 'components/backoffice/TablesList'

export default function index({ session }: SessionInterface) {
    if (!session.user.permission) {
        return UnAuthenticated()
    }

    if (!['RESPONSABLE', 'MEMBER'].includes(session.user.permission)) return <UnAuthorized />



    const { t, lang } = useTranslation('common')

    return (
        <Grid container spacing={2} marginTop={0}>
            <Grid item xs={2}>
                <TablesList onChainRecords />
            </Grid>
            <Grid item xs={10}>
                {!ls.get('blockchainLoggedIn') && <BlockchainLoginDialog />}

                <Button onClick={() => {
                    sendRequest('/onchain/users/enroll', 'POST', {
                        "id": "admin",
                        "secret": "adminpw"
                    })
                }}>Login blockchain</Button>
            </Grid>
        </Grid>

    )
}

