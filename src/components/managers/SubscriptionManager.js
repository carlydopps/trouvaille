export const createSubscription = (subscription) => {
    return fetch("http://localhost:8000/subscriptions", {
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
    return fetch(`http://localhost:8000/subscriptions/0/unsubscribe?traveler=${travelerId}`, {
        method: "DELETE",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}