export const apiUrl = process.env.REACT_APP_API_URL === 'prod'
    ? 'https://trouvaille-server.vercel.app'
    : 'http://localhost:8000'