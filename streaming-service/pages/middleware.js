import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export function middleware(req) {
  const token = req.cookies.get('auth')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
