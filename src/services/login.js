export default async function login(userData) {
    try {
        const API = await fetch(
          "https://kipapa-backend.onrender.com/adminlogin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );
        const response = await API.json()
        if (response?.token && response?.login == "sucess") {
            localStorage.setItem('token', response?.token)
            return true
        } else {
            localStorage.clear()
            sessionStorage.clear()
            return false
        }
    } catch (error) {
        return error
    }
}
