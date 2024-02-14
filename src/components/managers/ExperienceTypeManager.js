export const getExperienceTypes = () => {
    return fetch("http://127.0.0.1:8000experience_types", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}