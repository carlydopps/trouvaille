export const createExperience = (experience) => {
    return fetch("http://localhost:8000/experiences", {
        method: "POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(experience)
     })
        .then(response => response.json())
}