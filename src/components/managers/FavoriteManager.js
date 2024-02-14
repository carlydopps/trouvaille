export const createFavorite = (favoriteTrip) => {
    return fetch("https://trouvaille-server.vercel.app/favorite_trips", {
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
    return fetch(`https://trouvaille-server.vercel.app/favorite_trips/0/unfavorite?trip=${tripId}`, {
        method: "DELETE",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}