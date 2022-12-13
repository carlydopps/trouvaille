export const getStyles = () => {
    return fetch("http://localhost:8000/styles", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}