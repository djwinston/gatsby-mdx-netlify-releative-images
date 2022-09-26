const path = require('path')

module.exports = {
  siteMetadata: {
    title: `mdx-netlify`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: './static/img/',
      },
      __key: 'img',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: './content/',
      },
      __key: 'content',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'srcContent',
        path: './src/content-src/',
      },
      __key: 'src-content',
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-mdx-relative-images',
            options: {
              staticFolderName: path.join(__dirname, '/static'),
            },
          },
        ]
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-image',
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        /**
         * One convention is to place your Netlify CMS customization code in a
         * `src/cms` directory.
         */
        modulePath: `${__dirname}/src/cms/custom-cms.js`,
      },
    },
  ],
}
