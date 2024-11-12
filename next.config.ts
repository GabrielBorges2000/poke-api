import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    transpilePackages: ['lucide-react'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '**',
            },
        ],
    },
}

export default nextConfig
