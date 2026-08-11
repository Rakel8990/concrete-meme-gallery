const DB_NAME = 'ConcreteMemeGalleryDB';
const STORE_NAME = 'memes_store';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveItem<T>(key: string, value: T): Promise<void> {
  // First try IndexedDB (handles large images/blobs without 5MB quota)
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB save skipped/failed:', err);
  }

  // Also attempt localStorage for quick sync read, catching quota errors silently
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Gracefully ignore localStorage QuotaExceededError since IndexedDB holds the state
  }
}

export async function getItem<T>(key: string): Promise<T | null> {
  // Try IndexedDB first
  try {
    const db = await openDB();
    const result = await new Promise<T | null>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => resolve(null);
    });
    if (result !== null) return result;
  } catch (err) {
    console.warn('IndexedDB read failed:', err);
  }

  // Fallback to localStorage
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}
