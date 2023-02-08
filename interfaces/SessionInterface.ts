export default interface SessionInterface {
    session: {
        user: {
            name: string,
            permission: string
        },
        error: any,
        login: any,
        logout: any
    }
}