import { Token } from "./TokenManager"

export const getTraveler = (id) => {
    return fetch(`http://localhost:8000/travelers/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}

export const getAuthTraveler = () => {
    return fetch("http://localhost:8000/travelers/auth", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}

export const getTravelers = () => {
    return fetch("http://localhost:8000/travelers", {
        headers:{
            "Authorization": Token()
        }
     })
        .then(response => response.json())
}

export const saveTraveler = traveler => {
    return fetch(`http://localhost:8000/travelers/${traveler.id}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(traveler)
    })
}