export const getExperience = (id) => {
    return fetch(`https://trouvaille-server.vercel.app/experiences/${id}`)
        .then(response => response.json())
}

export const getExperiences = () => {
    return fetch(`https://trouvaille-server.vercel.app/experiences`)
        .then(response => response.json())
}

export const createExperience = (experience) => {
    return fetch("https://trouvaille-server.vercel.app/experiences", {
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
    return fetch(`https://trouvaille-server.vercel.app/experiences/${experience.id}`, {
        method: "PUT",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(experience)
     })
}