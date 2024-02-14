export const getSeasons = () => {
    return fetch("https://trouvaille-server.vercel.app/seasons", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}