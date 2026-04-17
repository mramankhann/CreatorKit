import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_ENDPOINTS } from '../config/api';

export interface AuthUser {
  _id: string;
  name?: string;
  email?: string;
  isGuest: boolean;
  token: string;
}

export const signupWithEmail = async (
  name: string,
  email: string,
  password: string
): Promise<AuthUser> => {
  const res = await fetch(AUTH_ENDPOINTS.signup, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Signup failed');
  await AsyncStorage.setItem('user', JSON.stringify(data));
  return data;
};

export const signinWithEmail = async (
  email: string,
  password: string
): Promise<AuthUser> => {
  const res = await fetch(AUTH_ENDPOINTS.signin, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Sign in failed');
  await AsyncStorage.setItem('user', JSON.stringify(data));
  return data;
};

export const continueAsGuest = async (): Promise<AuthUser> => {
  const res = await fetch(AUTH_ENDPOINTS.guest, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Guest login failed');
  await AsyncStorage.setItem('user', JSON.stringify(data));
  return data;
};

export const getStoredUser = async (): Promise<AuthUser | null> => {
  const raw = await AsyncStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
};

export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem('user');
};
