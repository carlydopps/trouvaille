import { apiUrl } from "../../config"

export const addTripExperience = (tripExperience) => {
    return fetch(`${apiUrl}/trip_experiences`, {
        method: "POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(tripExperience)
     })
        .then(response => response.json())
}

export const deleteTripExperience = (tripId, experienceId) => {
    return fetch(`${apiUrl}/trips/${tripId}/remove_experience?experience=${experienceId}`, {
        method: "DELETE",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}