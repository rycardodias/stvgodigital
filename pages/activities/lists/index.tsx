import React, {  } from 'react'

import UnAuthenticated from 'components/UnAuthenticated'
import UnAuthorized from 'components/UnAuthorized'
import SessionInterface from 'interfaces/SessionInterface'
import useTranslation from 'next-translate/useTranslation'

import ListLayout from 'components/forms/ListLayout'

export default function Index({ session }: SessionInterface) {
    if (!session.user.permission) {
        return UnAuthenticated()
    }
    if (!['RESPONSABLE', 'MEMBER'].includes(session.user.permission)) return <UnAuthorized />

    return (
        <ListLayout tableName="production" />

    )
}

