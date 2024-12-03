export async function getByIdCategoryUserById(id) {
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(
      `https://kipapa-backend.onrender.com/categoryUser?id=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
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
export async function getAllUsercategory() {
  const token = localStorage.getItem("token");
    try {
      const API = await fetch(
        `https://kipapa-backend.onrender.com/categoryUser`,
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
export async function deleteUserCategoryById(id) {
const token = localStorage.getItem("token");
  try {
      if (isNaN(id)) {
        return false;
      }
      const API = await fetch(
        `https://kipapa-backend.onrender.com/departament/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          method: "DELETE",
        }
      );
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

export async function createCategoryUser(categoryuser) {
  const token = localStorage.getItem("token");
  try {
    if (!categoryuser) {
      return false;
    }
    const API = await fetch(
      `https://kipapa-backend.onrender.com/categoryUser`,
      {
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(categoryuser),
      }
    );
    const response = await API.json();
    if (response?.data == "created") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}

export async function updateCategoryUser(category) {
  const token = localStorage.getItem("token");
  try {
    if (!category) {
      return false;
    }
    const id = sessionStorage.getItem("ucid");
    const API = await fetch(
      `https://kipapa-backend.onrender.com/departament/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        method: "PUT",
        body: JSON.stringify(category),
      }
    );
    const response = await API.json();
    if (response?.data == "updated") {
      return true
    } else {
      return false
    }
  } catch (error) {
    return error;
  }
}
