export const getTrips = () => {
    return fetch("http://localhost:8000/trips", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}

export const createTrip = (trip) => {
    return fetch("http://localhost:8000/trips", {
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

export const addTripDestination = (tripDestination) => {
    return fetch("http://localhost:8000/trip_destinations", {
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

export const addTripExperience = (tripExperience) => {
    return fetch("http://localhost:8000/trip_experiences", {
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

export const deleteTripExperience = (id) => {
    return fetch(`http://localhost:8000/trip_experiences/${id}`, {
        method: "DELETE",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}