const API_BASE_URL = "http://localhost:5000/api";

export const api = {
  // ==================== Products ====================
  getProducts: async () => {
    const res = await fetch(`${API_BASE_URL}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  },

  getProductById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error("Product not found");
    return await res.json();
  },

  // ==================== Auth ====================
  register: async (name, email, password) => {
    const res = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) throw new Error("Registration failed");
    return await res.json();
  },

  login: async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Invalid credentials");
    return await res.json();
  },

  // ==================== Orders ====================
  getOrders: async (token) => {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` }, // if protected route
    });
    if (!res.ok) throw new Error("Failed to fetch orders");
    return await res.json();
  },

  createOrder: async (orderData, token) => {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // if protected
      },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) throw new Error("Failed to create order");
    return await res.json();
  },
};
