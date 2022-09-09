const path = require('path')
const { createRemoteFileNode } = require('gatsby-source-filesystem')

exports.onCreateNode = async ({ node, actions, createNodeId, cache, store }) => {
  // console.log(`TCL>>> ~ node BEFORE`, node);
  const { createNodeField, createNode } = actions

  if (node.internal.type === `Mdx` || node.internal.type === `MarkdownRemark`) {
    const key = node.frontmatter.templateKey
    const contentData = { id: node.id, imageId: 'md-content' }
    const srcData = { id: node.id, imageId: 'md-src' }

    switch (key) {
      case 'md-content':
        createNodeField({
          name: `imageContent`,
          node,
          value: contentData,
        })
        break

      case 'md-src':
        createNodeField({
          name: `imageContent`,
          node,
          value: srcData,
        })
        break

      default:
        // createNodeField({node})
        break
    }
  }
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
