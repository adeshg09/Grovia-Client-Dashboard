/* Imports */
import { envConfig } from "@/config/envConfig";
import {
  clearAll,
  getItem,
  removeItem,
  setItem,
} from "@/config/localStorageConfig";
import { localStorageKeys } from "@/constants";
import type { IAccount } from "@/context/SessionContext";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// ----------------------------------------------------------------------

/**
 * function to set access token in cookies
 *
 * @param {string} accessToken - logged in user token
 * @param {boolean} isRememberMe - flag to remember/forgot user after session ends.
 * @returns {void}
 */

export const setAccessToken = (
  accessToken: string,
  isRememberMe: boolean
): void => {
  const cookieConfig: Cookies.CookieAttributes = {
    path: "/",
    sameSite: "strict",
  };
  const expiresDate = new Date(); // Now
  if (isRememberMe) {
    expiresDate.setDate(expiresDate.getDate() + 30); // Set now + 30 days as the new date

    cookieConfig.expires = expiresDate;
  } else {
    expiresDate.setDate(expiresDate.getDate() + 1); // Set now + 1 days as the new date
    cookieConfig.expires = expiresDate;
  }
  Cookies.set(envConfig.accessTokenKey, accessToken, cookieConfig);
};

/**
 * function to set temporary token in cookies (short-lived, 5 minutes)
 *
 * @param {string} tempToken - temporary session token
 * @returns {void}
 */
export const setTempToken = (tempToken: string): void => {
  const cookieConfig: Cookies.CookieAttributes = {
    path: "/",
    sameSite: "strict",
  };
  const expiresDate = new Date(); //Now
  expiresDate.setDate(expiresDate.getDate() + 30); // Set now + 30 days as the new date
  cookieConfig.expires = expiresDate;

  Cookies.set(envConfig.tempTokenKey, tempToken, cookieConfig);
};

/**
 * function to remove access token from cookies
 *
 * @returns {void}
 */
export const removeAccessToken = (): void => {
  const cookieConfig: Cookies.CookieAttributes = {
    path: "/",
    sameSite: "strict",
    expires: 0,
  };
  Cookies.remove(envConfig.accessTokenKey, cookieConfig);
};

/**
 * function to remove temporary token from cookies
 *
 * @returns {void}
 */
export const removeTempToken = (): void => {
  const cookieConfig: Cookies.CookieAttributes = {
    path: "/",
    sameSite: "strict",
    expires: 0,
  };
  Cookies.remove(envConfig.tempTokenKey, cookieConfig);
};

/**
 * function to get access token from cookies
 *
 * @returns {string} - returns a access token from cookies
 */
export const getAccessToken = (): string | undefined => {
  return Cookies.get(envConfig.accessTokenKey);
};

/**
 * function to get temporary token from cookies
 *
 * @returns {string} - returns a temporary token from cookies
 */
export const getTempToken = (): string | undefined => {
  return Cookies.get(envConfig.tempTokenKey);
};

/**
 * function to validate the access token by decoding the jwt token
 * @param {string} accessToken - logged in user token
 *
 * @returns {string} - returns a access token from cookies
 */
export const isValidToken = (
  accessToken: string
): { exp: number } | undefined => {
  if (!accessToken) {
    return;
  }
  const decoded = jwtDecode(accessToken) as { exp: number };
  const currentTime = Date.now() / 1000;

  return decoded?.exp > currentTime ? decoded : undefined;
};

/**
 * function to validate the temp token by decoding the jwt token
 * @param {string} tempToken - token for temporary session
 *
 * @returns {string} - returns a access token from cookies
 */
export const isValidTempToken = (
  tempToken: string
): { exp: number } | undefined => {
  if (!tempToken) {
    return;
  }
  const decoded = jwtDecode(tempToken) as { exp: number };
  const currentTime = Date.now() / 1000;

  return decoded?.exp > currentTime ? decoded : undefined;
};

/**
 * function to set available accounts in local storage
 *
 * @param {IAccount[]} accounts - list of accounts
 * @returns {void}
 */
export const setStoredAccounts = (accounts: IAccount[]): void => {
  try {
    setItem(localStorageKeys.account.AVAILABLE_ACCOUNTS_KEY, accounts);
  } catch (error) {
    console.error("Error storing accounts:", error);
  }
};

/**
 * function to get available accounts from local storage
 *
 * @returns {IAccount[]} - list of accounts
 */
export const getStoredAccounts = (): IAccount[] => {
  try {
    return getItem(localStorageKeys.account.AVAILABLE_ACCOUNTS_KEY, []);
  } catch (error) {
    console.error("Error retrieving accounts:", error);
    return [];
  }
};

/**
 * function to remove available accounts from local storage
 *
 * @returns {void}
 */
export const removeStoredAccounts = (): void => {
  try {
    removeItem(localStorageKeys.account.AVAILABLE_ACCOUNTS_KEY);
  } catch (error) {
    console.error("Error removing accounts:", error);
  }
};

/**
 * function to set active account in local storage
 *
 * @param {IAccount} account - active account
 * @returns {void}
 */
export const setActiveAccount = (account: IAccount): void => {
  try {
    setItem(localStorageKeys.account.ACTIVE_ACCOUNT_KEY, account);
  } catch (error) {
    console.error("Error storing active account:", error);
  }
};

/**
 * function to get active account from local storage
 *
 * @returns {IAccount} - active account
 */
export const getActiveAccount = (): IAccount => {
  try {
    return getItem(localStorageKeys.account.ACTIVE_ACCOUNT_KEY, {});
  } catch (error) {
    console.error("Error retrieving active account:", error);
  }
};

/**
 * function to remove active account from local storage
 *
 * @returns {void}
 */
export const removeActiveAccount = (): void => {
  try {
    removeItem(localStorageKeys.account.ACTIVE_ACCOUNT_KEY);
  } catch (error) {
    console.error("Error removing active account:", error);
  }
};

/**
 * function to clear local storage
 *
 * @returns {void}
 */
export const clearLocalStorage = (): void => {
  try {
    clearAll();
  } catch (error) {
    console.error("Error clearing local storage:", error);
  }
};

/**
 * function to set user profile in local storage
 *
 * @param {any} user - complete user profile data
 * @returns {void}
 */
export const setStoredUser = (user: any): void => {
  try {
    setItem(localStorageKeys.account.USER_PROFILE_KEY, user);
  } catch (error) {
    console.error("Error storing user profile:", error);
  }
};

/**
 * function to get user profile from local storage
 *
 * @returns {any} - user profile data
 */
export const getStoredUser = (): any => {
  try {
    return getItem(localStorageKeys.account.USER_PROFILE_KEY, null);
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    return null;
  }
};

/**
 * function to remove user profile from local storage
 *
 * @returns {void}
 */
export const removeStoredUser = (): void => {
  try {
    removeItem(localStorageKeys.account.USER_PROFILE_KEY);
  } catch (error) {
    console.error("Error removing user profile:", error);
  }
};
