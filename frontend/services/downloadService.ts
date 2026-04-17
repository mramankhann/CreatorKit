import AsyncStorage from '@react-native-async-storage/async-storage';
import { DOWNLOAD_ENDPOINTS } from '../config/api';

export const extractMediaLine = async (url: string, quality: string = '720p') => {
  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  const user = await AsyncStorage.getItem('user');
  if (user) {
    const parsed = JSON.parse(user);
    if (parsed.token) {
      headers['Authorization'] = `Bearer ${parsed.token}`;
    }
  }

  const res = await fetch(DOWNLOAD_ENDPOINTS.extract, {
    method: 'POST',
    headers,
    body: JSON.stringify({ url, quality }),
  });
  
  const data = await res.json();
  if (!res.ok) {
     throw new Error(data.message || 'Extraction failed');
  }
  
  return data;
};
