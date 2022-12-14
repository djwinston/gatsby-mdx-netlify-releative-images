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
        name: 'srcMd',
        path: './src/md/',
      },
      __key: 'src-md',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'srcMdx',
        path: './src/mdx/',
      },
      __key: 'src-mdx',
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          // {
          //   resolve: 'gatsby-remark-relative-images',
          //   options: {
          //     staticFolderName: path.join(__dirname, '/static'),
          //   },
          // },
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
