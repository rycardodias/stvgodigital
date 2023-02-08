import React from 'react'

import sendRequest from "../lib/requests"

import ls from 'localstorage-slim';
import { useRouter } from 'next/router';

export default function ClientSessionWithRouter(props) {
    const router = useRouter()
    return <ClientSession {...props} router={router} />
}

class ClientSession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { name: null, permission: null },
            error: false,
            router: props.router // used to have useRouter property
        }
    }

    componentDidMount() {
        let userStorage = ls.get('user')
        if (userStorage) {
            this.setState({ user: JSON.parse(userStorage) })
        }
    }

    login = async (email, password) => {
        try {
            const response = await sendRequest('/users/login', 'POST', { email, password })

            if (response.error) throw response.error

            if (response.data) this.setState({ user: response.data, error: false })

            ls.set('user', JSON.stringify(response.data));

            return true;

        } catch (error) {
            this.setState({ error })
            return false;
        }
    }

    logout = async () => {
        await sendRequest('/users/logout', 'POST', undefined)
        this.setState({ user: { name: null, permission: null } })
        ls.remove('user');

        this.state.router.push('/')
    }

    render() {
        const { user, error } = this.state
        return this.props.children({ user, error, login: this.login, logout: this.logout });
    }
}

