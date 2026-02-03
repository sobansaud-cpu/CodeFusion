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
  additionalPaths: async (config) => {
    const coreRoutes = [
      '/', '/about', '/features', '/pricing', '/contact', '/tutorials',
      '/blog', '/author/soban-saud', '/privacy', '/terms', '/cookie-policy',
      '/feedback', '/preview', '/login', '/signup', '/docs/ai-web-glossary'
    ];
    const blogSlugs = [
      'codefusion-ai-is-live',
      'meet-the-founder-soban-saud',
      'codeverse-soban-educational-mission',
      'building-apps-with-codefusion-nextjs',
      'why-code-structure-matters-in-web-projects',
      'server-actions-in-production-workflows',
      'improving-performance-with-server-first-approach',
      'seo-for-nextjs-projects',
      'designing-scalable-component-systems',
      'accessibility-as-a-core-development-principle',
      'how-ai-supports-modern-development-teams'
    ];

    const allRoutes = [
      ...coreRoutes,
      ...blogSlugs.map(slug => `/blog/${slug}`)
    ];

    return allRoutes.map(route => ({
      loc: route,
      changefreq: route === '/' ? 'daily' : 'weekly',
      priority: route === '/' ? 1.0 : (route.startsWith('/blog/') ? 0.8 : 0.7),
      lastmod: new Date().toISOString(),
    }));
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
      '/blog': 0.8,
      '/author/soban-saud': 0.7,
      '/cookie-policy': 0.6,
      '/privacy': 0.6,
      '/terms': 0.6,
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
