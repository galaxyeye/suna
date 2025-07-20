import { NextResponse } from 'next/server';

export async function GET() {
  // Return an empty JSON response for Chrome DevTools
  // This prevents the 404 error when Chrome DevTools tries to access this endpoint
  return NextResponse.json({});
}
