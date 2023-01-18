import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import sendRequest from "../../../lib/requests"

export const authOptions = (req, res) => {
    return {
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
                    try {


                        // const response = await sendRequest('/users/login', 'POST', credentials)

                        let request = await fetch('http://localhost:3001/users/login', {
                            method: 'POST',
                            body: JSON.stringify(credentials),
                            headers: {
                                "Content-Type": "application/json",
                                // Cookie: 'connect.sid=s%3Aa1j-RfljmgEhsNQK1MyjxVkuGrQiULrj.L2GILwmQTTHvJfI68%2FNrkC4DNdYHPfYxSI91kpJxiE4; Path=/; Expires=Wed, 18 Jan 2023 16:19:02 GMT; HttpOnly'
                            },
                            credentials: 'include',
                        })

                        let response = await request.json()

                        const cookies = request.headers['set-cookie']
                        console.log('cookies', cookies)
                        res.setHeader('Set-Cookie', cookies)


                        if (response.error) {
                            return null
                        } else {
                            return response.data
                        }
                    } catch (err) {
                        console.log('err', err)
                    };
                }
            })
            // ...add more providers here
        ],

        callbacks: {
            jwt: async ({ token, user }) => {
                if (user) {
                    token.data = user
                }

                // console.log("server", await sendRequest('/companies', 'GET'))
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
}
export default (req, res) => NextAuth(req, res, authOptions(req, res))