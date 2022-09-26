import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

export default function PageTemplate({ data, children }) {
  console.log(`TCL>>> ~ data`, data)
  console.log(`TCL>>> ~ children template`, children)

  const myParagraph = (props) => <p style={{ backgroundColor: "yellow" }} {...props} />

  const myImg = (props) => {
    console.log("img props", props.src)
    return (
      <>
        <img style={{ width: "100%" }} {...props} alt="random props" />
      </>
    )
  }
  const components = {
    p: myParagraph,
    img: myImg,
  }

  return (
    <>
      <h1>{data.mdx.frontmatter.title}</h1>
      <MDXProvider components={components}>{children}</MDXProvider>
    </>
  )
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      body
      fields {
        slug
      }
      frontmatter {
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              webpOptions: { quality: 95 }
              quality: 95
              breakpoints: [360, 768, 1024]
            )
          }
          absolutePath
        }
        mainPostImage {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              webpOptions: { quality: 95 }
              quality: 95
              breakpoints: [360, 768, 1024]
            )
          }
          absolutePath
        }
        postImage {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              webpOptions: { quality: 95 }
              quality: 95
              breakpoints: [360, 768, 1024]
            )
          }
          absolutePath
        }
        title
        templateKey
      }
    }
  }
`
