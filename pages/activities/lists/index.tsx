import React from 'react'

import UnAuthenticated from 'components/UnAuthenticated'
import SessionInterface from 'interfaces/SessionInterface'
import useTranslation from 'next-translate/useTranslation'

import ListLayout from 'components/forms/ListLayout'

export default function index({ session }: SessionInterface) {
    if (!session.user.permission) {
        return UnAuthenticated()
    }

    const { t, lang } = useTranslation('common')

    return (
        <ListLayout tableName="production" />

    )
}

