export async function getAdminData() {
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(`https://kipapa-backend.onrender.com/admin`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    const response = await API.json();
    if (response?.data?.length > 0) {
      return response?.data[0];
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}

export async function getDashBoard() {
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(`https://kipapa-backend.onrender.com/dashBoard`, {
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

export async function updateAdmin(admin) {
  const token = localStorage.getItem("token");
  try {
    if (!admin) {
      return false;
    }
    const API = await fetch(`https://kipapa-backend.onrender.com/admin`, {
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(admin),
    });
    const response = await API.json();
    if (response?.msg == "updated") {
      return true;
    } else if (response?.msg == "wrong password") {
      return response?.msg;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}