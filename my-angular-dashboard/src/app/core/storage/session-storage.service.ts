import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorageService {
  
  // Set an item in sessionStorage
  setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  // Get an item from sessionStorage
  getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  // Remove an item from sessionStorage
  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  // Clear all sessionStorage
  clear(): void {
    sessionStorage.clear();
  }
}

