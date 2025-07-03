export interface CookieOptions {
  expires?: Date | string;
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
}

/**
 * Get a cookie value by name
 * @param name - The name of the cookie
 * @returns The cookie value or null if not found
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null; // Server-side rendering protection
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(';').shift() || '');
  }
  
  return null;
}

/**
 * Set a cookie with optional configuration
 * @param name - The name of the cookie
 * @param value - The value of the cookie
 * @param options - Optional cookie configuration
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  if (typeof document === 'undefined') {
    return; // Server-side rendering protection
  }

  let cookieString = `${name}=${encodeURIComponent(value)}`;

  if (options.expires) {
    const expiresDate = options.expires instanceof Date 
      ? options.expires 
      : new Date(options.expires);
    cookieString += `; expires=${expiresDate.toUTCString()}`;
  }

  if (options.maxAge) {
    cookieString += `; max-age=${options.maxAge}`;
  }

  if (options.path) {
    cookieString += `; path=${options.path}`;
  } else {
    cookieString += `; path=/`; // Default to root path
  }

  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  if (options.secure) {
    cookieString += `; secure`;
  }

  if (options.sameSite) {
    cookieString += `; samesite=${options.sameSite}`;
  }

  if (options.httpOnly) {
    cookieString += `; httponly`;
  }

  document.cookie = cookieString;
}

/**
 * Remove a cookie by setting it to expire immediately
 * @param name - The name of the cookie to remove
 * @param options - Optional path and domain for the cookie to remove
 */
export function removeCookie(name: string, options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
  setCookie(name, '', {
    ...options,
    expires: new Date(0), // Set to epoch time to expire immediately
  });
}

/**
 * Check if a cookie exists
 * @param name - The name of the cookie
 * @returns True if the cookie exists, false otherwise
 */
export function cookieExists(name: string): boolean {
  return getCookie(name) !== null;
}

/**
 * Get all cookies as an object
 * @returns An object with all cookie names as keys and their values
 */
export function getAllCookies(): Record<string, string> {
  if (typeof document === 'undefined') {
    return {}; // Server-side rendering protection
  }

  const cookies: Record<string, string> = {};
  
  document.cookie.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[name] = decodeURIComponent(value);
    }
  });

  return cookies;
}

export function getUserCookie() {
  const userCookie = getCookie('user');
  if (userCookie) {
    try {
      return JSON.parse(userCookie);
    } catch (error) {
      console.error('Error parsing user cookie:', error);
      return null;
    }
  }
  return null;
}

export function deleteUserCookie() {
  removeCookie('user');
} 
