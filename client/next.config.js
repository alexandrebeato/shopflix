/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
<<<<<<< HEAD
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true
      }
    ];
=======
>>>>>>> f834efb4de36041fe9a9ea4d4a15c850e65861e8
  }
};

module.exports = nextConfig;
