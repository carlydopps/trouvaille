import { apiUrl } from "../../config"
import { Token } from "./TokenManager"

export const getTrip = (tripId) => {
    return fetch(`${apiUrl}/trips/${tripId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}

export const getTrips = () => {
    return fetch(`${apiUrl}/trips`, {
        headers:{
            "Authorization": Token()
        }
     })
        .then(response => response.json())
}

export const getMyTrips = () => {
    return fetch(`${apiUrl}/trips?status=created`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}

export const createTrip = (trip) => {
    return fetch(`${apiUrl}/trips`, {
        method: "POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(trip)
     })
        .then(response => response.json())
}

export const saveTrip = (trip) => {
    return fetch(`${apiUrl}/trips/${trip.id}`, {
        method: "PUT",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(trip)
     })
}

export const deleteTrip = (id) => {
    return fetch(`${apiUrl}/trips/${id}`, {
        method: "DELETE",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}
