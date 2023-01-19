
export default async function sendRequest(url, method, data) {
    try {
        let request = await fetch('http://localhost:3001' + url, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                // Cookie: 
                // 'connect.sid=s%3Aa1j-RfljmgEhsNQK1MyjxVkuGrQiULrj.L2GILwmQTTHvJfI68%2FNrkC4DNdYHPfYxSI91kpJxiE4; Path=/; Expires=Wed, 18 Jan 2023 16:19:02 GMT; HttpOnly',
            },
            credentials: 'include',
        })

        return await request.json()

    } catch (err) {
        console.log('sendRequest', err)
    }
}

