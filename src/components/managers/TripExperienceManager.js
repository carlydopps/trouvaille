export const addTripExperience = (tripExperience) => {
    return fetch("http://127.0.0.1:8000trip_experiences", {
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
    return fetch(`http://127.0.0.1:8000trips/${tripId}/remove_experience?experience=${experienceId}`, {
        method: "DELETE",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}