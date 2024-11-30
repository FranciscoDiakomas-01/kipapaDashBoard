export async function getAllClient(page = 1, limit = 10) {
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(
      `http://localhost:8080/clients?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
      const response = await API.json();
      console.log(response)
    if (response?.data?.length > 0) {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}
export async function deleteClientById(id) {
  const token = localStorage.getItem("token");
  try {
    if (isNaN(id)) {
      return false;
    }
    const API = await fetch(`http://localhost:8080/client/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      method: "DELETE",
    });
    const response = await API.json();
    if (response?.data == "not found") {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return error;
  }
}


export async function getClientById(id) {
  const token = localStorage.getItem("token");
  try {
    if (isNaN(id)) {
      return false;
    }
    const API = await fetch(`http://localhost:8080/client/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    const response = await API.json();
    return response?.data[0]
  } catch (error) {
    return error;
  }
}