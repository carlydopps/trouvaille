export const getExperience = (id) => {
    return fetch(`http://localhost:8000/experiences/${id}`)
        .then(response => response.json())
}

export const getExperiences = () => {
    return fetch(`http://localhost:8000/experiences`)
        .then(response => response.json())
}

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


export const saveExperience = (experience) => {
    return fetch(`http://localhost:8000/experiences/${experience.id}`, {
        method: "PUT",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(experience)
     })
}