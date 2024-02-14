export const getDurations = () => {
    return fetch("http://127.0.0.1:8000/durations", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}