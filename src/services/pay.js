export async function getPayFormById(id) {
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(`http://localhost:8080/payform?id=${id}`, {
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
export async function getAllPayForm() {
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(`http://localhost:8080/payform`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
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
export async function deletePayForm(id) {
  const token = localStorage.getItem("token");
  try {
    if (isNaN(id)) {
      return false;
    }
    const API = await fetch(`http://localhost:8080/payform/${id}`, {
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

export async function createPayForm(pay) {
  const token = localStorage.getItem("token");
  try {
    if (!pay) {
      return false;
    }
    const API = await fetch(`http://localhost:8080/payform`, {
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(pay),
    });
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

export async function updatePayForm(pay, id) {
  const token = localStorage.getItem("token");
  try {
    if (!pay || !id) {
      return false;
    }
    const API = await fetch(`http://localhost:8080/payform/${id}`, {
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(pay),
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
