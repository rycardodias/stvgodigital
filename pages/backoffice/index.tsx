import React from 'react'
import useSWR from 'swr'

import sendRequest from "../../lib/requests"
import UnAuthenticated from 'components/UnAuthenticated'
import SessionInterface from 'interfaces/SessionInterface'
import useTranslation from 'next-translate/useTranslation'

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import TablesList from 'components/backoffice/TablesList'
import BasicForm from 'components/forms/RegistrationForm'

export default function index({ session }: SessionInterface) {
    if (!session.user.permission) {
        return UnAuthenticated()
    }

    const { t, lang } = useTranslation('common')

    return (
        <Grid container spacing={2} marginTop={1}>
            <TablesList />
        </Grid>
    )
}

