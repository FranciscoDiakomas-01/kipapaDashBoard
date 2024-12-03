export async function getAllOrders(page=1 , limit=10 , status = 1) {
    const token = localStorage.getItem("token");
    try {
      const API = await fetch(
        `https://kipapa-backend.onrender.com/ordersbystatus/${status}?page=${page}&limit=${limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
      const response = await API.json();
        if (response?.data?.length > 0) {
        return response
      } else {
        return false;
      }
    } catch (error) {
      return error;
    }
}

export async function getOrderByID(id) {
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(`https://kipapa-backend.onrender.com/ordersbyclient/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    const response = await API.json();
    if (response?.data?.length > 0) {
      return response?.data;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}


export async function UpdateOrderStatus(id , status = 1) {
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(`https://kipapa-backend.onrender.com/order/${id}/${status}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
        },
        method : 'PUT'
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

export async function UpdateOrderDelivery(id, userId) {
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(`https://kipapa-backend.onrender.com/orderUser/${id}/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      method: "PUT",
    });
      const response = await API.json();
      console.log(response)
    if (response?.data == "updated") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}

export async function getLatestOrders() {
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(`https://kipapa-backend.onrender.com/order`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    const response = await API.json();
    if (response?.data?.length > 0) {
      return response?.data;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}