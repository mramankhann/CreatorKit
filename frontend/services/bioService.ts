import AsyncStorage from '@react-native-async-storage/async-storage';
import { BIO_ENDPOINTS } from '../config/api';

export const generateAIBio = async (
  niche: string, 
  tone: string, 
  length: string, 
  platforms: string[]
) => {
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

  const res = await fetch(BIO_ENDPOINTS.generate, {
    method: 'POST',
    headers,
    body: JSON.stringify({ niche, tone, length, platforms }),
  });
  
  const data = await res.json();
  if (!res.ok) {
     throw new Error(data.message || 'Generation failed');
  }
  
  return data;
};
