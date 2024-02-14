export const getExperience = (id) => {
    return fetch(`http://127.0.0.1:8000experiences/${id}`)
        .then(response => response.json())
}

export const getExperiences = () => {
    return fetch(`http://127.0.0.1:8000experiences`)
        .then(response => response.json())
}

export const createExperience = (experience) => {
    return fetch("http://127.0.0.1:8000experiences", {
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
    return fetch(`http://127.0.0.1:8000experiences/${experience.id}`, {
        method: "PUT",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(experience)
     })
}