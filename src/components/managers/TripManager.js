import { Token } from "./TokenManager"

export const getTrip = (tripId) => {
    return fetch(`http://127.0.0.1:8000/trips/${tripId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}

export const getTrips = () => {
    return fetch("http://127.0.0.1:8000/trips", {
        headers:{
            "Authorization": Token()
        }
     })
        .then(response => response.json())
}

export const getMyTrips = () => {
    return fetch("http://127.0.0.1:8000/trips?status=created", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}

export const createTrip = (trip) => {
    return fetch("http://127.0.0.1:8000/trips", {
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
    return fetch(`http://127.0.0.1:8000/trips/${trip.id}`, {
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
    return fetch(`http://127.0.0.1:8000/trips/${id}`, {
        method: "DELETE",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}
