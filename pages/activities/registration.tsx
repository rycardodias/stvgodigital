import React from 'react'
import useSWR from 'swr'

import sendRequest from "../../lib/requests"
import UnAuthenticated from 'components/UnAuthenticated'
import SessionInterface from 'interfaces/SessionInterface'
import useTranslation from 'next-translate/useTranslation'

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import TablesList from 'components/backoffice/TablesList'
import BasicForm from 'components/forms/BasicForm'
import DataGridComponent from 'components/backoffice/BackofficeLayout'

export default function index({ session }: SessionInterface) {
    if (!session.user.permission) {
        return UnAuthenticated()
    }

    const { t, lang } = useTranslation('common')

    return (
        <Grid container spacing={2} marginTop={0}>
            <Grid item xs={3}>
                <TablesList onChainRecords />
            </Grid>
            <Grid item xs={9}>
                <BasicForm />
            </Grid>
        </Grid>
    )
}

