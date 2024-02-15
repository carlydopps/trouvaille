import { apiUrl } from "../../config"

export const getSeasons = () => {
    return fetch(`${apiUrl}/seasons`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}