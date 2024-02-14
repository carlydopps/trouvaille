export const createSubscription = (subscription) => {
    return fetch("http://127.0.0.1:8000subscriptions", {
        method: "POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(subscription)
     })
        .then(response => response.json())
}

export const deleteSubscription = (travelerId) => {
    return fetch(`http://127.0.0.1:8000subscriptions/0/unfollow?traveler=${travelerId}`, {
        method: "DELETE",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}