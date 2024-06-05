export { default } from 'next-auth/middleware';

export const config = {
    matcher: ["/profile/:path*", "/videos/:id/edit", "/videos/create", "/categories/:path*", "/tags/create/", "/user/:id/edit"],
}