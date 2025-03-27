import { NextRequest, NextResponse } from "next/server";
import * as LRU from "lru-cache";

const rateLimit = new LRU.LRUCache({
  max: 5, // Maximum requests
  ttl: 60 * 1000, // 1 minute in milliseconds
});

export function middleware(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

  const tokenCount = (rateLimit.get(ip) as number) || 0;

  if (tokenCount >= 5) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }

  rateLimit.set(ip, tokenCount + 1);
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
