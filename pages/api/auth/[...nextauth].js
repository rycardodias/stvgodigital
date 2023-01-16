import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions = {
    // Configure one or more authentication providers
    secret: process.env.JWT_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "example@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log(req)
                const response = await fetch('http://localhost:3001/users/login', {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-Type": "application/json",
                        // "credentials": "same-origin"
                    },
                })

                const data = await response.json();

                // console.log(response.headers, response.session)

                // const response2 = await fetch('http://localhost:3001/companies', {
                //     method: "GET",
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                // })

                // const data2 = await response2.json();

                // console.log('data2', data2)

                if (data.error) {
                    return null
                } else {
                    // Any object returned will be saved in `user` property of the JWT

                    return data.data
                }
            }
        })
        // ...add more providers here
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                console.log('user', user)
                token.data = user
            }

            console.log('token', token)
            return token
        },
        session: async ({ session, token }) => {

            if (token.data) {
                session.user = token.data
            }

            return session
        },
    }
}
export default NextAuth(authOptions)