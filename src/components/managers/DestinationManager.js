export const getDestination = (id) => {
    return fetch(`https://trouvaille-server.vercel.app/destinations/${id}`)
        .then(response => response.json())
}

export const getDestinations = () => {
    return fetch("https://trouvaille-server.vercel.app/destinations")
        .then(response => response.json())
}

export const createDestination = (destination) => {
    return fetch("https://trouvaille-server.vercel.app/destinations", {
        method: "POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(destination)
     })
        .then(response => response.json())
}

export const saveDestination = (destination) => {
    return fetch(`https://trouvaille-server.vercel.app/destinations/${destination.id}`, {
        method: "PUT",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(destination)
     })
}