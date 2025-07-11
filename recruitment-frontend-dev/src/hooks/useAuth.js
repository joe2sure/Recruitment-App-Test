import { authService } from '@/services/authService';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  setUserRole,
} from '@/store/slices/authSlice';
import { useEffect } from 'react';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  // Initialize auth state from storage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const user = authService.getStoredUser();
          const userRole = authService.getStoredUserRole();
          const token = authService.getAuthToken();

          if (user && token) {
            dispatch(loginSuccess({ user, token, userRole }));
          } else {
            // Token exists but no user data, try to fetch current user
            const userData = await authService.getCurrentUser();
            dispatch(
              loginSuccess({
                user: userData.user,
                token,
                userRole: userData.userRole || userRole,
              })
            );
          }
        } catch {
          // If token is invalid, clear auth data
          authService.clearAuthData();
          dispatch(logout());
        }
      }
    };

    initializeAuth();
  }, [dispatch]);

  const login = async (credentials) => {
    try {
      dispatch(loginStart());
      const response = await authService.login(credentials);
      dispatch(loginSuccess(response));
      return response;
    } catch (error) {
      dispatch(loginFailure(error.message));
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      dispatch(loginStart());
      const response = await authService.register(userData);
      dispatch(loginSuccess(response));
      return response;
    } catch (error) {
      dispatch(loginFailure(error.message));
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      // Even if logout fails on server, clear local state
      dispatch(logout());
      console.error('Logout error:', error);
    }
  };

  const updateUserRole = (role) => {
    dispatch(setUserRole(role));
    authService.setAuthData({ userRole: role });
  };

  const refreshToken = async () => {
    try {
      const response = await authService.refreshToken();
      dispatch(loginSuccess(response));
      return response;
    } catch (error) {
      dispatch(logout());
      throw error;
    }
  };

  return {
    // State
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    userRole: auth.userRole,

    // Actions
    login,
    register,
    logout: logoutUser,
    updateUserRole,
    refreshToken,
  };
};
