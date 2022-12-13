export const getDurations = () => {
    return fetch("http://localhost:8000/durations", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}