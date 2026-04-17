import AsyncStorage from '@react-native-async-storage/async-storage';
import { HISTORY_ENDPOINTS } from '../config/api';

const getHeaders = async () => {
  const user = await AsyncStorage.getItem('user');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (user) {
    const parsed = JSON.parse(user);
    if (parsed.token) {
      headers['Authorization'] = `Bearer ${parsed.token}`;
    }
  }
  return headers;
};

export const fetchDownloads = async () => {
  const headers = await getHeaders();
  const res = await fetch(HISTORY_ENDPOINTS.downloads, { headers });
  if (!res.ok) throw new Error('Failed to fetch downloads');
  return res.json();
};

export const saveDownload = async (data: any) => {
  const headers = await getHeaders();
  const res = await fetch(HISTORY_ENDPOINTS.downloads, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to save download');
  return res.json();
};

export const fetchBios = async () => {
  const headers = await getHeaders();
  const res = await fetch(HISTORY_ENDPOINTS.bios, { headers });
  if (!res.ok) throw new Error('Failed to fetch bios');
  return res.json();
};

export const saveBio = async (data: any) => {
  const headers = await getHeaders();
  const res = await fetch(HISTORY_ENDPOINTS.bios, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to save bio');
  return res.json();
};

export const clearAllHistory = async () => {
  const headers = await getHeaders();
  const res = await fetch(HISTORY_ENDPOINTS.clear, {
    method: 'DELETE',
    headers
  });
  if (!res.ok) throw new Error('Failed to clear history');
  return res.json();
};

export const deleteDownloadHistory = async (id: string) => {
  const headers = await getHeaders();
  const res = await fetch(`${HISTORY_ENDPOINTS.downloads}/${id}`, {
    method: 'DELETE',
    headers
  });
  if (!res.ok) throw new Error('Failed to delete download');
  return res.json();
};

export const deleteBioHistory = async (id: string) => {
  const headers = await getHeaders();
  const res = await fetch(`${HISTORY_ENDPOINTS.bios}/${id}`, {
    method: 'DELETE',
    headers
  });
  if (!res.ok) throw new Error('Failed to delete bio');
  return res.json();
};
