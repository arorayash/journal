module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: 'Clarisights Journal', // Navigation and Site Title
  titleAlt: 'Clarisights Journal', // Title for JSONLD
  description: 'Where throughts from clarisights come alive',
  headline: 'Clarisights blog platform', // Headline for schema.org JSONLD
  url: 'https://journal.clarisights.com', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  logo: '/logos/logo-1024.png', // Used for SEO
  ogLanguage: 'en_US', // Facebook Language

  // JSONLD / Manifest
  favicon: 'src/favicon.png', // Used for manifest favicon generation
  shortName: 'Clarisights', // shortname for manifest. MUST be shorter than 12 characters
  author: 'anshumanv', // Author for schemaORGJSONLD
  themeColor: '#3D63AE',
  backgroundColor: '#EBEDF2',

  twitter: '@clarisights', // Twitter Username
  facebook: 'ClarisightsOfficial', // Facebook Site Name
  googleAnalyticsID: '',

  skipNavId: 'reach-skip-nav', // ID for the "Skip to content" a11y feature
}
