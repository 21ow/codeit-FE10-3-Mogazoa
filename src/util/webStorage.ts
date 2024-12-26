'use client';

const webStorage = {
  setItem: <T>(key: string, data: T, storage: 'session' | 'local'): void => {
    if (typeof window === 'undefined') return;
    const serializedData = JSON.stringify(data);
    if (storage === 'session') {
      sessionStorage.setItem(key, serializedData);
    } else {
      localStorage.setItem(key, serializedData);
    }
  },
  getItem: <T>(key: string, storage: 'session' | 'local'): T | undefined => {
    if (typeof window === 'undefined') return;
    const storedData =
      storage === 'session'
        ? sessionStorage.getItem(key)
        : localStorage.getItem(key);
    return storedData ? (JSON.parse(storedData) as T) : undefined;
  },
  removeItem: (key: string, storage: 'session' | 'local'): void => {
    if (typeof window === 'undefined') return;
    if (storage === 'session') {
      sessionStorage.removeItem(key);
    } else {
      localStorage.removeItem(key);
    }
  },
  clear: (storage: 'session' | 'local'): void => {
    if (typeof window === 'undefined') return;
    if (storage === 'session') {
      sessionStorage.clear();
    } else {
      localStorage.clear();
    }
  },
};

export default webStorage;
