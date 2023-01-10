export const postComment = (comment) => {
    return fetch("http://localhost:8000/comments", {
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