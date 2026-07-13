import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.innersky.co.il'
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
  ]
}
