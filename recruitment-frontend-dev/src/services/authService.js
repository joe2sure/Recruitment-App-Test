import { apiService } from './api';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants';
import { storage } from '@/utils/helpers';

class AuthService {
  // Login user
  async login(credentials) {
    try {
      const response = await apiService.post('/auth/login', credentials);
      
      if (response.data.token) {
        this.setAuthData(response.data);
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Register user
  async register(userData) {
    try {
      const response = await apiService.post('/auth/register', userData);
      
      if (response.data.token) {
        this.setAuthData(response.data);
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Logout user
  async logout() {
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API call failed:', error);
    } finally {
      this.clearAuthData();
    }
  }

  // Refresh token
  async refreshToken() {
    try {
      const response = await apiService.post('/auth/refresh');
      
      if (response.data.token) {
        this.setAuthData(response.data);
      }
      
      return response.data;
    } catch (error) {
      this.clearAuthData();
      throw error;
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await apiService.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Reset password
  async resetPassword(token, newPassword) {
    try {
      const response = await apiService.post('/auth/reset-password', {
        token,
        password: newPassword,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Verify email
  async verifyEmail(token) {
    try {
      const response = await apiService.post('/auth/verify-email', { token });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const response = await apiService.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await apiService.put('/auth/profile', userData);
      
      if (response.data.user) {
        storage.set(LOCAL_STORAGE_KEYS.USER_DATA, response.data.user);
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Change password
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await apiService.post('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Set authentication data in storage
  setAuthData(data) {
    if (data.token) {
      storage.set(LOCAL_STORAGE_KEYS.AUTH_TOKEN, data.token);
    }
    if (data.user) {
      storage.set(LOCAL_STORAGE_KEYS.USER_DATA, data.user);
    }
    if (data.userRole) {
      storage.set(LOCAL_STORAGE_KEYS.USER_ROLE, data.userRole);
    }
  }

  // Clear authentication data from storage
  clearAuthData() {
    storage.remove(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    storage.remove(LOCAL_STORAGE_KEYS.USER_DATA);
    storage.remove(LOCAL_STORAGE_KEYS.USER_ROLE);
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!storage.get(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
  }

  // Get stored user data
  getStoredUser() {
    return storage.get(LOCAL_STORAGE_KEYS.USER_DATA);
  }

  // Get stored user role
  getStoredUserRole() {
    return storage.get(LOCAL_STORAGE_KEYS.USER_ROLE);
  }
}

// Create and export a singleton instance
export const authService = new AuthService();

// Export the class for testing or custom instances
export default AuthService;
