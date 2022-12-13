export const getSeasons = () => {
    return fetch("http://localhost:8000/seasons", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}