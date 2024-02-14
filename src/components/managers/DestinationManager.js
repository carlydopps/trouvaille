export const getDestination = (id) => {
    return fetch(`http://127.0.0.1:8000/destinations/${id}`)
        .then(response => response.json())
}

export const getDestinations = () => {
    return fetch("http://127.0.0.1:8000/destinations")
        .then(response => response.json())
}

export const createDestination = (destination) => {
    return fetch("http://127.0.0.1:8000/destinations", {
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
    return fetch(`http://127.0.0.1:8000/destinations/${destination.id}`, {
        method: "PUT",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(destination)
     })
}