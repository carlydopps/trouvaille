export const getStyles = () => {
    return fetch("https://trouvaille-server.vercel.app/styles", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}