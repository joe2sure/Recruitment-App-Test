import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClients,
  fetchInvoices,
  fetchPaymentStats,
  updateInvoiceStatus,
  deleteInvoice,
  createInvoice,
  sendInvoice,
  bulkUpdateInvoices,
  exportData,
  setFilters,
  toggleClientSelection,
  toggleInvoiceSelection,
  selectAllClients,
  selectAllInvoices,
  clearSelections,
  clearErrors,
} from "@/store/slices/paymentSlice";

export const usePayments = () => {
  const dispatch = useDispatch();
  const paymentState = useSelector((state) => state.payment);

  const actions = {
    // Data fetching
    fetchClients: useCallback(
      (params) => dispatch(fetchClients(params)),
      [dispatch]
    ),
    fetchInvoices: useCallback(
      (params) => dispatch(fetchInvoices(params)),
      [dispatch]
    ),
    fetchStats: useCallback(() => dispatch(fetchPaymentStats()), [dispatch]),

    // Invoice operations
    createInvoice: useCallback(
      (data) => dispatch(createInvoice(data)),
      [dispatch]
    ),
    updateInvoiceStatus: useCallback(
      (invoiceId, status) =>
        dispatch(updateInvoiceStatus({ invoiceId, status })),
      [dispatch]
    ),
    deleteInvoice: useCallback(
      (invoiceId) => dispatch(deleteInvoice(invoiceId)),
      [dispatch]
    ),
    sendInvoice: useCallback(
      (invoiceId) => dispatch(sendInvoice(invoiceId)),
      [dispatch]
    ),

    // Bulk operations
    bulkUpdateInvoices: useCallback(
      (invoiceIds, updates) =>
        dispatch(bulkUpdateInvoices({ invoiceIds, updates })),
      [dispatch]
    ),

    // Export
    exportClients: useCallback(
      (params) => dispatch(exportData({ type: "clients", params })),
      [dispatch]
    ),
    exportInvoices: useCallback(
      (params) => dispatch(exportData({ type: "invoices", params })),
      [dispatch]
    ),

    // Filters and selections
    setFilters: useCallback(
      (filters) => dispatch(setFilters(filters)),
      [dispatch]
    ),
    toggleClientSelection: useCallback(
      (clientId) => dispatch(toggleClientSelection(clientId)),
      [dispatch]
    ),
    toggleInvoiceSelection: useCallback(
      (invoiceId) => dispatch(toggleInvoiceSelection(invoiceId)),
      [dispatch]
    ),
    selectAllClients: useCallback(
      () => dispatch(selectAllClients()),
      [dispatch]
    ),
    selectAllInvoices: useCallback(
      () => dispatch(selectAllInvoices()),
      [dispatch]
    ),
    clearSelections: useCallback(() => dispatch(clearSelections()), [dispatch]),
    clearErrors: useCallback(() => dispatch(clearErrors()), [dispatch]),

    // Refresh data
    refreshData: useCallback(
      async (filters) => {
        await Promise.all([
          dispatch(fetchClients(filters)),
          dispatch(fetchInvoices(filters)),
          dispatch(fetchPaymentStats()),
        ]);
      },
      [dispatch]
    ),
  };

  return {
    ...paymentState,
    actions,
  };
};
