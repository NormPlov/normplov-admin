/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        domains: [
            "136.228.158.126",
            "normplov-api.shinoshike.studio"
        ],
    }

};

export default nextConfig;
