import { apiUrl } from "../../config"

export const getExperience = (id) => {
    return fetch(`${apiUrl}/experiences/${id}`)
        .then(response => response.json())
}

export const getExperiences = () => {
    return fetch(`${apiUrl}/experiences`)
        .then(response => response.json())
}

export const createExperience = (experience) => {
    return fetch(`${apiUrl}/experiences`, {
        method: "POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(experience)
     })
        .then(response => response.json())
}


export const saveExperience = (experience) => {
    return fetch(`${apiUrl}/experiences/${experience.id}`, {
        method: "PUT",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(experience)
     })
}