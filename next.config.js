/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', process.env.NEXT_PUBLIC_BACKEND_URL,]
    }
}

module.exports = nextConfig
