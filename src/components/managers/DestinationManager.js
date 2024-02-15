import { apiUrl } from "../../config"

export const getDestination = (id) => {
    return fetch(`${apiUrl}/destinations/${id}`)
        .then(response => response.json())
}

export const getDestinations = () => {
    return fetch(`${apiUrl}/destinations`)
        .then(response => response.json())
}

export const createDestination = (destination) => {
    return fetch(`${apiUrl}/destinations`, {
        method: "POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(destination)
     })
        .then(response => response.json())
}

export const saveDestination = (destination) => {
    return fetch(`${apiUrl}/destinations/${destination.id}`, {
        method: "PUT",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(destination)
     })
}