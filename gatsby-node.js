const path = require("path")
const { createRemoteFileNode } = require("gatsby-source-filesystem")

exports.onCreateNode = async ({ node, actions, createNodeId, cache, store }) => {
  // console.log(`TCL>>> ~ node BEFORE`, node);
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
    const { featuredImage, mainPostImage } = frontmatter
    if (featuredImage || mainPostImage) {
      if (featuredImage.indexOf("/img") === 0) {
        const relativePath = path.relative(
          path.dirname(node.fileAbsolutePath),
          path.join(__dirname, "static", featuredImage)
        )
        console.log('>>', relativePath);
        
        frontmatter.featuredImage = relativePath

        console.log('<<<', frontmatter.featuredImage)
      }
    }
  }
  createNodeField({node})
}

// exports.createSchemaCustomization = ({ actions, schema }) => {
//   const { createTypes } = actions
//   const typeDefs = [
//     'type Mdx implements Node { frontmatter: Frontmatter }',
//     schema.buildObjectType({
//       name: 'Frontmatter',
//       fields: {
//         tags: {
//           type: '[String!]',
//           resolve(source, args, context, info) {
//             console.log(`TCL>>> ~ info`, info)
//             console.log(`TCL>>> ~ context`, context)
//             console.log(`TCL>>> ~ args`, args)
//             console.log(`TCL>>> ~ source`, source)
//             // For a more generic solution, you could pick the field value from
//             // `source[info.fieldName]`
//             const { tags } = source
//             if (source.tags == null || (Array.isArray(tags) && !tags.length)) {
//               return ['uncategorized']
//             }
//             return tags
//           },
//         },
//       },
//     }),
//   ]
//   createTypes(typeDefs)
// }
