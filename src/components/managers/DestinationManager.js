export const getDestinations = () => {
    return fetch("http://localhost:8000/destinations", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}

export const createDestination = (destination) => {
    return fetch("http://localhost:8000/destinations", {
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