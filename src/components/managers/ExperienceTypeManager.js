export const getExperienceTypes = () => {
    return fetch("https://trouvaille-server.vercel.app/experience_types", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}