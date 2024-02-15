import { apiUrl } from "../../config"

export const getStyles = () => {
    return fetch(`${apiUrl}/styles`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}