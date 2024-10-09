import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:8080';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: UserInfo | null;
}

interface AuthResponse {
  token: string;
  expiresIn: number;
}

interface UserInfo {
  role: string;
  username: string;
  email: string;
  permissions: string[];
}

interface DecodedToken extends UserInfo {
  iat: number;
  exp: number;
  sub: string;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    token: null,
    user: null,
  });

  useEffect(() => {
    // Check for existing token in localStorage on initial load
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setAuthState({
            isLoggedIn: true,
            token,
            user: {
              username: decodedToken.username,
              role: decodedToken.role,
              email: decodedToken.sub,
              permissions: decodedToken.permissions,
            },
          });
        } else {
          clearAuthInfo();
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        clearAuthInfo();
      }
    }
  }, []);

  const setAuthInfo = ({ token }: AuthResponse) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode<DecodedToken>(token);
    setAuthState({
      isLoggedIn: true,
      token,
      user: {
        username: decodedToken.username,
        role: decodedToken.role,
        email: decodedToken.sub,
        permissions: decodedToken.permissions,
      },
    });
  };

  const clearAuthInfo = () => {
    localStorage.removeItem('token');
    setAuthState({
      isLoggedIn: false,
      token: null,
      user: null,
    });
  };

  const handleAuthError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw new Error(axiosError.response?.data?.message || axiosError.message || 'Error in authentication');
    } else {
      throw new Error('Unknown error in authentication');
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, { email, password });
      setAuthInfo(response.data);
    } catch (error) {
      handleAuthError(error);
    }
  }, []);

  const signup = useCallback(async (username: string, email: string, password: string) => {
    try {
      await axios.post(`${API_URL}/auth/signup`, { username, email, password });
    } catch (error) {
      handleAuthError(error);
    }
  }, []);

  const verify = useCallback(async (email: string, verificationCode: string) => {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/verify`, { email, verificationCode });
      setAuthInfo(response.data);
    } catch (error) {
      handleAuthError(error);
    }
  }, []);

  const logout = useCallback(() => {
    clearAuthInfo();
  }, []);

  const refreshToken = useCallback(async () => {
    if (!authState.token) return;

    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/refresh-token`,
        {},
        {
          headers: { Authorization: `Bearer ${authState.token}` },
        }
      );
      setAuthInfo(response.data);
    } catch (error) {
      clearAuthInfo();
      handleAuthError(error);
    }
  }, [authState.token]);

  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        if (authState.token) {
          config.headers['Authorization'] = `Bearer ${authState.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => axios.interceptors.request.eject(interceptor);
  }, [authState.token]);

  return {
    isLoggedIn: authState.isLoggedIn,
    user: authState.user,
    login,
    signup,
    verify,
    logout,
    refreshToken,
  };
}
