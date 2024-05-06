/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",  // <=== enables static exports
    reactStrictMode: true,
     // Add basePath
  basePath: '/github-pages',
    

}

export default nextConfig;