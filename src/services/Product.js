

export async function getAllProduct(page = 1, limit = 10) {
    const token = localStorage.getItem("token");
     try {
       const API = await fetch(
         `http://localhost:8080/product?page=${page}&limit=${limit}`,
         {
           headers: {
             "Content-Type": "application/json",
             authorization: token,
           },
         }
       );
       const response = await API.json();
       return response
     } catch (error) {
       return error;
     }
}


export async function getProductById() {
  const id = sessionStorage.getItem("pid")
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(
      `http://localhost:8080/product?id=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    const response = await API.json();
    return response?.data[0];
  } catch (error) {
    return error;
  }
}

export async function getAllProductByCategory(page = 1, limit = 10 , id) {
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(
      `http://localhost:8080/productbyCategory/${id}?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    const response = await API.json();
    return response;
  } catch (error) {
    return error;
  }
}

export async function UpdateProduct( body) {
  const id = sessionStorage.getItem("pid");
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(`http://localhost:8080/product/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        method: 'PUT',
        body : JSON.stringify(body)
      }
    );
    const response = await API.json();
    return response;
  } catch (error) {
    return error;
  }
}



export async function deleteProductById() {
  const id = sessionStorage.getItem("pid");
  const token = localStorage.getItem("token");
  try {
    const API = await fetch(`http://localhost:8080/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      method: "DELETE",
    });
    const response = await API.json();
    if (response?.data == "deleted") {
      return true
    } else {
      return false
    }
  } catch (error) {
    return error;
  }
}




export async function createProduct(product) {
  const token = localStorage.getItem("token");
  try {
    if (!product) {
      return false;
    }
    const API = await fetch(`http://localhost:8080/product`, {
      headers: {
        authorization: token,
      },
      method: "POST",
      body: product,
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