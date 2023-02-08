import React from 'react'
import useSWR from 'swr'

import sendRequest from "../../lib/requests"
import UnAuthenticated from 'components/UnAuthenticated'
import SessionInterface from 'interfaces/SessionInterface'
import useTranslation from 'next-translate/useTranslation'

import { GridColDef } from '@mui/x-data-grid';
import { Grid } from '@mui/material'
import TableGridList from 'components/backoffice/TablesList'
import DataGridComponent from 'components/backoffice/BackofficeLayout'

export default function index({ session }: SessionInterface) {
    if (!session.user.permission) return <UnAuthenticated />

    const { t, lang } = useTranslation('common')

    const { data, error } = useSWR('/companies', sendRequest)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    const columns: GridColDef[] = [
        { field: 'id', headerName: t('id'), width: 300 },
        { field: 'legalName', headerName: t('legalName'), flex: 1, },
        { field: 'shortName', headerName: t('shortName'), flex: 1, },
        { field: 'fiscalNumber', headerName: t('fiscalNumber'), type: 'number', width: 120 },
        { field: 'caeType', headerName: t('caeType'), flex: 1, },
    ];

    //TODO: criar um layout para isto tudo
    return (
        <DataGridComponent rows={data.data} columns={columns} />
    )
}

