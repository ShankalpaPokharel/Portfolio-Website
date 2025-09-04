'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(username: string, password: string) {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (username === adminUsername && password === adminPassword) {
    const sessionToken = Math.random().toString(36).substring(2);
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    cookies().set('admin_session', sessionToken, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    
    return { success: true };
  }
  
  return { success: false, error: 'Invalid credentials' };
}

export async function logout() {
  cookies().delete('admin_session');
  redirect('/admin/login');
}

export async function isAuthenticated() {
  const session = cookies().get('admin_session');
  return !!session;
}

export async function requireAuth() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect('/admin/login');
  }
}