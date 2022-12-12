export const getTrips = () => {
    return fetch("http://localhost:8000/trips", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}