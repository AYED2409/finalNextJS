// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['localhost', process.env.NEXT_PUBLIC_BACKEND_URL,]
//     }
// }

// module.exports = nextConfig

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    images: {
        // domains: ['localhost', process.env.NEXT_PUBLIC_BACKEND_URL,]
        remotePatterns: [
            {
                protocol: "https",
                hostname: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "vidi-proyectodaw.onrender.com",
                pathname: "/users/imageUser/*"
            },
            {
                protocol: "https",
                hostname: "vidi-proyectodaw.onrender.com",
                pathname: "/videos/thumbnail/*"
            }
        ]
    }
  }
   
  module.exports = nextConfig