
import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/site/i18n/request.ts');

const nextConfig: NextConfig = {
    cacheComponents: true,
    images: {
        dangerouslyAllowLocalIP: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'my-ecommerce-backend-j4eb.onrender.com',
            },
            {
                hostname: 'readonlydemo.vendure.io',
            },
            {
                hostname: 'demo.vendure.io',
            },
            {
                hostname: 'localhost',
            },
        ],
    },
};

export default withNextIntl(nextConfig);
