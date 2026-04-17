// Centralized API config
// Uses local network IP so physical devices/emulators can reach the PC backend.
// If you change Wi-Fi networks, run `ipconfig` again and update this IP.
export const API_BASE_URL = 'http://10.15.80.102:5000/api';

export const AUTH_ENDPOINTS = {
  signup: `${API_BASE_URL}/auth/signup`,
  signin: `${API_BASE_URL}/auth/signin`,
  guest:  `${API_BASE_URL}/auth/guest`,
};

export const HISTORY_ENDPOINTS = {
  downloads: `${API_BASE_URL}/history/downloads`,
  bios: `${API_BASE_URL}/history/bios`,
  clear: `${API_BASE_URL}/history/clear`,
};

export const DOWNLOAD_ENDPOINTS = {
  extract: `${API_BASE_URL}/download/extract`,
};

export const BIO_ENDPOINTS = {
  generate: `${API_BASE_URL}/bio/generate`,
};
