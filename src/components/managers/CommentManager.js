import { apiUrl } from "../../config"

export const postComment = (comment) => {
    return fetch(`${apiUrl}/comments`, {
        method: "POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(comment)
     })
        .then(response => response.json())
}