export const getDestinations = () => {
    return fetch("http://localhost:8000/destinations", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}