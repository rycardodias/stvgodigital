
export default async function sendRequest(url, method, data) {
    try {
        let request = await fetch('http://localhost:3001' + url, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
        })

        if (!request.ok) {
            throw request
        }

        return await request.json()

    } catch (err) {
        return {error: err}
    }
}

