const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const testTemplate = path.resolve(`./src/template/test.jsx`)

exports.onCreateNode = async ({ node, getNode, actions, createNodeId, cache, store }) => {
  const { createNodeField, createNode } = actions

  if (node.internal.type === `Mdx` || node.internal.type === `MarkdownRemark`) {
    const { frontmatter } = node
    const key = frontmatter.templateKey
    const contentDataMD = { id: node.id, imageId: "md-content" }
    const srcDataMD = { id: node.id, imageId: "md-src" }
    const contentDataMDX = { id: node.id, imageId: "mdx-content" }
    const srcDataMDX = { id: node.id, imageId: "mdx-src" }

    switch (key) {
      case "md-content":
        createNodeField({
          name: `imageContent`,
          node,
          value: contentDataMD,
        })
        break

      case "md-src":
        createNodeField({
          name: `imageContent`,
          node,
          value: srcDataMD,
        })
        break

      case "mdx-content":
        createNodeField({
          name: `imageContent`,
          node,
          value: contentDataMDX,
        })
        break

      case "mdx-src":
        createNodeField({
          name: `imageContent`,
          node,
          value: srcDataMDX,
        })
        break

      default:
        // createNodeField({node})
        break
    }
    let slug = createFilePath({ node, getNode })
    const regExp = new RegExp("(?<slash_start>^/)(?<path>.+)(?<slash_end>/$)", "gm")
    const path = regExp.exec(slug).groups.path
    createNodeField({
      node,
      name: `slug`,
      value: path,
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMdx(filter: { frontmatter: { templateKey: { eq: "mdx-src" } } }) {
        edges {
          node {
            fields {
              slug
            }
            id
            frontmatter {
              title
              templateKey
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `).then((result) => {
    const page = result.data.allMdx.edges
    
    page.forEach(edge => {
      prefix = 'test'
      const id = edge.node.id
      createPage({
        path: `${prefix}/${edge.node.fields.slug}`,
        component: `${testTemplate}?__contentFilePath=${edge.node.internal.contentFilePath}`,
        context:{
          id
        }
      })

    })
  })
}
