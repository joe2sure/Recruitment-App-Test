import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/services/api';

export const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    method = 'GET',
    params = {},
    body = null,
    immediate = true,
    onSuccess,
    onError,
  } = options;

  const execute = useCallback(async (customParams = {}, customBody = null) => {
    try {
      setLoading(true);
      setError(null);

      let response;
      const finalParams = { ...params, ...customParams };
      const finalBody = customBody || body;

      switch (method.toLowerCase()) {
        case 'get':
          response = await apiService.get(endpoint, finalParams);
          break;
        case 'post':
          response = await apiService.post(endpoint, finalBody);
          break;
        case 'put':
          response = await apiService.put(endpoint, finalBody);
          break;
        case 'patch':
          response = await apiService.patch(endpoint, finalBody);
          break;
        case 'delete':
          response = await apiService.delete(endpoint);
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }

      setData(response.data);
      
      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setError(err);
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint, method, params, body, onSuccess, onError]);

  useEffect(() => {
    if (immediate && method.toLowerCase() === 'get') {
      execute();
    }
  }, [execute, immediate, method]);

  const refetch = useCallback(() => {
    return execute();
  }, [execute]);

  return {
    data,
    loading,
    error,
    execute,
    refetch,
  };
};

// Hook for handling form submissions with API calls
export const useApiForm = (endpoint, options = {}) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    method = 'POST',
    onSuccess,
    onError,
    resetOnSuccess = true,
  } = options;

  const submit = useCallback(async (formData) => {
    try {
      setSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      let response;
      switch (method.toLowerCase()) {
        case 'post':
          response = await apiService.post(endpoint, formData);
          break;
        case 'put':
          response = await apiService.put(endpoint, formData);
          break;
        case 'patch':
          response = await apiService.patch(endpoint, formData);
          break;
        default:
          throw new Error(`Unsupported form method: ${method}`);
      }

      setSubmitSuccess(true);
      
      if (onSuccess) {
        onSuccess(response.data);
      }

      if (resetOnSuccess) {
        setTimeout(() => setSubmitSuccess(false), 3000);
      }

      return response.data;
    } catch (err) {
      setSubmitError(err);
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, [endpoint, method, onSuccess, onError, resetOnSuccess]);

  const reset = useCallback(() => {
    setSubmitError(null);
    setSubmitSuccess(false);
  }, []);

  return {
    submit,
    submitting,
    submitError,
    submitSuccess,
    reset,
  };
};
