import { apiUrl } from "../../config"

export const getExperienceTypes = () => {
    return fetch(`${apiUrl}/experience_types`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}