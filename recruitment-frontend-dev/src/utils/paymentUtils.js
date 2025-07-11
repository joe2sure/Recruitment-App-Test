/**
 * Format currency amount
 * @param {number} amount
 * @param {string} currency
 * @returns {string}
 */
export const formatCurrency = (amount, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format date for display
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

/**
 * Calculate days until due date
 * @param {string|Date} dueDate
 * @returns {number}
 */
export const getDaysUntilDue = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Determine invoice status based on due date and current status
 * @param {string} currentStatus
 * @param {string|Date} dueDate
 * @returns {string}
 */
export const getInvoiceStatus = (currentStatus, dueDate) => {
  if (currentStatus === "paid") return "paid";
  if (currentStatus === "draft") return "draft";

  const daysUntilDue = getDaysUntilDue(dueDate);
  if (daysUntilDue < 0) return "overdue";

  return "unpaid";
};

/**
 * Get status color configuration
 * @param {string} status
 * @returns {object}
 */
export const getStatusConfig = (status) => {
  const configs = {
    paid: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      dot: "bg-green-500",
      badge: "bg-green-100 text-green-800 border-green-200",
    },
    unpaid: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      dot: "bg-blue-500",
      badge: "bg-blue-100 text-blue-800 border-blue-200",
    },
    overdue: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      dot: "bg-red-500",
      badge: "bg-red-100 text-red-800 border-red-200",
    },
    draft: {
      bg: "bg-gray-50",
      border: "border-gray-200",
      text: "text-gray-800",
      dot: "bg-gray-500",
      badge: "bg-gray-100 text-gray-800 border-gray-200",
    },
  };

  return configs[status] || configs.draft;
};

/**
 * Generate invoice ID
 * @param {string} prefix
 * @returns {string}
 */
export const generateInvoiceId = (prefix = "INV") => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${prefix}-${timestamp}-${random}`;
};

/**
 * Validate email address
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Calculate total amount from line items
 * @param {Array} lineItems
 * @returns {number}
 */
export const calculateTotal = (lineItems = []) => {
  return lineItems.reduce((total, item) => {
    return total + item.quantity * item.rate;
  }, 0);
};

/**
 * Calculate tax amount
 * @param {number} subtotal
 * @param {number} taxRate
 * @returns {number}
 */
export const calculateTax = (subtotal, taxRate = 0) => {
  return subtotal * (taxRate / 100);
};

/**
 * Filter data based on search term
 * @param {Array} data
 * @param {string} searchTerm
 * @param {Array} searchFields
 * @returns {Array}
 */
export const filterBySearch = (data, searchTerm, searchFields = []) => {
  if (!searchTerm) return data;

  const term = searchTerm.toLowerCase();
  return data.filter((item) =>
    searchFields.some((field) =>
      String(item[field] || "")
        .toLowerCase()
        .includes(term)
    )
  );
};

/**
 * Sort data by field
 * @param {Array} data
 * @param {string} sortBy
 * @param {string} sortOrder
 * @returns {Array}
 */
export const sortData = (data, sortBy, sortOrder = "asc") => {
  return [...data].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    // Handle dates
    if (sortBy.includes("date") || sortBy.includes("Date")) {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }

    // Handle numbers
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    }

    // Handle strings
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortOrder === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    // Handle dates
    if (aVal instanceof Date && bVal instanceof Date) {
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });
};

/**
 * Paginate data
 * @param {Array} data
 * @param {number} page
 * @param {number} limit
 * @returns {object}
 */
export const paginateData = (data, page = 1, limit = 10) => {
  const total = data.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
};
