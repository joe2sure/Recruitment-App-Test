// Use import.meta.env for Vite, or fallback to window._env_ for CRA custom env injection, or just use the default
const API_BASE_URL =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_URL) ||
  window.REACT_APP_API_URL ||
  "/api";

class PaymentApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Client endpoints
  async getClients(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/clients?${queryString}`);
  }

  async getClient(clientId) {
    return this.request(`/clients/${clientId}`);
  }

  async createClient(clientData) {
    return this.request("/clients", {
      method: "POST",
      body: JSON.stringify(clientData),
    });
  }

  async updateClient(clientId, clientData) {
    return this.request(`/clients/${clientId}`, {
      method: "PUT",
      body: JSON.stringify(clientData),
    });
  }

  async deleteClient(clientId) {
    return this.request(`/clients/${clientId}`, {
      method: "DELETE",
    });
  }

  // Invoice endpoints
  async getInvoices(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/invoices?${queryString}`);
  }

  async getInvoice(invoiceId) {
    return this.request(`/invoices/${invoiceId}`);
  }

  async createInvoice(invoiceData) {
    return this.request("/invoices", {
      method: "POST",
      body: JSON.stringify(invoiceData),
    });
  }

  async updateInvoice(invoiceId, invoiceData) {
    return this.request(`/invoices/${invoiceId}`, {
      method: "PUT",
      body: JSON.stringify(invoiceData),
    });
  }

  async updateInvoiceStatus(invoiceId, status) {
    return this.request(`/invoices/${invoiceId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  }

  async deleteInvoice(invoiceId) {
    return this.request(`/invoices/${invoiceId}`, {
      method: "DELETE",
    });
  }

  async sendInvoice(invoiceId) {
    return this.request(`/invoices/${invoiceId}/send`, {
      method: "POST",
    });
  }

  // Payment statistics
  async getPaymentStats() {
    return this.request("/payment-stats");
  }

  // Bulk operations
  async bulkUpdateInvoices(invoiceIds, updates) {
    return this.request("/invoices/bulk-update", {
      method: "PATCH",
      body: JSON.stringify({ invoiceIds, updates }),
    });
  }

  async bulkDeleteInvoices(invoiceIds) {
    return this.request("/invoices/bulk-delete", {
      method: "DELETE",
      body: JSON.stringify({ invoiceIds }),
    });
  }

  // Export functionality
  async exportClients(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(
      `${API_BASE_URL}/clients/export?${queryString}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Export failed");
    }

    return response.blob();
  }

  async exportInvoices(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(
      `${API_BASE_URL}/invoices/export?${queryString}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Export failed");
    }

    return response.blob();
  }
}

export const paymentApi = new PaymentApiService();
