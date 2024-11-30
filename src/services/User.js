export async function getById(id) {
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(`http://localhost:8080/foodcategorys?id=${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    const response = await API.json();
    if (Array.isArray(response?.data)) {
      return response?.data[0];
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}
export async function getAllUsers(page = 1, limit = 10) {
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(
      `http://localhost:8080/users?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    const response = await API.json();
    if (response?.data?.length > 0) {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}
export async function deleteUserById(id) {
  const token = localStorage.getItem("token");
  try {
    if (isNaN(id)) {
      return false;
    }
    const API = await fetch(`http://localhost:8080/user/${id}`, {
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

export async function createUser(user) {
  const token = localStorage.getItem("token");
  try {
    if (!user) {
      return false;
    }
    const API = await fetch(`http://localhost:8080/user`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      method: "POST",
      body: JSON.stringify(user),
    });
    const response = await API.json();
    if (!isNaN(response?.data)) {
      return true;
    } else {
      console.log(response)
      return false;
    }
  } catch (error) {
    return error;
  }
}

export async function update(category) {
  const token = localStorage.getItem("token");
  try {
    if (!category) {
      return false;
    }
    const id = sessionStorage.getItem("cid");
    const API = await fetch(`http://localhost:8080/foodcategory/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      method: "PUT",
      body: JSON.stringify(category),
    });
    const response = await API.json();
    if (response?.data == "updated") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}



export async function getAllUserrByCategory( id) {
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(`http://localhost:8080/userdisponilbe/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    const response = await API.json();
    return response;
  } catch (error) {
    return error;
  }
}