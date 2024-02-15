import { apiUrl } from "../../config"

export const createImage = (image) => {
    return fetch(`${apiUrl}/images`, {
        method: "POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(image)
     })
        .then(response => response.json())
}