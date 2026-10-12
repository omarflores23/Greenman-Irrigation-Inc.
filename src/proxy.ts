import { NextResponse, type NextRequest } from "next/server";
import { greenmanGallery } from "@/data/greenmanGallery";
export function proxy(request: NextRequest) {
  if (process.env.SITE_PUBLICATION_MODE !== "public")
    return NextResponse.next();
  const pathname = request.nextUrl.pathname;
  const imagePath =
    pathname === "/_next/image"
      ? request.nextUrl.searchParams.get("url")
      : pathname;
  if (
    imagePath?.startsWith("/images/greenman/") &&
    !greenmanGallery.some(
      (p) => p.src === imagePath && p.publicationStatus === "approved",
    )
  )
    return new NextResponse("Image awaiting publication approval", {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
  return NextResponse.next();
}
export const config = { matcher: ["/images/greenman/:path*", "/_next/image"] };
