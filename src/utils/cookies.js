'use server';
import { cookies } from 'next/headers';

export async function logoutUser() {
    const cookieStore = cookies();
    cookieStore.delete('token');
}

export async function isLoggedIN() {
    const token = cookies().get('token');
    return Boolean(token);
}
