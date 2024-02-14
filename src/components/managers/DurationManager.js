export const getDurations = () => {
    return fetch("https://trouvaille-server.vercel.app/durations", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}