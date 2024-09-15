/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "mangadex.org",
                protocol: "https"
            }
        ]
    }
};

export default nextConfig;
