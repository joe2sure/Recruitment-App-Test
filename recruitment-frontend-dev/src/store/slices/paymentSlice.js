import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { paymentApi } from "@/services/paymentApi";

// Async thunks for API calls
export const fetchClients = createAsyncThunk(
  "payment/fetchClients",
  async (params = {}, { rejectWithValue }) => {
    try {
      return await paymentApi.getClients(params);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchInvoices = createAsyncThunk(
  "payment/fetchInvoices",
  async (params = {}, { rejectWithValue }) => {
    try {
      return await paymentApi.getInvoices(params);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPaymentStats = createAsyncThunk(
  "payment/fetchPaymentStats",
  async (_, { rejectWithValue }) => {
    try {
      return await paymentApi.getPaymentStats();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateInvoiceStatus = createAsyncThunk(
  "payment/updateInvoiceStatus",
  async ({ invoiceId, status }, { rejectWithValue }) => {
    try {
      return await paymentApi.updateInvoiceStatus(invoiceId, status);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteInvoice = createAsyncThunk(
  "payment/deleteInvoice",
  async (invoiceId, { rejectWithValue }) => {
    try {
      await paymentApi.deleteInvoice(invoiceId);
      return invoiceId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createInvoice = createAsyncThunk(
  "payment/createInvoice",
  async (invoiceData, { rejectWithValue }) => {
    try {
      return await paymentApi.createInvoice(invoiceData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendInvoice = createAsyncThunk(
  "payment/sendInvoice",
  async (invoiceId, { rejectWithValue }) => {
    try {
      return await paymentApi.sendInvoice(invoiceId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const bulkUpdateInvoices = createAsyncThunk(
  "payment/bulkUpdateInvoices",
  async ({ invoiceIds, updates }, { rejectWithValue }) => {
    try {
      return await paymentApi.bulkUpdateInvoices(invoiceIds, updates);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const exportData = createAsyncThunk(
  "payment/exportData",
  async ({ type, params }, { rejectWithValue }) => {
    try {
      const blob =
        type === "clients"
          ? await paymentApi.exportClients(params)
          : await paymentApi.exportInvoices(params);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${type}-export-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  clients: {
    data: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
  },
  invoices: {
    data: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
  },
  stats: {
    data: {
      paid: { count: 0, value: 0 },
      unpaid: { count: 0, value: 0 },
      overdue: { count: 0, value: 0 },
      draft: { count: 0, value: 0 },
    },
    loading: false,
    error: null,
  },
  filters: {
    status: "all",
    type: "all",
    department: "all",
    location: "all",
    sortBy: "newest",
    search: "",
    page: 1,
  },
  selectedClients: [],
  selectedInvoices: [],
  ui: {
    isExporting: false,
    lastUpdated: null,
  },
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      // Reset page when filters change (except when explicitly setting page)
      if (!action.payload.page) {
        state.filters.page = 1;
      }
    },
    setSelectedClients: (state, action) => {
      state.selectedClients = action.payload;
    },
    setSelectedInvoices: (state, action) => {
      state.selectedInvoices = action.payload;
    },
    toggleClientSelection: (state, action) => {
      const clientId = action.payload;
      const index = state.selectedClients.indexOf(clientId);
      if (index > -1) {
        state.selectedClients.splice(index, 1);
      } else {
        state.selectedClients.push(clientId);
      }
    },
    toggleInvoiceSelection: (state, action) => {
      const invoiceId = action.payload;
      const index = state.selectedInvoices.indexOf(invoiceId);
      if (index > -1) {
        state.selectedInvoices.splice(index, 1);
      } else {
        state.selectedInvoices.push(invoiceId);
      }
    },
    selectAllClients: (state) => {
      state.selectedClients = state.clients.data.map((client) => client.id);
    },
    selectAllInvoices: (state) => {
      state.selectedInvoices = state.invoices.data.map((invoice) => invoice.id);
    },
    clearSelections: (state) => {
      state.selectedClients = [];
      state.selectedInvoices = [];
    },
    clearErrors: (state) => {
      state.clients.error = null;
      state.invoices.error = null;
      state.stats.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Clients
      .addCase(fetchClients.pending, (state) => {
        state.clients.loading = true;
        state.clients.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.clients.loading = false;

        state.clients.data = action.payload.data || [];
        state.clients.pagination =
          action.payload.pagination || state.clients.pagination;
        state.ui.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.clients.loading = false;
        state.clients.error = action.payload;
      })
      // Fetch Invoices
      .addCase(fetchInvoices.pending, (state) => {
        state.invoices.loading = true;
        state.invoices.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.invoices.loading = false;

        state.invoices.data = action.payload.data || [];
        state.invoices.pagination =
          action.payload.pagination || state.invoices.pagination;
        state.ui.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.invoices.loading = false;
        state.invoices.error = action.payload;
      })
      // Fetch Payment Stats
      .addCase(fetchPaymentStats.pending, (state) => {
        state.stats.loading = true;
        state.stats.error = null;
      })
      .addCase(fetchPaymentStats.fulfilled, (state, action) => {
        state.stats.loading = false;
        state.stats.data = action.payload;
      })
      .addCase(fetchPaymentStats.rejected, (state, action) => {
        state.stats.loading = false;
        state.stats.error = action.payload;
      })
      // Create Invoice
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.invoices.data.unshift(action.payload);
        state.invoices.pagination.total += 1;
      })
      // Update Invoice Status
      .addCase(updateInvoiceStatus.fulfilled, (state, action) => {
        const updatedInvoice = action.payload;
        const index = state.invoices.data.findIndex(
          (invoice) => invoice.id === updatedInvoice.id
        );
        if (index > -1) {
          state.invoices.data[index] = updatedInvoice;
        }
      })
      // Delete Invoice
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        const invoiceId = action.payload;
        state.invoices.data = state.invoices.data.filter(
          (invoice) => invoice.id !== invoiceId
        );
        state.selectedInvoices = state.selectedInvoices.filter(
          (id) => id !== invoiceId
        );
        state.invoices.pagination.total = Math.max(
          0,
          state.invoices.pagination.total - 1
        );
      })
      // Send Invoice
      .addCase(sendInvoice.fulfilled, (state, action) => {
        const updatedInvoice = action.payload;
        const index = state.invoices.data.findIndex(
          (invoice) => invoice.id === updatedInvoice.id
        );
        if (index > -1) {
          state.invoices.data[index] = updatedInvoice;
        }
      })
      // Bulk Update Invoices
      .addCase(bulkUpdateInvoices.fulfilled, (state, action) => {
        const updatedInvoices = action.payload;
        updatedInvoices.forEach((updatedInvoice) => {
          const index = state.invoices.data.findIndex(
            (invoice) => invoice.id === updatedInvoice.id
          );
          if (index > -1) {
            state.invoices.data[index] = updatedInvoice;
          }
        });
      })
      // Export Data
      .addCase(exportData.pending, (state) => {
        state.ui.isExporting = true;
      })
      .addCase(exportData.fulfilled, (state) => {
        state.ui.isExporting = false;
      })
      .addCase(exportData.rejected, (state) => {
        state.ui.isExporting = false;
      });
  },
});

export const {
  setFilters,
  setSelectedClients,
  setSelectedInvoices,
  toggleClientSelection,
  toggleInvoiceSelection,
  selectAllClients,
  selectAllInvoices,
  clearSelections,
  clearErrors,
} = paymentSlice.actions;

export default paymentSlice.reducer;
