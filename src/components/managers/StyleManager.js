export const getStyles = () => {
    return fetch("http://127.0.0.1:8000styles", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}