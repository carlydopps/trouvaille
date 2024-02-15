import { apiUrl } from "../../config"

export const getDurations = () => {
    return fetch(`${apiUrl}/durations`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}