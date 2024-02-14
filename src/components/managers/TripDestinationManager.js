export const addTripDestination = (tripDestination) => {
    return fetch("https://trouvaille-server.vercel.app/trip_destinations", {
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
    return fetch(`https://trouvaille-server.vercel.app/trips/${tripId}/remove_destination?destination=${destinationId}`, {
        method: "DELETE",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}