export const createImage = (image) => {
    return fetch("http://localhost:8000/images", {
        method: "POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(image)
     })
        .then(response => response.json())
}