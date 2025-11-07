// /** @type {import('next-sitemap').IConfig} */
// module.exports = {
//   siteUrl: 'https://codefusion.site',
//   generateRobotsTxt: true,
//   // optional:
//   changefreq: 'daily',
//   priority: 0.7,
//   sitemapSize: 5000
// }


/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://codefusion.site',
  generateRobotsTxt: true,
  // optional:
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Mobile',
        allow: '/',
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
      },
      {
        userAgent: 'Mediapartners-Google',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://codefusion.site/sitemap-0.xml',
    ],
  },
  // Exclude admin and auth pages from sitemap
  exclude: ['/admin/*', '/admin-login/*', '/api/*'],
  // Transform function for better SEO
  transform: async (config, path) => {
    // Custom priority for different page types
    const pathPriority = {
      '/': 1.0,
      '/features': 0.9,
      '/pricing': 0.8,
      '/about': 0.7,
      '/contact': 0.7,
      '/tutorials': 0.7,
      '/feedback': 0.7,
      '/preview': 0.7,
      '/login': 0.6,
      '/signup': 0.6,
      '/payment-selection': 0.6,
      '/payment-success': 0.5,
      '/success': 0.5,
    };

    const priority = pathPriority[path] || config.priority;
    const changefreq = path === '/' ? 'daily' : 'weekly';

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
}
