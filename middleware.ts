import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from './app/lib/sessionHandler';

export async function middleware(request: NextRequest) {
    return await updateSession(request);
  }

export const config = { matcher: ["/dashboard/:path*"] }