import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.innersky.co.il'
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/admin/login'] },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
