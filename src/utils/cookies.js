'use server';
import { cookies } from 'next/headers';

export async function logoutUser() {
    const cookieStore = cookies();
  
    const allCookies = cookieStore.getAll();
  
    allCookies.forEach((cookie) => {
      cookieStore.delete(cookie.name);
    });
  }

export async function isLoggedIN() {
    const token = cocontokies().get('token');
    return Boolean(token);
}
