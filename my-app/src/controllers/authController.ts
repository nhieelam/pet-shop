import {
    storeAuthToken,
    storeUserName,
    getAuthToken,
    removeAuthToken,
    removeUserName,
    getUserName,
  } from "../utils/storageUtils";
  
  export {
    storeAuthToken,
    getAuthToken,
    removeAuthToken,
    storeUserName,
    getUserName,
    removeUserName,
  } from "../utils/storageUtils";
  
  
  export function isAuthenticated(): boolean {
    return getAuthToken() !== null;
  }
  
  export function logout(): void {
    removeAuthToken();
    removeUserName();
  }
  
  
  export function getCurrentUser(): string | null {
    return getUserName();
  }
  