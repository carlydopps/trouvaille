import { apiUrl } from "../../config"
import { Token } from "./TokenManager"

export const getTraveler = (id) => {
    return fetch(`${apiUrl}/travelers/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}

export const getAuthTraveler = () => {
    return fetch(`${apiUrl}/travelers/auth`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}

export const getTravelers = () => {
    return fetch(`${apiUrl}/travelers`, {
        headers:{
            "Authorization": Token()
        }
     })
        .then(response => response.json())
}

export const saveTraveler = traveler => {
    return fetch(`${apiUrl}/travelers/${traveler.id}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(traveler)
    })
}