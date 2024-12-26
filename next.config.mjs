/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: config => {
		config.resolve.alias.canvas = false;
		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false,
			path: false,
			stream: false,
		};
		return config;
	},
	env: {
		NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
	},
};

export default nextConfig;
