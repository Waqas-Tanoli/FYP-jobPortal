import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    console.log("No token, redirecting to login");
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  console.log("Token found, proceeding to requested route");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/Dashboard",
    "/Upload-CV",
    "/view-candidates",
    "/JobEntry",
    "/FilteredJobs",
    "/EditProfile",
    "/CompanyProfile",
    "/applied_jobs",
    "/Edit-Com-Prof",
    "/edit-job/[jobId]",
  ],
};
