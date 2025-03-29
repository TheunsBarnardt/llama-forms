import { NextResponse } from "next/server";

/**
 * Preset success response functions for common HTTP codes.
 */
export  const NextSuccess = {
    OK: <T>(data: T): NextResponse<T> => NextResponse.json({ success: true, data }, { status: 200 }) as NextResponse<T>,
    Created: <T>(data: T): NextResponse<T> => NextResponse.json({ success: true, data }, { status: 201 }) as NextResponse<T>,
    Accepted: <T>(data: T): NextResponse<T> => NextResponse.json({ success: true, data }, { status: 202 }) as NextResponse<T>,
    NoContent: (): NextResponse => NextResponse.json({ success: true, data: null }, { status: 204 }) as NextResponse,
  };

/**
 * Preset error response functions for common HTTP codes.
 */
export const NextError = {
  BadRequest: (message: string): NextResponse<{ success: false; message: string }> => 
    NextResponse.json({ success: false, message }, { status: 400 }) as NextResponse<{ success: false; message: string }>,

  Unauthorized: (message: string = "Unauthorized"): NextResponse<{ success: false; message: string }> => 
    NextResponse.json({ success: false, message }, { status: 401 }) as NextResponse<{ success: false; message: string }>,

  Forbidden: (message: string = "Forbidden"): NextResponse<{ success: false; message: string }> => 
    NextResponse.json({ success: false, message }, { status: 403 }) as NextResponse<{ success: false; message: string }>,

  NotFound: (message: string = "Resource not found"): NextResponse<{ success: false; message: string }> => 
    NextResponse.json({ success: false, message }, { status: 404 }) as NextResponse<{ success: false; message: string }>,

  InternalServerError: (message: string = "Internal Server Error"): NextResponse<{ success: false; message: string }> => 
    NextResponse.json({ success: false, message }, { status: 500 }) as NextResponse<{ success: false; message: string }>
};
