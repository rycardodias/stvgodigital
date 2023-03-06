import React from 'react'
import UnAuthenticated from 'components/UnAuthenticated'
import SessionInterface from 'interfaces/SessionInterface'
import DataGridComponent from 'components/backoffice/BackofficeLayout'

export default function index({ session }: SessionInterface) {
    if (!session.user.permission) return <UnAuthenticated />

    return (
        <DataGridComponent tableName="circularEnvironmentalData" />
    )
}

