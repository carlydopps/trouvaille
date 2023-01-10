export const Token = () => {
    if (localStorage.getItem("auth_token")) {
        return `Token ${localStorage.getItem("auth_token")}`
    } else {
        return ""
    }
}