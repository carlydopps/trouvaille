export const getExperienceTypes = () => {
    return fetch("http://localhost:8000/experience_types", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
     })
        .then(response => response.json())
}