export interface CookieOptions {
  expires?: Date | string;
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
}

function getDomain(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
    return undefined;
  }
  
  const parts = hostname.split('.');
  
  if (parts.length >= 2) {
    const domain = parts.slice(-2).join('.');
    return `.${domain}`;
  }
  
  return undefined;
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(';').shift() || '');
  }
  
  return null;
}

export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  if (typeof document === 'undefined') {
    return;
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

  cookieString += `; path=${options.path || '/'}`;

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

export function removeCookie(name: string, options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
  setCookie(name, '', {
    ...options,
    expires: new Date(0),
  });
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
  const domain = getDomain();
  
  if (domain) {
    removeCookie('user', { path: '/', domain });
  }
  
  removeCookie('user', { path: '/' });
}

export function setLogoutSignal() {
  const domain = getDomain();
  const timestamp = Date.now().toString();
  
  if (domain) {
    setCookie('logout_signal', timestamp, { 
      path: '/', 
      domain,
      maxAge: 60 
    });
  }
  
  setCookie('logout_signal', timestamp, { 
    path: '/', 
    maxAge: 60 
  });
}

export function clearLogoutSignal() {
  const domain = getDomain();
  
  if (domain) {
    removeCookie('logout_signal', { path: '/', domain });
  }
  
  removeCookie('logout_signal', { path: '/' });
}

export function checkLogoutSignal(): boolean {
  const signal = getCookie('logout_signal');
  if (!signal) return false;
  
  const timestamp = parseInt(signal);
  const now = Date.now();
  
  return (now - timestamp) < 60000;
}

// export interface CookieOptions {
//   expires?: Date | string;
//   maxAge?: number;
//   path?: string;
//   domain?: string;
//   secure?: boolean;
//   sameSite?: 'strict' | 'lax' | 'none';
//   httpOnly?: boolean;
// }

// /**
//  * Get a cookie value by name
//  * @param name - The name of the cookie
//  * @returns The cookie value or null if not found
//  */
// export function getCookie(name: string): string | null {
//   if (typeof document === 'undefined') {
//     return null; // Server-side rendering protection
//   }

//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
  
//   if (parts.length === 2) {
//     return decodeURIComponent(parts.pop()?.split(';').shift() || '');
//   }
  
//   return null;
// }

// /**
//  * Set a cookie with optional configuration
//  * @param name - The name of the cookie
//  * @param value - The value of the cookie
//  * @param options - Optional cookie configuration
//  */
// export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
//   if (typeof document === 'undefined') {
//     return; // Server-side rendering protection
//   }

//   let cookieString = `${name}=${encodeURIComponent(value)}`;

//   if (options.expires) {
//     const expiresDate = options.expires instanceof Date 
//       ? options.expires 
//       : new Date(options.expires);
//     cookieString += `; expires=${expiresDate.toUTCString()}`;
//   }

//   if (options.maxAge) {
//     cookieString += `; max-age=${options.maxAge}`;
//   }

//   if (options.path) {
//     cookieString += `; path=${options.path}`;
//   } else {
//     cookieString += `; path=/`; // Default to root path
//   }

//   if (options.domain) {
//     cookieString += `; domain=${options.domain}`;
//   }

//   if (options.secure) {
//     cookieString += `; secure`;
//   }

//   if (options.sameSite) {
//     cookieString += `; samesite=${options.sameSite}`;
//   }

//   if (options.httpOnly) {
//     cookieString += `; httponly`;
//   }

//   document.cookie = cookieString;
// }

// /**
//  * Remove a cookie by setting it to expire immediately
//  * @param name - The name of the cookie to remove
//  * @param options - Optional path and domain for the cookie to remove
//  */
// export function removeCookie(name: string, options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
//   setCookie(name, '', {
//     ...options,
//     expires: new Date(0), // Set to epoch time to expire immediately
//   });
// }

// /**
//  * Check if a cookie exists
//  * @param name - The name of the cookie
//  * @returns True if the cookie exists, false otherwise
//  */
// export function cookieExists(name: string): boolean {
//   return getCookie(name) !== null;
// }

// /**
//  * Get all cookies as an object
//  * @returns An object with all cookie names as keys and their values
//  */
// export function getAllCookies(): Record<string, string> {
//   if (typeof document === 'undefined') {
//     return {}; // Server-side rendering protection
//   }

//   const cookies: Record<string, string> = {};
  
//   document.cookie.split(';').forEach(cookie => {
//     const [name, value] = cookie.trim().split('=');
//     if (name && value) {
//       cookies[name] = decodeURIComponent(value);
//     }
//   });

//   return cookies;
// }

// export function getUserCookie() {
//   const userCookie = getCookie('user');
//   if (userCookie) {
//     try {
//       return JSON.parse(userCookie);
//     } catch (error) {
//       console.error('Error parsing user cookie:', error);
//       return null;
//     }
//   }
//   return null;
// }

// export function deleteUserCookie() {
//   removeCookie('user');
// } 
