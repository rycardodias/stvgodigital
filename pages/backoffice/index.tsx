import React from 'react'
import UnAuthenticated from 'components/UnAuthenticated'
import UnAuthorized from 'components/UnAuthorized'
import SessionInterface from 'interfaces/SessionInterface'
import useTranslation from 'next-translate/useTranslation'

import { Grid,  } from '@mui/material'
import TablesList from 'components/backoffice/TablesList'

export default function index({ session }: SessionInterface) {

    if (!session.user.permission) {
        return UnAuthenticated()
    }
    if (session.user.permission !== 'ADMIN') {
        return UnAuthorized()
    }

    const { t, lang } = useTranslation('common')

    return (
        <Grid container spacing={2} marginTop={1}>
            <TablesList />
        </Grid>
    )
}

