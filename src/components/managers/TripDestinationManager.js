export const addTripDestination = (tripDestination) => {
    return fetch("http://127.0.0.1:8000trip_destinations", {
        method: "POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(tripDestination)
     })
        .then(response => response.json())
}

export const deleteTripDestination = (tripId, destinationId) => {
    return fetch(`http://127.0.0.1:8000trips/${tripId}/remove_destination?destination=${destinationId}`, {
        method: "DELETE",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}