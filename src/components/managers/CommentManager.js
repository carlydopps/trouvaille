export const postComment = (comment) => {
    return fetch("http://127.0.0.1:8000comments", {
        method: "POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(comment)
     })
        .then(response => response.json())
}