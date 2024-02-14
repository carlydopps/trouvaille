export const getSeasons = () => {
    return fetch("http://127.0.0.1:8000seasons", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}