import { apiUrl } from "../../config"

export const createSubscription = (subscription) => {
    return fetch(`${apiUrl}/subscriptions`, {
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
    return fetch(`${apiUrl}/subscriptions/0/unfollow?traveler=${travelerId}`, {
        method: "DELETE",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}