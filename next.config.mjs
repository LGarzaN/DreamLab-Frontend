/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.module.rules.push({
                test: /\.cy\.(js|jsx|ts|tsx)$/,
                use: 'ignore-loader'
            });
        }
        return config;
    }
};

export default nextConfig;
