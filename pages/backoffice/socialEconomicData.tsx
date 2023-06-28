import React from 'react'
import UnAuthenticated from 'components/UnAuthenticated'
import UnAuthorized from 'components/UnAuthorized'
import SessionInterface from 'interfaces/SessionInterface'
import DataGridComponent from 'components/backoffice/BackofficeLayout'

export default function index({ session }: SessionInterface) {
    if (!session.user.permission) return <UnAuthenticated />
    if (session.user.permission !== 'ADMIN') return <UnAuthorized />

    return (
        <DataGridComponent tableName="socialEconomicData" />
    )
}

