export const createFavorite = (favoriteTrip) => {
    return fetch("http://127.0.0.1:8000favorite_trips", {
        method: "POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(favoriteTrip)
     })
        .then(response => response.json())
}

export const deleteFavorite = (tripId) => {
    return fetch(`http://127.0.0.1:8000favorite_trips/0/unfavorite?trip=${tripId}`, {
        method: "DELETE",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}